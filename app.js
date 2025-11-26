const express = require('express');
const cors = require('cors');

const catRoute = require('./routers/categoryRoute');
const productRoute = require('./routers/productRoute');
const publishRoute = require('./routers/publishRoute');
const cartRoute = require('./routers/cartRoute');

const app = express();
const PORT = 3004;

app.use(cors());
app.use(express.json());

app.use('/api/categories', catRoute);
app.use('/api/products', productRoute);
app.use('/api/publish', publishRoute);
app.use('/api/cart', cartRoute);

app.listen(PORT, console.log(`server running on http://localhost:${PORT}`));
