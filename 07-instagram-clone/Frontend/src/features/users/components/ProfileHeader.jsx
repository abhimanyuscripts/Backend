import React from 'react'

const ProfileHeader = ({ user, postCount }) => {
  if (!user) return null

  const defaultAvatar = "https://ik.imagekit.io/dwe8ayord/blank-profile-picture-973460_960_720.png"

  return (
    <div className="profile-header">
      <div className="profile-avatar-container">
        <img
          src={user.profileImage || defaultAvatar}
          alt={user.username}
          className="profile-avatar-large"
        />
      </div>

      <div className="profile-details">
        <div className="profile-top-row">
          <h2 className="profile-username">@{user.username}</h2>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-number">{postCount}</span> posts
          </div>
          <div className="stat-item">
            <span className="stat-number">{user.email}</span>
          </div>
        </div>

        {user.bio && <p className="profile-bio">{user.bio}</p>}
      </div>
    </div>
  )
}

export default ProfileHeader
