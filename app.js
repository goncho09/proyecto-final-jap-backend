const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken')

const catRoute = require('./routers/categoryRoute');
const productRoute = require('./routers/productRoute');
const publishRoute = require('./routers/publishRoute');
const cartRoute = require('./routers/cartRoute');

const app = express();
const PORT = 3004;
const SECRET_KEY = 'CLAVE_SUPER_SECRETA_JAP';

app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
  const { user, password } = req.body; 
  
  const validUsers = [
    { user: "admin", password: "123456", name: "Administrador", email: "admin@emercado.com" },
    { user: "demo", password: "123456", name: "Usuario Demo", email: "demo@emercado.com" }
  ];

  const foundUser = validUsers.find(u => u.user === user && u.password === password);
  
  if (foundUser) {
    const token = jwt.sign({ 
      username: foundUser.user,
      name: foundUser.name,
      email: foundUser.email
    }, SECRET_KEY, { expiresIn: '24h' });

    res.status(200).json({ 
      success: true,
      message: "Login exitoso",
      token,
      user: {
        username: foundUser.user,
        name: foundUser.name,
        email: foundUser.email
      }
    });
  } else {
    res.status(401).json({ 
      success: false,
      message: "Usuario y/o contraseña incorrecto"
    });
  }
});

app.use('/api/categories', catRoute);
app.use('/api/products', productRoute);
app.use('/api/publish', publishRoute);
app.use('/api/cart', cartRoute);

app.listen(PORT, console.log(`server running on http://localhost:${PORT}`));
