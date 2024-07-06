import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
    const [menu,setMenu] = useState("Menu");


  return (
    <div className='navbar'>
        <img src={assets.turftime} alt="" className="logo" />
        <ul className="navbar-menu">
            <li onClick={()=>setMenu("Home")} className={menu == "Home"? "active":""}>Home</li>
            <li onClick={()=>setMenu("Menu")} className={menu == "Menu"? "active":""}>Menu</li>
            <li onClick={()=>setMenu("Contact-us")} className={menu == "Contact-us"? "active":""}>Contact Us</li>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="search-icon">
                <img src={assets.basket_icon} alt="" />
                <div className="dot"></div>
            </div>
        </div>
        <button>Sign In</button>
    </div>
  )
}

export default Navbar
