import { useState, useEffect } from 'react'

const SmokingStep = ({ data, onChange, onValidationChange }) => {
  const [smoking, setSmoking] = useState(data.smoking || '')

  const smokingOptions = [
    { 
      id: 'never', 
      title: 'Never', 
      emoji: '🚭',
      subtitle: 'I don\'t smoke or vape'
    },
    { 
      id: 'occasionally', 
      title: 'Occasionally', 
      emoji: '🌬️',
      subtitle: 'Social smoker/vaper'
    },
    { 
      id: 'regularly', 
      title: 'Regularly', 
      emoji: '🚬',
      subtitle: 'Daily smoker/vaper'
    }
  ]

  useEffect(() => {
    const isValid = !!smoking
    onValidationChange(isValid)
    
    if (isValid) {
      onChange({ smoking })
    }
  }, [smoking, onChange, onValidationChange])

  return (
    <div className="single-question-step">
      <div className="form-group">
        <div className="choice-grid three-column large-cards">
          {smokingOptions.map((option) => (
            <div
              key={option.id}
              className={`choice-card large-choice-card ${smoking === option.id ? 'selected' : ''}`}
              onClick={() => setSmoking(option.id)}
            >
              <div className="choice-emoji large-choice-emoji">{option.emoji}</div>
              <h3 className="choice-title large-choice-title">{option.title}</h3>
              <p className="choice-subtitle">{option.subtitle}</p>
            </div>
          ))}
        </div>
        <div className="helper-text">
          Be honest - this helps find compatible roommates
        </div>
      </div>
    </div>
  )
}

export default SmokingStep
