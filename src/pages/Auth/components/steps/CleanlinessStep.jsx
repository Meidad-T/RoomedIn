import { useState, useEffect } from 'react'

const CleanlinessStep = ({ data, onChange, onValidationChange }) => {
  const [cleanliness, setCleanliness] = useState(data.cleanliness || '')

  const cleanlinessOptions = [
    { id: 'very-clean', title: 'Very Clean', emoji: '✨' },
    { id: 'clean', title: 'Clean', emoji: '🧹' },
    { id: 'average', title: 'Average', emoji: '🏠' },
    { id: 'messy', title: 'A bit messy', emoji: '🤷' }
  ]

  useEffect(() => {
    const isValid = !!cleanliness
    onValidationChange(isValid)
    
    if (isValid) {
      onChange({ cleanliness })
    }
  }, [cleanliness, onChange, onValidationChange])

  return (
    <div className="single-question-step">
      <div className="form-group">
        <div className="choice-grid four-column large-cards">
          {cleanlinessOptions.map((option) => (
            <div
              key={option.id}
              className={`choice-card large-choice-card ${cleanliness === option.id ? 'selected' : ''}`}
              onClick={() => setCleanliness(option.id)}
            >
              <div className="choice-emoji large-choice-emoji">{option.emoji}</div>
              <h3 className="choice-title large-choice-title">{option.title}</h3>
              {option.subtitle && (
                <p className="choice-subtitle">{option.subtitle}</p>
              )}
            </div>
          ))}
        </div>
        <div className="helper-text">
          How would you describe your cleanliness level?
        </div>
      </div>
    </div>
  )
}

export default CleanlinessStep
