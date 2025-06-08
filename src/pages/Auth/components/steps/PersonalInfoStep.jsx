import { useState, useEffect } from 'react'

const PersonalInfoStep = ({ data, onChange, onValidationChange }) => {
  const [firstName, setFirstName] = useState(data.firstName || '')
  const [lastName, setLastName] = useState(data.lastName || '')
  const [birthday, setBirthday] = useState(data.birthday || '')
  const [major, setMajor] = useState(data.major || '')
  const [minor, setMinor] = useState(data.minor || '')
  const [graduationYear, setGraduationYear] = useState(data.graduationYear || '')
  const [age, setAge] = useState(null)

  // Calculate age when birthday changes
  useEffect(() => {
    if (birthday) {
      const today = new Date()
      const birth = new Date(birthday)
      let calculatedAge = today.getFullYear() - birth.getFullYear()
      const monthDiff = today.getMonth() - birth.getMonth()
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        calculatedAge--
      }
      
      setAge(calculatedAge)
    } else {
      setAge(null)
    }
  }, [birthday])

  // Update validation
  useEffect(() => {
    const isValid = firstName.trim() && lastName.trim() && birthday && major.trim() && graduationYear
    onValidationChange(isValid)
  }, [firstName, lastName, birthday, major, graduationYear, onValidationChange])

  // Update parent component
  useEffect(() => {
    onChange({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      birthday,
      major: major.trim(),
      minor: minor.trim(),
      graduationYear,
      age
    })
  }, [firstName, lastName, birthday, major, minor, graduationYear, age, onChange])

  // Generate graduation year options
  const currentYear = new Date().getFullYear()
  const graduationYears = []
  for (let year = currentYear; year <= currentYear + 8; year++) {
    graduationYears.push(year)
  }

  return (
    <div className="personal-info-step">
      <div className="form-group">
        <label className="form-label">
          First Name *
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          maxLength={50}
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          Last Name *
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          maxLength={50}
        />
        <div className="disclaimer">
          ⚠️ Your first and last name will be publicly displayed to potential roommates
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          Birthday *
        </label>
        <input
          type="date"
          className="form-input"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          max={new Date().toISOString().split('T')[0]} // Can't select future dates
        />
        {age !== null && (
          <div className="age-display">
            <p className="age-text">You are {age} years old</p>
          </div>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">
          Major *
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g., Computer Science, Biology, English"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          maxLength={100}
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          Minor (Optional)
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g., Mathematics, Psychology"
          value={minor}
          onChange={(e) => setMinor(e.target.value)}
          maxLength={100}
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          Expected Graduation Year *
        </label>
        <select
          className="form-input"
          value={graduationYear}
          onChange={(e) => setGraduationYear(e.target.value)}
        >
          <option value="">Select graduation year</option>
          {graduationYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="helper-text">
        * Required fields
      </div>
    </div>
  )
}

export default PersonalInfoStep
