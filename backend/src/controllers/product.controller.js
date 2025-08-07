const productService = require('../services/product.service');
const path = require('path');
const fs = require('fs');

const getAllProducts = async (req, res) => {
  const products = await productService.getAll();
  res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const product = await productService.getById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
  res.status(200).json(product);
};

const createProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  let image = null;

  if (req.files?.image) {
    const imgFile = req.files.image;
    const fileName = `${Date.now()}_${imgFile.name}`;
    const uploadPath = path.join(__dirname, '../../uploads', fileName);
    await imgFile.mv(uploadPath);
    image = fileName;
  }

  const result = await productService.create({ name, description, price, image, stock });
  res.status(201).json({ message: 'Producto creado', productId: result.insertId });
};

const updateProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  const product = await productService.getById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

  let image = product.image;

  if (req.files?.image) {
    if (image) {
      const oldPath = path.join(__dirname, '../../uploads', image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const imgFile = req.files.image;
    const fileName = `${Date.now()}_${imgFile.name}`;
    const uploadPath = path.join(__dirname, '../../uploads', fileName);
    await imgFile.mv(uploadPath);
    image = fileName;
  }

  await productService.update(req.params.id, { name, description, price, image, stock });
  res.status(200).json({ message: 'Producto actualizado' });
};

const deleteProduct = async (req, res) => {
  const product = await productService.getById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

  if (product.image) {
    const imgPath = path.join(__dirname, '../../uploads', product.image);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }

  await productService.remove(req.params.id);
  res.status(200).json({ message: 'Producto eliminado' });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};