import { useEffect, useState } from 'react'
import classes from './VerificationPage.module.css'
import { useNavigation } from 'react-router-dom'
import axios from 'axios'

const VerificationPage = () => {
  const navigate = useNavigation();
  const [userDate, setUserDate] = useState('');

  useEffect(() => {
    axios.get('api/users/verify').then(({ data }) => {
      console.log(data);
    })

  }, [])

  return (
    <div className={classes.container}>
      <h1>Verification page</h1>
    </div>
  )
}

export default VerificationPage