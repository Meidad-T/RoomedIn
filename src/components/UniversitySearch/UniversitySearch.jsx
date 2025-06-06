/**
 * University Search Component
 * Integrates with existing Hero search UI without changing it
 */
import { useRef, useEffect } from 'react'
import { useUniversitySearch } from '../../hooks/useUniversitySearch'
import './UniversitySearch.css'

const UniversitySearch = ({ onUniversitySelect }) => {
  const {
    searchText,
    results,
    isLoading,
    isOpen,
    handleSearchChange,
    handleUniversitySelect,
    clearSearch,
    closeDropdown,
    openDropdown
  } = useUniversitySearch()

  // Debug logging
  console.log('UniversitySearch render:', { searchText, results, isLoading, isOpen })

  const containerRef = useRef(null)

  /**
   * Handle university selection
   */
  const onSelectUniversity = (university) => {
    const selectedUniversity = handleUniversitySelect(university)
    if (onUniversitySelect) {
      onUniversitySelect(selectedUniversity)
    }
  }

  /**
   * Handle click outside to close dropdown
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        closeDropdown()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeDropdown])

  /**
   * Highlight matching text in university name
   */
  const highlightMatch = (text, searchTerm) => {
    if (!searchTerm || searchTerm.length < 2) return text
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="highlight">{part}</mark>
      ) : (
        part
      )
    )
  }

  return (
    <div className="university-search-container" ref={containerRef}>
      {/* Search Input */}
      <div className="search-form">
        <div className="search-input-wrapper">
          <svg 
            className="search-icon" 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
            <path d="m15 15 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          
          <input
            type="text"
            placeholder="Find Your University..."
            value={searchText}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={openDropdown}
            className="search-input"
            autoComplete="off"
          />

          {isLoading && (
            <div className="loading-indicator">
              <div className="spinner"></div>
            </div>
          )}
        </div>
        
        <button type="button" className="search-button" disabled>
          Search
        </button>
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="university-dropdown">
          {results.length > 0 ? (
            <div className="dropdown-results">
              {results.map((university) => (
                <div
                  key={university.id}
                  className="university-item"
                  onClick={() => onSelectUniversity(university)}
                >
                  <div className="university-info">
                    <div className="university-name">
                      {highlightMatch(university.name, searchText)}
                    </div>
                    {university.getLocationString() && (
                      <div className="university-location">
                        {university.getLocationString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : searchText.length >= 2 && !isLoading ? (
            <div className="no-results">
              <div className="no-results-text">
                No universities found for "{searchText}"
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default UniversitySearch
