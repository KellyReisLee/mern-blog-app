import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Logo from '../assets/logo.jpg'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import classes from './Header.module.css'
import { UserContext } from '../../context/userContext'
import axios from 'axios';




const userDataStorage = localStorage.getItem('user-data')
const userDataObject = JSON.parse(userDataStorage);
const Header = () => {

  const { userData, setUserData } = useContext(UserContext);
  console.log(userData);
  const navigation = useNavigate();
  const [show, setShow] = useState(window.innerWidth > 800 ? true : false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setUserData(userDataObject)
    console.log(userData);
  }, [userData])


  function handleCloseNav() {
    if (window.innerWidth < 800) {
      setShow(false)
    } else {
      setShow(true)
    }
  }


  const handleLogout = () => {
    setError(true)
    // Faz a solicitação de logout
    axios.get('/api/users/logout').then((res) => {

      if (res.data.Message === 'Success Logout') {
        console.log(res.data.Message);
        localStorage.clear();


      } else {
        console.log('Error');
      }

    }
    ).catch(err => console.log(err))
    localStorage.clear();

    handleCloseNav()
    setUserData([])

    setTimeout(() => {
      navigation('/logout')
      window.location.reload(true)
    }, 2000);

  };


  return (

    <>
      <nav className={classes.navHeader}>
        <div className={classes.containerHeader}>
          {userData && (
            <>
              <Link to='/' className={classes.logoImg} onClick={handleCloseNav}>
                <img src={Logo} alt='logo-computer' />
              </Link>
              {show && (
                <ul className={classes.navMenu}>
                  <li>
                    <Link to={`api/users/profile/${userData.id}`} onClick={handleCloseNav}>{userData.username}</Link>
                  </li>
                  <li>
                    <Link to="/create" onClick={handleCloseNav}>Create Post</Link>
                  </li>
                  <li>
                    <Link to="/authors" onClick={handleCloseNav}>Authors</Link>
                  </li>
                  <li>
                    <Link to="/logout" onClick={handleLogout}>Logout</Link>
                  </li>
                </ul>
              )}
              {/* Navbar for a mobile */}

              {
                window.innerWidth < 800 && (
                  <button onClick={() => setShow(!show)} className={`${classes.btnHeader}`}>
                    {show ? <IoMdClose /> : < GiHamburgerMenu />}
                  </button>
                )
              }
            </>
          )}

          {!userData && (
            <>
              <Link to='/' className={classes.logoImg} onClick={handleCloseNav}>
                <img src={Logo} alt='logo-computer' />
              </Link>
              {show && (
                <ul className={classes.navMenu}>

                  <li>
                    <Link to="/api/users/login" onClick={handleCloseNav}>Login</Link>
                  </li>
                  <li>
                    <Link to="/authors" onClick={handleCloseNav}>Authors</Link>
                  </li>

                </ul>
              )}
              {/* Navbar for a mobile */}

              {
                window.innerWidth < 800 && (
                  <button onClick={() => setShow(!show)} className={`${classes.btnHeader}`}>
                    {show ? <IoMdClose /> : < GiHamburgerMenu />}
                  </button>
                )
              }
            </>
          )}


        </div>



      </nav>
      {error && (
        <div className={classes.error}>
          <p>Logout Successfully!</p>
        </div>
      )}

    </>

  )
}

export default Header