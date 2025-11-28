const cartModel = require('../models/cartModel');

async function postCart(req, res) {
    const { userId, cart, shipping } = req.body;

    try {
        const ventaID = await cartModel.saveCart(userId, cart, shipping);

        cartModel.saveCartDetails(cart, ventaID);

        res.status(201).json({ message: 'Venta creada exitosamente' });

    } catch (error) {
        res.status(500).json({ error: 'Error al finalizar la venta' });
    }
}

module.exports = {
    postCart,
};
