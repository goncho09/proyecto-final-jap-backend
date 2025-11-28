const conn = require('./dbModel');

function calculateTotal(cart, shipping) {
    let total = 0;
    for (let item of cart) {
        const price = parseFloat(item.price.split(' ')[1]);
        total += price * item.cantidad;
    }

    total += shipping.cost;

    return total;
}

async function saveCart(userId, cart, shipping) {
    const total = calculateTotal(cart, shipping);
    const hoy = new Date().toISOString().split('T')[0];
    const [result] = await conn.query(
        'INSERT INTO ventas (usuario,total,fecha) VALUES (?,?,?)',
        [userId, total, hoy]
    );

    return result.insertId;
}

async function saveCartDetails(cart, ventaID) {

    await conn.query(
        'INSERT INTO venta_detalle (ventaID, productoID, cantidad, precioUnitario,subtotal) VALUES ?',
        [
            cart.map((item) => [
                ventaID,
                item.id,
                item.cantidad,
                parseFloat(item.price.split(' ')[1]),
                parseFloat(item.price.split(' ')[1]) * item.cantidad,
            ]),
        ]
    );
}

module.exports = { saveCart, saveCartDetails };