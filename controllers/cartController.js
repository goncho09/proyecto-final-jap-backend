const pool = require('../config/db');

async function postCart(req, res) {
  const { userId, cart, shipping } = req.body;

  try {
    let total = 0;
    for (let item of cart) {
      const price = parseFloat(item.price.split(' ')[1]);
      total += price * item.cantidad;
    }

    total += shipping.cost;

    const hoy = new Date().toISOString().split('T')[0];
    const [result] = await pool.query(
      'INSERT INTO ventas (usuario,total,fecha) VALUES (?,?,?)',
      [userId, total, hoy]
    );
    const ventaID = result.insertId;

    await pool.query(
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

    console.log('Venta creada:', { userId, total, fecha: hoy });
    res.status(201).json({ message: 'Venta creada exitosamente' });
  } catch (error) {
    console.error('Error creating cart:', error);
    res.status(500).json({ error: 'Error al finalizar la venta' });
  }
}

module.exports = {
  postCart,
};
