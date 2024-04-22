import { useState } from 'react'
import classes from './Register.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BsFillEyeFill } from "react-icons/bs";
import { RiEyeCloseLine } from "react-icons/ri";
import Header from '../components/Header'
import Footer from '../components/Footer'
import { registerValidation, isValid, validEmail } from '../helpers/validation'

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const { username, email, password, confirmPassword } = userData;
    if (registerValidation(username, email, password, confirmPassword, isValid, validEmail, setError)) {

      try {
        const data = await axios.post("api/users/register", {
          username, email, password, confirmPassword
        })

        console.log(data);
        if (!data) {
          setError('Could not find data')

        } else {
          setError('')
          setSuccess(data.data.message || 'Register Successfully! Check your email!')
          setUserData({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
          })


        }

      } catch (error) {
        setError(error.response?.data?.message || error)
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

    if (name === 'password') {
      setShowPassword(() => !showPassword)
    }
    if (name === 'confirmPassword') {
      setShowConfirmPassword(() => !showConfirmPassword)
    }
  }


  return (
    <section className={classes.noScroll}>
      <Header />
      <section className={classes.section}>
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
              {loading && !error && !success && <p className={classes.loading}>Loading...</p>}

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
        </div>

      </section>
      <Footer />
    </section>
  )
}

export default RegisterPage