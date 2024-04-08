import { useState } from 'react'
import classes from './Register.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BsFillEyeFill } from "react-icons/bs";
import { RiEyeCloseLine } from "react-icons/ri";



const RegisterPage = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)


  const isValid = (password) => {
    // Regular expression for password validation
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    // Test the password against the regular expression
    return regex.test(password);

  }

  function validation() {
    const { username, email, password, confirmPassword } = userData;

    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required!')
      return false
    } else if (username.length < 4) {
      setError('The username must contain at least 4 characters.')
      return false
    } else if (!isValid(password)) {
      setError('Password must contain minimum 8 characters, including: 1 lowercase letter, 1 special character(@$!%*?&), 1 capital letter and at least 1 number(0-9)')
      return false

    } else if (password.length > 20 || confirmPassword.length > 20) {
      setError('Password cannot be longer than 20 characters.')
      return false
    } else if (password !== confirmPassword) {
      setError('Password and Confirm Password have to match!')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    if (validation()) {
      const { username, email, password, confirmPassword } = userData;
      try {
        const data = await axios.post("api/users/register", {
          username, email, password, confirmPassword
        })

        if (data.error) {
          setError(data.error)
        } else {
          setError('')
          setSuccess('Register Successfully! Check your email!')
          setUserData({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
          })

        }

      } catch (error) {
        setError(error.response?.data.message || error)
      }
    }

    setLoading(false)
  }



  function changeInputHandler(identifier, e) {
    setUserData((prev) => {
      return { ...prev, [identifier]: e.target.value }
    })

  }


  function showPasswordFunc(name) {
    // clearTimeout(timer);
    if (name === 'password') {
      setShowPassword(() => !showPassword)
    }

    if (name === 'confirmPassword') {
      setShowConfirmPassword(() => !showConfirmPassword)
    }

    setTimeout(() => {
      setShowPassword(false)
      setShowConfirmPassword(false)

    }, 4000);

  }


  return (
    <section className={classes.register}>
      <div className={classes.mainRegister}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className={classes.form}>
          {error && (
            <p className={classes.error}>{error}</p>
          )}
          {success && !error && (
            <p className={classes.success}>{success}</p>
          )}
          {loading && !error && !message && <p className={classes.loading}>Loading...</p>}

          <input
            type='text'
            placeholder='Username'
            name='username'
            value={userData.username}
            onChange={(e) => changeInputHandler('username', e)}
            autoFocus

          />
          {/* email */}
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={userData.email}
            onChange={(e) => changeInputHandler('email', e)}

          />
          {/* password */}
          <div className={classes.password}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              name='password'
              value={userData.password}
              onChange={(e) => changeInputHandler('password', e)}

            />
            <span onClick={() => showPasswordFunc('password')}>{
              showPassword ? <BsFillEyeFill /> : <RiEyeCloseLine />
            }
            </span>
          </div>


          {/* confirm password */}
          <div className={classes.password}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Confirm Password'
              name='confirmPassword'
              value={userData.confirmPassword}
              onChange={(e) => changeInputHandler('confirmPassword', e)}
            />

            <span onClick={() => showPasswordFunc('confirmPassword')}>{
              showConfirmPassword ? <BsFillEyeFill /> : <RiEyeCloseLine />
            }</span>
          </div>
          <button >Register</button>
        </form>

        <small>Already have an account? <Link to="/api/users/login">Sign in</Link></small>

      </div>

    </ section>
  )
}

export default RegisterPage