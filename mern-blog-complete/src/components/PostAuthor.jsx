import { Link } from 'react-router-dom'
import face1 from '../assets/face-images/face-1.png'
import classes from './PostAuthor.module.css'

const PostAuthor = () => {
  return (
    <div className={classes.authorContainer}>
      <Link to={`/posts/users/sfdsfd`}>
        <div className={classes.author}>
          <div className={classes.authorImg}>
            <img src={face1} alt='' />
          </div>
          <div className={classes.authorDetail}>
            <h5>By: <i>John Smith</i></h5>
            <small>Just now</small>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PostAuthor
