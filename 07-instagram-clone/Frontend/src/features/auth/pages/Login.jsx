import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../auth.css'

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // UI-only for now; no API calls or backend integration
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
                value={formData.identifier}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
            </div>

            <button type="submit" className="auth-button">
              Log In
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