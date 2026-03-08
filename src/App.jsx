import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import WorkoutLibraryPage from './pages/WorkoutLibraryPage'
import { Footer, Navbar, ScrollToTop } from './components/Layout'


function App() {
  

  return (
    <>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workoutLibrary" element={<WorkoutLibraryPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App