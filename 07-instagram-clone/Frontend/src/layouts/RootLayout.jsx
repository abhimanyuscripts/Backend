import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/auth.context'
import './layout.css'

const RootLayout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div>
          <div className="sidebar-header">
            <span className="sidebar-logo">Instagram</span>
          </div>

          <nav className="sidebar-nav">
            <NavLink
              to="/"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              end
            >
              <span className="nav-icon">🏠</span>
              <span className="nav-label">Home</span>
            </NavLink>

            <NavLink
              to="/create"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">➕</span>
              <span className="nav-label">Create</span>
            </NavLink>

            <NavLink
              to="/requests"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">👥</span>
              <span className="nav-label">Requests</span>
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">👤</span>
              <span className="nav-label">Profile</span>
            </NavLink>
          </nav>
        </div>

        <div className="sidebar-footer">
          {user && (
            <div className="user-badge">
              <img
                src={user.profileImage || "https://ik.imagekit.io/dwe8ayord/blank-profile-picture-973460_960_720.png"}
                alt={user.username}
                className="user-avatar"
              />
              <div className="user-info">
                <span className="user-name">@{user.username}</span>
                <span className="user-email">{user.email}</span>
              </div>
            </div>
          )}

          <button onClick={handleLogout} className="nav-item logout-button">
            <span className="nav-icon">🚪</span>
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <div className="content-container">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default RootLayout
