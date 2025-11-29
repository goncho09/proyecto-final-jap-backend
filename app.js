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

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: "Token de acceso requerido"
    });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        success: false,
        message: "Token inválido o expirado"
      });
    }
    req.user = user;
    next();
  });
}

app.post("/login", (req, res) => {
  const { user, password } = req.body; // ← USA "user" COMO TU FRONTEND
  
  // Usuarios compatibles con tu sistema actual
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

app.get("/api/auth/check-session", authenticateToken, (req, res) => {
  res.json({
    success: true,
    authenticated: true,
    user: req.user
  });
});

app.use('/api/categories', catRoute);
app.use('/api/products', productRoute);
app.use('/api/publish', authenticateToken, publishRoute);
app.use('/api/cart', authenticateToken, cartRoute);

app.listen(PORT, console.log(`server running on http://localhost:${PORT}`));
