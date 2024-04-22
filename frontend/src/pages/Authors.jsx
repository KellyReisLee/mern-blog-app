import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import classes from './Authors.module.css'
import Avatar from '../assets/avatar.png'
import SkeletonAuthors from '../components/SkeletonAuthors'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useFetch } from '../hooks/useFetch'


const Authors = () => {

  const skeleton = [];
  for (let i = 1; i <= 6; i++) {
    skeleton.push(<SkeletonAuthors key={i} />)
  }

  const { data, loading, error } = useFetch(axios.get(`api/users`), 'Could not find authors.')


  return (
    <>
      <Header />

      {!loading && data.length === 0 && error && (
        <div className={classes.noDataFound}><p>{error}</p></div>
      )}
      {!loading && !error && data.length === 0 && (
        <div className={classes.noDataFound}><p>This author don't have posts yet.</p></div>
      )}
      <section className={classes.section}>
        <h1 className={classes.title}>Authors</h1>

        <div className={classes.container}>


          {loading && (<>{skeleton}</>)}

          {data.length > 0 &&
            (
              data.map((author) => {
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
      <Footer />
    </>
  )
}

export default Authors