import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getFeedPosts } from '../services/posts.api'
import PostCard from '../components/PostCard'
import '../posts.css'

const FeedPage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const data = await getFeedPosts()
        setPosts(data.posts || [])
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load posts.')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
        <div className="spinner" style={{ width: '32px', height: '32px' }}></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="auth-feedback error" style={{ maxWidth: '480px', margin: '20px auto' }}>
        {error}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="empty-posts-container" style={{ paddingTop: '80px' }}>
        <span className="empty-icon">✨</span>
        <h3>Welcome to Instagram</h3>
        <p>No posts in your feed yet.</p>
        <Link to="/create" className="auth-button" style={{ marginTop: '12px', padding: '10px 24px' }}>
          Create First Post
        </Link>
      </div>
    )
  }

  return (
    <div className="feed-container">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  )
}

export default FeedPage
