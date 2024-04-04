import { useState } from 'react'
import classes from './SendEmail.module.css'
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const SendEmail = () => {
  const [sended, setSended] = useState(false);
  const [emailData, setEmailData] = useState({ email: '' });
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')


  function validEmail(email) {
    // Expressão regular para validar um endereço de e-mail
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  const handleSendEmail = async (e) => {
    e.preventDefault();
    const { email } = emailData;

    if (!email) {
      return setError('The email field is required!');
    }

    if (!validEmail(email)) {
      return setError('Please! Write a valid email.');
    }

    try {
      const response = await axios.post('/api/users/send-email', { email }); // Corrigido: Passando um objeto com email
      if (!response) {
        console.log('Could not send the email. Please, try later.');
      }
      console.log(response);
      setMessage(response.data.message)
      setTimeout(() => {
        setSended(true);
      }, 3000)
    } catch (error) {
      console.log(error);
      setError(error.response.data.error || error.message); // Corrigido: Definindo o estado de erro com a mensagem de erro
    }
  };


  function changeInputHandler(identifier, e) {
    setEmailData((prev) => {
      return { ...prev, [identifier]: e.target.value }
    })

  }


  return (
    <section className={classes.section}>
      <div className={classes.container}>
        {!sended && (<>
          <form className={classes.form}>
            <h1>Send your email</h1>
            <hr className={classes.firstHr} />
            <p className={classes.message}> Please enter you email. If you have an account with us you will receive a link to change your password.</p>

            {error && (<p className={classes.error}>{error}</p>)}


            <input
              value={emailData.email}
              onChange={(e) => changeInputHandler('email', e)}
              className={classes.input}
              type='email'
              name='email'
              placeholder='Email'
              autoFocus />

            <hr className={classes.secondHr} />

            <div className={classes.btns}>
              <button className={`${classes.btn} ${classes.cancel}`}><Link to='/api/users/login'>Cancel</Link></button>
              <button onClick={handleSendEmail} className={`${classes.btn} ${classes.send}`}>Send</button>
            </div>
          </form>
        </>)}

        {sended && (<>
          <form className={classes.form}>
            <h1>Thank you! <span><IoCheckmarkDoneSharp size={40} /></span></h1>
            <hr className={classes.firstHr} />
            {message && (<h3 className={classes.checkEmail}>
              {message}
            </h3>)}

          </form>
        </>)}
      </div>


    </section>
  )
}

export default SendEmail