import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://0.0.0.0:8080/api/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div className="App">
      <h1>Smart Feed</h1>
      <div className="post-list">
        {posts.map(post => (
          <div key={post._id} className="post">
            <p>{post.content}</p>
            <p>Author: {post.author}</p>
            <p>Categories: {post.categories.join(', ')}</p>
            <p>AI Score: {post.aiScore}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;