import "dotenv/config";
import { readFile } from "node:fs/promises";
import pg from "pg";

const { Pool } = pg;
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("Defina DATABASE_URL antes de executar a migration.");

const pool = new Pool({ connectionString: databaseUrl });
try {
  for (const file of ["001_auth.sql", "002_administrative_role.sql", "003_operational_data.sql"]) {
    const migration = await readFile(new URL(`../database/${file}`, import.meta.url), "utf8");
    await pool.query(migration);
  }
  console.log("Migrations do banco de dados aplicadas.");
} finally {
  await pool.end();
}
