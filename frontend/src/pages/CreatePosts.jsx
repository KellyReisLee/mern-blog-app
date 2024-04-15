import { useState, useEffect, useContext } from 'react'
import classes from './CreatePosts.module.css'
import { categories } from '../helpers/dataPost';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { formats, modules } from '../helpers/textBox'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'

const CreatePosts = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const { userData } = useContext(UserContext)
  const navigate = useNavigate();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('');

  // Protecting Page
  const token = userData?.token;
  useEffect(() => {
    if (!token) {
      navigate('/api/users/login')
    }
  }, [])


  function validation() {
    if (!title || !category || !description || !image) {
      setError('All fields are required!')
      return false
    }
    return true
  }


  const handleCreatePost = async (e) => {
    e.preventDefault()
    setLoading(true)
    const postData = new FormData();
    postData.set('title', title)
    postData.set('category', category)
    postData.set('description', description)
    postData.set('image', image)
    if (validation()) {
      try {
        const response = await axios.post('api/posts', postData, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }
        })

        if (!response) {
          setError('Could not create post.')
        } else {
          setError('')
          setMessage(response.data.message)

        }
        setTimeout(() => {
          navigate('/')
        }, 4000);


      } catch (error) {
        console.log(error);
        setError(error?.response?.data?.error || 'Could not Create Post.')
      }
    }
    setLoading(false)
  }

  return (
    <>
      <Header />
      <section className={classes.createPost}>
        <div className={classes.container}>
          <h2>Create Post</h2>
          {error && <p className={classes.error}>{error}</p>}
          {message && !error && <p className={classes.message}>{message}</p>}
          {loading && !error && !message && <p className={classes.loading}>Loading...</p>}

          <form onSubmit={handleCreatePost} className={classes.form}>
            <input name='title' type='text' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} autoFocus />
            <select name='category' value={category} onChange={e => setCategory(e.target.value)} id=''>
              <option disabled>Uncategorized</option>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <ReactQuill className={classes.quill} formats={formats} modules={modules} theme="snow" value={description} onChange={setDescription} />
            <input name='image' type='file' onChange={e => setImage(e.target.files[0])} accept='png, jpg, jpeg' />

            <button type='submit' className={classes.btn}>Create</button>
          </form>
        </div>
      </section >
      <Footer />
    </>
  )
}

export default CreatePosts