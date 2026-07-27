import { useState, useEffect } from 'react'

const LoadingScene = ({ onComplete }) => {
  const [photoLoaded, setPhotoLoaded] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    // Check if photo exists
    const checkPhoto = async () => {
      try {
        const response = await fetch('/ariyike-photo.jpg')
        if (response.ok) {
          setPhotoLoaded(true)
        }
      } catch (e) {
        console.log('Photo not found yet')
      }
    }

    checkPhoto()
    
    // Poll for photo every 2 seconds
    const interval = setInterval(checkPhoto, 2000)
    
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Simulate loading progress
    if (photoLoaded) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 5
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [photoLoaded])

  const handleStart = () => {
    setFadeOut(true)
    setTimeout(onComplete, 1000)
  }

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`} style={{
      background: 'linear-gradient(135deg, #87ceeb 0%, #e0f6ff 50%, #f5f5dc 100%)'
    }}>
      <h1 className="loading-title" style={{ color: '#2c3e50' }}>Ariyike's Birthday</h1>
      
      <div className={`photo-upload ${photoLoaded ? 'has-photo' : ''}`}>
        {photoLoaded ? (
          <img 
            src="/ariyike-photo.jpg" 
            alt="Ariyike" 
            className="photo-preview"
          />
        ) : (
          <div className="photo-placeholder">
            <div className="icon">📸</div>
            <p>Add photo to:</p>
            <p><strong>public/ariyike-photo.jpg</strong></p>
          </div>
        )}
      </div>

      <p className="loading-text">
        {photoLoaded 
          ? `Preparing magical experience... ${loadingProgress}%` 
          : 'Waiting for photo...'}
      </p>

      <button 
        className="start-button"
        onClick={handleStart}
        disabled={!photoLoaded || loadingProgress < 100}
      >
        {photoLoaded ? 'Enter Room 🚪' : 'Add Photo First'}
      </button>

      {!photoLoaded && (
        <p style={{ 
          marginTop: '1rem', 
          fontSize: '0.9rem', 
          color: '#ffd4a3',
          textAlign: 'center',
          padding: '0 2rem'
        }}>
          Place her photo in the public folder as "ariyike-photo.jpg"
        </p>
      )}
    </div>
  )
}

export default LoadingScene