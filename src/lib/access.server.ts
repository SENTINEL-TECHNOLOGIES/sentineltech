import {
  createHash,
  createHmac,
  randomBytes,
  randomUUID,
  timingSafeEqual,
  createCipheriv,
  createDecipheriv,
} from "node:crypto";
import { Pool, type PoolClient } from "pg";

type AccessRole = "superadmin" | "admin" | "collaborator";
type Permission = { module: string; action: "view" | "create" | "edit" | "delete" | "administer" };
type AuthenticatedUser = {
  id: string;
  email: string;
  role: AccessRole | null;
  mfaVerified: boolean;
  mfaEnabled: boolean;
  passwordHash: string;
};

const SESSION_COOKIE = "sentinel_session";
const modules = [
  "access",
  "operations",
  "command-center",
  "ai-cctv",
  "access-control",
  "building-automation",
  "remote-monitoring",
  "installations",
  "projects",
  "reports",
  "tickets",
  "finance",
  "settings",
];
const actions = ["view", "create", "edit", "delete", "administer"];
let pool: Pool | undefined;

function db() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL não configurada.");
  if (!pool) pool = new Pool({ connectionString, max: 10 });
  return pool;
}

function hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function cookie(request: Request) {
  const value = request.headers.get("cookie") ?? "";
  const match = value
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${SESSION_COOKIE}=`));
  return match ? decodeURIComponent(match.slice(SESSION_COOKIE.length + 1)) : null;
}

function json(data: unknown, status = 200) {
  return Response.json(data, { status, headers: { "cache-control": "no-store" } });
}

function error(message: string, status = 400) {
  return json({ error: message }, status);
}

async function body(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const data: unknown = await request.json();
    return data && typeof data === "object" && !Array.isArray(data)
      ? (data as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

async function authenticated(
  request: Request,
  client: Pool | PoolClient = db(),
): Promise<AuthenticatedUser | null> {
  const token = cookie(request);
  if (!token) return null;
  const result = await client.query<{
    id: string;
    email: string;
    password_hash: string;
    role: AccessRole | null;
    mfa_verified: boolean;
    mfa_enabled_at: Date | null;
  }>(
    `SELECT u.id, u.email, u.password_hash, ar.role, s.mfa_verified, ar.mfa_enabled_at
     FROM auth_sessions s
     JOIN auth_users u ON u.id = s.user_id
     LEFT JOIN access_user_roles ar ON ar.user_id = u.id
     WHERE s.token_hash = $1 AND s.expires_at > NOW() AND u.suspended_at IS NULL`,
    [hash(token)],
  );
  const row = result.rows[0];
  return row
    ? {
        id: row.id,
        email: row.email,
        passwordHash: row.password_hash,
        role: row.role,
        mfaVerified: row.mfa_verified,
        mfaEnabled: Boolean(row.mfa_enabled_at),
      }
    : null;
}

async function hasPermission(
  user: AuthenticatedUser,
  module: string,
  action: string,
  client: Pool | PoolClient = db(),
) {
  if (user.role === "superadmin") return true;
  if (!user.role) return false;
  const result = await client.query(
    `SELECT 1 FROM access_permissions
     WHERE user_id = $1 AND module = $2 AND (action = $3 OR action = 'administer')`,
    [user.id, module, action],
  );
  return Boolean(result.rowCount);
}

function isAdminSession(user: AuthenticatedUser) {
  return user.role !== null && user.mfaVerified;
}

async function requireUser(request: Request, client: Pool | PoolClient = db()) {
  const user = await authenticated(request, client);
  if (!user) return { response: error("Autenticação necessária.", 401) } as const;
  return { user } as const;
}

async function requireAdmin(request: Request, client: Pool | PoolClient = db()) {
  const result = await requireUser(request, client);
  if ("response" in result) return result;
  if (!isAdminSession(result.user))
    return {
      response: error(
        "Acesso administrativo indisponível. Configure e confirme o segundo fator.",
        403,
      ),
    } as const;
  return result;
}

async function audit(
  client: Pool | PoolClient,
  actorId: string | null,
  subjectId: string | null,
  operation: string,
  result: "success" | "denied" | "failure",
  details: Record<string, unknown> = {},
  inviteId: string | null = null,
) {
  await client.query(
    `INSERT INTO access_audit_log (actor_user_id, subject_user_id, invite_id, operation, result, details)
     VALUES ($1, $2, $3, $4, $5, $6::jsonb)`,
    [actorId, subjectId, inviteId, operation, result, JSON.stringify(details)],
  );
}

async function expirePendingInvites() {
  const client = await db().connect();
  try {
    await client.query("BEGIN");
    const expired = await client.query<{ id: string; recipient_user_id: string }>(
      `UPDATE access_invites SET status = 'expired'
       WHERE status = 'pending' AND expires_at <= NOW()
       RETURNING id, recipient_user_id`,
    );
    for (const invite of expired.rows) {
      await audit(
        client,
        null,
        invite.recipient_user_id,
        "invite.expired",
        "success",
        {},
        invite.id,
      );
    }
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

function cleanPermissions(value: unknown): Permission[] | null {
  if (!Array.isArray(value) || value.length > modules.length * actions.length) return null;
  const result: Permission[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") return null;
    const permission = item as Record<string, unknown>;
    if (
      typeof permission.module !== "string" ||
      !modules.includes(permission.module) ||
      typeof permission.action !== "string" ||
      !actions.includes(permission.action)
    )
      return null;
    if (
      !result.some(
        (entry) => entry.module === permission.module && entry.action === permission.action,
      )
    ) {
      result.push({ module: permission.module, action: permission.action as Permission["action"] });
    }
  }
  return result;
}

async function verifyPassword(password: string, stored: string) {
  const [salt, encoded] = stored.split(":");
  if (!salt || !encoded) return false;
  const { scrypt } = await import("node:crypto");
  const derived = await new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, 64, (err, key) => (err ? reject(err) : resolve(key as Buffer)));
  });
  const expected = Buffer.from(encoded, "hex");
  return expected.length === derived.length && timingSafeEqual(expected, derived);
}

function encryptionKey() {
  const key = process.env.SENTINEL_MFA_ENCRYPTION_KEY ?? "";
  if (!/^[\da-f]{64}$/i.test(key))
    throw new Error("SENTINEL_MFA_ENCRYPTION_KEY deve conter 32 bytes em hexadecimal.");
  return Buffer.from(key, "hex");
}

function encrypt(value: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  return `${iv.toString("hex")}:${cipher.getAuthTag().toString("hex")}:${encrypted.toString("hex")}`;
}

function decrypt(value: string) {
  const [iv, tag, encrypted] = value.split(":");
  if (!iv || !tag || !encrypted) throw new Error("Segredo MFA inválido.");
  const decipher = createDecipheriv("aes-256-gcm", encryptionKey(), Buffer.from(iv, "hex"));
  decipher.setAuthTag(Buffer.from(tag, "hex"));
  return Buffer.concat([decipher.update(Buffer.from(encrypted, "hex")), decipher.final()]).toString(
    "utf8",
  );
}

function base32Encode(buffer: Buffer) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = 0;
  let value = 0;
  let output = "";
  for (const byte of buffer) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      output += alphabet[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits) output += alphabet[(value << (5 - bits)) & 31];
  return output;
}

function base32Decode(secret: string) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = 0;
  let value = 0;
  const output: number[] = [];
  for (const char of secret.replace(/=+$/g, "").toUpperCase()) {
    const index = alphabet.indexOf(char);
    if (index < 0) throw new Error("Segredo MFA inválido.");
    value = (value << 5) | index;
    bits += 5;
    if (bits >= 8) {
      output.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  return Buffer.from(output);
}

function totp(secret: string, timestamp = Date.now()) {
  const counter = Math.floor(timestamp / 30000);
  const message = Buffer.alloc(8);
  message.writeBigUInt64BE(BigInt(counter));
  const digest = createHmac("sha1", base32Decode(secret)).update(message).digest();
  const offset = digest[digest.length - 1] & 15;
  const binary = digest.readUInt32BE(offset) & 0x7fffffff;
  return String(binary % 1000000).padStart(6, "0");
}

function verifyTotp(secret: string, code: string) {
  if (!/^\d{6}$/.test(code)) return false;
  const given = Buffer.from(code);
  for (const delta of [-30000, 0, 30000]) {
    const expected = Buffer.from(totp(secret, Date.now() + delta));
    if (timingSafeEqual(given, expected)) return true;
  }
  return false;
}

export async function verifyAdministrativeMfa(userId: string, code: string) {
  const attempts = await db().query<{ count: number }>(
    `SELECT count(*)::int AS count FROM access_audit_log
     WHERE actor_user_id = $1 AND operation = 'mfa.failed' AND created_at > NOW() - INTERVAL '15 minutes'`,
    [userId],
  );
  if ((attempts.rows[0]?.count ?? 0) >= 5) return false;
  const result = await db().query<{ mfa_secret_encrypted: string | null }>(
    "SELECT mfa_secret_encrypted FROM access_user_roles WHERE user_id = $1",
    [userId],
  );
  const encrypted = result.rows[0]?.mfa_secret_encrypted;
  const valid = Boolean(encrypted && verifyTotp(decrypt(encrypted), code));
  if (!valid) await audit(db(), userId, userId, "mfa.failed", "failure");
  return valid;
}

async function mfaRateLimited(userId: string) {
  const attempts = await db().query<{ count: number }>(
    `SELECT count(*)::int AS count FROM access_audit_log
     WHERE actor_user_id = $1 AND operation = 'mfa.failed' AND created_at > NOW() - INTERVAL '15 minutes'`,
    [userId],
  );
  return (attempts.rows[0]?.count ?? 0) >= 5;
}

async function confirmedPassword(
  request: Request,
  user: AuthenticatedUser,
  data: Record<string, unknown>,
) {
  return (
    typeof data.password === "string" && (await verifyPassword(data.password, user.passwordHash))
  );
}

export async function handleAccessRequest(request: Request) {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/api/access/")) return null;
  if (request.method !== "GET") {
    const origin = request.headers.get("origin");
    if (origin && origin !== url.origin) return error("Origem da solicitação inválida.", 403);
    if (!(request.headers.get("content-type") ?? "").includes("application/json"))
      return error("Content-Type inválido.", 415);
  }

  try {
    const path = url.pathname;
    if (request.method === "GET" && path === "/api/access/invites") {
      const auth = await requireUser(request);
      if ("response" in auth) return auth.response;
      await expirePendingInvites();
      const result = await db().query(
        `SELECT i.id, i.access_role, i.department, i.permissions, i.message, i.created_at, i.expires_at,
                s.name AS sender_name, s.username AS sender_username
         FROM access_invites i JOIN auth_users s ON s.id = i.sender_user_id
         WHERE i.recipient_user_id = $1 AND i.status = 'pending' AND i.expires_at > NOW()
         ORDER BY i.created_at DESC`,
        [auth.user.id],
      );
      return json({ invites: result.rows });
    }

    if (request.method === "POST" && path === "/api/access/mfa/setup") {
      const auth = await requireUser(request);
      if ("response" in auth) return auth.response;
      if (!auth.user.role) return error("Esta conta não possui acesso administrativo.", 403);
      const data = await body(request);
      if (!data || !(await confirmedPassword(request, auth.user, data)))
        return error("Confirme sua senha.", 401);
      if (
        auth.user.mfaEnabled &&
        (typeof data.currentCode !== "string" ||
          !(await verifyAdministrativeMfa(auth.user.id, data.currentCode)))
      ) {
        return error("Confirme o MFA atual antes de alterá-lo.", 401);
      }
      const secret = base32Encode(randomBytes(20));
      await db().query(
        `UPDATE access_user_roles SET mfa_pending_secret_encrypted = $2, updated_at = NOW()
         WHERE user_id = $1`,
        [auth.user.id, encrypt(secret)],
      );
      const label = encodeURIComponent(`Sentinel Technologies:${auth.user.email}`);
      const uri = `otpauth://totp/${label}?secret=${secret}&issuer=Sentinel%20Technologies&algorithm=SHA1&digits=6&period=30`;
      return json({ secret, uri });
    }

    if (request.method === "POST" && path === "/api/access/mfa/confirm") {
      const auth = await requireUser(request);
      if ("response" in auth) return auth.response;
      const data = await body(request);
      if (
        !data ||
        typeof data.code !== "string" ||
        !(await confirmedPassword(request, auth.user, data))
      )
        return error("Confirme sua senha e informe o código.", 401);
      if (await mfaRateLimited(auth.user.id))
        return error("Muitas tentativas de MFA. Tente novamente em 15 minutos.", 429);
      const client = await db().connect();
      try {
        await client.query("BEGIN");
        const role = await client.query<{ mfa_pending_secret_encrypted: string | null }>(
          "SELECT mfa_pending_secret_encrypted FROM access_user_roles WHERE user_id = $1 FOR UPDATE",
          [auth.user.id],
        );
        const encrypted = role.rows[0]?.mfa_pending_secret_encrypted;
        if (!encrypted || !verifyTotp(decrypt(encrypted), data.code)) {
          await client.query("ROLLBACK");
          await audit(db(), auth.user.id, auth.user.id, "mfa.failed", "failure");
          return error("Código de autenticação inválido.", 401);
        }
        await client.query(
          `UPDATE access_user_roles
           SET mfa_secret_encrypted = mfa_pending_secret_encrypted,
               mfa_pending_secret_encrypted = NULL, mfa_enabled_at = NOW(), updated_at = NOW()
           WHERE user_id = $1`,
          [auth.user.id],
        );
        const token = cookie(request);
        await client.query("UPDATE auth_sessions SET mfa_verified = TRUE WHERE token_hash = $1", [
          hash(token ?? ""),
        ]);
        await audit(client, auth.user.id, auth.user.id, "mfa.enabled", "success");
        await client.query("COMMIT");
        return json({ ok: true });
      } catch (e) {
        await client.query("ROLLBACK");
        throw e;
      } finally {
        client.release();
      }
    }

    if (request.method === "POST" && path === "/api/access/mfa/verify") {
      const auth = await requireUser(request);
      if ("response" in auth) return auth.response;
      const data = await body(request);
      if (
        !data ||
        typeof data.code !== "string" ||
        !(await confirmedPassword(request, auth.user, data))
      )
        return error("Confirme sua senha e informe o código.", 401);
      if (!(await verifyAdministrativeMfa(auth.user.id, data.code)))
        return error("Código de autenticação inválido.", 401);
      await db().query("UPDATE auth_sessions SET mfa_verified = TRUE WHERE token_hash = $1", [
        hash(cookie(request) ?? ""),
      ]);
      await audit(db(), auth.user.id, auth.user.id, "mfa.verified", "success");
      return json({ ok: true });
    }

    if (request.method === "POST" && path === "/api/access/invites") {
      const auth = await requireAdmin(request);
      if ("response" in auth) return auth.response;
      const data = await body(request);
      const username = typeof data?.username === "string" ? data.username.trim().toLowerCase() : "";
      const accessRole = data?.role;
      const department = typeof data?.department === "string" ? data.department.trim() : "";
      const message = typeof data?.message === "string" ? data.message.trim().slice(0, 1000) : null;
      const permissions = cleanPermissions(data?.permissions);
      const allowedRole = accessRole === "admin" || accessRole === "collaborator";
      if (
        !/^[a-z0-9._-]{3,64}$/.test(username) ||
        !allowedRole ||
        department.length < 2 ||
        department.length > 120 ||
        !permissions
      ) {
        return error("Confira usuário, nível, departamento e permissões.");
      }
      if (!(await confirmedPassword(request, auth.user, data ?? {})))
        return error("Confirme sua senha para enviar o convite.", 401);
      if (auth.user.role !== "superadmin") {
        if (
          accessRole !== "collaborator" ||
          !(await hasPermission(auth.user, "access", "create"))
        ) {
          await audit(db(), auth.user.id, null, "invite.create", "denied", {
            requestedRole: accessRole,
          });
          return error("Você não pode conceder este nível de acesso.", 403);
        }
        for (const permission of permissions) {
          if (!(await hasPermission(auth.user, permission.module, permission.action))) {
            return error("Não é permitido conceder permissões que você não possui.", 403);
          }
        }
      }
      const recipient = await db().query<{ id: string; role: AccessRole | null }>(
        `SELECT u.id, ar.role FROM auth_users u
         LEFT JOIN access_user_roles ar ON ar.user_id = u.id
         WHERE lower(u.username) = $1 AND u.suspended_at IS NULL`,
        [username],
      );
      if (!recipient.rowCount) return error("Usuário destinatário não encontrado.", 404);
      const currentRank =
        recipient.rows[0].role === "superadmin"
          ? 3
          : recipient.rows[0].role === "admin"
            ? 2
            : recipient.rows[0].role === "collaborator"
              ? 1
              : 0;
      const requestedRank = accessRole === "admin" ? 2 : 1;
      if (currentRank >= requestedRank) {
        return error("O destinatário já possui nível de acesso igual ou superior.", 409);
      }
      const inviteId = randomUUID();
      const tokenHash = hash(inviteId);
      const client = await db().connect();
      try {
        await client.query("BEGIN");
        const expired = await client.query<{ id: string }>(
          `UPDATE access_invites SET status = 'expired'
           WHERE recipient_user_id = $1 AND status = 'pending' AND expires_at <= NOW()
           RETURNING id`,
          [recipient.rows[0].id],
        );
        for (const invite of expired.rows) {
          await audit(
            client,
            null,
            recipient.rows[0].id,
            "invite.expired",
            "success",
            {},
            invite.id,
          );
        }
        await client.query("SELECT pg_advisory_xact_lock(hashtext($1))", [
          `access-invites:${auth.user.id}`,
        ]);
        const count = await client.query(
          `SELECT count(*)::int AS total FROM access_audit_log
           WHERE actor_user_id = $1 AND operation IN ('invite.created', 'invite.resent')
             AND created_at > NOW() - INTERVAL '1 hour'`,
          [auth.user.id],
        );
        if ((count.rows[0]?.total ?? 0) >= 20) {
          await client.query("ROLLBACK");
          return error("Limite de convites por hora atingido.", 429);
        }
        const created = await client.query<{ id: string }>(
          `INSERT INTO access_invites
             (id, token_hash, recipient_user_id, sender_user_id, access_role, department, permissions, message)
           VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8)
           RETURNING id`,
          [
            inviteId,
            tokenHash,
            recipient.rows[0].id,
            auth.user.id,
            accessRole,
            department,
            JSON.stringify(permissions),
            message,
          ],
        );
        await audit(
          client,
          auth.user.id,
          recipient.rows[0].id,
          "invite.created",
          "success",
          { accessRole, department },
          created.rows[0].id,
        );
        await client.query("COMMIT");
        return json({ ok: true, id: created.rows[0].id }, 201);
      } catch (e) {
        await client.query("ROLLBACK");
        if ((e as { code?: string }).code === "23505")
          return error("Já existe um convite pendente para esse usuário.", 409);
        throw e;
      } finally {
        client.release();
      }
    }

    const inviteAction = path.match(
      /^\/api\/access\/invites\/([0-9a-f-]+)\/(accept|decline|cancel)$/i,
    );
    if (request.method === "POST" && inviteAction) {
      const auth = await requireUser(request);
      if ("response" in auth) return auth.response;
      const action = inviteAction[2];
      const client = await db().connect();
      try {
        await client.query("BEGIN");
        const invite = await client.query<{
          id: string;
          recipient_user_id: string;
          sender_user_id: string;
          access_role: AccessRole;
          department: string;
          permissions: Permission[];
          token_hash: string;
          status: string;
          expires_at: Date;
        }>("SELECT * FROM access_invites WHERE id = $1 FOR UPDATE", [inviteAction[1]]);
        const row = invite.rows[0];
        if (!row) {
          await client.query("ROLLBACK");
          return error("Convite não encontrado.", 404);
        }
        if (action === "cancel") {
          const admin = await requireAdmin(request, client);
          if ("response" in admin) {
            await client.query("ROLLBACK");
            return admin.response;
          }
          const data = await body(request);
          if (!data || !(await confirmedPassword(request, admin.user, data))) {
            await client.query("ROLLBACK");
            return error("Confirme sua senha para cancelar o convite.", 401);
          }
          const privileged = admin.user.role === "superadmin";
          if (
            !privileged &&
            (row.sender_user_id !== admin.user.id ||
              !(await hasPermission(admin.user, "access", "edit", client)))
          ) {
            await client.query("ROLLBACK");
            return error("Sem autorização para cancelar este convite.", 403);
          }
          if (row.status !== "pending" || new Date(row.expires_at) <= new Date()) {
            await client.query("ROLLBACK");
            return error("Este convite não está mais pendente.", 409);
          }
          await client.query(
            "UPDATE access_invites SET status = 'cancelled', cancelled_at = NOW() WHERE id = $1",
            [row.id],
          );
          await audit(
            client,
            admin.user.id,
            row.recipient_user_id,
            "invite.cancelled",
            "success",
            {},
            row.id,
          );
          await client.query("COMMIT");
          return json({ ok: true });
        }
        if (row.recipient_user_id !== auth.user.id) {
          await client.query("ROLLBACK");
          return error("Este convite pertence a outro usuário.", 403);
        }
        const expectedInviteTokenHash = Buffer.from(hash(row.id));
        const actualInviteTokenHash = Buffer.from(row.token_hash);
        if (
          expectedInviteTokenHash.length !== actualInviteTokenHash.length ||
          !timingSafeEqual(expectedInviteTokenHash, actualInviteTokenHash)
        ) {
          await client.query("ROLLBACK");
          return error("Token do convite inválido.", 403);
        }
        if (row.status !== "pending" || new Date(row.expires_at) <= new Date()) {
          if (row.status === "pending") {
            await client.query("UPDATE access_invites SET status = 'expired' WHERE id = $1", [
              row.id,
            ]);
            await audit(client, null, auth.user.id, "invite.expired", "success", {}, row.id);
            await client.query("COMMIT");
          } else {
            await client.query("ROLLBACK");
          }
          return error("O convite expirou ou já foi processado.", 409);
        }
        const data = await body(request);
        if (!(await confirmedPassword(request, auth.user, data ?? {}))) {
          await client.query("ROLLBACK");
          return error("Confirme sua senha para responder ao convite.", 401);
        }
        if (action === "accept") {
          const current = await client.query<{ role: AccessRole | null }>(
            "SELECT role FROM access_user_roles WHERE user_id = $1 FOR UPDATE",
            [auth.user.id],
          );
          if (
            current.rows[0]?.role === "superadmin" ||
            (current.rows[0]?.role === "admin" && row.access_role === "collaborator")
          ) {
            await client.query("ROLLBACK");
            return error("Seu nível atual é superior ao oferecido.", 409);
          }
          await client.query(
            `INSERT INTO access_user_roles (user_id, role, department, granted_by)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (user_id) DO UPDATE SET role = EXCLUDED.role, department = EXCLUDED.department,
               granted_by = EXCLUDED.granted_by, granted_at = NOW(), updated_at = NOW()`,
            [auth.user.id, row.access_role, row.department, row.sender_user_id],
          );
          await client.query("DELETE FROM access_permissions WHERE user_id = $1", [auth.user.id]);
          for (const permission of row.permissions) {
            await client.query(
              "INSERT INTO access_permissions (user_id, module, action, granted_by) VALUES ($1, $2, $3, $4)",
              [auth.user.id, permission.module, permission.action, row.sender_user_id],
            );
          }
          await client.query("UPDATE auth_sessions SET mfa_verified = FALSE WHERE user_id = $1", [
            auth.user.id,
          ]);
          await client.query(
            "UPDATE access_invites SET status = 'accepted', responded_at = NOW() WHERE id = $1",
            [row.id],
          );
          await audit(
            client,
            auth.user.id,
            auth.user.id,
            "invite.accepted",
            "success",
            { accessRole: row.access_role },
            row.id,
          );
          await audit(
            client,
            auth.user.id,
            auth.user.id,
            "access.granted",
            "success",
            { accessRole: row.access_role, department: row.department },
            row.id,
          );
          await client.query("COMMIT");
          return json({ ok: true, mfaSetupRequired: true });
        }
        await client.query(
          "UPDATE access_invites SET status = 'declined', responded_at = NOW() WHERE id = $1",
          [row.id],
        );
        await audit(client, auth.user.id, auth.user.id, "invite.declined", "success", {}, row.id);
        await client.query("COMMIT");
        return json({ ok: true });
      } catch (e) {
        await client.query("ROLLBACK");
        throw e;
      } finally {
        client.release();
      }
    }

    if (request.method === "GET" && path === "/api/access/management") {
      const admin = await requireAdmin(request);
      if ("response" in admin) return admin.response;
      if (!(await hasPermission(admin.user, "access", "view")))
        return error("Sem permissão para visualizar a gestão de acessos.", 403);
      await expirePendingInvites();
      const [stats, invites, users, recentGrants] = await Promise.all([
        db().query(
          `SELECT
            count(*) FILTER (WHERE ar.role IN ('superadmin', 'admin'))::int AS admins,
            count(*) FILTER (WHERE ar.role = 'collaborator')::int AS collaborators,
            (SELECT count(*)::int FROM access_invites WHERE status = 'pending' AND expires_at > NOW()) AS pending,
            (SELECT count(*)::int FROM access_invites WHERE status = 'accepted') AS accepted,
            (SELECT count(*)::int FROM access_invites WHERE status = 'expired') AS expired
           FROM access_user_roles ar`,
        ),
        db().query(
          `SELECT i.id, i.access_role, i.department, i.permissions, i.message,
                  CASE WHEN i.status = 'pending' AND i.expires_at <= NOW() THEN 'expired' ELSE i.status END AS status,
                  i.created_at, i.expires_at, r.name AS recipient_name, r.username AS recipient_username,
                  s.name AS sender_name,
                  coalesce((
                    SELECT jsonb_agg(jsonb_build_object(
                      'operation', a.operation, 'result', a.result, 'created_at', a.created_at, 'actor_name', actor.name
                    ) ORDER BY a.created_at DESC)
                    FROM access_audit_log a LEFT JOIN auth_users actor ON actor.id = a.actor_user_id
                    WHERE a.invite_id = i.id
                  ), '[]'::jsonb) AS history
           FROM access_invites i JOIN auth_users r ON r.id = i.recipient_user_id
           JOIN auth_users s ON s.id = i.sender_user_id
           ORDER BY i.created_at DESC LIMIT 200`,
        ),
        db().query(
          `SELECT u.id, u.name, u.username, u.email, u.suspended_at, ar.role, ar.department,
                  coalesce(jsonb_agg(jsonb_build_object('module', p.module, 'action', p.action))
                    FILTER (WHERE p.module IS NOT NULL), '[]'::jsonb) AS permissions
           FROM auth_users u JOIN access_user_roles ar ON ar.user_id = u.id
           LEFT JOIN access_permissions p ON p.user_id = u.id
           GROUP BY u.id, ar.role, ar.department ORDER BY max(ar.granted_at) DESC`,
        ),
        db().query(
          `SELECT a.created_at, actor.name AS actor_name, subject.name AS subject_name
           FROM access_audit_log a LEFT JOIN auth_users actor ON actor.id = a.actor_user_id
           LEFT JOIN auth_users subject ON subject.id = a.subject_user_id
           WHERE a.operation = 'access.granted' AND a.result = 'success'
           ORDER BY a.created_at DESC LIMIT 3`,
        ),
      ]);
      return json({
        stats: stats.rows[0],
        invites: invites.rows,
        users: users.rows,
        recentGrants: recentGrants.rows,
      });
    }

    if (request.method === "GET" && path === "/api/access/audit") {
      const admin = await requireAdmin(request);
      if ("response" in admin) return admin.response;
      if (admin.user.role !== "superadmin")
        return error("Somente superadministradores podem consultar a auditoria.", 403);
      const result = await db().query(
        `SELECT a.id, a.operation, a.result, a.details, a.created_at,
                actor.name AS actor_name, subject.name AS subject_name
         FROM access_audit_log a LEFT JOIN auth_users actor ON actor.id = a.actor_user_id
         LEFT JOIN auth_users subject ON subject.id = a.subject_user_id
         ORDER BY a.created_at DESC LIMIT 500`,
      );
      return json({ events: result.rows });
    }

    const userAction = path.match(
      /^\/api\/access\/users\/([0-9a-f-]+)\/(suspend|restore|revoke)$/i,
    );
    if (request.method === "POST" && userAction) {
      const admin = await requireAdmin(request);
      if ("response" in admin) return admin.response;
      if (admin.user.role !== "superadmin")
        return error("Somente superadministradores podem alterar acessos.", 403);
      const data = await body(request);
      if (!data || !(await confirmedPassword(request, admin.user, data)))
        return error("Confirme sua senha para continuar.", 401);
      const subjectId = userAction[1];
      if (subjectId === admin.user.id && userAction[2] !== "restore")
        return error("Não é possível remover ou suspender seu próprio acesso.", 409);
      const client = await db().connect();
      try {
        await client.query("BEGIN");
        await client.query(
          "SELECT pg_advisory_xact_lock(hashtext('access-superadmin-membership'))",
        );
        const subject = await client.query<{ role: AccessRole }>(
          "SELECT role FROM access_user_roles WHERE user_id = $1 FOR UPDATE",
          [subjectId],
        );
        if (!subject.rowCount) {
          await client.query("ROLLBACK");
          return error("Conta administrativa não encontrada.", 404);
        }
        if (subject.rows[0].role === "superadmin" && userAction[2] !== "restore") {
          const count = await client.query(
            "SELECT count(*)::int AS total FROM access_user_roles WHERE role = 'superadmin'",
          );
          if ((count.rows[0]?.total ?? 0) < 2) {
            await client.query("ROLLBACK");
            return error("Não é possível remover o último superadministrador.", 409);
          }
        }
        const operation = userAction[2];
        if (operation === "suspend") {
          await client.query("UPDATE auth_users SET suspended_at = NOW() WHERE id = $1", [
            subjectId,
          ]);
          await client.query("DELETE FROM auth_sessions WHERE user_id = $1", [subjectId]);
        } else if (operation === "restore") {
          await client.query("UPDATE auth_users SET suspended_at = NULL WHERE id = $1", [
            subjectId,
          ]);
        } else {
          await client.query("DELETE FROM access_user_roles WHERE user_id = $1", [subjectId]);
          await client.query("DELETE FROM auth_sessions WHERE user_id = $1", [subjectId]);
        }
        const reason = typeof data.reason === "string" ? data.reason.slice(0, 500) : "";
        if (reason.trim().length < 3) {
          await client.query("ROLLBACK");
          return error("Informe um motivo para a alteração de acesso.", 400);
        }
        await audit(client, admin.user.id, subjectId, `user.${operation}`, "success", { reason });
        await client.query("COMMIT");
        return json({ ok: true });
      } catch (e) {
        await client.query("ROLLBACK");
        throw e;
      } finally {
        client.release();
      }
    }

    const resendAction = path.match(/^\/api\/access\/invites\/([0-9a-f-]+)\/resend$/i);
    if (request.method === "POST" && resendAction) {
      const admin = await requireAdmin(request);
      if ("response" in admin) return admin.response;
      const data = await body(request);
      if (!data || !(await confirmedPassword(request, admin.user, data)))
        return error("Confirme sua senha para reenviar.", 401);
      const client = await db().connect();
      try {
        await client.query("BEGIN");
        const previous = await client.query<{
          recipient_user_id: string;
          sender_user_id: string;
          access_role: AccessRole;
          department: string;
          permissions: Permission[];
          message: string | null;
          status: string;
          expires_at: Date;
        }>("SELECT * FROM access_invites WHERE id = $1 FOR UPDATE", [resendAction[1]]);
        const invite = previous.rows[0];
        if (!invite) {
          await client.query("ROLLBACK");
          return error("Convite não encontrado.", 404);
        }
        if (invite.status === "pending" && new Date(invite.expires_at) <= new Date()) {
          await client.query("UPDATE access_invites SET status = 'expired' WHERE id = $1", [
            resendAction[1],
          ]);
          await audit(
            client,
            null,
            invite.recipient_user_id,
            "invite.expired",
            "success",
            {},
            resendAction[1],
          );
        }
        if (admin.user.role !== "superadmin" && invite.sender_user_id !== admin.user.id) {
          await client.query("ROLLBACK");
          return error("Somente o remetente ou um superadministrador pode reenviar.", 403);
        }
        if (invite.status === "pending" && new Date(invite.expires_at) > new Date()) {
          await client.query("ROLLBACK");
          return error("O convite ainda está pendente e válido.", 409);
        }
        await client.query("SELECT pg_advisory_xact_lock(hashtext($1))", [
          `access-invites:${admin.user.id}`,
        ]);
        const count = await client.query(
          `SELECT count(*)::int AS total FROM access_audit_log
           WHERE actor_user_id = $1 AND operation IN ('invite.created', 'invite.resent')
             AND created_at > NOW() - INTERVAL '1 hour'`,
          [admin.user.id],
        );
        if ((count.rows[0]?.total ?? 0) >= 20) {
          await client.query("ROLLBACK");
          return error("Limite de convites por hora atingido.", 429);
        }
        const inviteId = randomUUID();
        const tokenHash = hash(inviteId);
        const resent = await client.query<{ id: string }>(
          `INSERT INTO access_invites
             (id, token_hash, recipient_user_id, sender_user_id, access_role, department, permissions, message)
           VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8) RETURNING id`,
          [
            inviteId,
            tokenHash,
            invite.recipient_user_id,
            admin.user.id,
            invite.access_role,
            invite.department,
            JSON.stringify(invite.permissions),
            invite.message,
          ],
        );
        await audit(
          client,
          admin.user.id,
          invite.recipient_user_id,
          "invite.resent",
          "success",
          {},
          resent.rows[0].id,
        );
        await client.query("COMMIT");
        return json({ ok: true, id: resent.rows[0].id }, 201);
      } catch (e) {
        await client.query("ROLLBACK");
        if ((e as { code?: string }).code === "23505")
          return error("Já existe um convite pendente para esse usuário.", 409);
        throw e;
      } finally {
        client.release();
      }
    }

    const permissionsAction = path.match(/^\/api\/access\/users\/([0-9a-f-]+)\/permissions$/i);
    if (request.method === "POST" && permissionsAction) {
      const admin = await requireAdmin(request);
      if ("response" in admin) return admin.response;
      if (admin.user.role !== "superadmin")
        return error("Somente superadministradores podem alterar permissões.", 403);
      const data = await body(request);
      const permissions = cleanPermissions(data?.permissions);
      if (!data || !permissions || !(await confirmedPassword(request, admin.user, data))) {
        return error("Confira as permissões e confirme sua senha.", 400);
      }
      const client = await db().connect();
      try {
        await client.query("BEGIN");
        const target = await client.query(
          "SELECT role FROM access_user_roles WHERE user_id = $1 FOR UPDATE",
          [permissionsAction[1]],
        );
        if (!target.rowCount) {
          await client.query("ROLLBACK");
          return error("Usuário administrativo não encontrado.", 404);
        }
        await client.query("DELETE FROM access_permissions WHERE user_id = $1", [
          permissionsAction[1],
        ]);
        for (const permission of permissions) {
          await client.query(
            "INSERT INTO access_permissions (user_id, module, action, granted_by) VALUES ($1, $2, $3, $4)",
            [permissionsAction[1], permission.module, permission.action, admin.user.id],
          );
        }
        await client.query("UPDATE auth_sessions SET mfa_verified = FALSE WHERE user_id = $1", [
          permissionsAction[1],
        ]);
        await audit(client, admin.user.id, permissionsAction[1], "permissions.changed", "success", {
          permissions,
        });
        await client.query("COMMIT");
        return json({ ok: true });
      } catch (e) {
        await client.query("ROLLBACK");
        throw e;
      } finally {
        client.release();
      }
    }

    return error("Rota de gestão de acessos não encontrada.", 404);
  } catch (e) {
    console.error("Access management request failed", e);
    if (
      e instanceof Error &&
      (e.message === "DATABASE_URL não configurada." ||
        e.message.startsWith("SENTINEL_MFA_ENCRYPTION_KEY"))
    ) {
      return error(e.message, 503);
    }
    return error("Serviço de gestão de acessos indisponível.", 503);
  }
}
