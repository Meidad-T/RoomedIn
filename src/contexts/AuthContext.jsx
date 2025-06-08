import { createContext, useContext, useEffect, useState } from 'react'
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth'
import { doc, getDoc, setDoc, connectFirestoreEmulator } from 'firebase/firestore'
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

  // Test Firebase connection
  const testFirebaseConnection = async () => {
    try {
      console.log('Testing Firebase connection...')
      console.log('Firebase config:', {
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
      })

      // Test Firestore connection
      const testDoc = doc(db, 'test', 'connection')
      await getDoc(testDoc)
      console.log('✅ Firebase connection successful!')
      return true
    } catch (error) {
      console.error('❌ Firebase connection failed:', error)
      return false
    }
  }

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

        // Return early to prevent onAuthStateChanged from overriding
        return { user, isNewUser: true }
      } else {
        // Existing user
        const profileData = userDoc.data()
        setUserProfile(profileData)
        setIsNewUser(!profileData.profileComplete)

        return { user, isNewUser: !profileData.profileComplete }
      }
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

      console.log('Updating profile for user:', user.uid)
      console.log('Profile data to save:', profileData)

      const updatedProfile = {
        ...userProfile,
        ...profileData,
        updatedAt: new Date()
      }

      console.log('Final profile data:', updatedProfile)

      await setDoc(doc(db, 'users', user.uid), updatedProfile, { merge: true })
      console.log('Profile saved to Firestore successfully!')

      setUserProfile(updatedProfile)

      return updatedProfile
    } catch (error) {
      console.error('Error updating user profile:', error)
      console.error('Firebase error details:', error.code, error.message)
      throw error
    }
  }

  // Check if user profile is complete
  const isProfileComplete = () => {
    return userProfile?.profileComplete === true
  }

  // Test Firebase connection on mount
  useEffect(() => {
    testFirebaseConnection()
  }, [])

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
    setIsNewUser,
    testFirebaseConnection
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
