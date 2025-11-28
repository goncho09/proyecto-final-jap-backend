const data = require('../models/readDataJson');

function getAllCategory(_, res) {
    try {
        // api/categories return: all categories
        const categories = data.readDataFromJson('cats', 'cat');
        res.status(200).json(categories);
    } catch {
        res.status(400).json({ msg: "Ocurrio un error inesperado." })
    }
}

function getCategoryById(req, res) {
    const { id } = req.params;
    try {
        // /api/categories/101 return: all products by category
        const products = data.readDataFromJson('cats_products', id);

        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ error: 'Categoria no encontrada' });
    }
}

module.exports = {
    getAllCategory,
    getCategoryById
}