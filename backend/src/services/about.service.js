const db = require('../db/config');

const getContent = async () => {
  const [rows] = await db.query('SELECT * FROM about_us ORDER BY updated_at DESC LIMIT 1');
  return rows[0];
};

const updateContent = async (content) => {

  const existing = await getContent();
  if (existing) {
    await db.query('UPDATE about_us SET content = ? WHERE id = ?', [content, existing.id]);
    return { updated: true };
  } else {
    const [result] = await db.query('INSERT INTO about_us (content) VALUES (?)', [content]);
    return { insertedId: result.insertId };
  }
};

module.exports = {
  getContent,
  updateContent
};
