const db = require('../db/config');

const createOrder = async ({ user_id, total, status = 'pendiente' }) => {
  const [result] = await db.query(
    'INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)',
    [user_id, total, status]
  );
  return result;
};

const addOrderItem = async ({ order_id, product_id, quantity, price }) => {
  const [result] = await db.query(
    'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
    [order_id, product_id, quantity, price]
  );
  return result;
};

const getOrders = async () => {
  const [rows] = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
  return rows;
};

const getOrdersByUserId = async (userId) => {
  const [rows] = await db.query('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [userId]);
  return rows;
};

const updateOrderStatus = async (orderId, status) => {
  await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
};

const getOrderItems = async (orderId) => {
  const [rows] = await db.query(
    `SELECT oi.*, p.name, p.description FROM order_items oi 
     JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?`, 
    [orderId]
  );
  return rows;
};

module.exports = {
  createOrder,
  addOrderItem,
  getOrders,
  getOrdersByUserId,
  updateOrderStatus,
  getOrderItems
};