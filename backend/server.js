require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();

app.use(cors({ origin: process.env.VITE_URL_API }));
app.use(express.json());
app.use(fileUpload());
app.use(express.static('uploads'));

app.use('/api/auth', require('./src/router/auth.routes'));
app.use('/api/products', require('./src/router/products.routes'));
app.use('/api/orders', require('./src/router/order.routes'));
app.use('/api/contact', require('./src/router/contact.routes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
