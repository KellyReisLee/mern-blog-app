import { useState } from 'react'
import classes from './ChangePassword.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { BsFillEyeFill } from "react-icons/bs";
import { RiEyeCloseLine } from "react-icons/ri";
import Header from '../components/Header'
import Footer from '../components/Footer'
import { isValid, validEmail, validation } from '../helpers/validation'
import axios from 'axios'

const ChangePassword = () => {
  const { id, token } = useParams();
  const [loading, setLoading] = useState();
  const [error, setError] = useState('')
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userChangePass, setUserChangePass] = useState({
    email: '',
    password: '',
    confirmPassword: ''

  })




  function changeInputHandler(identifier, e) {
    setUserChangePass((prev) => {
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


  const handleChangePassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { email, password, confirmPassword } = userChangePass;

    if (validation(userChangePass, isValid, validEmail, setError)) {
      try {
        const { data } = await axios.patch(`/api/users/change-password/${id}/${token}`, { email, password, confirmPassword })
        if (!data) {
          setError('Could not send email.')
        } else {
          setMessage(data.message)
        }
        setTimeout(() => {
          navigate('/api/users/login')
        }, 4000);
      } catch (error) {
        setError(error.response?.data?.error || 'unknown error');
      }
    }
    setLoading(false)
  }



  return (
    <>
      <Header />
      <section className={classes.change}>
        <div className={classes.mainChange}>
          <h2>Change Password</h2>
          <form onSubmit={handleChangePassword} className={classes.form}>
            {error && (
              <p className={classes.error}>{error}</p>
            )}
            {message && !error && !loading && <p className={classes.message}>{message}</p>}
            {loading && !error && <p className={classes.loading}>Loading...</p>}

            {/* email */}
            <input
              type='email'
              placeholder='Email'
              name='email'
              value={userChangePass.email}
              onChange={(e) => changeInputHandler('email', e)}
              autoFocus

            />
            {/* password */}
            <div className={classes.password}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                name='password'
                value={userChangePass.password}
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
                value={userChangePass.confirmPassword}
                onChange={(e) => changeInputHandler('confirmPassword', e)}
              />

              <span onClick={() => showPasswordFunc('confirmPassword')}>{
                showConfirmPassword ? <BsFillEyeFill /> : <RiEyeCloseLine />
              }</span>
            </div>

            <button>Send</button>
          </form>

        </div>

      </section>
      <Footer />
    </>
  )
}

export default ChangePassword
