import { useEffect, useState, useContext } from 'react'
import classes from './VerificationPage.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../context/userContext'


const VerificationPage = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('')
  const { id, token } = useParams();
  console.log(id, token);

  useEffect(() => {
    // console.log(userData);
    // const verifyEmail = async () => {
    //   try {
    //     const { data } = await axios.get(`api/users/verify/${id}/${token}`)
    //     console.log(data);
    //     if (!data) {
    //       setError('Not possible verify data from the user.')
    //     }
    //     setMessage(data.message)

    //     setTimeout(() => {
    //       navigate('/api/users/login')
    //     }, 2000);

    //   } catch (error) {
    //     setError({ error: 'Not possible validate user.' })
    //   }

    // }
    // verifyEmail()
  }, [])

  return (
    <section className={classes.container}>
      <div className={classes.box}>
        <div className={classes.loadingMessage}>
          <h1>Verifying User </h1>
          <div className={classes.boucingLoader}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        {/* {error && !message && <p className={classes.error}>{error}</p>}
      {message && !error && <>
        <p className={classes.message}>
          {message}
        </p>

      </>} */}

        <p className={classes.error}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas maecenas.
        </p>

      </div>

    </section>
  )
}

export default VerificationPage