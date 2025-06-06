import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Mission from './components/Mission/Mission'
import FirebaseTest from './components/FirebaseTest'
import './App.css'

function App() {
  return (
    <div className="app">
      <FirebaseTest />
      <Header />
      <Hero />
      <Mission />
    </div>
  )
}

export default App
