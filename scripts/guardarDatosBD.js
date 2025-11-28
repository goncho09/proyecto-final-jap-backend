const pool = require('../config/db.js');
const path = require('path');
const fs = require('fs');

async function executeSetup() {
  try {
    console.log('🔄 Dropeando y recreando la base...');

    const sql = fs.readFileSync(path.join(__dirname, 'tables.sql'), 'utf8');

    const statements = sql
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const stmt of statements) {
      await pool.query(stmt);
    }
    console.log('✅ Base creada con éxito');
  } catch (err) {
    console.error('❌ Error en setup:', err);
  } finally {
    await pool.end();
  }
}

executeSetup();
