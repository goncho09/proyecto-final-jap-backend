const conn = require('../models/dbModel');
const path = require('path');
const fs = require('fs');

async function executeSetup() {
  try {
    console.log('🔄 Creando tablas...');

    const sql = fs.readFileSync(path.join(__dirname, 'tables.sql'), 'utf8');

    const statements = sql
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const stmt of statements) {
      await conn.query(stmt);
    }
    console.log('✅ Las tablas han sido creadas con éxito');
  } catch (err) {
    console.error('❌ Error:', err);
  }finally {
    conn.end();
  }
}

executeSetup();
