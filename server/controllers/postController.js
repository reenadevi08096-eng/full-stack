const Post = require('../models/Post');
const User = require('../models/User');

// @desc    Get all posts (populated with author details)
// @route   GET /api/posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('authorId', 'name email');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new post
// @route   POST /api/posts
exports.createPost = async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    const post = await Post.create({ title, content, authorId });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a post by ID
// @route   DELETE /api/posts/:id
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Top 3 Most Recent Posts (Phase 3 Aggregation)
// @route   GET /api/posts/top
exports.getTopPosts = async (req, res) => {
  try {
    const topPosts = await Post.aggregate([
      { $sort: { createdAt: -1 } },
      { $limit: 3 }
    ]);
    res.status(200).json(topPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};