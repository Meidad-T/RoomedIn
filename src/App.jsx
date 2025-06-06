import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Mission from './components/Mission/Mission'
import FAQPage from './pages/FAQ/FAQPage'
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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </Router>
  )
}

export default App
