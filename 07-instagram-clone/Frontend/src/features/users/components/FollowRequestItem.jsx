import React, { useState } from 'react'
import { acceptFollowRequest, rejectFollowRequest } from '../services/follow.api'

const FollowRequestItem = ({ request, onProcessed }) => {
  const [loading, setLoading] = useState(false)
  const defaultAvatar = "https://ik.imagekit.io/dwe8ayord/blank-profile-picture-973460_960_720.png"

  const handleAccept = async () => {
    setLoading(true)
    try {
      await acceptFollowRequest(request._id)
      onProcessed(request._id, 'accepted')
    } catch (err) {
      console.error('Failed to accept follow request:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleReject = async () => {
    setLoading(true)
    try {
      await rejectFollowRequest(request._id)
      onProcessed(request._id, 'rejected')
    } catch (err) {
      console.error('Failed to reject follow request:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="request-item">
      <div className="request-user-info">
        <img
          src={defaultAvatar}
          alt={request.follower}
          className="request-avatar"
        />
        <div>
          <span className="request-username">@{request.follower}</span>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>requested to follow you</p>
        </div>
      </div>

      <div className="request-actions">
        <button
          onClick={handleAccept}
          className="btn-accept"
          disabled={loading}
        >
          Accept
        </button>
        <button
          onClick={handleReject}
          className="btn-reject"
          disabled={loading}
        >
          Reject
        </button>
      </div>
    </div>
  )
}

export default FollowRequestItem
