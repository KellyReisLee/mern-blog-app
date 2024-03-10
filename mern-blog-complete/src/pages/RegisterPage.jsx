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

  function changeInputHandler(e) {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })

  }

  return (
    <section className={classes.register}>
      <div className={classes.mainRegister}>
        <h2>Sign Up</h2>
        <form className={classes.form}>
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