import { useState, useEffect } from 'react'
import PostItem from '../components/PostItem'
import classes from './AuthorPosts.module.css'
import axios from 'axios'
import SkeletonPost from '../components/SkeletonPost'
import { useParams } from 'react-router-dom'

const AuthorPosts = () => {

  const [authorPosts, setAuthorPosts] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { id } = useParams();


  const skeleton = [];
  for (let i = 1; i <= 6; i++) {
    skeleton.push(<SkeletonPost key={i} />)
  }
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
        setError(error || 'Could not fetch Posts.')
      }
      setLoading(false)
    }

    fetchAuthor()
  }, [])
  return (
    <section className={classes.container}>
      {!loading && authorPosts.length === 0 && <p className={classes.noDataFound}>You don't have posts yet.</p>}
      {
        loading && (
          <>
            {skeleton}
          </>
        )
      }
      {
        authorPosts.map((post) => (
          <PostItem key={post._id} id={post._id} image={post.image} category={post.category} title={post.title} description={post.description} creatorData={post.creator} createdAt={post.createdAt} />
        ))
      }
    </section>
  )
}

export default AuthorPosts