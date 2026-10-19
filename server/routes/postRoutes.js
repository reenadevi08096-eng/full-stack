const express = require('express');
const router = express.Router();
const {
  getPosts,
  createPost,
  deletePost,
  getTopPosts
} = require('../controllers/postController');

// Top 3 Aggregation route
router.get('/top', getTopPosts);

// Standard CRUD routes
router.route('/')
  .get(getPosts)
  .post(createPost);

router.route('/:id')
  .delete(deletePost);

module.exports = router;