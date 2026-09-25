import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import ProtectedRoute from './layouts/ProtectedRoute'
import RootLayout from './layouts/RootLayout'

import ProfilePage from './features/users/pages/ProfilePage'

export const routes = createBrowserRouter([
  // Public Authentication Routes
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },

  // Protected App Shell Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            path: '/',
            element: (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <h2 style={{ marginBottom: '8px' }}>Home Feed</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Welcome to your feed!</p>
              </div>
            ),
          },
          {
            path: '/create',
            element: (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <h2 style={{ marginBottom: '8px' }}>Create Post</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Post creation area</p>
              </div>
            ),
          },
          {
            path: '/requests',
            element: (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <h2 style={{ marginBottom: '8px' }}>Follow Requests</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Manage your incoming follow requests</p>
              </div>
            ),
          },
          {
            path: '/profile',
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },

  // Catch-all Redirect
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])