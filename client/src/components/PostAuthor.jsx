import { Link } from 'react-router-dom'
import avatar from '../assets/avatar.png'
import classes from './PostAuthor.module.css'
import ReactTimeAgo from 'react-time-ago';
import javascriptTimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en.json';
javascriptTimeAgo.addLocale(en);


const PostAuthor = ({ createdAt, creatorData }) => {

  const date = new Date(createdAt);
  // Verify if createdAt is a valid date.
  const isValidDate = !isNaN(date.getTime());


  return (
    <Link to={`/api/posts/user/${creatorData?._id}`}>
      <div className={classes.authorContainer}>
        <div className={classes.author}>
          <div className={classes.authorImg}>
            <img src={`http://localhost:4000/uploads/uploadsUserImg/${creatorData?.avatar}`} onError={(e) => {
              e.currentTarget.src = avatar,
                e.currentTarget.onerror = null
            }} alt='image-user' />
          </div>
          <div className={classes.authorDetail}>
            <h5>By: <i>{creatorData?.username}</i></h5>
            <small>
              {isValidDate && <ReactTimeAgo date={date} locale="en-US" />}
            </small>
          </div>
        </div>

      </div>
    </Link>
  )
}

export default PostAuthor
