const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

router.get('/', blogController.getAllPosts);
router.get('/:id', blogController.getPostById);
router.post('/', verifyToken, isAdmin, blogController.createPost);
router.put('/:id', verifyToken, isAdmin, blogController.updatePost);
router.delete('/:id', verifyToken, isAdmin, blogController.deletePost);

module.exports = router;
