import { useState, useEffect } from 'react'
import maleMonkeyImg from '../../../../assets/images/auth/male_monkey.png'
import femaleMonkeyImg from '../../../../assets/images/auth/female_monkey.png'

const IdentityStep = ({ data, onChange, onValidationChange }) => {
  const [gender, setGender] = useState(data.gender || '')
  const [sexuality, setSexuality] = useState(data.sexuality || '')
  const [customSexuality, setCustomSexuality] = useState(data.customSexuality || '')
  const [religion, setReligion] = useState(data.religion || '')

  // Update validation
  useEffect(() => {
    const isValid = gender && sexuality && religion
    onValidationChange(isValid)
  }, [gender, sexuality, religion, onValidationChange])

  // Update parent component
  useEffect(() => {
    onChange({
      gender,
      sexuality: sexuality === 'other' ? customSexuality : sexuality,
      religion
    })
  }, [gender, sexuality, customSexuality, religion, onChange])

  const genderOptions = [
    {
      id: 'male',
      title: 'Male',
      image: maleMonkeyImg
    },
    {
      id: 'female',
      title: 'Female',
      image: femaleMonkeyImg
    }
  ]

  const sexualityOptions = [
    { id: 'straight', title: 'Straight', emoji: '💕' },
    { id: 'gay', title: 'Gay', emoji: '🌈' },
    { id: 'lesbian', title: 'Lesbian', emoji: '🌈' },
    { id: 'bisexual', title: 'Bisexual', emoji: '💜' },
    { id: 'pansexual', title: 'Pansexual', emoji: '💖' },
    { id: 'asexual', title: 'Asexual', emoji: '🖤' },
    { id: 'other', title: 'Other', emoji: '✨' }
  ]

  const religionOptions = [
    { id: 'prefer-not-to-share', title: 'Prefer not to share', emoji: '🤐' },
    { id: 'christianity', title: 'Christianity', emoji: '✝️' },
    { id: 'islam', title: 'Islam', emoji: '☪️' },
    { id: 'judaism', title: 'Judaism', emoji: '✡️' },
    { id: 'hinduism', title: 'Hinduism', emoji: '🕉️' },
    { id: 'buddhism', title: 'Buddhism', emoji: '☸️' },
    { id: 'sikhism', title: 'Sikhism', emoji: '🪯' },
    { id: 'atheist', title: 'Atheist', emoji: '🔬' },
    { id: 'agnostic', title: 'Agnostic', emoji: '🤔' },
    { id: 'spiritual', title: 'Spiritual', emoji: '🌟' },
    { id: 'other', title: 'Other', emoji: '🌍' }
  ]

  return (
    <div className="identity-step">
      {/* Gender Selection */}
      <div className="form-group">
        <label className="form-label">
          Gender assigned at birth *
        </label>
        <div className="choice-grid two-column">
          {genderOptions.map((option) => (
            <div
              key={option.id}
              className={`choice-card ${gender === option.id ? 'selected' : ''}`}
              onClick={() => setGender(option.id)}
            >
              <img
                src={option.image}
                alt={`${option.title} monkey`}
                className="choice-icon"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextElementSibling.style.display = 'block'
                }}
              />
              <div className="choice-emoji" style={{ display: 'none' }}>
                {option.id === 'male' ? '👨' : '👩'}
              </div>
              <h3 className="choice-title">{option.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Sexuality Selection */}
      <div className="form-group">
        <label className="form-label">
          Sexual orientation *
        </label>
        <div className="choice-grid three-column">
          {sexualityOptions.map((option) => (
            <div
              key={option.id}
              className={`choice-card ${sexuality === option.id ? 'selected' : ''}`}
              onClick={() => setSexuality(option.id)}
            >
              <div className="choice-emoji">{option.emoji}</div>
              <h3 className="choice-title">{option.title}</h3>
            </div>
          ))}
        </div>
        
        {sexuality === 'other' && (
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Please specify (max 15 characters)"
              value={customSexuality}
              onChange={(e) => setCustomSexuality(e.target.value)}
              maxLength={15}
            />
          </div>
        )}
      </div>

      {/* Religion Selection */}
      <div className="form-group">
        <label className="form-label">
          Religion/Beliefs *
        </label>
        <div className="choice-grid four-column">
          {religionOptions.map((option) => (
            <div
              key={option.id}
              className={`choice-card ${religion === option.id ? 'selected' : ''}`}
              onClick={() => setReligion(option.id)}
            >
              <div className="choice-emoji">{option.emoji}</div>
              <h3 className="choice-title">{option.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="helper-text">
        * All fields are required. This information helps us find compatible roommates for you.
      </div>
    </div>
  )
}

export default IdentityStep
