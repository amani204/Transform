import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import WorkoutLibraryPage from './pages/WorkoutLibraryPage'
import { Footer, Navbar } from './components/Layout'


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