import { useState } from 'react'
import classes from './Register.module.css'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const isValid = (password) => {
    // Regular expression for password validation
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    // Test the password against the regular expression
    return regex.test(password);

  }

  function validation() {
    const { username, password, confirmPassword } = userData;

    if (username.length < 4) {
      alert('The username must contain at least 4 characters.')
      return false
    } else if (!isValid(password)) {
      alert('Password must contain minimum 8 characters, including: 1 special character(! # $ % ?) and 1 capital letter.')
      return false

    } else if (password !== confirmPassword) {
      alert('Password and Confirm Password have to match!')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validation) {
      try {
        const { data } = await axios.post("/register", {
          username, email, password
        })

        if (data.error) {
          alert(error)
        } else {
          alert('Register Successful. Welcome!')
          setUserData({})

        }

      } catch (error) {
        console.log(error);
      }
    }

  }



  function changeInputHandler(e) {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })

  }

  return (
    <section className={classes.register}>
      <div className={classes.mainRegister}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className={classes.form}>
          <p>This is an error message</p>
          <input
            type='text'
            placeholder='Username'
            name='username'
            value={userData.username}
            onChange={changeInputHandler}
            autoFocus

          />
          {/* email */}
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={userData.email}
            onChange={changeInputHandler}

          />
          {/* password */}
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={userData.password}
            onChange={changeInputHandler}

          />
          {/* confirm password */}
          <input
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            value={userData.confirmPassword}
            onChange={changeInputHandler}

          />
        </form>
        <button>Register</button>
        <small>Already have an account? <Link to="/login">Sign in</Link></small>

      </div>

    </section>
  )
}

export default RegisterPage