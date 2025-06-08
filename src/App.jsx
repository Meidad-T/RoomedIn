import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Mission from './components/Mission/Mission'
import FAQPage from './pages/FAQ/FAQPage'
import { SignInPage, OnboardingPage } from './pages/Auth'
import './App.css'

// Home page component
const HomePage = () => (
  <div className="app">
    <Header />
    <Hero />
    <Mission />
  </div>
)

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/signin" element={<SignInPage />} />

          {/* Protected routes */}
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
