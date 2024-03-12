import { useState } from 'react'
import { Link } from "react-router-dom"
import Logo from '../assets/logo.jpg'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import classes from './Header.module.css'


const Header = () => {

  const [show, setShow] = useState(window.innerWidth > 800 ? true : false)

  function handleCloseNav() {
    if (window.innerWidth < 800) {
      setShow(false)
    } else {
      setShow(true)
    }
  }

  return (
    <nav className={classes.navHeader}>
      <div className={classes.containerHeader}>
        <Link to='/' className={classes.logoImg} onClick={handleCloseNav}>
          <img src={Logo} alt='logo-computer' />
        </Link>
        {show && (
          <ul className={classes.navMenu}>
            <li>
              <Link to="/profile/rsrss" onClick={handleCloseNav}>Ernest Smith</Link>
            </li>
            <li>
              <Link to="/create" onClick={handleCloseNav}>Create Post</Link>
            </li>
            <li>
              <Link to="/authors" onClick={handleCloseNav}>Authors</Link>
            </li>
            <li>
              <Link to="/logout" onClick={handleCloseNav}>Logout</Link>
            </li>
          </ul>
        )}
        {/* Navbar for a mobile */}
        <button onClick={() => setShow(!show)} className={`${classes.btnHeader}`}>
          {show ? <IoMdClose /> : < GiHamburgerMenu />}
        </button>
      </div>
    </nav>
  )
}

export default Header