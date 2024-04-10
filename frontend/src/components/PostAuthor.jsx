import { Link } from 'react-router-dom'
import avatar from '../assets/avatar.png'
import classes from './PostAuthor.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ReactTimeAgo from 'react-time-ago';
import javascriptTimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en.json';



javascriptTimeAgo.addLocale(en);


const PostAuthor = ({ createdAt, creatorData }) => {

  const [authorPosts, setAuthorPosts] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // Verifica se createdAt é uma data válida
  const date = new Date(createdAt);
  // Verifica se a data é válida
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
