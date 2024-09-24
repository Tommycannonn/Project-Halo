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

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port: ${port}`);
});