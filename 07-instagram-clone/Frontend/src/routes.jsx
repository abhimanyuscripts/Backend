import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import ProtectedRoute from './layouts/ProtectedRoute'
import RootLayout from './layouts/RootLayout'

import ProfilePage from './features/users/pages/ProfilePage'
import FeedPage from './features/posts/pages/FeedPage'
import CreatePostPage from './features/posts/pages/CreatePostPage'

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
            element: <FeedPage />,
          },
          {
            path: '/create',
            element: <CreatePostPage />,
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