import { useState, useEffect } from 'react'

const LastNameStep = ({ data, onChange, onValidationChange }) => {
  const [lastName, setLastName] = useState(data.lastName || '')

  useEffect(() => {
    const isValid = lastName.trim().length >= 2
    onValidationChange(isValid)
    
    if (isValid) {
      onChange({ lastName: lastName.trim() })
    }
  }, [lastName, onChange, onValidationChange])

  return (
    <div className="single-question-step">
      <div className="form-group">
        <input
          type="text"
          className="form-input large-input"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          maxLength={30}
          autoFocus
        />
        <div className="helper-text">
          This will be shown to potential roommates
        </div>
      </div>
    </div>
  )
}

export default LastNameStep
