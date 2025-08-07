require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();

// Middlewares
app.use(cors({ origin: process.env.VITE_URL_API }));
app.use(express.json());
app.use(fileUpload());
app.use(express.static('uploads'));

// Rutas
app.use('/api/auth', require('./src/router/auth.routes'));

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});