import { useState, useEffect } from 'react'

const PetsStep = ({ data, onChange, onValidationChange }) => {
  const [pets, setPets] = useState(data.pets || '')
  const [customPets, setCustomPets] = useState(data.customPets || '')

  const petsOptions = [
    { id: 'none', title: 'No pets', emoji: '🚫' },
    { id: 'dog', title: 'Dog', emoji: '🐕', subtitle: 'I have a dog' },
    { id: 'cat', title: 'Cat', emoji: '🐱', subtitle: 'I have a cat' },
    { id: 'other', title: 'Other pets', emoji: '🐾' }
  ]

  useEffect(() => {
    const isValid = pets && (pets !== 'other' || customPets.trim().length > 0)
    onValidationChange(isValid)

    if (isValid) {
      onChange({
        pets,
        customPets: pets === 'other' ? customPets.trim() : ''
      })
    }
  }, [pets, customPets, onChange, onValidationChange])

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
              {option.subtitle && (
                <p className="choice-subtitle">{option.subtitle}</p>
              )}
            </div>
          ))}
        </div>

        {pets === 'other' && (
          <div className="form-group" style={{ marginTop: '2rem' }}>
            <input
              type="text"
              className="form-input large-input"
              placeholder="Please specify your pets (max 30 characters)"
              value={customPets}
              onChange={(e) => setCustomPets(e.target.value)}
              maxLength={30}
              autoFocus
            />
          </div>
        )}

        <div className="helper-text">
          Do you have any pets that would live with you?
        </div>
      </div>
    </div>
  )
}

export default PetsStep
