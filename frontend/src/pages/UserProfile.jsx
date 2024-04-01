import { useState, useContext, useEffect } from 'react'
import classes from './UserProfile.module.css'
import avatar from '../assets/avatar.png'
import { FaEdit } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import { MdSaveAlt } from "react-icons/md";
import { UserContext } from '../../context/userContext'
import axios from 'axios';
import { BsFillEyeFill } from "react-icons/bs";
import { RiEyeCloseLine } from "react-icons/ri";





const UserProfile = () => {
  const userDataStorage = localStorage.getItem('user-data')
  const userDataObject = JSON.parse(userDataStorage);
  const id = useParams();
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

  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirmNew, setShowConfirmNew] = useState(false)



  useEffect(() => {
    setUserData(userDataObject);
  }, []);


  function changeInputHandler(e) {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })

  }


  function handleImgChange() {
    setImageState(true)
  }


  const handleSubmitImg = async () => {
    if (!image) {
      setError('Please select an image.');
      return;

    }

    const formData = new FormData();
    formData.append('avatar', image);


    try {


      const response = await axios.post('/api/users/change-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response);

      if (!response) {
        setError('Could not update user image.')
      }

      if (response) {

        console.log(response);
        setUserData(response.data.updateUser)
        setImageState(false)
        setMessage(response.data.message)
        localStorage.setItem('user-data', JSON.stringify(response.data.updateUser));

        setTimeout(() => {
          setMessage('')
          // window.location.reload(true)

        }, 3000);


      }
    } catch (error) {
      console.log(error);
      //setError(error.response.data.error || 'Could not Update');
    }
  };



  const isValid = (password) => {
    // Regular expression for password validation
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    // Test the password against the regular expression
    return regex.test(password);

  }

  function validEmail(email) {
    // Expressão regular para validar um endereço de e-mail
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validation() {
    const { username, email, currentPassword, newPassword, confirmNewPassword } = user;

    if (!username || !email || !currentPassword || !newPassword || !confirmNewPassword) {
      setError('All fields are required!')
      return false
    } else if (username.length < 4) {
      setError('The Username must contain at least 4 characters.')
      return false
    } else if (!validEmail(email)) {
      setError('This is Email is not valid!')
      return false

    } else if (!isValid(newPassword)) {
      setError('Password must contain minimum 8 characters, including: 1 lowercase letter, 1 special character(@$!%*?&), 1 capital letter and at least 1 number(0-9)')
      return false

    } else if (currentPassword === newPassword) {
      setError('The New Password must be different from the Current Password.')
      return false

    } else if (newPassword.length > 20 || confirmNewPassword.length > 20) {
      setError('Password cannot be longer than 20 characters.')
      return false
    } else if (newPassword !== confirmNewPassword) {
      setError('Password and Confirm Password have to match!')
      return false
    }
    return true
  }



  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (validation()) {
      try {
        const response = await axios.patch(`/api/users/${id.id}/edit-user`, user)

        if (response) {
          console.log(response);
          setMessage(response.data.message)
          setUserData(response.data.updatedUserInfo)
          localStorage.setItem('user-data', JSON.stringify(response.data.updatedUserInfo));

          setUser({
            username: '',
            email: '',
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
          })

          setTimeout(() => {
            setMessage('')
            window.location.reload(true)

          }, 5000);


        }

      } catch (error) {
        console.log(error);
        setError(error.response.data.error || 'Could not Update');
      }
    }
  }


  function showPasswordFunc(name) {
    // clearTimeout(timer);
    if (name === 'current') {
      setShowCurrent(() => !showCurrent)
    }

    if (name === 'new') {
      setShowNew(() => !showNew)
    }
    if (name === 'confirmNew') {
      setShowConfirmNew(() => !showConfirmNew)
    }

    setTimeout(() => {
      setShowCurrent(false)
      setShowNew(false)
      setShowConfirmNew(false)


    }, 4000);

  }



  return (
    <section>
      <div className={classes.mainContainer}>
        <Link to={`/myposts/${id.id}
        `}>My Posts</Link>
        <div className={classes.profile}>
          <div className={classes.wrapperImg}>
            <div className={classes.containerImg}>
              <img src={`http://localhost:4000/uploads/${userData.avatar}`} alt='user image' onError={(e) => {
                e.currentTarget.src = avatar,
                  e.currentTarget.onerror = null
              }} />
            </div>



            <form className={classes.imageForm}>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type='file'
                name="avatar"
                id="avatar"
                accept='png, jpeg, jpg'
              />
              <label htmlFor='avatar' onClick={handleImgChange} className={classes.editBtnIcon} ><FaEdit /></label>
              {imageState && (
                <label onClick={handleSubmitImg} className={classes.saveBtnIcon}><MdSaveAlt size={19} /></label>
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
            <input name='email' type='email' placeholder='Email' value={user.email} onChange={changeInputHandler} />
            <div className={classes.password}>
              {/* Current password */}
              <input name='currentPassword' type={showCurrent ? 'text' : 'password'} placeholder='Current Password' value={user.currentPassword} onChange={changeInputHandler} />
              <span onClick={() => showPasswordFunc('current')}>{
                showCurrent ? <BsFillEyeFill /> : <RiEyeCloseLine />
              }
              </span>
            </div>
            <div className={classes.password}>
              {/* New password */}
              <input name='newPassword' type={showNew ? 'text' : 'password'} placeholder='New Password' value={user.newPassword} onChange={changeInputHandler} />
              <span onClick={() => showPasswordFunc('new')}>{
                showNew ? <BsFillEyeFill /> : <RiEyeCloseLine />
              }
              </span>
            </div>
            <div className={classes.password}>
              {/* Confirm New password */}
              <input name='confirmNewPassword' type={showConfirmNew ? 'text' : 'password'} placeholder='Confirm Password' value={user.confirmNewPassword} onChange={changeInputHandler} />
              <span onClick={() => showPasswordFunc('confirmNew')}>{
                showConfirmNew ? <BsFillEyeFill /> : <RiEyeCloseLine />
              }
              </span>
            </div>
            <button onClick={handleSubmitForm} type='submit'>Update Profile</button>
          </form>

        </div>
      </div>
    </section >
  )
}

export default UserProfile