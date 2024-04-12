import { useState, useEffect, useContext } from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link, useParams } from 'react-router-dom'
import NoImage from '../assets/noImage.jpg'
import classes from './PostDetail.module.css'
import { UserContext } from '../../context/userContext'
import axios from 'axios'
import DeletePost from './DeletePost'
import SkeletonPostId from '../components/SkeletonPostId'
import Header from '../components/Header'
import Footer from '../components/Footer'

const PostDetail = () => {
  const { userData } = useContext(UserContext)
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { id } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);


  function handleStartRemovePlace() {
    setModalIsOpen(true);

  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }


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
        setError(error.data.error || 'Could not fetch post data.')

      }
      setLoading(false)
    }

    fetchPost()
  }, [])




  return (
    <>
      <Header />
      <section className={classes.container}>
        <div className={classes.mainContainer}>

          {loading && post.length === 0 && (
            <SkeletonPostId />

          )}
          {!loading && post.length === 0 && <p className={classes.noDataFound}>Could not fetch post data. Please try later.</p>}



          <div className={classes.header}>
            <div className={classes.authorContainer}>
              <PostAuthor creatorData={post?.creator} createdAt={post.createdAt} />
            </div>

            {userData?._id == post?.creator?._id && (
              <div className={classes.btns}>
                <Link to={`/posts/${id}/edit`} className={classes.edit}>Edit</Link>

                <DeletePost modalIsOpen={modalIsOpen} handleStopRemovePlace={handleStopRemovePlace} handleStartRemovePlace={handleStartRemovePlace} postId={post._id} >Delete</DeletePost>
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
      <Footer />
    </>

  )
}

export default PostDetail