import { useState, useEffect } from 'react'

const PetsStep = ({ data, onChange, onValidationChange }) => {
  const [pets, setPets] = useState(data.pets || '')

  const petsOptions = [
    { id: 'none', title: 'No pets', emoji: '🚫', subtitle: 'I don\'t have any pets' },
    { id: 'dog', title: 'Dog', emoji: '🐕', subtitle: 'I have a dog' },
    { id: 'cat', title: 'Cat', emoji: '🐱', subtitle: 'I have a cat' },
    { id: 'other', title: 'Other pets', emoji: '🐹', subtitle: 'Birds, fish, etc.' }
  ]

  useEffect(() => {
    const isValid = !!pets
    onValidationChange(isValid)
    
    if (isValid) {
      onChange({ pets })
    }
  }, [pets, onChange, onValidationChange])

  return (
    <div className="single-question-step">
      <div className="form-group">
        <div className="choice-grid four-column large-cards">
          {petsOptions.map((option) => (
            <div
              key={option.id}
              className={`choice-card large-choice-card ${pets === option.id ? 'selected' : ''}`}
              onClick={() => setPets(option.id)}
            >
              <div className="choice-emoji large-choice-emoji">{option.emoji}</div>
              <h3 className="choice-title large-choice-title">{option.title}</h3>
              <p className="choice-subtitle">{option.subtitle}</p>
            </div>
          ))}
        </div>
        <div className="helper-text">
          Do you have any pets that would live with you?
        </div>
      </div>
    </div>
  )
}

export default PetsStep
