import React from 'react'
import classes from './DeletePost.module.css'
import { useState, useEffect, useContext } from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link, useParams, useNavigate } from 'react-router-dom'
import NoImage from '../assets/noImage.jpg'
import { UserContext } from '../../context/userContext'
import axios from 'axios'
import DeleteButton from '../components/DeleteButton'
import SkeletonPostId from '../components/SkeletonPostId'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import DeleteConfirmation from '../components/DeleteConfirmation'
import { useFetch } from '../hooks/useFetch'

const DeletePosts = () => {
  const { userData } = useContext(UserContext)
  const { id } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate()



  // Protecting page.
  const token = userData?.token;
  useEffect(() => {
    if (!token) {
      navigate('/api/users/login')
    }

  }, [])

  function handleStartRemovePlace() {
    setModalIsOpen(true);

  }

  useEffect(() => {
    handleStartRemovePlace()

  }, [modalIsOpen])


  function handleStopRemovePlace() {
    setModalIsOpen(false);
    navigate(`/myposts/${userData._id}`)

  }


  const { data, loading, error } = useFetch(axios.get(`api/posts/${id}`), 'Could not find data.')



  const handleRemovePlace = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.delete(`api/posts/${id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      }
      )
      if (response.status == 200) {
        navigate(`/myposts/${userData?._id}`)
      }

    } catch (error) {
      console.log(error);
      setError(error.response?.data?.error || 'Could not delete this post.')
    }

  }



  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>
      <Header />
      <section className={classes.container}>
        <div className={classes.mainContainer}>

          {loading && data.length === 0 && (
            <SkeletonPostId />

          )}
          {!loading && data.length === 0 && <p className={classes.noDataFound}>Could not find post data. Please try later.</p>}
          {!loading && data.length === 0 && error && <p className={classes.noDataFound}>Could not delete post. Please try later.</p>}


          <div className={classes.header}>
            <div className={classes.authorContainer}>
              <PostAuthor creatorData={data?.creator} createdAt={data.createdAt} />
            </div>

            {userData?._id == data?.creator?._id && (
              <div className={classes.btns}>
                <Link to={`/posts/${id}/edit`} className={classes.edit}>Edit</Link>
                <Link to={`/posts/${id}/delete`} className={classes.delete}>Delete</Link>

              </div>
            )
            }

          </div>

          <h1>{data.title}</h1>
          <div className={classes.containerImg}>
            <img src={`http://localhost:4000/uploads/uploadsPostImg/${data.image}`} onError={(e) => {
              e.currentTarget.src = NoImage,
                e.currentTarget.onerror = null
            }} alt={data.title} />
          </div>
          <p dangerouslySetInnerHTML={{ __html: data.description }}>

          </p>

        </div>
      </section>
      <Footer />
    </>

  )

}

export default DeletePosts
