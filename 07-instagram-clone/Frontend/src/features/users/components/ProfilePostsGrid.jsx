import React from 'react'

const ProfilePostsGrid = ({ posts, loading }) => {
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
        <div className="spinner" style={{ width: '28px', height: '28px' }}></div>
      </div>
    )
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="empty-posts-container">
        <span className="empty-icon">📷</span>
        <h3>No Posts Yet</h3>
        <p>When you share photos, they will appear on your profile.</p>
      </div>
    )
  }

  return (
    <div className="posts-grid">
      {posts.map((post) => (
        <div key={post._id} className="grid-post-item">
          <img
            src={post.imgUrl}
            alt={post.caption || 'Post image'}
            className="grid-post-image"
            loading="lazy"
          />
          {post.caption && (
            <div className="grid-post-overlay">
              <span>{post.caption}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ProfilePostsGrid
