import { useState, useEffect } from 'react'
import PostItem from '../components/PostItem'
import classes from './Posts.module.css'
import { dummy_Data } from '../helpers/dataPost'
import axios from 'axios'
import SkeletonPost from './SkeletonPost'



const Posts = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const skeleton = [];
  for (let i = 1; i <= 9; i++) {
    skeleton.push(<SkeletonPost key={i} />)
  }

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      try {
        const response = await axios.get('/api/posts')
        console.log(response);

        if (!response.data) {
          setError('Could not fetch data from database.')
        }
        setPosts(response.data)

      } catch (error) {
        setError(error.response.data.error)

      }
      setLoading(false)
    }

    fetchPosts()
  }, [])
  console.log(posts);

  return (
    <>
      {!loading && posts.length === 0 && <div className={classes.noDataFound}><p>
        No posts available
      </p></div>}
      <section className={classes.section}>


        <div className={classes.posts}>
          {
            loading && (<>{skeleton}</>)
          }

          {
            posts.map((post) => (
              <PostItem key={post._id} id={post._id} image={post.image} category={post.category} title={post.title} description={post.description} creatorData={post.creator} createdAt={post.createdAt} />
            ))
          }
        </div>
      </section>
    </>
  )
}

export default Posts
