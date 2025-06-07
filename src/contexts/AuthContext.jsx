import { createContext, useContext, useEffect, useState } from 'react'
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, googleProvider, db } from '../services/firebase'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isNewUser, setIsNewUser] = useState(false)

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      // Set persistence to local storage
      await setPersistence(auth, browserLocalPersistence)
      
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      
      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      
      if (!userDoc.exists()) {
        // New user - create basic profile
        const basicProfile = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date(),
          profileComplete: false
        }
        
        await setDoc(doc(db, 'users', user.uid), basicProfile)
        setUserProfile(basicProfile)
        setIsNewUser(true)
      } else {
        // Existing user
        setUserProfile(userDoc.data())
        setIsNewUser(false)
      }
      
      return result
    } catch (error) {
      console.error('Error signing in with Google:', error)
      throw error
    }
  }

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      setUserProfile(null)
      setIsNewUser(false)
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  // Update user profile
  const updateUserProfile = async (profileData) => {
    try {
      if (!user) throw new Error('No user logged in')
      
      const updatedProfile = {
        ...userProfile,
        ...profileData,
        updatedAt: new Date()
      }
      
      await setDoc(doc(db, 'users', user.uid), updatedProfile, { merge: true })
      setUserProfile(updatedProfile)
      
      return updatedProfile
    } catch (error) {
      console.error('Error updating user profile:', error)
      throw error
    }
  }

  // Check if user profile is complete
  const isProfileComplete = () => {
    return userProfile?.profileComplete === true
  }

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)

        // Get user profile from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          if (userDoc.exists()) {
            const profileData = userDoc.data()
            setUserProfile(profileData)
            // Check if profile is complete to determine if user is new
            setIsNewUser(!profileData.profileComplete)
          } else {
            // User document doesn't exist, they are definitely new
            setIsNewUser(true)
          }
        } catch (error) {
          console.error('Error fetching user profile:', error)
          setIsNewUser(true) // Assume new user on error
        }
      } else {
        setUser(null)
        setUserProfile(null)
        setIsNewUser(false)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    user,
    userProfile,
    loading,
    isNewUser,
    signInWithGoogle,
    logout,
    updateUserProfile,
    isProfileComplete,
    setIsNewUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
