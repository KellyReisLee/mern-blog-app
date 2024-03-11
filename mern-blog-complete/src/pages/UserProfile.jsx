import { useState } from 'react'
import classes from './UserProfile.module.css'
import avatar from '../assets/avatar.png'
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";



const UserProfile = () => {
  const [image, setImage] = useState('');
  const [imageState, setImageState] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    newPassword: '',
    confirmNewPassword: ''

  })


  function changeInputHandler(e) {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })

  }

  function handleImgChange() {
    setImageState(true)
    if (image) {
      setImageState(false)
    }
    console.log(image.name);
  }

  return (
    <section>
      <div className={classes.mainContainer}>
        <Link to={`myposts/rsrsrs`}>My Posts</Link>
        <div className={classes.profile}>
          <div className={classes.wrapperImg}>
            <div className={classes.containerImg}>
              <img src={avatar} alt='My face image' />
            </div>
            <form className={classes.imageForm}>
              <input onChange={e => setImage(e.target.files[0])} type='file' name="image" id="image" accept='png, jpeg, jpg' />
              <label onClick={handleImgChange} htmlFor='image'><FaEdit /></label>
            </form>
            {/* {image && setImageState && (<button className={classes.imageBtn}><FaCheck /></button>
            )} */}
          </div>
          <h2>Kelly Reis</h2>
          <form className={classes.form}>
            <p className={classes.error}>This is an error</p>
            {/* Name */}
            <input name='name' type='text' placeholder='Full Name' value={userData.name} onChange={changeInputHandler} />

            {/* Email */}
            <input name='email' type='text' placeholder='Email' value={userData.email} onChange={changeInputHandler} />

            {/* Current password */}
            <input name='password' type='password' placeholder='Current Password' value={userData.password} onChange={changeInputHandler} />

            {/* New password */}
            <input name='newPassword' type='password' placeholder='New Password' value={userData.newPassword} onChange={changeInputHandler} />


            {/* Confirm New password */}
            <input name='confirmNewPassword' type='password' placeholder='Confirm Password' value={userData.confirmNewPassword} onChange={changeInputHandler} />
            <button type='submit'>Update Profile</button>
          </form>

        </div>
      </div>
    </section>
  )
}

export default UserProfile