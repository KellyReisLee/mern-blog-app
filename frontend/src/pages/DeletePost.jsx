import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './DeletePost.module.css'
import axios from 'axios';
import Modal from '../components/Modal'
import DeleteConfirmation from '../components/DeleteConfirmation'

const Delete = ({ postId, modalIsOpen, handleStopRemovePlace, handleStartRemovePlace }) => {
  const { userData } = useContext(UserContext)
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);


  // const token = userData?.token;

  // useEffect(() => {
  //   if (!token) {
  //     navigate('/api/users/login')
  //   }

  // }, [])


  const handleRemovePlace = async () => {
    try {
      const response = await axios.delete(`api/posts/${postId}`)

      console.log(response);

    } catch (error) {
      console.log(error);
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
      <button onClick={handleStartRemovePlace} className={classes.delete}>Delete</button>
    </>
  )
}

export default Delete