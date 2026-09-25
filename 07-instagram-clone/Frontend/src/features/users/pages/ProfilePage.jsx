import React, { useState, useEffect } from 'react'
import { useAuth } from '../../auth/auth.context'
import { getMyPosts } from '../services/users.api'
import ProfileHeader from '../components/ProfileHeader'
import ProfilePostsGrid from '../components/ProfilePostsGrid'
import '../users.css'

const ProfilePage = () => {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoadingPosts(true)
        const data = await getMyPosts()
        setPosts(data.posts || [])
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load posts.')
      } finally {
        setLoadingPosts(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="profile-container">
      {error && <div className="auth-feedback error" style={{ marginBottom: '16px' }}>{error}</div>}

      <ProfileHeader user={user} postCount={posts.length} />

      <div className="profile-tabs">
        <button className="profile-tab active">
          <span>📷</span> POSTS
        </button>
      </div>

      <ProfilePostsGrid posts={posts} loading={loadingPosts} />
    </div>
  )
}

export default ProfilePage
