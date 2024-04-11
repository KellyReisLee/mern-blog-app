import { useState, useEffect, useContext } from 'react'
import classes from './EditPost.module.css'
import { categories } from '../helpers/dataPost';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { formats, modules } from '../helpers/textBox'
import { UserContext } from '../../context/userContext'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const { userData } = useContext(UserContext)
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')



  // Protecting page.
  const token = userData?.token;
  useEffect(() => {
    if (!token) {
      navigate('/api/users/login')
    }

  }, [])

  function validation() {
    if (!title || !category || !description) {
      setError('Title, Category and Description are required.')
      return false
    }
    return true
  }



  // getting post from database
  useEffect(() => {
    async function fetchPost() {
      try {
        const { data } = await axios.get(`api/posts/${id}`);

        if (!data) {
          setError('Could not fetch data.')
        }
        setTitle(data.title)
        setDescription(data.description)
        setCategory(data.category)
        setImage(data.image)

        console.log(data);

      } catch (error) {
        console.log(error);
        setError(error.response.data.error || 'Could not Update Post.')
      }
    }
    fetchPost()

  }, [])

  const handleEditPost = async (e) => {
    e.preventDefault();
    setLoading(true)
    const postData = new FormData();
    postData.set('title', title)
    postData.set('category', category)
    postData.set('description', description)
    postData.set('image', image)

    if (validation()) {
      try {
        const response = await axios.patch(`api/posts/${id}`, postData, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!response) {
          setError('Could not update post.')
        }
        console.log(response);
        setMessage(response.data.message)
        setTimeout(() => {
          navigate('/')

        }, 4000);

      } catch (error) {
        console.log(error.response.data.error);
        setError(error.response.data.error)
      }
    }
    setLoading(false)
  }

  return (
    <>
     

      <section className={classes.editPost}>
        <div className={classes.container}>
          <h2>Edit Post</h2>
          {loading && !error && <p className={classes.loading}>Loading...</p>}
          {error && <p className={classes.error}>{error}</p>}
          {message && !error && <p className={classes.message}>{message}</p>}
          <form onSubmit={handleEditPost} className={classes.form}>
            <input name='title' type='text' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} autoFocus />
            <select name='category' value={category} onChange={e => setCategory(e.target.value)} id=''>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <ReactQuill className={classes.quill} formats={formats} modules={modules} theme="snow" value={description} onChange={setDescription} />
            <input name='image' type='file' onChange={e => setImage(e.target.files[0])} accept='png, jpg, jpeg' />

            <button type='submit' className={classes.btn}>Update</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default EditPost