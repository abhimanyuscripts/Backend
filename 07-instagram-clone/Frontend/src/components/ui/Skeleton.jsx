import React from 'react'

export const PostCardSkeleton = () => {
  return (
    <div className="post-card skeleton-card" aria-hidden="true">
      <div className="post-card-header">
        <div className="skeleton skeleton-avatar"></div>
        <div className="skeleton skeleton-text" style={{ width: '110px' }}></div>
      </div>
      <div className="skeleton skeleton-image"></div>
      <div className="post-card-content" style={{ padding: '16px' }}>
        <div className="skeleton skeleton-text" style={{ width: '60%', marginBottom: '6px' }}></div>
        <div className="skeleton skeleton-text" style={{ width: '40%' }}></div>
      </div>
    </div>
  )
}

export const GridPostSkeleton = () => {
  return <div className="skeleton grid-post-item" style={{ aspectRatio: '1/1' }}></div>
}
