const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Connect to MongoDB (you'll need to set up your MONGODB_URI in a .env file)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Import routes
const postsRoutes = require('./routes/posts');

// Use routes
app.use('/api/posts', postsRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port: ${port}`);
});