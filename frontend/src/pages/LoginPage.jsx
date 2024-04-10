import { useState, useContext, useEffect } from 'react'
import classes from './LoginPage.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import axios from 'axios'
import { BsFillEyeFill } from "react-icons/bs";
import { RiEyeCloseLine } from "react-icons/ri";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUserData, setLoggedIn } = useContext(UserContext)
  const [userDataLogin, setUserDataLogin] = useState({
    email: '',
    password: '',

  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  function changeInputHandler(identifier, e) {
    setUserDataLogin((prev) => {
      return { ...prev, [identifier]: e.target.value }
    })

  }

  const handleLoginUser = async (e) => {
    e.preventDefault();
    setLoading(true)
    const { email, password } = userDataLogin;
    if (!email || !password) {
      return setError('All fields are required.')
    }

    try {
      const { data } = await axios.post("/api/users/login", { email, password })
      console.log(data);
      if (data.error) {
        setError(data.error)
      } else {
        localStorage.setItem("user-data", JSON.stringify(data))
        setLoggedIn(true)
        setUserData(data);
        setUserDataLogin({
          email: '',
          password: '',
        });
        navigate('/')


      }

      setLoading(false)
    } catch (error) {
      console.error('Erro ao efetuar login:', error);
      setError(error.response?.data?.message || 'unknown error');
    }

    setLoading(false)

  }


  function showPasswordFunc(name) {
    // clearTimeout(timer);
    if (name === 'password') {
      setShowPassword(() => !showPassword)
    }

    setTimeout(() => {
      setShowPassword(false)


    }, 4000);

  }

  return (
    <section className={classes.login}>
      <div className={classes.mainLogin}>
        <h2>Sign In</h2>
        <form onSubmit={handleLoginUser} className={classes.form}>
          {error && (
            <p className={classes.error}>{error}</p>
          )}

          {loading && !error && <p className={classes.loading}>Loding...</p>}

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
          <div className={classes.password}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              name='password'
              value={userDataLogin.password}
              onChange={(e) => changeInputHandler('password', e)}

            />
            <span onClick={() => showPasswordFunc('password')}>{
              showPassword ? <BsFillEyeFill /> : <RiEyeCloseLine />
            }
            </span>
          </div>
          <button>Login</button>
        </form>
        <div className={classes.links}>

          <small >Are you forgot the password? <Link to="/api/users/send-email">Click here!</Link></small>
          <br />
          <small >Don't have an account? <Link to="/api/users/register">Sign up</Link></small>

        </div>
      </div>

    </section>
  )
}

export default LoginPage