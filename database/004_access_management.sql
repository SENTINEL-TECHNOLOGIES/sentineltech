ALTER TABLE auth_users ADD COLUMN IF NOT EXISTS username TEXT;
ALTER TABLE auth_users ADD COLUMN IF NOT EXISTS suspended_at TIMESTAMPTZ;

UPDATE auth_users
SET username = lower(regexp_replace(split_part(email, '@', 1), '[^a-z0-9._-]', '', 'g'))
  || '-' || left(replace(id::text, '-', ''), 8)
WHERE username IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS auth_users_username_unique_idx
  ON auth_users (lower(username));

ALTER TABLE auth_sessions ADD COLUMN IF NOT EXISTS mfa_verified BOOLEAN NOT NULL DEFAULT FALSE;

CREATE TABLE IF NOT EXISTS access_user_roles (
  user_id UUID PRIMARY KEY REFERENCES auth_users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('superadmin', 'admin', 'collaborator')),
  department TEXT,
  mfa_secret_encrypted TEXT,
  mfa_pending_secret_encrypted TEXT,
  mfa_enabled_at TIMESTAMPTZ,
  granted_by UUID REFERENCES auth_users(id) ON DELETE SET NULL,
  granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS access_permissions (
  user_id UUID NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
  module TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('view', 'create', 'edit', 'delete', 'administer')),
  granted_by UUID REFERENCES auth_users(id) ON DELETE SET NULL,
  granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, module, action)
);

CREATE TABLE IF NOT EXISTS access_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash TEXT NOT NULL UNIQUE,
  recipient_user_id UUID NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
  sender_user_id UUID NOT NULL REFERENCES auth_users(id) ON DELETE RESTRICT,
  access_role TEXT NOT NULL CHECK (access_role IN ('admin', 'collaborator')),
  department TEXT NOT NULL,
  permissions JSONB NOT NULL DEFAULT '[]'::jsonb,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'accepted', 'declined', 'cancelled', 'expired')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '24 hours'),
  responded_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  CHECK (expires_at > created_at),
  CHECK (jsonb_typeof(permissions) = 'array')
);

CREATE UNIQUE INDEX IF NOT EXISTS access_invites_pending_recipient_idx
  ON access_invites (recipient_user_id)
  WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS access_invites_status_expiration_idx
  ON access_invites (status, expires_at);
CREATE INDEX IF NOT EXISTS access_invites_sender_created_idx
  ON access_invites (sender_user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS access_audit_log (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  actor_user_id UUID,
  subject_user_id UUID,
  invite_id UUID,
  operation TEXT NOT NULL,
  result TEXT NOT NULL CHECK (result IN ('success', 'denied', 'failure')),
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS access_audit_log_created_idx
  ON access_audit_log (created_at DESC);
CREATE INDEX IF NOT EXISTS access_audit_log_subject_idx
  ON access_audit_log (subject_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS access_audit_log_actor_operation_idx
  ON access_audit_log (actor_user_id, operation, created_at DESC);

CREATE OR REPLACE FUNCTION prevent_access_audit_mutation()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'access_audit_log is append-only';
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS access_audit_log_no_update ON access_audit_log;
CREATE TRIGGER access_audit_log_no_update
  BEFORE UPDATE OR DELETE ON access_audit_log
  FOR EACH ROW EXECUTE FUNCTION prevent_access_audit_mutation();
DROP TRIGGER IF EXISTS access_audit_log_no_truncate ON access_audit_log;
CREATE TRIGGER access_audit_log_no_truncate
  BEFORE TRUNCATE ON access_audit_log
  FOR EACH STATEMENT EXECUTE FUNCTION prevent_access_audit_mutation();
