/**
 * University Search Hook - Optimized for Real-time Performance
 * Implements debouncing and caching for optimal UX
 */
import { useState, useEffect, useCallback, useRef } from 'react'
import { UniversityService } from '../services/UniversityService'

export const useUniversitySearch = (debounceMs = 250) => {
  const [searchText, setSearchText] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Refs for cleanup and optimization
  const debounceTimeoutRef = useRef(null)
  const currentRequestRef = useRef(null)

  /**
   * Perform the actual search with Firebase
   * Optimized with request cancellation
   */
  const performSearch = useCallback(async (query) => {
    if (!query || query.trim().length < 2) {
      setResults([])
      setIsLoading(false)
      setIsOpen(false)
      return
    }

    // Create a unique request ID to handle race conditions
    const requestId = Date.now()
    currentRequestRef.current = requestId

    setIsLoading(true)

    try {
      const universities = await UniversityService.searchUniversities(query)
      
      // Only update if this is still the current request
      if (currentRequestRef.current === requestId) {
        setResults(universities)
        setIsOpen(universities.length > 0)
      }
    } catch (error) {
      console.error('Search error:', error)
      if (currentRequestRef.current === requestId) {
        setResults([])
        setIsOpen(false)
      }
    } finally {
      if (currentRequestRef.current === requestId) {
        setIsLoading(false)
      }
    }
  }, [])

  /**
   * Handle search text change with optimized debouncing
   */
  const handleSearchChange = useCallback((newSearchText) => {
    setSearchText(newSearchText)

    // Clear previous timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    // Cancel any pending requests
    currentRequestRef.current = null

    // Set new debounced search
    debounceTimeoutRef.current = setTimeout(() => {
      performSearch(newSearchText)
    }, debounceMs)
  }, [performSearch, debounceMs])

  /**
   * Handle university selection
   */
  const handleUniversitySelect = useCallback((university) => {
    setSearchText(university.name)
    setIsOpen(false)
    setResults([])
    return university
  }, [])

  /**
   * Clear search
   */
  const clearSearch = useCallback(() => {
    setSearchText('')
    setResults([])
    setIsOpen(false)
    
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }
    currentRequestRef.current = null
  }, [])

  /**
   * Close dropdown
   */
  const closeDropdown = useCallback(() => {
    setIsOpen(false)
  }, [])

  /**
   * Open dropdown if there are results
   */
  const openDropdown = useCallback(() => {
    if (results.length > 0) {
      setIsOpen(true)
    }
  }, [results.length])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
      currentRequestRef.current = null
    }
  }, [])

  return {
    // State
    searchText,
    results,
    isLoading,
    isOpen,
    
    // Actions
    handleSearchChange,
    handleUniversitySelect,
    clearSearch,
    closeDropdown,
    openDropdown
  }
}
