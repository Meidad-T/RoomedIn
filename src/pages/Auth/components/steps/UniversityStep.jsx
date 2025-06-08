import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../../services/firebase'

const UniversityStep = ({ data, onChange, onValidationChange }) => {
  const [universities, setUniversities] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredUniversities, setFilteredUniversities] = useState([])
  const [selectedUniversity, setSelectedUniversity] = useState(data.university || '')
  const [loading, setLoading] = useState(true)

  // Load universities from Firebase
  useEffect(() => {
    const loadUniversities = async () => {
      try {
        const universitiesRef = collection(db, 'universities')
        const snapshot = await getDocs(universitiesRef)
        const universityList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setUniversities(universityList)
        setFilteredUniversities(universityList)
      } catch (error) {
        console.error('Error loading universities:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUniversities()
  }, [])

  // Filter universities based on search
  useEffect(() => {
    if (!searchTerm) {
      setFilteredUniversities(universities)
    } else {
      const filtered = universities.filter(uni =>
        uni.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.location?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredUniversities(filtered)
    }
  }, [searchTerm, universities])

  // Update validation
  useEffect(() => {
    onValidationChange(!!selectedUniversity)
  }, [selectedUniversity, onValidationChange])

  // Update parent component
  useEffect(() => {
    if (selectedUniversity) {
      onChange({ university: selectedUniversity })
    }
  }, [selectedUniversity, onChange])

  const handleUniversitySelect = (university) => {
    setSelectedUniversity(university.id)
    setSearchTerm(university.name)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <svg className="spinner" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="32" strokeDashoffset="32">
              <animate attributeName="stroke-dasharray" dur="2s" values="0 32;16 16;0 32;0 32" repeatCount="indefinite"/>
              <animate attributeName="stroke-dashoffset" dur="2s" values="0;-16;-32;-32" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
        <p>Loading universities...</p>
      </div>
    )
  }

  return (
    <div className="university-step">
      <div className="form-group">
        <label className="form-label">
          Search for your university
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="Type your university name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {searchTerm && (
        <div className="university-results">
          {filteredUniversities.length > 0 ? (
            <div className="university-list">
              {filteredUniversities.slice(0, 10).map((university) => (
                <div
                  key={university.id}
                  className={`university-card ${selectedUniversity === university.id ? 'selected' : ''}`}
                  onClick={() => handleUniversitySelect(university)}
                >
                  <div className="university-info">
                    <h3 className="university-name">{university.name}</h3>
                    {university.location && (
                      <p className="university-location">{university.location}</p>
                    )}
                  </div>
                  <div className="university-icon">
                    🎓
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No universities found matching "{searchTerm}"</p>
              <p className="helper-text">Try a different search term or check the spelling</p>
            </div>
          )}
        </div>
      )}

      {!searchTerm && (
        <div className="search-hint">
          <div className="hint-icon">🔍</div>
          <p>Start typing to search for your university</p>
          <p className="helper-text">We have thousands of universities in our database</p>
        </div>
      )}
    </div>
  )
}

export default UniversityStep
