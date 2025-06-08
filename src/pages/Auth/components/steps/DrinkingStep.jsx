import { useState, useEffect } from 'react'

const DrinkingStep = ({ data, onChange, onValidationChange }) => {
  const [drinking, setDrinking] = useState(data.drinking || '')

  const drinkingOptions = [
    { id: 'never', title: 'Never', emoji: '🚫', subtitle: 'I don\'t drink alcohol' },
    { id: 'occasionally', title: 'Occasionally', emoji: '🍷', subtitle: 'Social drinker' },
    { id: 'regularly', title: 'Regularly', emoji: '🍺', subtitle: 'I drink often' }
  ]

  useEffect(() => {
    const isValid = !!drinking
    onValidationChange(isValid)
    
    if (isValid) {
      onChange({ drinking })
    }
  }, [drinking, onChange, onValidationChange])

  return (
    <div className="single-question-step">
      <div className="form-group">
        <div className="choice-grid three-column large-cards">
          {drinkingOptions.map((option) => (
            <div
              key={option.id}
              className={`choice-card large-choice-card ${drinking === option.id ? 'selected' : ''}`}
              onClick={() => setDrinking(option.id)}
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

export default DrinkingStep
