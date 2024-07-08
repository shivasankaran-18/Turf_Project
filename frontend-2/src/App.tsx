import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { DashBoard } from './pages/Dashboard'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/dashboard" element={<DashBoard />}></Route>

        </Routes>
      
      </BrowserRouter>
     
    </>
  )
}

export default App
