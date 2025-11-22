const cat = require('../json/cats/cat.json');
const path = require('path');

function getAllCategory(req, res) {
    try {
        res.status(200).json(cat);
    } catch {
        res.status(400).json({ msg: "Ocurrio un error inesperado." })
    }
}

function getCategoryById(req, res) {
    const { id } = req.params; // ejemplo: /api/cat/101
    try {
        const product = require(path.join(__dirname, `../json/cats_products/${id}`));
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ error: 'Categoria no encontrada' });
    }
}

module.exports = {
    getAllCategory,
    getCategoryById
}