import { useState } from 'react'
import Navbar from './components/Layout/Navbar'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Layout/Footer'

function App() {

  return (
    
    <>
    <Router>
     <Navbar/>
     <Home/>
      <Footer/>
    </Router>
   
    </>
  )
}

export default App
