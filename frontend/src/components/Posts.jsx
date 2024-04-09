import { useState, useEffect } from 'react'
import PostItem from '../components/PostItem'
import classes from './Posts.module.css'
import { dummy_Data } from '../helpers/dataPost'
import axios from 'axios'


const Posts = () => {

  const [posts, setPosts] = useState(dummy_Data);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)



  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      try {
        const response = await axios.get('/api/posts')
        console.log(response.data);

        if (!response.data) {
          setError('Could not fetch data from database.')
        }
        setPosts(response.data)

      } catch (error) {
        setError(error)

      }
      setLoading(false)
    }

    fetchPosts()
  }, [])
  console.log(posts);

  return (
    <section className={classes.section}>
      <div className={classes.posts}>
        {
          posts.map((post) => (
            <PostItem key={post._id} id={post._id} image={post.image} category={post.category} title={post.title} description={post.description} creatorData={post.creator} />
          ))
        }
      </div>
    </section>
  )
}

export default Posts
