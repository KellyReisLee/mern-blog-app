import { Link } from 'react-router-dom'
import classes from './ErrorPage.module.css'
import noPage from '../assets/noPage.png'

const ErrorPage = () => {
  return (
    <section className={classes.errorPg}>
      <div className={classes.center}>
        <Link to="/" className='btn'>Go Back to Home Page.</Link>
        <h2>Page Not Found</h2>
        <div className={classes.containerImg}>
          <img src={noPage} alt='No page found' />
        </div>
      </div>

    </section >
  )
}

export default ErrorPage