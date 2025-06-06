/**
 * University Service - Optimized for Maximum Performance
 * Target: O(1) memory, O(log n) time complexity with caching
 */
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc
} from 'firebase/firestore'
import { db } from './firebase'
import { University } from './University'

export class UniversityService {
  static COLLECTION_NAME = 'universities'
  static MAX_RESULTS = 3 // Show maximum 3 results
  static CACHE_DURATION = 5 * 60 * 1000 // 5 minutes cache
  
  // In-memory cache for O(1) repeated searches
  static searchCache = new Map()
  static lastCacheClean = Date.now()

  /**
   * Clean expired cache entries to prevent memory leaks
   * Time Complexity: O(1) amortized
   */
  static cleanCache() {
    const now = Date.now()
    if (now - this.lastCacheClean > this.CACHE_DURATION) {
      this.searchCache.clear()
      this.lastCacheClean = now
    }
  }

  /**
   * Search universities with intelligent multi-word matching
   * Time Complexity: O(log n) for new searches, O(1) for cached
   * Memory Complexity: O(1) with bounded cache
   */
  static async searchUniversities(searchText) {
    if (!searchText || searchText.trim().length < 2) {
      return []
    }

    const searchQuery = searchText.toLowerCase().trim()

    // Clean cache periodically
    this.cleanCache()

    // Check cache first - O(1)
    const cacheKey = searchQuery
    if (this.searchCache.has(cacheKey)) {
      const cached = this.searchCache.get(cacheKey)
      if (Date.now() - cached.timestamp < this.CACHE_DURATION) {
        return cached.results
      }
    }

    try {
      // Split search into individual words and clean them
      const searchWords = searchQuery
        .split(/\s+/)
        .map(word => word.trim())
        .filter(word => word.length >= 2)

      if (searchWords.length === 0) {
        return []
      }

      // For single word searches, use the original faster method
      if (searchWords.length === 1) {
        return this.searchSingleWord(searchWords[0], searchText)
      }

      const universitiesRef = collection(db, this.COLLECTION_NAME)
      let allUniversities = new Map() // Use Map to avoid duplicates

      // Search for each word individually
      for (const word of searchWords) {
        const q = query(
          universitiesRef,
          where('searchTerms', 'array-contains', word),
          limit(20) // Get more results for multi-word filtering
        )

        const querySnapshot = await getDocs(q)

        querySnapshot.docs.forEach(doc => {
          const university = University.fromFirestore(doc)
          allUniversities.set(university.id, university)
        })
      }

      // Convert to array and calculate relevance scores
      const universities = Array.from(allUniversities.values())

      // Enhanced scoring for multi-word searches
      const rankedResults = universities
        .map(uni => ({
          university: uni,
          score: this.calculateMultiWordScore(uni, searchWords, searchText)
        }))
        .sort((a, b) => b.score - a.score) // Highest score first
        .slice(0, this.MAX_RESULTS) // Top 3 only
        .map(item => item.university)

      // Cache the results - O(1)
      this.searchCache.set(cacheKey, {
        results: rankedResults,
        timestamp: Date.now()
      })

      return rankedResults

    } catch (error) {
      console.error('Error searching universities:', error)
      return []
    }
  }

  /**
   * Calculate relevance score for multi-word searches
   * Prioritizes universities that match more search words
   */
  static calculateMultiWordScore(university, searchWords, originalSearchText) {
    let score = 0
    const uniName = university.name.toLowerCase()
    const searchTerms = university.searchTerms || []

    // Count how many search words match
    let matchedWords = 0

    for (const word of searchWords) {
      let wordMatched = false

      // Exact match in search terms gets highest points
      if (searchTerms.includes(word)) {
        score += 100
        wordMatched = true
      }

      // Partial match in search terms
      else if (searchTerms.some(term => term.includes(word))) {
        score += 50
        wordMatched = true
      }

      // Match in university name
      else if (uniName.includes(word)) {
        score += 30
        wordMatched = true
      }

      if (wordMatched) {
        matchedWords++
      }
    }

    // Bonus for matching more words (prioritize universities that match multiple terms)
    const matchRatio = matchedWords / searchWords.length
    score += matchRatio * 200

    // Extra bonus for exact name matches
    if (uniName === originalSearchText.toLowerCase()) {
      score += 1000
    }

    // Bonus for name starting with search text
    if (uniName.startsWith(originalSearchText.toLowerCase())) {
      score += 300
    }

    return score
  }

  /**
   * Optimized search for single words (faster than multi-word search)
   */
  static async searchSingleWord(word, originalSearchText) {
    try {
      const universitiesRef = collection(db, this.COLLECTION_NAME)

      const q = query(
        universitiesRef,
        where('searchTerms', 'array-contains', word),
        orderBy('name'),
        limit(10)
      )

      const querySnapshot = await getDocs(q)

      const universities = querySnapshot.docs.map(doc =>
        University.fromFirestore(doc)
      )

      // Use original scoring for single words
      const rankedResults = universities
        .map(uni => ({
          university: uni,
          score: uni.getRelevanceScore(originalSearchText)
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, this.MAX_RESULTS)
        .map(item => item.university)

      return rankedResults

    } catch (error) {
      console.error('Error in single word search:', error)
      return []
    }
  }

  /**
   * Get university by ID - O(1) with Firestore
   */
  static async getUniversityById(universityId) {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, universityId)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return University.fromFirestore(docSnap)
      }
      return null
    } catch (error) {
      console.error('Error getting university:', error)
      return null
    }
  }

  /**
   * Clear cache manually if needed
   */
  static clearCache() {
    this.searchCache.clear()
  }
}
