/**
 * University data model
 * Optimized for O(1) operations where possible
 */
export class University {
  constructor({
    id,
    name,
    searchTerms = [],
    city,
    state,
    country,
    website,
    type
  }) {
    this.id = id
    this.name = name
    this.searchTerms = searchTerms
    this.city = city
    this.state = state
    this.country = country
    this.website = website
    this.type = type
  }

  /**
   * Create University instance from Firestore document
   * Time Complexity: O(1)
   */
  static fromFirestore(doc) {
    const data = doc.data()
    return new University({
      id: doc.id,
      ...data
    })
  }

  /**
   * Get display name - O(1)
   */
  getDisplayName() {
    return this.name
  }

  /**
   * Get location string - O(1)
   */
  getLocationString() {
    const parts = []
    if (this.city) parts.push(this.city)
    if (this.state) parts.push(this.state)
    return parts.join(', ')
  }

  /**
   * Calculate search relevance score for ranking
   * Higher score = better match
   * Time Complexity: O(k) where k is number of search terms
   */
  getRelevanceScore(searchText) {
    if (!searchText) return 0
    
    const query = searchText.toLowerCase().trim()
    let score = 0
    
    // Exact name match gets highest score
    if (this.name.toLowerCase() === query) {
      return 1000
    }
    
    // Name starts with query gets high score
    if (this.name.toLowerCase().startsWith(query)) {
      score += 500
    }
    
    // Name contains query gets medium score
    if (this.name.toLowerCase().includes(query)) {
      score += 100
    }
    
    // Search terms exact match
    if (this.searchTerms.includes(query)) {
      score += 200
    }
    
    // Search terms partial match
    const partialMatches = this.searchTerms.filter(term => 
      term.startsWith(query) || term.includes(query)
    ).length
    score += partialMatches * 50
    
    return score
  }
}
