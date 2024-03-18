import { useState, useContext } from 'react'
import classes from './UserProfile.module.css'
import avatar from '../assets/avatar.png'
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MdSaveAlt } from "react-icons/md";
import { UserContext } from '../../context/userContext'
import axios from 'axios';




const UserProfile = () => {

  const { userData, setUserData } = useContext(UserContext);
  const [message, setMessage] = useState('')
  const [image, setImage] = useState('');
  const [imageState, setImageState] = useState(false);
  const [error, setError] = useState('')
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    newPassword: '',
    confirmNewPassword: ''

  })


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
      console.log(response);
      if (response) {
        setUserData(response.data.updateUser)
        setImageState(false)
        setMessage(response.data.message)
      }
    } catch (error) {
      setError('Error uploading image.');

    }
  };


  return (
    <section>
      <div className={classes.mainContainer}>
        <Link to={`/myposts/${userData.id}
        `}>My Posts</Link>
        <div className={classes.profile}>
          <div className={classes.wrapperImg}>
            <div className={classes.containerImg}>
              <img src={userData.avatar ? `http://localhost:4000/uploads/${userData.avatar}` : avatar} alt='user image' />
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
            {error && <p className={classes.error}>{error}</p>}
            {/* Name */}
            <input name='name' type='text' placeholder='Full Name' value={user.name} onChange={changeInputHandler} />

            {/* Email */}
            <input name='email' type='text' placeholder='Email' value={user.email} onChange={changeInputHandler} />

            {/* Current password */}
            <input name='password' type='password' placeholder='Current Password' value={user.password} onChange={changeInputHandler} />

            {/* New password */}
            <input name='newPassword' type='password' placeholder='New Password' value={user.newPassword} onChange={changeInputHandler} />


            {/* Confirm New password */}
            <input name='confirmNewPassword' type='password' placeholder='Confirm Password' value={user.confirmNewPassword} onChange={changeInputHandler} />
            <button type='submit'>Update Profile</button>
          </form>

        </div>
      </div>
    </section>
  )
}

export default UserProfile