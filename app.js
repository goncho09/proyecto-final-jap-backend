const express = require('express');
const cors = require('cors');

const catRoute = require('./routers/categoryRoute');
const productRoute = require('./routers/productRoute');
const publishRoute = require('./routers/publishRoute');
const cartRoute = require('./routers/cartRoute');
const loginRoute = require('./routers/loginRoute');
const checkSesionRoute = require('./routers/checkSesionRoute');

const middleware = require('./middlewares/checkSesion')

const app = express();
const PORT = 3004;

app.use(cors());
app.use(express.json());

app.use('/login', loginRoute);
app.use('/api/categories', catRoute);
app.use('/api/products', productRoute);
app.use('/api/publish', middleware.authenticateToken, publishRoute);
app.use('/api/cart', middleware.authenticateToken, cartRoute);
app.use('/api/auth/check-session', middleware.authenticateToken,checkSesionRoute);

app.listen(PORT, console.log(`server running on http://localhost:${PORT}`));
