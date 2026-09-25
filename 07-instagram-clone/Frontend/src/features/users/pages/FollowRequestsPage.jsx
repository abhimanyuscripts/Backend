import React, { useState, useEffect } from 'react'
import { getFollowRequests, sendFollowRequest } from '../services/follow.api'
import FollowRequestItem from '../components/FollowRequestItem'
import '../follow.css'

const FollowRequestsPage = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchUsername, setSearchUsername] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', message: '' })

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const data = await getFollowRequests()
      setRequests(data.requests || [])
    } catch (err) {
      console.error('Failed to fetch requests:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const handleSendFollow = async (e) => {
    e.preventDefault()
    setFeedback({ type: '', message: '' })

    const targetUser = searchUsername.trim()
    if (!targetUser) return

    setSearchLoading(true)
    try {
      const data = await sendFollowRequest(targetUser)
      setFeedback({ type: 'success', message: data.message || `Follow request sent to @${targetUser}` })
      setSearchUsername('')
    } catch (err) {
      setFeedback({ type: 'error', message: err.response?.data?.message || 'Failed to send follow request.' })
    } finally {
      setSearchLoading(false)
    }
  }

  const handleProcessed = (requestId) => {
    setRequests((prev) => prev.filter((r) => r._id !== requestId))
  }

  return (
    <div className="requests-container">
      {/* Search & Follow Section */}
      <div className="requests-card">
        <h2 className="requests-title">
          <span>🔍</span> Find & Follow Friends
        </h2>

        {feedback.message && (
          <div
            className={`auth-feedback ${feedback.type}`}
            style={{ marginBottom: '14px' }}
          >
            {feedback.message}
          </div>
        )}

        <form onSubmit={handleSendFollow} className="follow-search-form">
          <input
            type="text"
            className="follow-search-input"
            placeholder="Enter username to follow..."
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
          />
          <button
            type="submit"
            className="follow-search-btn"
            disabled={searchLoading || !searchUsername.trim()}
          >
            {searchLoading ? 'Sending...' : 'Follow'}
          </button>
        </form>
      </div>

      {/* Incoming Follow Requests Section */}
      <div className="requests-card">
        <h2 className="requests-title">
          <span>👥</span> Follow Requests ({requests.length})
        </h2>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
            <div className="spinner" style={{ width: '28px', height: '28px' }}></div>
          </div>
        ) : requests.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-secondary)' }}>
            <p>No pending follow requests right now.</p>
          </div>
        ) : (
          <div className="requests-list">
            {requests.map((request) => (
              <FollowRequestItem
                key={request._id}
                request={request}
                onProcessed={handleProcessed}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FollowRequestsPage
