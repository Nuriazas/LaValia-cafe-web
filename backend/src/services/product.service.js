const db = require('../db/config');

const getAll = async () => {
  const [rows] = await db.query('SELECT * FROM products ORDER BY created_at DESC');
  return rows;
};

const getById = async (id) => {
  const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0];
};

const create = async ({ name, description, price, image, stock }) => {
  const [result] = await db.query(
    'INSERT INTO products (name, description, price, image, stock) VALUES (?, ?, ?, ?, ?)',
    [name, description, price, image, stock]
  );
  return result;
};

const update = async (id, { name, description, price, image, stock }) => {
  await db.query(
    'UPDATE products SET name = ?, description = ?, price = ?, image = ?, stock = ? WHERE id = ?',
    [name, description, price, image, stock, id]
  );
};

const remove = async (id) => {
  await db.query('DELETE FROM products WHERE id = ?', [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};