import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../auth.css'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    bio: '',
    profileImage: '',
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
    axios.post('/api/auth/register', formData, {
      withCredentials: true,
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
  }

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-brand">Instagram</h1>
            <p className="auth-subtitle">Sign up to see photos and videos from your friends.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username <span style={{ color: 'var(--error-text)' }}>*</span>
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className="form-input"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address <span style={{ color: 'var(--error-text)' }}>*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password <span style={{ color: 'var(--error-text)' }}>*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-input"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio" className="form-label">
                Bio (Optional)
              </label>
              <textarea
                id="bio"
                name="bio"
                className="form-input form-textarea"
                placeholder="Tell us a little about yourself"
                value={formData.bio}
                onChange={handleChange}
                rows="2"
              />
            </div>

            <div className="form-group">
              <label htmlFor="profileImage" className="form-label">
                Profile Image URL (Optional)
              </label>
              <input
                id="profileImage"
                name="profileImage"
                type="url"
                className="form-input"
                placeholder="https://example.com/avatar.jpg"
                value={formData.profileImage}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="auth-button">
              Register
            </button>
          </form>
        </div>

        <div className="auth-card-footer">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register