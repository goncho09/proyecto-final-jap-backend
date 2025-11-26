const path = require('path');
const pool = require('../config/db');

async function getProductById(req, res) {
  const { id } = req.params; // ejemplo: /api/products/product/50743
  try {
    const [rows] = await pool.query('SELECT 1 + 1');
    console.log(rows);
    const product = require(path.join(__dirname, `../json/products/${id}`));
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
}

function getAllComments(req, res) {
  const { id } = req.params; // ejemplo: /api/products/comments/50743
  try {
    const product = require(path.join(
      __dirname,
      `../json/products_comments/${id}`
    ));
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: 'Commentarios no encontrados' });
  }
}

module.exports = {
  getProductById,
  getAllComments,
};
