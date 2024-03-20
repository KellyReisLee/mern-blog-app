import { useState, useContext, useEffect } from 'react'
import classes from './UserProfile.module.css'
import avatar from '../assets/avatar.png'
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MdSaveAlt } from "react-icons/md";
import { UserContext } from '../../context/userContext'
import axios from 'axios';




const userDataStorage = localStorage.getItem('user-data')
const userDataObject = JSON.parse(userDataStorage);

const UserProfile = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [message, setMessage] = useState('')
  const [image, setImage] = useState('');
  const [imageState, setImageState] = useState(false);
  const [error, setError] = useState('')
  const [user, setUser] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''

  })

  useEffect(() => {
    setUserData(userDataObject)
    console.log(userData);

    if (userData.avatar) {
      let splitedData = userData.avatar.split('.')
      let lastPart = splitedData[splitedData.length - 1]
      let extensions = ['png', 'jpg', 'jpeg']
      if (extensions.indexOf(lastPart) === -1) {
        setError('Just these images extensions are allowed: png, jpg, jpeg')
      }
      else {
        setError('')
      }
    }

  }, [userData])


  function changeInputHandler(e) {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })

  }

  function handleImgChange() {
    setImageState(true)
  }

  const handleSubmitImg = async () => {
    setImageState(false)

    try {
      const formData = new FormData();
      formData.append('avatar', image);

      const response = await axios.post('/api/users/change-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response) {
        setUserData(response.data.updateUser)
        setImageState(false)
        setMessage(response.data.message)
        localStorage.setItem('user-data', JSON.stringify(response.data.updateUser));
        window.location.reload(true)
        setTimeout(() => {
          setMessage('')
        }, 4000);

      }
    } catch (error) {
      setError('Error uploading image.', error);


    }
  };




  return (
    <section>
      <div className={classes.mainContainer}>
        <Link to={`/myposts/${userData._id}
        `}>My Posts</Link>
        <div className={classes.profile}>
          <div className={classes.wrapperImg}>
            <div className={classes.containerImg}>
              <img src={!userData.avatar ? avatar : `http://localhost:4000/uploads/${userData.avatar}`} alt='user image' onError={(e) => {
                e.currentTarget.src = avatar,
                  e.currentTarget.onerror = null
              }} />
            </div>
            <form className={classes.imageForm}>
              <input onChange={e => setImage(e.target.files[0])} type='file' name="image" id="image" accept='png, jpeg, jpg' />
              <label className={classes.editBtnIcon} onClick={handleImgChange} htmlFor='image'><FaEdit /></label>
              {imageState && (<label onClick={handleSubmitImg} className={classes.saveBtnIcon}><MdSaveAlt size={26} /></label>
              )}
            </form>

          </div>
          <h2 className={classes.username}>{userData.username}</h2>
          <form className={classes.form}>
            {message && !error && <p className={classes.message}>{message}</p>}
            {error && !message && <p className={classes.error}>{error}</p>}
            {/* Name */}
            <input name='username' type='text' placeholder='Username' value={user.username} onChange={changeInputHandler} />

            {/* Email */}
            <input name='email' type='text' placeholder='Email' value={user.email} onChange={changeInputHandler} />

            {/* Current password */}
            <input name='currentPassword' type='password' placeholder='Current Password' value={user.password} onChange={changeInputHandler} />

            {/* New password */}
            <input name='newPassword' type='password' placeholder='New Password' value={user.newPassword} onChange={changeInputHandler} />


            {/* Confirm New password */}
            <input name='confirmNewPassword' type='password' placeholder='Confirm Password' value={user.confirmNewPassword} onChange={changeInputHandler} />
            <button type='submit'>Update Profile</button>
          </form>

        </div>
      </div>
    </section >
  )
}

export default UserProfile