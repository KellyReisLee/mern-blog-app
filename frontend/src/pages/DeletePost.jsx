import { useEffect, useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './DeletePost.module.css'
import axios from 'axios';
import Modal from '../components/Modal'
import DeleteConfirmation from '../components/DeleteConfirmation'



const Delete = ({ modalIsOpen, postId, setError, handleStopRemovePlace, handleStartRemovePlace, children }) => {
  const { userData } = useContext(UserContext)
  const navigate = useNavigate();
  const location = useLocation();



  // Protecting page.
  const token = userData?.token;
  useEffect(() => {
    if (!token) {
      navigate('/api/users/login')
    }

  }, [])

  console.log(userData);
  const handleRemovePlace = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.delete(`api/posts/${postId}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      }
      )
      if (response.status == 200) {
        if (location.pathname == `/myposts/${userData?._id}`) {
          navigate(0)
        } else {
          navigate(`/api/posts/user/${userData?._id}`)
        }
      }

    } catch (error) {
      setError(error.response.data.error || 'Could not delete this post.')
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
      <button onClick={handleStartRemovePlace} className={classes.delete}>
        {children}
      </button>

    </>
  )
}

export default Delete