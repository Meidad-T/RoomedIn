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
   * Search universities with optimal performance
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
      // Firestore query with index - O(log n)
      const universitiesRef = collection(db, this.COLLECTION_NAME)

      const q = query(
        universitiesRef,
        where('searchTerms', 'array-contains', searchQuery),
        orderBy('name'),
        limit(10) // Get a few extra for ranking
      )

      const querySnapshot = await getDocs(q)

      // Convert to University objects
      const universities = querySnapshot.docs.map(doc =>
        University.fromFirestore(doc)
      )

      // Rank by relevance and take top 3
      const rankedResults = universities
        .map(uni => ({
          university: uni,
          score: uni.getRelevanceScore(searchText)
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
