import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Logo from '../assets/logo.jpg'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import classes from './Header.module.css'
import { UserContext } from '../../context/userContext'
import axios from 'axios';


const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click', 'load'];



const Header = () => {

  const userDataStorage = localStorage.getItem('user-data')
  const userDataObject = JSON.parse(userDataStorage);
  const { userData, setUserData, setLoggedIn } = useContext(UserContext);
  const navigation = useNavigate();
  const [show, setShow] = useState(window.innerWidth > 800 ? true : false)
  const [error, setError] = useState(false)


  useEffect(() => {
    setUserData(userDataObject)

    console.log(userData);

  }, [])


  function handleCloseNav() {

    if (window.innerWidth < 800) {
      setShow(false)
    } else {
      setShow(true)
    }
  }

  // console.log(userData);

  let timer;
  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };

  console.log(userData);

  const logoutAction = () => {
    handleCloseNav()
    if (userData) {
      setUserData(null)
    }
    localStorage.clear();
    setLoggedIn(false)
    setUserData(null)
    navigation('/api/users/login')



  };

  const handleLogoutTimer = () => {
    timer = setTimeout(() => {
      // clears any pending timer.
      resetTimer();
      // Listener clean up. Removes the existing event listener from the window
      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer);
      });
      // logs out user
      logoutAction();
    }, 600000); //600000
  }


  useEffect(() => {
    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer();
        handleLogoutTimer();

      });
    });
  }, []);


  const handleLogout = async () => {

    setError(true)
    // Faz a solicitação de logout
    await axios.get('api/users/logout')


    try {
      localStorage.clear();
      setLoggedIn(false)
      setUserData(null)
      setError(false)
      navigation('api/users/logout')


    } catch (error) {
      setError(error)
    }
  };


  return (

    <>
      <nav className={classes.navHeader}>
        <div className={classes.containerHeader}>
          {userData && (
            <>
              <Link to='/' className={classes.logoImg} onClick={handleCloseNav}>
                <div className={classes.logoDiv}>
                  <img src={Logo} alt='logo-computer' />
                  <h1>CodeBlog</h1>
                </div>
              </Link>
              {show && (
                <ul className={classes.navMenu}>
                  <li>
                    <Link to={`api/users/profile/${userData._id}`} onClick={handleCloseNav}>{userData.username}</Link>
                  </li>
                  <li>
                    <Link to="/create" onClick={handleCloseNav}>Create Post</Link>
                  </li>
                  <li>
                    <Link to="/posts/authors" onClick={handleCloseNav}>Authors</Link>
                  </li>
                  <li>
                    <Link to="/api/users/logout" onClick={handleLogout}>Logout</Link>
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
                <div className={classes.logoDiv}>
                  <img src={Logo} alt='logo-computer' />
                  <h1>CodeBlog</h1>
                </div>
              </Link>
              {show && (
                <ul className={classes.navMenu}>
                  <li>
                    <Link to="/posts/authors" onClick={handleCloseNav}>Authors</Link>
                  </li>

                  <li>
                    <Link to="/api/users/login" onClick={handleCloseNav}>Login</Link>
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


    </>

  )
}

export default Header