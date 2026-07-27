import { useState, useEffect } from 'react'
import './DialogStyles.css'

export const WishDialog = ({ isOpen, onSubmit }) => {
  const [wish, setWish] = useState('')
  
  if (!isOpen) return null
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (wish.trim()) {
      onSubmit(wish)
    }
  }
  
  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <div className="dialog-character">
          <span className="character-avatar">🧚</span>
          <span className="character-name">Birthday Fairy</span>
        </div>
        
        <h2 className="dialog-title">Welcome to Your Birthday! 🎉</h2>
        
        <p className="dialog-text">
          Before we continue with your special celebration, tell me...
        </p>
        
        <p className="dialog-question">
          What do you wish for this year?
        </p>
        
        <form onSubmit={handleSubmit}>
          <textarea
            className="dialog-input"
            placeholder="I wish for..."
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            rows={3}
            autoFocus
          />
          
          <button 
            type="submit" 
            className="dialog-button"
            disabled={!wish.trim()}
          >
            Continue ✨
          </button>
        </form>
      </div>
    </div>
  )
}

export const AgeDialog = ({ isOpen, onSubmit }) => {
  const [age, setAge] = useState('')
  
  if (!isOpen) return null
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (age.trim() && !isNaN(age)) {
      onSubmit(age)
    }
  }
  
  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <div className="dialog-character">
          <span className="character-avatar">🧚</span>
          <span className="character-name">Birthday Fairy</span>
        </div>
        
        <h2 className="dialog-title">Almost There! 🎂</h2>
        
        <p className="dialog-text">
          Wonderful! Your wish has been recorded in the birthday stars.
        </p>
        
        <p className="dialog-question">
          How old are you clocking today?
        </p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            className="dialog-input age-input"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="1"
            max="120"
            autoFocus
          />
          
          <button 
            type="submit" 
            className="dialog-button"
            disabled={!age.trim()}
          >
            Continue to the House 🏠
          </button>
        </form>
      </div>
    </div>
  )
}

export const PhotoShootDialog = ({ isOpen, onYes, onNo }) => {
  if (!isOpen) return null
  
  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <div className="dialog-character">
          <span className="character-avatar">📸</span>
          <span className="character-name">Photographer</span>
        </div>
        
        <h2 className="dialog-title">Picture Perfect Moment! 📷</h2>
        
        <p className="dialog-text">
          The celebration has been absolutely magical!
        </p>
        
        <p className="dialog-question">
          Would you like to pose for a special birthday photo?
        </p>
        
        <div className="dialog-buttons-row">
          <button 
            onClick={onYes}
            className="dialog-button primary"
          >
            Yes! Let's do it! 📸
          </button>
          
          <button 
            onClick={onNo}
            className="dialog-button secondary"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
}

export const PoseSelector = ({ isOpen, onSelect }) => {
  const poses = [
    { id: 'peace', emoji: '✌️', name: 'Peace Sign', description: 'Classic and cheerful' },
    { id: 'celebration', emoji: '🎉', name: 'Celebration', description: 'Party vibes!' },
    { id: 'elegant', emoji: '💃', name: 'Elegant', description: 'Graceful pose' },
    { id: 'smile', emoji: '😊', name: 'Classic Smile', description: 'Warm and beautiful' }
  ]
  
  if (!isOpen) return null
  
  return (
    <div className="dialog-overlay">
      <div className="dialog-box large">
        <h2 className="dialog-title">Choose Your Pose! 📸</h2>
        
        <p className="dialog-text">
          How would you like to pose for your birthday photo?
        </p>
        
        <div className="pose-grid">
          {poses.map((pose) => (
            <button
              key={pose.id}
              className="pose-button"
              onClick={() => onSelect(pose.id)}
            >
              <span className="pose-emoji">{pose.emoji}</span>
              <span className="pose-name">{pose.name}</span>
              <span className="pose-description">{pose.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export const BirthdayMessageModal = ({ isOpen, userData, onContinue }) => {
  if (!isOpen) return null
  
  return (
    <div className="dialog-overlay message-overlay">
      <div className="dialog-box message-box">
        <div className="message-scroll">
          <h1 className="message-title">🎂 Happy Birthday, {userData.name}! 🎂</h1>
          
          <div className="message-content">
            <p className="message-paragraph">
              On this beautiful day, as the sun rises to celebrate your existence, 
              I want you to know how incredibly special you are. Your presence in 
              this world brings warmth, joy, and light to everyone fortunate enough 
              to know you.
            </p>
            
            <p className="message-paragraph">
              Today, we celebrate not just the day you were born, but the amazing 
              person you've become. Your kindness, strength, and beautiful spirit 
              inspire those around you every single day.
            </p>
            
            <div className="wish-highlight">
              <span className="wish-label">✨ Your Birthday Wish ✨</span>
              <span className="wish-text">"{userData.wish}"</span>
            </div>
            
            <p className="message-paragraph">
              May this year bring you countless moments of happiness, adventures 
              that fill your heart with wonder, and dreams that come true in the 
              most beautiful ways. You deserve all the love, success, and joy 
              that life has to offer.
            </p>
            
            <p className="message-paragraph">
              Here's to another year of wonderful memories, laughter that echoes, 
              and moments that take your breath away. May your journey ahead be 
              as bright and beautiful as your smile.
            </p>
            
            <p className="message-closing">
              With all my love and warmest wishes,<br />
              On your special day and always 🎉💝
            </p>
          </div>
          
          <button 
            onClick={onContinue}
            className="dialog-button continue-button"
          >
            Continue to Photo Shoot 📸
          </button>
        </div>
      </div>
    </div>
  )
}