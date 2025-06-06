import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../services/firebase'

const FirebaseTest = () => {
  const [status, setStatus] = useState('Testing Firebase connection...')
  const [universities, setUniversities] = useState([])

  useEffect(() => {
    const testFirebase = async () => {
      try {
        console.log('Testing Firebase connection...')
        const universitiesRef = collection(db, 'universities')
        const snapshot = await getDocs(universitiesRef)
        
        console.log('Firebase connected! Found', snapshot.docs.length, 'universities')
        
        const unis = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        
        setUniversities(unis)
        setStatus(`✅ Firebase connected! Found ${unis.length} universities`)
        
        unis.forEach(uni => {
          console.log('University:', uni.name, 'Search terms:', uni.searchTerms)
        })
        
      } catch (error) {
        console.error('Firebase connection failed:', error)
        setStatus(`❌ Firebase connection failed: ${error.message}`)
      }
    }

    testFirebase()
  }, [])

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'white', 
      padding: '10px', 
      border: '1px solid #ccc',
      borderRadius: '5px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <h4>Firebase Test</h4>
      <p>{status}</p>
      {universities.length > 0 && (
        <div>
          <h5>Universities found:</h5>
          <ul style={{ fontSize: '12px' }}>
            {universities.map(uni => (
              <li key={uni.id}>
                {uni.name} ({uni.searchTerms?.join(', ')})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FirebaseTest
