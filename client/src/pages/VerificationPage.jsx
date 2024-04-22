import { useEffect, useState } from 'react'
import classes from './VerificationPage.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'



const VerificationPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('')
  const { id, token } = useParams();
  console.log(id, token);

  useEffect(() => {

    const verifyEmail = async () => {
      try {
        const { data } = await axios.get(`api/users/verify/${id}/${token}`)

        if (!data) {
          setError('Not possible verify data from the user.')
        }
        setMessage(data.message)
        setTimeout(() => {
          navigate('/api/users/login')
        }, 2000);

      } catch (error) {
        setError({ error: 'Not possible validate user.' })
      }

    }
    verifyEmail()
  }, [])

  return (
    <>
      <Header />
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
          {error && !message && <p className={classes.error}>{error}</p>}
          {message && !error && <>
            <p className={classes.message}>
              {message}
            </p>

          </>}



        </div>

      </section>
      <Footer />
    </>
  )
}

export default VerificationPage