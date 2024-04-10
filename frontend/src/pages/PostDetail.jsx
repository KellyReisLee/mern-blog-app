import { useState, useEffect, useContext } from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../assets/avatar.png'
import NoImage from '../assets/noImage.jpg'
import classes from './PostDetail.module.css'
import { UserContext } from '../../context/userContext'
import axios from 'axios'
import DeletePost from './DeletePost'




const PostDetail = () => {
  const { userData } = useContext(UserContext)
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { id } = useParams();

  console.log(userData);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true)
      try {
        const { data } = await axios.get(`api/posts/${id}`)
        console.log(data);

        if (!data) {
          setError('Could not fetch data from database.')
        }
        setPost(data)

      } catch (error) {
        setError(error)

      }
      setLoading(false)
    }

    fetchPost()
  }, [])
  console.log(post);



  return (
    <section className={classes.container}>

      <div className={classes.mainContainer}>
        <div className={classes.header}>
          <div className={classes.authorContainer}>

            <PostAuthor creatorData={post?.creator} createdAt={post.createdAt} />
          </div>
          {
            userData?._id === post?.creator?._id && (
              <div className={classes.btns}>
                <Link to={`/posts/${post?.id}/edit`} className={classes.edit}>Edit</Link>
                <Link to={`/posts/${post?.id}/delete`}
                  className={classes.delete}>Delete</Link>
                {/* <DeletePost postId={post._id} className={classes.delete} /> */}
              </div>
            )
          }
        </div>
        <h1>{post.title}</h1>
        <div className={classes.containerImg}>
          <img src={`http://localhost:4000/uploads/uploadsPostImg/${post.image}`} onError={(e) => {
            e.currentTarget.src = NoImage,
              e.currentTarget.onerror = null
          }} alt={post.title} />
        </div>
        <p dangerouslySetInnerHTML={{ __html: post.description }}>

        </p>

      </div>
    </section>
  )
}

export default PostDetail