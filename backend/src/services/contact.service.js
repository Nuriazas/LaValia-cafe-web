const db = require('../db/config');

const createMessage = async ({ name, email, subject, message }) => {
  const [result] = await db.query(
    'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
    [name, email, subject, message]
  );
  return result;
};

const getAllMessages = async () => {
  const [rows] = await db.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
  return rows;
};

module.exports = { createMessage, getAllMessages };