import { useEffect, useRef, useState } from 'react'
import './PosterStyles.css'

const PosterGenerator = ({ userData, onClose }) => {
  const canvasRef = useRef(null)
  const [posterUrl, setPosterUrl] = useState(null)
  const [generating, setGenerating] = useState(true)
  
  useEffect(() => {
    generatePoster()
  }, [])
  
  const generatePoster = async () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    const width = 1080
    const height = 1350
    
    canvas.width = width
    canvas.height = height
    
    // 1. Beautiful gradient background (Gold → Coral → Maroon)
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#FFD700')
    gradient.addColorStop(0.3, '#FFA500')
    gradient.addColorStop(0.6, '#FF6B6B')
    gradient.addColorStop(1, '#800000')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
    
    // 2. Decorative pattern overlay
    ctx.save()
    ctx.globalAlpha = 0.1
    for (let i = 0; i < 50; i++) {
      ctx.beginPath()
      ctx.arc(
        Math.random() * width,
        Math.random() * height,
        Math.random() * 100 + 20,
        0,
        Math.PI * 2
      )
      ctx.fillStyle = '#fff'
      ctx.fill()
    }
    ctx.restore()
    
    // 3. Elegant border
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 20
    ctx.strokeRect(40, 40, width - 80, height - 80)
    
    ctx.strokeStyle = '#FFD700'
    ctx.lineWidth = 5
    ctx.strokeRect(55, 55, width - 110, height - 110)
    
    // 4. Main heading
    ctx.font = 'bold 80px "Playfair Display", Georgia, serif'
    ctx.fillStyle = '#fff'
    ctx.textAlign = 'center'
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
    ctx.shadowBlur = 10
    ctx.shadowOffsetX = 3
    ctx.shadowOffsetY = 3
    ctx.fillText('Happy Birthday', width / 2, 120)
    
    ctx.font = 'bold 110px "Playfair Display", Georgia, serif'
    ctx.fillStyle = '#fff'
    ctx.fillText(userData.name + '!', width / 2, 240)
    
    ctx.shadowColor = 'transparent'
    
    // 5. Photo placeholder (circular frame)
    const photoY = 480
    const photoRadius = 180
    
    // Photo frame circle
    ctx.beginPath()
    ctx.arc(width / 2, photoY, photoRadius + 15, 0, Math.PI * 2)
    ctx.fillStyle = '#fff'
    ctx.fill()
    
    // Inner circle (photo area)
    ctx.beginPath()
    ctx.arc(width / 2, photoY, photoRadius, 0, Math.PI * 2)
    ctx.fillStyle = '#f5e6d3'
    ctx.fill()
    
    // Placeholder text
    ctx.font = 'italic 30px Arial'
    ctx.fillStyle = '#800000'
    ctx.fillText('📸 Your Photo Here', width / 2, photoY)
    ctx.font = '20px Arial'
    ctx.fillText('(Add ariyike-photo.jpg to see it!)', width / 2, photoY + 30)
    
    // 6. Wish section
    const wishY = 750
    
    // Wish box background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
    ctx.roundRect(80, wishY - 60, width - 160, 200, 20)
    ctx.fill()
    
    // Wish label
    ctx.font = 'bold 35px "Playfair Display", Georgia, serif'
    ctx.fillStyle = '#800000'
    ctx.fillText('✨ Your Birthday Wish ✨', width / 2, wishY - 20)
    
    // Wish text with word wrap
    ctx.font = 'italic 32px Georgia, serif'
    ctx.fillStyle = '#5d4037'
    const wishText = `"${userData.wish}"`
    const maxWidth = width - 200
    const lineHeight = 45
    const words = wishText.split(' ')
    let line = ''
    let y = wishY + 30
    
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' '
      const metrics = ctx.measureText(testLine)
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, width / 2, y)
        line = words[i] + ' '
        y += lineHeight
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, width / 2, y)
    
    // 7. Date
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    
    ctx.font = '35px "Inter", Arial, sans-serif'
    ctx.fillStyle = '#fff'
    ctx.fillText(today, width / 2, 1020)
    
    // 8. Birthday message
    ctx.font = '28px "Inter", Arial, sans-serif'
    ctx.fillStyle = '#fff'
    ctx.fillText('Wishing you a year filled with joy,', width / 2, 1080)
    ctx.fillText('love, and all your heart desires!', width / 2, 1120)
    
    // 9. Decorative elements - Balloons
    ctx.font = '60px Arial'
    ctx.fillText('🎈', 120, 200)
    ctx.fillText('🎈', width - 150, 180)
    ctx.fillText('🎂', 100, height - 200)
    ctx.fillText('🎁', width - 130, height - 180)
    ctx.fillText('✨', 150, 350)
    ctx.fillText('✨', width - 180, 380)
    ctx.fillText('🎉', 120, height - 350)
    ctx.fillText('🎉', width - 150, height - 320)
    
    // 10. Footer
    ctx.font = 'italic 24px "Playfair Display", Georgia, serif'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
    ctx.fillText('Made with love for your special day', width / 2, height - 80)
    
    // Convert to image
    setPosterUrl(canvas.toDataURL('image/png'))
    setGenerating(false)
  }
  
  const handleDownload = () => {
    if (posterUrl) {
      const link = document.createElement('a')
      link.download = `Happy-Birthday-${userData.name}.png`
      link.href = posterUrl
      link.click()
    }
  }
  
  return (
    <div className="poster-overlay">
      <div className="poster-container">
        <h2 className="poster-title">🎉 Your Birthday Poster is Ready! 🎉</h2>
        
        {generating ? (
          <div className="poster-loading">
            <div className="loading-spinner"></div>
            <p>Creating your beautiful poster...</p>
          </div>
        ) : (
          <>
            <div className="poster-preview">
              <img 
                src={posterUrl} 
                alt="Birthday Poster" 
                className="poster-image"
              />
            </div>
            
            <div className="poster-actions">
              <button 
                onClick={handleDownload}
                className="poster-button download"
              >
                💾 Download Poster
              </button>
              
              <button 
                onClick={onClose}
                className="poster-button close"
              >
                ✨ Close & Celebrate
              </button>
            </div>
            
            <p className="poster-hint">
              Share this with friends and family!
            </p>
          </>
        )}
        
        {/* Hidden canvas for generation */}
        <canvas 
          ref={canvasRef}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  )
}

export default PosterGenerator