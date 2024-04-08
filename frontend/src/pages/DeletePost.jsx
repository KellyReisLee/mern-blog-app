import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom';

const Delete = () => {

  const { userData } = useContext(UserContext)
  const navigate = useNavigate();

  const token = userData?.token;

  useEffect(() => {
    if (!token) {
      navigate('/api/users/login')
    }

  }, [])

  return (
    <div>Delete</div>
  )
}

export default Delete