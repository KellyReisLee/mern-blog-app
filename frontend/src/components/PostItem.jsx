import React from 'react'
import { Link } from 'react-router-dom'
import PostAuthor from '../components/PostAuthor'
import classes from './PostItem.module.css'

const PostItem = ({ id, image, title, category, description, creatorData, createdAt }) => {
  const shortDescription = description.length > 100 ? description.substring(0, 100) + '...' : description + '...';


  return (
    <article className={classes.post}>
      <div className={classes.imagePost} >
        <img src={`http://localhost:4000/uploads/uploadsPostImg/${image}`} alt={title} />
      </div>
      <div >
        <Link to={`/api/posts/${id}`}>
          <h3>{title}</h3>
          <p>{shortDescription}</p>
        </Link>
      </div>
      <div className={classes.postFooter}>
        <PostAuthor creatorData={creatorData} createdAt={createdAt} />
        <Link className={classes.category} to={`/posts/categories/${category}`}>{category}</Link>

      </div>

    </article>
  )
}

export default PostItem