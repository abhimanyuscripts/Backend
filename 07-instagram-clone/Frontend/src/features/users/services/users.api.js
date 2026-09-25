import { api } from '../../auth/services/auth.api'

export const getProfile = async () => {
  const response = await api.get('/api/users/get-me')
  return response.data
}

export const getMyPosts = async () => {
  const response = await api.get('/api/posts')
  return response.data
}
