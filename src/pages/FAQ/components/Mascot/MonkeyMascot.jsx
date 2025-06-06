import { useState, useEffect } from 'react'
import './MonkeyMascot.css'

const MonkeyMascot = ({ expression = 'happy', position = 'right', isVisible = true }) => {
  const [currentExpression, setCurrentExpression] = useState(expression)

  useEffect(() => {
    setCurrentExpression(expression)
  }, [expression])

  const getMonkeyFace = () => {
    switch (currentExpression) {
      case 'happy':
        return (
          <>
            {/* Eyes */}
            <circle cx="35" cy="35" r="4" fill="#2c3e50"/>
            <circle cx="65" cy="35" r="4" fill="#2c3e50"/>
            <circle cx="36" cy="33" r="1.5" fill="white"/>
            <circle cx="66" cy="33" r="1.5" fill="white"/>
            {/* Smile */}
            <path d="M35 55 Q50 65 65 55" stroke="#2c3e50" strokeWidth="3" fill="none" strokeLinecap="round"/>
          </>
        )
      case 'excited':
        return (
          <>
            {/* Eyes */}
            <circle cx="35" cy="35" r="5" fill="#2c3e50"/>
            <circle cx="65" cy="35" r="5" fill="#2c3e50"/>
            <circle cx="36" cy="32" r="2" fill="white"/>
            <circle cx="66" cy="32" r="2" fill="white"/>
            {/* Big smile */}
            <ellipse cx="50" cy="58" rx="12" ry="6" fill="#2c3e50"/>
            <ellipse cx="50" cy="56" rx="10" ry="4" fill="#f39c12"/>
          </>
        )
      case 'curious':
        return (
          <>
            {/* Eyes */}
            <circle cx="35" cy="35" r="4" fill="#2c3e50"/>
            <circle cx="65" cy="35" r="4" fill="#2c3e50"/>
            <circle cx="37" cy="33" r="1.5" fill="white"/>
            <circle cx="67" cy="33" r="1.5" fill="white"/>
            {/* Neutral mouth */}
            <ellipse cx="50" cy="58" rx="6" ry="3" fill="#2c3e50"/>
            {/* Raised eyebrow */}
            <path d="M30 28 Q35 25 40 28" stroke="#2c3e50" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </>
        )
      case 'thinking':
        return (
          <>
            {/* Eyes looking up */}
            <circle cx="35" cy="35" r="4" fill="#2c3e50"/>
            <circle cx="65" cy="35" r="4" fill="#2c3e50"/>
            <circle cx="35" cy="32" r="1.5" fill="white"/>
            <circle cx="65" cy="32" r="1.5" fill="white"/>
            {/* Small mouth */}
            <circle cx="50" cy="58" r="2" fill="#2c3e50"/>
            {/* Thought bubble */}
            <circle cx="75" cy="20" r="3" fill="white" stroke="#2c3e50" strokeWidth="1"/>
            <circle cx="82" cy="15" r="2" fill="white" stroke="#2c3e50" strokeWidth="1"/>
            <circle cx="87" cy="12" r="1" fill="white" stroke="#2c3e50" strokeWidth="1"/>
          </>
        )
      default:
        return (
          <>
            <circle cx="35" cy="35" r="4" fill="#2c3e50"/>
            <circle cx="65" cy="35" r="4" fill="#2c3e50"/>
            <circle cx="36" cy="33" r="1.5" fill="white"/>
            <circle cx="66" cy="33" r="1.5" fill="white"/>
            <path d="M35 55 Q50 65 65 55" stroke="#2c3e50" strokeWidth="3" fill="none" strokeLinecap="round"/>
          </>
        )
    }
  }

  return (
    <div className={`monkey-mascot ${position} ${isVisible ? 'visible' : 'hidden'} expression-${currentExpression}`}>
      <div className="monkey-container">
        <svg width="100" height="100" viewBox="0 0 100 100" className="monkey-svg">
          {/* Monkey head */}
          <circle cx="50" cy="50" r="30" fill="var(--primary-green)" stroke="var(--primary-green-dark)" strokeWidth="2"/>
          
          {/* Ears */}
          <circle cx="25" cy="35" r="8" fill="var(--primary-green)" stroke="var(--primary-green-dark)" strokeWidth="2"/>
          <circle cx="75" cy="35" r="8" fill="var(--primary-green)" stroke="var(--primary-green-dark)" strokeWidth="2"/>
          <circle cx="25" cy="35" r="4" fill="#f39c12"/>
          <circle cx="75" cy="35" r="4" fill="#f39c12"/>
          
          {/* Snout */}
          <ellipse cx="50" cy="55" rx="12" ry="8" fill="#f39c12" stroke="var(--primary-green-dark)" strokeWidth="1"/>
          
          {/* Nose */}
          <ellipse cx="50" cy="50" rx="2" ry="1.5" fill="#2c3e50"/>
          
          {/* Face expression */}
          {getMonkeyFace()}
        </svg>
      </div>
    </div>
  )
}

export default MonkeyMascot
