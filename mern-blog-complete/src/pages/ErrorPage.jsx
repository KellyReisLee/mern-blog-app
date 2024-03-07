import { Link } from 'react-router-dom'
import classes from './ErrorPage.module.css'

const ErrorPage = () => {
  return (
    <section className={classes.errorPg}>
      <div className='center'>
        <Link to="/" className='btn'>Go Back to Home</Link>
        <h2>Page Not Found</h2>
      </div>

    </section >
  )
}

export default ErrorPage