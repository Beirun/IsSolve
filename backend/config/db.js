import pg from "pg";
const Pool = pg.Pool;

const pool = new Pool({
    user: "postgres",
    password: "root",
    host: "localhost",
    database: "issolve",
    port: 5432,
});

export default pool;