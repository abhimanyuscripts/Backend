import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../auth.css'

const Login = () => {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    axios.post(
      'http://localhost:3000/api/auth/login',
      {
        username: identifier,
        email: identifier,
        password: password,
      },
      { withCredentials: true }
    )
      .then((res) => {
        console.log('Login successful:', res.data)
      })
      .catch((err) => {
        console.error('Login error:', err.response?.data?.message || err.message)
      })
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