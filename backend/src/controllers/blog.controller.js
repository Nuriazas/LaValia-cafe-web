const blogService = require('../services/blog.service');
const path = require('path');
const fs = require('fs');

const getAllPosts = async (req, res) => {
  const posts = await blogService.getAllPosts();
  res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const post = await blogService.getPostById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post no encontrado' });
  res.status(200).json(post);
};

const createPost = async (req, res) => {
  const { title, content, author } = req.body;
  let image = null;

  if (req.files?.image) {
    const imgFile = req.files.image;
    const fileName = `${Date.now()}_${imgFile.name}`;
    const uploadPath = path.join(__dirname, '../../uploads', fileName);
    await imgFile.mv(uploadPath);
    image = fileName;
  }

  const result = await blogService.createPost({ title, content, image, author });
  res.status(201).json({ message: 'Post creado', postId: result.insertId });
};

const updatePost = async (req, res) => {
  const { title, content, author } = req.body;
  const post = await blogService.getPostById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post no encontrado' });

  let image = post.image;

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

  await blogService.updatePost(req.params.id, { title, content, image, author });
  res.status(200).json({ message: 'Post actualizado' });
};

const deletePost = async (req, res) => {
  const post = await blogService.getPostById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post no encontrado' });

  if (post.image) {
    const imgPath = path.join(__dirname, '../../uploads', post.image);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }

  await blogService.deletePost(req.params.id);
  res.status(200).json({ message: 'Post eliminado' });
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};
