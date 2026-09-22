import "dotenv/config";
import { randomBytes, scryptSync } from "node:crypto";
import pg from "pg";

const { Pool } = pg;
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("Defina DATABASE_URL antes de executar o seed.");

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}

const pool = new Pool({ connectionString: databaseUrl });
const users = [
  ["Equipe Sentinel", "empresa@sentinel-demo.com", "Sentinel2026!", "corporate"],
  ["Visitante", "cliente@sentinel-demo.com", "SentinelClient2026!", "customer"],
];

try {
  for (const [name, email, password, role] of users) {
    await pool.query(
      `INSERT INTO auth_users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, password_hash = EXCLUDED.password_hash, role = EXCLUDED.role`,
      [name, email, hashPassword(password), role],
    );
  }
  console.log("Usuários demo criados/atualizados.");
} finally {
  await pool.end();
}