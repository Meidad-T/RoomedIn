import { useState, useEffect } from 'react'

const LifestyleStep = ({ data, onChange, onValidationChange }) => {
  const [smoking, setSmoking] = useState(data.smoking || '')
  const [drinking, setDrinking] = useState(data.drinking || '')
  const [pets, setPets] = useState(data.pets || '')
  const [petType, setPetType] = useState(data.petType || '')

  // Update validation
  useEffect(() => {
    const isValid = smoking && drinking && pets
    onValidationChange(isValid)
  }, [smoking, drinking, pets, onValidationChange])

  // Update parent component
  useEffect(() => {
    onChange({
      smoking,
      drinking,
      pets,
      petType: pets === 'yes' ? petType : ''
    })
  }, [smoking, drinking, pets, petType, onChange])

  const smokingOptions = [
    { id: 'no', title: 'No', subtitle: 'I don\'t smoke or vape', emoji: '🚭' },
    { id: 'yes', title: 'Yes', subtitle: 'I smoke or vape', emoji: '🚬' },
    { id: 'occasionally', title: 'Occasionally', subtitle: 'Social smoking only', emoji: '🌬️' },
    { id: 'prefer-not-to-share', title: 'Prefer not to share', subtitle: '', emoji: '🤐' }
  ]

  const drinkingOptions = [
    { id: 'no', title: 'No', subtitle: 'I don\'t drink alcohol', emoji: '🚫' },
    { id: 'occasionally', title: 'Occasionally', subtitle: 'Social drinking only', emoji: '🍷' },
    { id: 'regularly', title: 'Regularly', subtitle: 'I drink regularly', emoji: '🍺' },
    { id: 'prefer-not-to-share', title: 'Prefer not to share', subtitle: '', emoji: '🤐' }
  ]

  const petOptions = [
    { id: 'no', title: 'No pets', subtitle: 'I don\'t have any pets', emoji: '🚫' },
    { id: 'yes', title: 'I have pets', subtitle: 'I currently have pets', emoji: '🐾' },
    { id: 'planning', title: 'Planning to get pets', subtitle: 'I want to get pets', emoji: '💭' }
  ]

  return (
    <div className="lifestyle-step">
      {/* Smoking */}
      <div className="form-group">
        <label className="form-label">
          Do you smoke or vape? *
        </label>
        <div className="choice-grid two-column">
          {smokingOptions.map((option) => (
            <div
              key={option.id}
              className={`choice-card ${smoking === option.id ? 'selected' : ''}`}
              onClick={() => setSmoking(option.id)}
            >
              <div className="choice-emoji">{option.emoji}</div>
              <h3 className="choice-title">{option.title}</h3>
              {option.subtitle && (
                <p className="choice-subtitle">{option.subtitle}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Drinking */}
      <div className="form-group">
        <label className="form-label">
          Do you drink alcohol? *
        </label>
        <div className="choice-grid two-column">
          {drinkingOptions.map((option) => (
            <div
              key={option.id}
              className={`choice-card ${drinking === option.id ? 'selected' : ''}`}
              onClick={() => setDrinking(option.id)}
            >
              <div className="choice-emoji">{option.emoji}</div>
              <h3 className="choice-title">{option.title}</h3>
              {option.subtitle && (
                <p className="choice-subtitle">{option.subtitle}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pets */}
      <div className="form-group">
        <label className="form-label">
          Do you have or want pets? *
        </label>
        <div className="choice-grid three-column">
          {petOptions.map((option) => (
            <div
              key={option.id}
              className={`choice-card ${pets === option.id ? 'selected' : ''}`}
              onClick={() => setPets(option.id)}
            >
              <div className="choice-emoji">{option.emoji}</div>
              <h3 className="choice-title">{option.title}</h3>
              <p className="choice-subtitle">{option.subtitle}</p>
            </div>
          ))}
        </div>

        {pets === 'yes' && (
          <div className="form-group">
            <label className="form-label">
              What type of pet(s) do you have?
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Dog, Cat, Fish, Bird..."
              value={petType}
              onChange={(e) => setPetType(e.target.value)}
              maxLength={50}
            />
          </div>
        )}

        {pets === 'planning' && (
          <div className="form-group">
            <label className="form-label">
              What type of pet(s) are you planning to get?
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Dog, Cat, Fish, Bird..."
              value={petType}
              onChange={(e) => setPetType(e.target.value)}
              maxLength={50}
            />
          </div>
        )}
      </div>

      <div className="helper-text">
        * All fields are required. This helps us match you with compatible roommates who share similar lifestyle preferences.
      </div>
    </div>
  )
}

export default LifestyleStep
