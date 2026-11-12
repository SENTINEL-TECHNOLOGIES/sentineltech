import "dotenv/config";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import pg from "pg";

const { Pool } = pg;
const databaseUrl = process.env.DATABASE_URL;
const email = process.env.SENTINEL_ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.SENTINEL_ADMIN_PASSWORD;
const name = process.env.SENTINEL_ADMIN_NAME?.trim() || "Superadministrador Sentinel";

if (!databaseUrl) throw new Error("Defina DATABASE_URL antes do provisionamento.");
if (!email || !password || password.length < 12 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  throw new Error(
    "Defina SENTINEL_ADMIN_EMAIL e SENTINEL_ADMIN_PASSWORD (mínimo de 12 caracteres).",
  );
}
if (!/^[\da-f]{64}$/i.test(process.env.SENTINEL_MFA_ENCRYPTION_KEY ?? "")) {
  throw new Error(
    "Defina SENTINEL_MFA_ENCRYPTION_KEY com 32 bytes aleatórios codificados em hexadecimal.",
  );
}

function hashPassword(value) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(value, salt, 64).toString("hex")}`;
}

const pool = new Pool({ connectionString: databaseUrl });
const client = await pool.connect();
try {
  await client.query("BEGIN");
  await client.query("SELECT pg_advisory_xact_lock(hashtext('sentinel.initial_superadmin'))");
  const admins = await client.query(
    "SELECT 1 FROM access_user_roles WHERE role = 'superadmin' LIMIT 1 FOR UPDATE",
  );
  if (admins.rowCount)
    throw new Error(
      "Já existe um superadministrador; o provisionamento inicial é somente uma vez.",
    );

  const existing = await client.query(
    "SELECT id, password_hash FROM auth_users WHERE lower(email) = $1 FOR UPDATE",
    [email],
  );
  let userId;
  if (existing.rowCount) {
    const [salt, stored] = existing.rows[0].password_hash.split(":");
    const expected = salt && stored ? scryptSync(password, salt, 64) : Buffer.alloc(0);
    const storedKey = Buffer.from(stored || "", "hex");
    if (
      expected.length === 0 ||
      expected.length !== storedKey.length ||
      !timingSafeEqual(expected, storedKey)
    ) {
      throw new Error(
        "O usuário já existe; informe a senha atual correta para conceder a função inicial.",
      );
    }
    userId = existing.rows[0].id;
  } else {
    const usernameBase =
      email
        .split("@")[0]
        .replace(/[^a-z0-9._-]/g, "")
        .slice(0, 48) || "admin";
    const username = `${usernameBase}-${randomBytes(3).toString("hex")}`;
    const created = await client.query(
      `INSERT INTO auth_users (name, username, email, password_hash, role)
       VALUES ($1, $2, $3, $4, 'administrative') RETURNING id`,
      [name, username, email, hashPassword(password)],
    );
    userId = created.rows[0].id;
  }
  await client.query(
    `INSERT INTO access_user_roles (user_id, role, granted_by)
     VALUES ($1, 'superadmin', $1)`,
    [userId],
  );
  await client.query(
    `INSERT INTO access_audit_log (actor_user_id, subject_user_id, operation, result, details)
     VALUES ($1, $1, 'access.provisioned', 'success', '{"accessRole":"superadmin","source":"initial-provisioning"}'::jsonb)`,
    [userId],
  );
  await client.query("COMMIT");
  console.log("Superadministrador inicial provisionado. Configure o MFA ao entrar.");
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally {
  client.release();
  await pool.end();
}
