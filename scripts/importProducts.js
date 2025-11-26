const fs = require('fs');
const path = require('path');

async function importarProductos(pool, folderPath) {
  const files = fs.readdirSync(folderPath);

  const productos = [];
  const imagenesPendientes = [];
  const relacionadosPendientes = [];

  // ================================
  // 1) PRIMER PASO: LEER ARCHIVOS Y GUARDAR DATA
  // ================================
  for (const file of files) {
    if (!file.endsWith('.json')) continue;

    const filePath = path.join(folderPath, file);
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    productos.push(jsonData);

    if (Array.isArray(jsonData.images)) {
      imagenesPendientes.push({
        productoID: jsonData.id,
        imagenes: jsonData.images,
      });
    }

    if (Array.isArray(jsonData.relatedProducts)) {
      relacionadosPendientes.push({
        productoID: jsonData.id,
        relaciones: jsonData.relatedProducts,
      });
    }
  }

  // ================================
  // 2) INSERTAR SOLO PRODUCTOS
  // ================================
  console.log('Insertando productos...');

  for (const p of productos) {
    const { id, name, description, cost, currency, category } = p;

    console.log('Insertando producto:', id, name);

    const [rows] = await pool.execute(
      'SELECT id FROM categorias WHERE nombre = ? LIMIT 1',
      [category]
    );

    if (rows.length === 0) {
      console.warn(`⚠️ Categoría no encontrada: ${category}`);
      continue;
    }

    const categoriaID = rows[0].id;

    await pool.execute(
      `INSERT INTO productos (ID, nombre, descripcion, costo, moneda, categoriaID)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, name, description, cost, currency, categoriaID]
    );
  }

  // ================================
  // 3) INSERTAR IMÁGENES (ya existen todos los productos)
  // ================================
  console.log('Insertando imágenes...');

  for (const img of imagenesPendientes) {
    const { productoID, imagenes } = img;

    for (let i = 0; i < imagenes.length; i++) {
      await pool.execute(
        `INSERT INTO productos_imagenes (productoID, url, orden)
         VALUES (?, ?, ?)`,
        [productoID, imagenes[i], i + 1]
      );
    }
  }

  // ================================
  // 4) INSERTAR PRODUCTOS RELACIONADOS
  // ================================
  console.log('Insertando productos relacionados...');

  for (const rel of relacionadosPendientes) {
    const { productoID, relaciones } = rel;

    for (const r of relaciones) {
      await pool.execute(
        `INSERT INTO productos_relacionados (productoID, productoRelacionadoID)
         VALUES (?, ?)`,
        [productoID, r.id] // los JSON tienen "id"
      );
    }
  }

  console.clear();
  console.log('✔ Importación de productos completa.');
}

module.exports = {
  importarProductos,
};
