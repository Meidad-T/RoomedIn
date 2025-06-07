import { useState, useEffect } from 'react'

const HobbiesStep = ({ data, onChange, onValidationChange }) => {
  const [selectedHobbies, setSelectedHobbies] = useState(data.hobbies || [])
  const [customHobby, setCustomHobby] = useState('')

  // This step is optional, so always valid
  useEffect(() => {
    onValidationChange(true)
  }, [onValidationChange])

  // Update parent component
  useEffect(() => {
    onChange({
      hobbies: selectedHobbies
    })
  }, [selectedHobbies, onChange])

  const hobbyOptions = [
    { id: 'hiking', title: 'Hiking', emoji: '🥾' },
    { id: 'yoga', title: 'Yoga', emoji: '🧘' },
    { id: 'dancing', title: 'Dancing', emoji: '💃' },
    { id: 'writing', title: 'Writing', emoji: '✍️' },
    { id: 'gardening', title: 'Gardening', emoji: '🌱' },
    { id: 'volunteering', title: 'Volunteering', emoji: '🤝' },
    { id: 'board-games', title: 'Board Games', emoji: '🎲' },
    { id: 'crafts', title: 'Crafts & DIY', emoji: '🧵' },
    { id: 'meditation', title: 'Meditation', emoji: '🕯️' },
    { id: 'cycling', title: 'Cycling', emoji: '🚴' },
    { id: 'swimming', title: 'Swimming', emoji: '🏊' },
    { id: 'languages', title: 'Learning Languages', emoji: '🗣️' }
  ]

  const toggleHobby = (hobbyId) => {
    setSelectedHobbies(prev => 
      prev.includes(hobbyId)
        ? prev.filter(id => id !== hobbyId)
        : [...prev, hobbyId]
    )
  }

  const addCustomHobby = () => {
    if (customHobby.trim() && !selectedHobbies.includes(customHobby.trim())) {
      setSelectedHobbies(prev => [...prev, customHobby.trim()])
      setCustomHobby('')
    }
  }

  const removeCustomItem = (item) => {
    setSelectedHobbies(prev => prev.filter(h => h !== item))
  }

  return (
    <div className="single-question-step">
      <div className="form-group">
        <div className="multi-select-grid">
          {hobbyOptions.map((option) => (
            <div
              key={option.id}
              className={`multi-choice-card large-multi-card ${selectedHobbies.includes(option.id) ? 'selected' : ''}`}
              onClick={() => toggleHobby(option.id)}
            >
              <div className="choice-emoji">{option.emoji}</div>
              <h3 className="choice-title">{option.title}</h3>
            </div>
          ))}
        </div>

        {/* Custom Hobby Input */}
        <div className="custom-input-group">
          <input
            type="text"
            className="form-input"
            placeholder="Add a custom hobby..."
            value={customHobby}
            onChange={(e) => setCustomHobby(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCustomHobby()}
            maxLength={30}
          />
          <button
            type="button"
            onClick={addCustomHobby}
            className="add-custom-btn"
            disabled={!customHobby.trim()}
          >
            Add
          </button>
        </div>

        {/* Display custom hobbies */}
        {selectedHobbies.filter(hobby => !hobbyOptions.find(opt => opt.id === hobby)).map(customHob => (
          <div key={customHob} className="custom-tag">
            <span>{customHob}</span>
            <button onClick={() => removeCustomItem(customHob)}>×</button>
          </div>
        ))}

        <div className="helper-text">
          Selected {selectedHobbies.length} hobbies. This is optional but helps find compatible roommates!
        </div>
      </div>
    </div>
  )
}

export default HobbiesStep
