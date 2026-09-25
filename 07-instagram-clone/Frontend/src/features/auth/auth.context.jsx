import React, { createContext, useContext, useState, useEffect } from 'react'
import { loginUser, registerUser, getMe } from './services/auth.api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const data = await getMe()
        if (data && data.user) {
          setUser(data.user)
        }
      } catch (err) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrentUser()
  }, [])

  const login = async (credentials) => {
    const data = await loginUser(credentials)
    if (data && data.user) {
      setUser(data.user)
    }
    return data
  }

  const register = async (userData) => {
    const data = await registerUser(userData)
    if (data && data.user) {
      setUser(data.user)
    }
    return data
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
