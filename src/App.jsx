import { useState } from 'react'
import Navbar from './components/Layout/Navbar'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './pages/Home'

function App() {

  return (
    
    <>
    <Router>
     <Navbar/>
     <Home/>
    </Router>
    
    </>
  )
}

export default App
