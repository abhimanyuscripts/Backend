import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth.context.jsx'
import '../auth.css'

const Login = () => {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const trimmedIdentifier = identifier.trim()
    const trimmedPassword = password.trim()

    if (!trimmedIdentifier || !trimmedPassword) {
      setError('Please fill in both fields.')
      return
    }

    setLoading(true)

    try {
      const data = await login({
        username: trimmedIdentifier,
        email: trimmedIdentifier,
        password: trimmedPassword,
      })

      setSuccess(data.message || 'Logged in successfully!')
      navigate('/')
    } catch (err) {
      const serverMessage = err.response?.data?.message || err.message || 'Login failed.'
      setError(serverMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-brand">Instagram</h1>
            <p className="auth-subtitle">Sign in to connect with friends and the world.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            {error && <div className="auth-feedback error">{error}</div>}
            {success && <div className="auth-feedback success">{success}</div>}

            <div className="form-group">
              <label htmlFor="identifier" className="form-label">
                Username or Email
              </label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                className="form-input"
                placeholder="Enter username or email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner" aria-hidden="true"></span>
                  <span>Logging in...</span>
                </>
              ) : (
                'Log In'
              )}
            </button>
          </form>
        </div>

        <div className="auth-card-footer">
          Don't have an account?{' '}
          <Link to="/register" className="auth-link">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login