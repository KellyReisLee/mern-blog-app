import { useState } from 'react'
import classes from './Register.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

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

    if (validation()) {
      const { username, email, password, confirmPassword } = userData;
      try {
        const data = await axios.post("api/users/register", {
          username, email, password, confirmPassword
        })
        setLoading(true)

        if (!data) {
          console.log(data.message);
        } else {
          setError('')
          setSuccess('Register Successfully! Check your email!')
          setUserData({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
          })
          setLoading(false)
        }

      } catch (error) {
        setError(error.response.data.message)
      }
    }

  }



  function changeInputHandler(identifier, e) {
    setUserData((prev) => {
      return { ...prev, [identifier]: e.target.value }
    })

  }

  return (
    <div className={classes.register}>
      <div className={classes.mainRegister}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className={classes.form}>
          {error && (
            <p className={classes.error}>{error}</p>
          )}
          {success && !error && (
            <p className={classes.success}>{success}</p>
          )}
          {loading && !error && !message && <p>Loading...</p>}

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
          <input
            type='password'

            placeholder='Password'
            name='password'
            value={userData.password}
            onChange={(e) => changeInputHandler('password', e)}

          />
          {/* confirm password */}
          <input
            type='password'

            placeholder='Confirm Password'
            name='confirmPassword'
            value={userData.confirmPassword}
            onChange={(e) => changeInputHandler('confirmPassword', e)}

          />
          <button >Register</button>
        </form>

        <small>Already have an account? <Link to="/api/users/login">Sign in</Link></small>

      </div>

    </ div>
  )
}

export default RegisterPage