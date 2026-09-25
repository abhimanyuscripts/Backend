import { api } from '../../auth/services/auth.api'

export const getFeedPosts = async () => {
  const response = await api.get('/api/posts')
  return response.data
}

export const getPostDetails = async (postId) => {
  const response = await api.get(`/api/posts/details/${postId}`)
  return response.data
}

export const createPost = async (formData) => {
  const response = await api.post('/api/posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const likePost = async (postId) => {
  const response = await api.post(`/api/posts/like/${postId}`)
  return response.data
}
