import { useState, useEffect } from 'react'
import PostItem from '../components/PostItem'
import { dummy_Data } from '../helpers/dataPost'
import classes from './CategoryPosts.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import SkeletonPost from '../components/SkeletonPost'
import Header from '../components/Header'
import Footer from '../components/Footer'

const CategoryPosts = () => {
  const [dataCategory, setDataCategory] = useState([])
  const { category } = useParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


  const skeleton = [];
  for (let i = 1; i <= 9; i++) {
    skeleton.push(<SkeletonPost key={i} />)
  }


  useEffect(() => {

    async function fetchCategory() {
      setLoading(true)
      try {
        const response = await axios.get(`api/posts/categories/${category}`)
        console.log(response);
        if (!response) {
          setError('Could not find data.')
        }
        setDataCategory(response.data)

      } catch (error) {
        setError(error.response.data.error || 'Could not find data.')
      }
      setLoading(false)
    }

    fetchCategory()

  }, [])


  return (
    <>
      <Header />
      {
        error && (
          <div className={classes.noDataFound}>
            <p >
              {error}
            </p>
          </div>
        )
      }
      {
        !loading && dataCategory.length === 0 && (
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
            loading && dataCategory.length === 0 && (
              <>
                {skeleton}
              </>
            )
          }
          {
            dataCategory.map((post) => (
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