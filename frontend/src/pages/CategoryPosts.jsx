import { useState, useEffect } from 'react'
import PostItem from '../components/PostItem'
import classes from './CategoryPosts.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import SkeletonPost from '../components/SkeletonPost'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useFetch } from '../hooks/useFetch'

const CategoryPosts = () => {
  const { category } = useParams()


  const skeleton = [];
  for (let i = 1; i <= 9; i++) {
    skeleton.push(<SkeletonPost key={i} />)
  }


  const { data, loading, error } = useFetch(axios.get(`api/posts/categories/${category}`), 'Could not find posts.')


  return (
    <>
      <Header />
      {
        !loading && data.length === 0 && error && (
          <div className={classes.noDataFound}>
            <p>
              {error}
            </p>
          </div>
        )
      }
      {
        !loading && data.length === 0 && !error && (
          <div className={classes.noDataFound}>
            <p >
              This category don't have posts yet.
            </p>
          </div>
        )
      }
      <section className={classes.container}>
        <div className={classes.posts}>

          {
            loading && data.length === 0 && (
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

export default CategoryPosts