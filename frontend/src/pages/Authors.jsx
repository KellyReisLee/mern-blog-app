import { useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './Authors.module.css'

import { authorsData } from '../helpers/dataPost'

const Authors = () => {
  const [authors, setAuthors] = useState(authorsData || []);

  return (
    <section className={classes.section}>

      {authors.length > 0 ? (
        <div className={classes.container}>
          {
            authors.map(({ id, image, name, posts }) => {
              return <Link className={classes.author} key={id} to={`/posts/users/${id}`}>
                <div className={classes.authorsImage}>
                  <img src={image} alt={`Image of ${name}`} />
                </div>
                <div className={classes.info}>
                  <h4>{name}</h4>
                  <p>Posts: {posts}</p>
                </div>
              </Link>
            })
          }
        </div>
      ) : (<h2>No Authors found!</h2>)}

    </section>
  )
}

export default Authors