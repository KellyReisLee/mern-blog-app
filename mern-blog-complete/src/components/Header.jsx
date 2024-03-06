import React from 'react'
import { Link } from "react-router-dom"
import Logo from '../assets/blog-1.jpg'
import { GiHamburgerMenu } from "react-icons/gi";


const Header = () => {
  return (
    <nav>
      <div className='container nav__container'>
        <Link to='/' className='nav__logo'>
          <img src={Logo} alt='logo-computer' />
        </Link>
        <ul className='nav__menu'>
          <li>
            <Link to="/profile">Ernest Smith</Link>
          </li>
          <li>
            <Link to="/create">Create Post</Link>
          </li>
          <li>
            <Link to="/authors">Authors</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
        {/* Navbar for a mobile */}
        <button className='nav__toggle-btn'>
          <GiHamburgerMenu />
        </button>
      </div>
    </nav>
  )
}

export default Header