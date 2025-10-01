import { Pool } from "pg";

const pool = new Pool({
  connectionString: import.meta.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, 
});

export const db = pool;
