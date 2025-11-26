const pool = require('../config/db.js');
const path = require('path');
const fs = require('fs');

const { importarCategorias } = require('./importCategories.js');
const { importarProductos } = require('./importProducts.js');

const productsPath = path.join(__dirname, '../json/products');
const categoriesPath = path.join(__dirname, '../json/cats/cat.json');

async function executeSetup() {
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'tables.sql'), 'utf8');
    console.log('🔄 Dropeando y recreando la base...');
    const statements = sql
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const stmt of statements) {
      await pool.query(stmt);
    }

    console.log('📁 Importando categorías...');
    await importarCategorias(pool, categoriesPath);

    console.log('📦 Importando productos...');
    await importarProductos(pool, productsPath);

    console.log('✅ Base recreada e importada con éxito');
  } catch (err) {
    console.error('❌ Error en setup:', err);
  } finally {
    await pool.end();
  }
}

executeSetup();
