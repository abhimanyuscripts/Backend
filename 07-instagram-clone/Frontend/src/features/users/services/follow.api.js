import { api } from '../../auth/services/auth.api'

export const sendFollowRequest = async (username) => {
  const response = await api.post(`/api/follower/follow/${username}`)
  return response.data
}

export const unfollowUser = async (username) => {
  const response = await api.post(`/api/follower/unfollow/${username}`)
  return response.data
}

export const getFollowRequests = async () => {
  const response = await api.get('/api/follower/follow-requests')
  return response.data
}

export const acceptFollowRequest = async (requestId) => {
  const response = await api.patch(`/api/follower/follow-request/accept/${requestId}`)
  return response.data
}

export const rejectFollowRequest = async (requestId) => {
  const response = await api.patch(`/api/follower/follow-request/reject/${requestId}`)
  return response.data
}
