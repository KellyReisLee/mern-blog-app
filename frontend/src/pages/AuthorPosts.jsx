import { useState, useEffect } from 'react'
import PostItem from '../components/PostItem'
import { useParams } from 'react-router-dom'
import classes from './AuthorPosts.module.css'
import axios from 'axios'

const AuthorPosts = () => {

  const [authorPosts, setAuthorPosts] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    async function fetchAuthor() {
      setLoading(true)
      try {
        const { data } = await axios.get(`api/posts/user/${id}`)
        console.log(data);
        if (!data) {
          setError('Could not fetch data from database.')
        }
        setAuthorPosts(data)


      } catch (error) {
        setError(error || 'Could not fetch data.')

      }
      setLoading(false)
    }

    fetchAuthor()
  }, [])


  return (
    <section className={classes.container}>
      {
        authorPosts?.map((post) => (
          <PostItem key={post._id} id={post._id} image={post.image} category={post.category} title={post.title} description={post.description} creatorData={post.creator} />
        ))
      }
    </section>
  )
}

export default AuthorPosts