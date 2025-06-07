import { useState, useEffect } from 'react'

const GenderStep = ({ data, onChange, onValidationChange }) => {
  const [gender, setGender] = useState(data.gender || '')

  const genderOptions = [
    {
      id: 'male',
      title: 'Male',
      image: '/images/monkeys/male_monkey.png',
      emoji: '👨'
    },
    {
      id: 'female',
      title: 'Female',
      image: '/images/monkeys/female_monkey.png',
      emoji: '👩'
    }
  ]

  useEffect(() => {
    const isValid = !!gender
    onValidationChange(isValid)
    
    if (isValid) {
      onChange({ gender })
    }
  }, [gender, onChange, onValidationChange])

  return (
    <div className="single-question-step">
      <div className="form-group">
        <div className="choice-grid two-column large-cards">
          {genderOptions.map((option) => (
            <div
              key={option.id}
              className={`choice-card large-choice-card ${gender === option.id ? 'selected' : ''}`}
              onClick={() => setGender(option.id)}
            >
              <img
                src={option.image}
                alt={`${option.title} monkey`}
                className="choice-icon large-choice-icon"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextElementSibling.style.display = 'block'
                }}
              />
              <div className="choice-emoji large-choice-emoji" style={{ display: 'none' }}>
                {option.emoji}
              </div>
              <h3 className="choice-title large-choice-title">{option.title}</h3>
            </div>
          ))}
        </div>
        <div className="helper-text">
          Gender assigned at birth
        </div>
      </div>
    </div>
  )
}

export default GenderStep
