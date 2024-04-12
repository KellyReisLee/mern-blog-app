import { useState, useContext, useEffect } from 'react'
import classes from './Dashboard.module.css'
import NoImage from '../assets/noImage.jpg'
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SkeletonAuthors from '../components/SkeletonAuthors';
import DeletePost from './DeletePost'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Header from '../components/Header'
import Footer from '../components/Footer'

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const { userData } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate();
  const { id } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);


  const skeleton = [];
  for (let i = 1; i <= 6; i++) {
    skeleton.push(<SkeletonAuthors key={i} />)
  }

  // Protecting page.
  const token = userData?.token;
  useEffect(() => {
    if (!token) {
      navigate('/api/users/login')
    }

  }, [])

  useEffect(() => {

    async function fetchMyPosts() {
      setLoading(true)
      try {
        const { data } = await axios.get(`api/posts/user/${id}`)


        if (!data) {
          setError('Could not fetch data from database.')
        }
        setPosts(data)


      } catch (error) {
        setError(error.response.data.error || 'Could not fetch data.')
        console.log(error);
      }
      setLoading(false)
    }
    fetchMyPosts()

  }, [])





  function handleStartRemovePlace() {
    setModalIsOpen(true);

  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }




  return (
    <>
      <Header />
      <section className={classes.section}>
        <div className={classes.dashboard}>
          {!loading && posts.length === 0 && <p className={classes.noDataFound}>Could not fetch data.</p>}
          {loading && posts.length === 0 && (<>{skeleton}</>)}
          {posts.length > 0 && (<>
            {
              posts.map((item) => {
                return <article key={item.id} className={classes.dashboardPost}>
                  <div className={classes.imgContainer}>
                    <img src={`http://localhost:4000/uploads/uploadsPostImg/${item.image}`} alt='user image' onError={(e) => {
                      e.currentTarget.src = avatar,
                        e.currentTarget.onerror = null
                    }} />
                  </div>
                  <div className={classes.title}>
                    <h3>{item.title.length > 40 ? `${item.title.slice(0, 40)}...` : `${item.title}`}</h3>
                  </div>
                  <div className={classes.btns}>
                    <Link className={classes.view} to={`/api/posts/${item._id}`}>View</Link>
                    <Link className={classes.edit} to={`/posts/${item._id}/edit`}><FaEdit size={20} /></Link>
                    <DeletePost modalIsOpen={modalIsOpen} handleStopRemovePlace={handleStopRemovePlace} handleStartRemovePlace={handleStartRemovePlace} postId={item._id} >
                      <MdDelete size={21} />
                    </DeletePost>
                  </div>

                </article>
              })
            }

          </>

          )}
        </div>
      </section >
      <Footer />
    </>
  )
}

export default Dashboard