const { createPool } = require('mysql2/promise');
require('dotenv/config');

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = process.env;

const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  port: Number(DB_PORT),
  //   multipleStatements: true,
});

pool
  .getConnection()
  .then((conn) => {
    console.log('Conectado a MariaDB!');
    conn.release();
  })
  .catch((err) => console.error('Error:', err));

module.exports = pool;
