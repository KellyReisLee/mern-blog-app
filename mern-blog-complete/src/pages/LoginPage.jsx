import { useState } from 'react'
import classes from './LoginPage.module.css'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const [userData, setUserData] = useState({

    email: '',
    password: '',

  })

  function changeInputHandler(e) {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })

  }

  return (
    <section className={classes.login}>
      <div className={classes.mainLogin}>
        <h2>Sign In</h2>
        <form className={classes.form}>
          <p>This is an error message</p>

          {/* email */}
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={userData.email}
            onChange={changeInputHandler}
            autoFocus

          />
          {/* password */}
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={userData.password}
            onChange={changeInputHandler}

          />

        </form>
        <button>Login</button>
        <small>Are you forgot the password? <Link to="/login">Click here!</Link></small>

      </div>

    </section>
  )
}

export default LoginPage