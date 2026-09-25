import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../services/posts.api'
import '../posts.css'

const CreatePostPage = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setError('')
    }
  }

  const handleRemoveImage = () => {
    setSelectedFile(null)
    setPreviewUrl('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!selectedFile) {
      setError('Please select an image for your post.')
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('imgUrl', selectedFile)
      formData.append('caption', caption.trim())

      await createPost(formData)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-post-card">
      <h2 className="create-post-title">Create New Post</h2>

      {error && <div className="auth-feedback error" style={{ marginBottom: '16px' }}>{error}</div>}

      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        {previewUrl ? (
          <div className="preview-wrapper">
            <img src={previewUrl} alt="Preview" className="preview-image" />
            <button
              type="button"
              className="remove-preview-btn"
              onClick={handleRemoveImage}
              title="Remove image"
            >
              ✕
            </button>
          </div>
        ) : (
          <div
            className="file-dropzone"
            onClick={() => fileInputRef.current?.click()}
          >
            <span className="dropzone-icon">🖼️</span>
            <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Click to select a photo</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>JPG, PNG, GIF, WEBP</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
        )}

        <div className="form-group" style={{ marginTop: '16px' }}>
          <label htmlFor="caption" className="form-label">
            Write a Caption
          </label>
          <textarea
            id="caption"
            className="form-input form-textarea"
            placeholder="Share what's on your mind..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows="3"
          />
        </div>

        <button type="submit" className="auth-button" disabled={loading || !selectedFile}>
          {loading ? (
            <>
              <span className="spinner" aria-hidden="true"></span>
              <span>Uploading & Sharing...</span>
            </>
          ) : (
            'Share Post'
          )}
        </button>
      </form>
    </div>
  )
}

export default CreatePostPage
