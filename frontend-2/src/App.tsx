import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Home } from './pages/Home'
import { Turfs } from './pages/Turfs'
import { Book } from './pages/Book'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/turfs" element={<Turfs/>}></Route>
          <Route path="/book" element={<Book/>}></Route>

        </Routes>
      
      </BrowserRouter>
     
    </>
  )
}

export default App
