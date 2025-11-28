const { createPool } = require('mysql2/promise');

const pool = createPool({
  host: 'localhost',
  user: 'japuser',
  password: '1234',
  database: 'proyecto-final-jap',
  port: 3306,
  multipleStatements: true,
});

pool
  .getConnection()
  .then((conn) => {
    console.log('Conectado a MariaDB!');
    conn.release();
  })
  .catch((err) => console.error('Error:', err));

module.exports = pool;
