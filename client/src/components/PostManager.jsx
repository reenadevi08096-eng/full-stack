import React, { useState, useEffect } from 'react';

export default function PostManager() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');

  const fetchPosts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!title || !content || !authorId) return alert('Sabhi fields bharein!');

    try {
      const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, authorId })
      });
      if (res.ok) {
        setTitle('');
        setContent('');
        setAuthorId('');
        fetchPosts();
      }
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/posts/${id}`, { method: 'DELETE' });
      fetchPosts();
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  return (
    <div style={{ padding: '20px', borderTop: '2px solid #555', marginTop: '20px' }}>
      <h2>MongoDB Posts Management</h2>
      <form onSubmit={handleCreatePost} style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          style={{ padding: '8px', flex: '1' }}
        />
        <input 
          placeholder="Content" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          style={{ padding: '8px', flex: '2' }}
        />
        <input 
          placeholder="Author ObjectId" 
          value={authorId} 
          onChange={(e) => setAuthorId(e.target.value)} 
          style={{ padding: '8px', flex: '1' }}
        />
        <button type="submit" style={{ padding: '8px 16px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Create Post
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {posts.map((post) => (
          <div key={post._id} style={{ padding: '10px', border: '1px solid #666', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: '0' }}>{post.title}</h4>
              <p style={{ margin: '4px 0' }}>{post.content}</p>
              <small>Author: {post.authorId?.name || post.authorId}</small>
            </div>
            <button onClick={() => handleDeletePost(post._id)} style={{ padding: '5px 10px', background: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}