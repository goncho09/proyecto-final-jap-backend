import fs from 'fs';

export async function importarCategorias(pool, filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  for (const cat of data) {
    const { id, name, description, productCount, imgSrc } = cat;

    console.log('Importando categoría:', id, name);

    await pool.execute(
      `INSERT INTO categorias (id, nombre, descripcion, imagen)
             VALUES (?, ?, ?, ?)`,
      [id, name, description, imgSrc]
    );
  }

  console.clear();
  console.log('Importación de categorías completa.');
}
