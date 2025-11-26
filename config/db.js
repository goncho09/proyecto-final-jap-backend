import mysql from 'mysql2/promise';
import 'dotenv/config';

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  port: Number(DB_PORT),
});

pool
  .getConnection()
  .then((conn) => {
    console.log('Conectado a MariaDB!');
    conn.release();
  })
  .catch((err) => console.error('Error:', err));

export default pool;
