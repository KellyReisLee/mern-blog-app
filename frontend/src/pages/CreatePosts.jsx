import { useState, useEffect, useContext } from 'react'
import classes from './CreatePosts.module.css'
import { categories } from '../helpers/dataPost';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { formats, modules } from '../helpers/textBox'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom';

const CreatePosts = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const { userData } = useContext(UserContext)
  const navigate = useNavigate();

  const token = userData?.token;


  useEffect(() => {

    if (!token) {
      navigate('/api/users/login')
    }

  }, [])



  return (
    <section className={classes.createPost}>
      <div className={classes.container}>
        <h2>Create Post</h2>
        <p className={classes.error}>This is an error</p>
        <form className={classes.form}>
          <input name='title' type='text' placeholder='Title' value={title} onChange={e => setCategory(e.target.event)} autoFocus />
          <select name='category' value={category} onChange={e => setCategory(e.target.value)} id=''>
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <ReactQuill className={classes.quill} formats={formats} modules={modules} theme="snow" value={description} onChange={setDescription} />
          <input name='image' type='file' onChange={e => setImage(e.target.files[0])} accept='png, jpg, jpeg' />

          <button type='submit' className={classes.btn}>Create</button>
        </form>
      </div>
    </section>
  )
}

export default CreatePosts