/**
 * Matching Service - O(1) University-based Roommate Matching
 * 
 * This service provides efficient matching functionality by:
 * 1. Querying users by university (indexed field for O(1) lookup)
 * 2. Filtering out the current user
 * 3. Returning potential matches for the matching interface
 */

import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from './firebase'

/**
 * Get all potential matches for a user at a specific university
 * 
 * @param {string} universityId - The university document ID
 * @param {string} currentUserId - Current user's ID to exclude from results
 * @returns {Promise<Array>} Array of potential match user profiles
 */
export const getUniversityMatches = async (universityId, currentUserId) => {
  try {
    console.log('MatchingService: Fetching matches for university:', universityId)
    console.log('MatchingService: Excluding current user:', currentUserId)

    // Create query to find all users at the same university
    // This is O(1) because 'university' field should be indexed in Firestore
    const usersRef = collection(db, 'users')
    const universityQuery = query(
      usersRef,
      where('university', '==', universityId),
      where('profileComplete', '==', true) // Only show users with complete profiles
    )

    // Execute the query
    const querySnapshot = await getDocs(universityQuery)
    
    // Process results and filter out current user
    const matches = []
    querySnapshot.forEach((doc) => {
      const userData = doc.data()
      
      // Skip current user
      if (doc.id === currentUserId) {
        return
      }

      // Add user data with document ID
      matches.push({
        id: doc.id,
        ...userData
      })
    })

    console.log(`MatchingService: Found ${matches.length} potential matches`)
    
    // Shuffle array to randomize order (optional)
    return shuffleArray(matches)

  } catch (error) {
    console.error('MatchingService: Error fetching university matches:', error)
    throw new Error('Failed to load potential matches')
  }
}

/**
 * Shuffle array to randomize match order
 * Fisher-Yates shuffle algorithm - O(n)
 * 
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Get university name by ID (for display purposes)
 * 
 * @param {string} universityId - University document ID
 * @returns {Promise<string>} University name
 */
export const getUniversityName = async (universityId) => {
  try {
    // TODO: Implement university lookup if needed
    // For now, return the ID as name
    return universityId
  } catch (error) {
    console.error('MatchingService: Error fetching university name:', error)
    return 'Unknown University'
  }
}

/**
 * Record a match action (for future implementation)
 * This will be used later to store user decisions
 * 
 * @param {string} userId - Current user ID
 * @param {string} targetUserId - Target user ID
 * @param {string} action - 'match', 'skip', 'reject'
 * @returns {Promise<void>}
 */
export const recordMatchAction = async (userId, targetUserId, action) => {
  try {
    console.log(`MatchingService: Recording ${action} action from ${userId} to ${targetUserId}`)
    
    // TODO: Implement match action storage
    // This could be stored in a separate 'match_actions' collection
    // Structure: { userId, targetUserId, action, timestamp }
    
    console.log('MatchingService: Match action recorded (placeholder)')
  } catch (error) {
    console.error('MatchingService: Error recording match action:', error)
    throw new Error('Failed to record match action')
  }
}

/**
 * Send match notification (for future implementation)
 * This will handle email notifications when users match
 * 
 * @param {Object} fromUser - User who sent the match request
 * @param {Object} toUser - User who received the match request
 * @returns {Promise<void>}
 */
export const sendMatchNotification = async (fromUser, toUser) => {
  try {
    console.log(`MatchingService: Sending match notification from ${fromUser.email} to ${toUser.email}`)
    
    // TODO: Implement email notification logic
    // This could integrate with email service (SendGrid, etc.)
    
    console.log('MatchingService: Match notification sent (placeholder)')
  } catch (error) {
    console.error('MatchingService: Error sending match notification:', error)
    throw new Error('Failed to send match notification')
  }
}

/**
 * Get match statistics for analytics (optional)
 * 
 * @param {string} universityId - University ID
 * @returns {Promise<Object>} Match statistics
 */
export const getMatchStats = async (universityId) => {
  try {
    // TODO: Implement match statistics
    return {
      totalUsers: 0,
      activeUsers: 0,
      totalMatches: 0
    }
  } catch (error) {
    console.error('MatchingService: Error fetching match stats:', error)
    return null
  }
}
