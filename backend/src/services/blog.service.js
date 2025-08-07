const db = require('../db/config');

const getAllPosts = async () => {
  const [rows] = await db.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
  return rows;
};

const getPostById = async (id) => {
  const [rows] = await db.query('SELECT * FROM blog_posts WHERE id = ?', [id]);
  return rows[0];
};

const createPost = async ({ title, content, image, author }) => {
  const [result] = await db.query(
    'INSERT INTO blog_posts (title, content, image, author) VALUES (?, ?, ?, ?)',
    [title, content, image, author]
  );
  return result;
};

const updatePost = async (id, { title, content, image, author }) => {
  await db.query(
    'UPDATE blog_posts SET title = ?, content = ?, image = ?, author = ? WHERE id = ?',
    [title, content, image, author, id]
  );
};

const deletePost = async (id) => {
  await db.query('DELETE FROM blog_posts WHERE id = ?', [id]);
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};
