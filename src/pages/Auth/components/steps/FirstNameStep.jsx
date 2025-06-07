import { useState, useEffect } from 'react'

const FirstNameStep = ({ data, onChange, onValidationChange }) => {
  const [firstName, setFirstName] = useState(data.firstName || '')

  useEffect(() => {
    const isValid = firstName.trim().length >= 2
    onValidationChange(isValid)
    
    if (isValid) {
      onChange({ firstName: firstName.trim() })
    }
  }, [firstName, onChange, onValidationChange])

  return (
    <div className="single-question-step">
      <div className="form-group">
        <input
          type="text"
          className="form-input large-input"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
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

export default FirstNameStep
