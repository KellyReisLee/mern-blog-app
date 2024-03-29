import { useState, useContext, useEffect } from 'react'
import classes from './LoginPage.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import axios from 'axios'

const LoginPage = () => {
  const navigate = useNavigate();
  const { userData, setUserData, setLoggedIn } = useContext(UserContext)
  const [userDataLogin, setUserDataLogin] = useState({
    email: '',
    password: '',

  })
  const [error, setError] = useState('')

  console.log(userData);


  function changeInputHandler(identifier, e) {
    setUserDataLogin((prev) => {
      return { ...prev, [identifier]: e.target.value }
    })

  }

  const handleLoginUser = async (e) => {
    e.preventDefault();
    const { email, password } = userDataLogin;
    if (!email || !password) {
      return setError('All fields are required.')
    }

    try {
      const { data } = await axios.post("/api/users/login", { email, password })

      if (data.error) {
        setError(data.error)
      } else {
        localStorage.setItem("user-data", JSON.stringify(data || []))
        setLoggedIn(true)
        setUserData(data);
        setUserDataLogin({
          email: '',
          password: '',
        });
        navigate('/')
        window.location.reload(true)

      }

    } catch (error) {
      console.error('Erro ao efetuar login:', error);
      setError(error.response?.data?.message || 'unknown error');
    }

  }

  return (
    <div className={classes.login}>
      <div className={classes.mainLogin}>
        <h2>Sign In</h2>
        <form onSubmit={handleLoginUser} className={classes.form}>
          {error && (
            <p>{error}</p>
          )}

          {/* email */}
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={userDataLogin.email}
            onChange={(e) => changeInputHandler('email', e)}
            autoFocus

          />
          {/* password */}
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={userDataLogin.password}
            onChange={(e) => changeInputHandler('password', e)}

          />

          <button>Login</button>
        </form>
        <div className={classes.links}>

          <small >Are you forgot the password? <Link to="/login">Click here!</Link></small>
          <br />
          <small >Don't have an account? <Link to="/api/users/register">Sign up</Link></small>

        </div>
      </div>

    </div>
  )
}

export default LoginPage