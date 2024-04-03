import { useState, useContext } from 'react'
import classes from './ChangePassword.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import axios from 'axios'

const ChangePassword = () => {
  const { id, token } = useParams();
  const [error, setError] = useState('')
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { setUserData, setLoggedIn } = useContext(UserContext)
  const [userChangePass, setUserChangePass] = useState({
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

  function validEmail(email) {
    // Expressão regular para validar um endereço de e-mail
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validation() {
    const { email, password, confirmPassword } = userChangePass;

    if (!email || !password || !confirmPassword) {
      setError('All fields are required!')
      return false
    } else if (!validEmail(email)) {
      setError('This is Email is not valid!')
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


  function changeInputHandler(identifier, e) {
    setUserChangePass((prev) => {
      return { ...prev, [identifier]: e.target.value }
    })

  }


  const handleChangePassword = async (e) => {
    e.preventDefault()
    const { email, password, confirmPassword } = userChangePass;


    if (validation()) {
      try {
        const { data } = await axios.patch(`/api/users/change-password/${id}/${token}`, { email, password, confirmPassword })
        console.log(data);
        if (data.error) {
          setError(data.error)
        } else {
          setLoggedIn(true)
          setUserChangePass({
            email: '',
            password: '',
            confirmPassword: ''
          });
          setMessage(data.message)

          setTimeout(() => {
            setMessage('')
            navigate('/api/users/login')
          }, 2000);

          //window.location.reload(true)


        }
      } catch (error) {
        console.log(error);
        // console.error('Could not change password!', error);
        setError(error.response?.data?.error || 'unknown error');
      }



    }


  }

  return (
    <section className={classes.change}>
      <div className={classes.mainChange}>
        <h2>Change Password</h2>
        <form onSubmit={handleChangePassword} className={classes.form}>
          {error && (
            <p className={classes.error}>{error}</p>
          )}
          {message && !error && <p className={classes.message}>{message}</p>}

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
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={userChangePass.password}
            onChange={(e) => changeInputHandler('password', e)}

          />

          {/* Confirm Password */}
          <input
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            value={userChangePass.confirmPassword}
            onChange={(e) => changeInputHandler('confirmPassword', e)}

          />

          <button>Send</button>
        </form>

      </div>

    </section>
  )
}

export default ChangePassword
