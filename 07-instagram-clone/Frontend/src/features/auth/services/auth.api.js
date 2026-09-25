import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

export const loginUser = async (credentials) => {
  const response = await api.post('/api/auth/login', credentials)
  return response.data
}

export const registerUser = async (userData) => {
  const response = await api.post('/api/auth/register', userData)
  return response.data
}

export const getMe = async () => {
  const response = await api.get('/api/users/get-me')
  return response.data
}
