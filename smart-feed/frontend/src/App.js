import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/posts`, { title, content });
      setTitle('');
      setContent('');
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/posts/${id}`);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="App">
      <h1>Smart Feed</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Create Post</button>
      </form>
      <div className="posts">
        {posts.map((post) => (
          <div key={post._id} className="post">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>AI Score: {post.aiScore}</p>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;