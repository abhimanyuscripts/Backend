import React, { useState } from 'react'
import { likePost } from '../services/posts.api'
import { useAuth } from '../../auth/auth.context'

const PostCard = ({ post }) => {
  const { user } = useAuth()
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  const handleLike = async () => {
    if (liked) return

    try {
      setLiked(true)
      setLikeCount((prev) => prev + 1)
      await likePost(post._id)
    } catch (err) {
      console.error('Failed to like post:', err.response?.data?.message || err.message)
    }
  }

  const defaultAvatar = "https://ik.imagekit.io/dwe8ayord/blank-profile-picture-973460_960_720.png"
  const authorName = user?.username || 'user'

  return (
    <article className="post-card">
      <header className="post-card-header">
        <img
          src={user?.profileImage || defaultAvatar}
          alt={authorName}
          className="post-author-avatar"
        />
        <span className="post-author-name">@{authorName}</span>
      </header>

      <div className="post-card-image-wrapper">
        <img
          src={post.imgUrl}
          alt={post.caption || 'Post image'}
          className="post-card-image"
          loading="lazy"
        />
      </div>

      <div className="post-card-actions">
        <button
          onClick={handleLike}
          className={`action-btn ${liked ? 'liked' : ''}`}
          title={liked ? 'Liked' : 'Like'}
        >
          {liked ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="post-card-content">
        {post.caption && (
          <p className="post-caption">
            <strong>@{authorName}</strong>
            {post.caption}
          </p>
        )}
      </div>
    </article>
  )
}

export default PostCard
