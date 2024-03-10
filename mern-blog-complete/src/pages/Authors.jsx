import { useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './Authors.module.css'

import face5 from '../assets/face-images/face-5.png'
import face6 from '../assets/face-images/face-6.png'
import face7 from '../assets/face-images/face-7.png'
import face8 from '../assets/face-images/face-8.png'
import face9 from '../assets/face-images/face-9.png'

const usersData = [
  { id: 5, image: face5, name: 'Angela Smith', posts: 3 },
  { id: 6, image: face6, name: 'John Schmidt', posts: 4 },
  { id: 7, image: face7, name: 'Dan Goldman', posts: 1 },
  { id: 8, image: face8, name: 'Paula Lee', posts: 2 },
  { id: 9, image: face9, name: 'Iris Silva', posts: 5 },
]

const Authors = () => {
  const [authors, setAuthors] = useState(usersData || []);

  return (
    <section>

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