import React from 'react'
import { Link } from "react-router-dom"
import Logo from '../assets/logo.jpg'
import { GiHamburgerMenu } from "react-icons/gi";
// import { IoMdClose } from "react-icons/io";
import classes from './Header.module.css'


const Header = () => {
  return (
    <nav className={classes.navHeader}>
      <div className={classes.containerHeader}>
        <Link to='/' className={classes.logoImg}>
          <img src={Logo} alt='logo-computer' />
        </Link>
        <ul className={classes.navMenu}>
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
        <button className={`${classes.btnHeader} ${classes.displayNone}`}>
          <GiHamburgerMenu />
        </button>
      </div>
    </nav>
  )
}

export default Header