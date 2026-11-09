import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  password: "01",
  port: 5432,
  database: "tododb",
});

export default pool;
