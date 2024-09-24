const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Create a Post schema and model
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  aiScore: Number,
});

const Post = mongoose.model('Post', postSchema);

// AI scoring function (placeholder)
function calculateAIScore(post) {
  // This is a placeholder. In a real application, you'd implement actual AI scoring logic here.
  return Math.floor(Math.random() * 100);
}

// CRUD operations
app.post('/posts', async (req, res) => {
  try {
    const { title, content } = req.body;
    const aiScore = calculateAIScore({ title, content });
    const post = new Post({ title, content, aiScore });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/posts/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const aiScore = calculateAIScore({ title, content });
    const post = await Post.findByIdAndUpdate(req.params.id, { title, content, aiScore }, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});