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


async function queryResponse(sqlString, params = []) {
    let conn = null;
    try {
        conn = await pool.getConnection();

        return await conn.query(sqlString, params);
    } catch (error) {
        console.error(error)
    } finally {
        conn.release();
    }
}

module.exports = { pool, queryResponse };
