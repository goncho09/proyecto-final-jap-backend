import pool from '../config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { importarCategorias } from './importCategories.js';
import { importarProductos } from './importProducts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const productsPath = path.join(__dirname, '../json/products');
const categoriesPath = path.join(__dirname, '../json/cats/cat.json');

try {
  await pool.execute('SET FOREIGN_KEY_CHECKS = 0');
  await pool.execute('TRUNCATE TABLE productos_relacionados');
  await pool.execute('TRUNCATE TABLE productos_imagenes');
  await pool.execute('TRUNCATE TABLE productos');
  await pool.execute('TRUNCATE TABLE categorias');
  await pool.execute('SET FOREIGN_KEY_CHECKS = 1');

  await importarCategorias(pool, categoriesPath);
  await importarProductos(pool, productsPath);
  await pool.end();
} catch (error) {
  console.error(error);
}
