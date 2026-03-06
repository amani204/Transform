import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import { Footer, Navbar } from './components/Layout'
import WorkoutLibraryPage from './pages/WorkoutLibraryPage'

function App() {
  return (
    <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/workoutLibrary" element={<WorkoutLibraryPage />} />
        </Routes>
        <Footer/>
    </Router>
  )
}

export default App