const db = require('../db/config');

// Obtener usuario por email
const getUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

// Obtener usuario por ID
const getUserById = async (id) => {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

// Crear nuevo usuario
const createUser = async ({ name, email, password }) => {
  const [result] = await db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password]
  );
  return result;
};

module.exports = {
  getUserByEmail,
  getUserById,
  createUser
};