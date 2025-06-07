import { useState, useEffect } from 'react'

const SocialLevelStep = ({ data, onChange, onValidationChange }) => {
  const [socialLevel, setSocialLevel] = useState(data.socialLevel || '')

  const socialOptions = [
    { id: 'very-social', title: 'Very Social', emoji: '🎉', subtitle: 'Love parties and gatherings' },
    { id: 'social', title: 'Social', emoji: '😊', subtitle: 'Enjoy hanging out with friends' },
    { id: 'moderate', title: 'Moderate', emoji: '😌', subtitle: 'Sometimes social, sometimes not' },
    { id: 'introverted', title: 'Introverted', emoji: '📖', subtitle: 'Prefer quiet time alone' }
  ]

  useEffect(() => {
    const isValid = !!socialLevel
    onValidationChange(isValid)
    
    if (isValid) {
      onChange({ socialLevel })
    }
  }, [socialLevel, onChange, onValidationChange])

  return (
    <div className="single-question-step">
      <div className="form-group">
        <div className="choice-grid four-column large-cards">
          {socialOptions.map((option) => (
            <div
              key={option.id}
              className={`choice-card large-choice-card ${socialLevel === option.id ? 'selected' : ''}`}
              onClick={() => setSocialLevel(option.id)}
            >
              <div className="choice-emoji large-choice-emoji">{option.emoji}</div>
              <h3 className="choice-title large-choice-title">{option.title}</h3>
              <p className="choice-subtitle">{option.subtitle}</p>
            </div>
          ))}
        </div>
        <div className="helper-text">
          How social are you?
        </div>
      </div>
    </div>
  )
}

export default SocialLevelStep
