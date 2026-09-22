import "dotenv/config";
import { readFile } from "node:fs/promises";
import pg from "pg";

const { Pool } = pg;
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("Defina DATABASE_URL antes de executar a migration.");

const pool = new Pool({ connectionString: databaseUrl });
try {
  const migration = await readFile(new URL("../database/001_auth.sql", import.meta.url), "utf8");
  await pool.query(migration);
  console.log("Migration de autenticação aplicada.");
} finally {
  await pool.end();
}