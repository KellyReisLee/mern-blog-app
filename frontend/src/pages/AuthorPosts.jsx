import { useState, useEffect } from 'react'
import PostItem from '../components/PostItem'
import classes from './AuthorPosts.module.css'
import SkeletonPost from '../components/SkeletonPost'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useFetch } from '../hooks/useFetch'

const AuthorPosts = () => {
  const { id } = useParams();


  const skeleton = [];
  for (let i = 1; i <= 6; i++) {
    skeleton.push(<SkeletonPost key={i} />)
  }

  const { data, loading, error } = useFetch(axios.get(`api/posts/user/${id}`), 'Could not find post.')


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
        <div className={classes.container}>
          {
            loading && (
              <>
                {skeleton}
              </>
            )
          }
          {
            data.map((post) => (
              <PostItem key={post._id} id={post._id} image={post.image} category={post.category} title={post.title} description={post.description} creatorData={post.creator} createdAt={post.createdAt} />
            ))
          }
        </div>
      </section>
      <Footer />
    </>
  )
}

export default AuthorPosts