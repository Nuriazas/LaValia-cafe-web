const db = require('../db/config');

const addSubscriber = async (email) => {
  const [result] = await db.query(
    'INSERT INTO newsletter_subscribers (email) VALUES (?)',
    [email]
  );
  return result;
};

const getSubscribers = async () => {
  const [rows] = await db.query('SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC');
  return rows;
};

module.exports = { addSubscriber, getSubscribers };
