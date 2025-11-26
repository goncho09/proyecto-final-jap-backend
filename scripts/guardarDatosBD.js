const pool = require('../config/db.js');
const path = require('path');

const { importarCategorias } = require('./importCategories.js');
const { importarProductos } = require('./importProducts.js');

const productsPath = path.join(__dirname, '../json/products');
const categoriesPath = path.join(__dirname, '../json/cats/cat.json');

async function executeScript() {
  await pool.execute('SET FOREIGN_KEY_CHECKS = 0');
  await pool.execute('TRUNCATE TABLE productos_relacionados');
  await pool.execute('TRUNCATE TABLE productos_imagenes');
  await pool.execute('TRUNCATE TABLE productos');
  await pool.execute('TRUNCATE TABLE categorias');
  await pool.execute('SET FOREIGN_KEY_CHECKS = 1');

  await importarCategorias(pool, categoriesPath);
  await importarProductos(pool, productsPath);
  await pool.end();
}

try {
  executeScript();
} catch (error) {
  console.error(error);
}
