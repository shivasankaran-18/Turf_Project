import React, { useState } from 'react'
import './home.css'

const Home = () => {
  const [turf,setTurf] = useState([]);
  x = fetch("http://localhost:4000/api/turfdetails/list").then()
  return (
    <div>
      <h1>HI</h1>
    </div>
  )
}

export default Home
