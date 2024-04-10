import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import classes from './Authors.module.css'
import axios from 'axios'
import Avatar from '../assets/avatar.png'
import SkeletonAuthors from '../components/SkeletonAuthors'
const Authors = () => {

  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)


  const skeleton = [];
  for (let i = 1; i <= 6; i++) {
    skeleton.push(<SkeletonAuthors key={i} />)
  }


  useEffect(() => {
    async function fetchAllAuthors() {
      setLoading(true)
      try {
        const { data } = await axios.get(`api/users`)
        console.log(data);

        if (!data) {
          setError('Could not fetch data from database.')
        }
        setAuthors(data)

      } catch (error) {
        setError(error || 'Could not fetch data.')

      }
      setLoading(false)
    }

    fetchAllAuthors()
  }, [])




  return (
    <section className={classes.section}>
      <div className={classes.container}>
        {loading && (<>{skeleton}</>)}
        {!loading && authors.length === 0 && <p className={classes.noDataFound}>Could not fetch data.</p>}

        {authors.length > 0 &&
          (
            authors.map((author) => {
              return <Link className={classes.author} key={author._id} to={`/api/posts/user/${author._id}`}>
                <div className={classes.authorsImage}>
                  <img src={`http://localhost:4000/uploads/uploadsUserImg/${author.avatar}`} onError={(e) => {
                    e.currentTarget.src = Avatar,
                      e.currentTarget.onerror = null
                  }} alt={author.title} />
                </div>
                <div className={classes.info}>
                  <h4>{author.username}</h4>
                  <p>Posts: {author.posts}</p>
                </div>
              </Link>
            })
          )
        }

      </div>
    </section>
  )
}

export default Authors