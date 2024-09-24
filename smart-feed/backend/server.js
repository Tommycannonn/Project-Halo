const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Temporary in-memory storage for posts
let posts = [];

// Routes
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.post('/api/posts', (req, res) => {
  const post = {
    id: Date.now(),
    content: req.body.content,
    author: req.body.author,
    categories: req.body.categories,
    aiScore: Math.floor(Math.random() * 100) // Placeholder for AI scoring
  };
  posts.push(post);
  res.status(201).json(post);
});

// New route for editing a post
app.put('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(post => post.id === id);
  if (index !== -1) {
    posts[index] = { ...posts[index], ...req.body, id };
    res.json(posts[index]);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// New route for deleting a post
app.delete('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(post => post.id === id);
  if (index !== -1) {
    const deletedPost = posts.splice(index, 1)[0];
    res.json(deletedPost);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port: ${port}`);
});