const data = require('../models/readDataJson');

async function getProductById(req, res) {
  const { id } = req.params;
  try {
    // /api/products/50743 return: producto por ID
    const product = data.readDataFromJson('products', id)

    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
}

function getAllComments(req, res) {
  const { id } = req.params;
  try {
    // /api/products/comments/50743 return: comentarios por ID
    const comments = data.readDataFromJson('products_comments', id);

    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ error: 'Commentarios no encontrados' });
  }
}

module.exports = {
  getProductById,
  getAllComments,
};
