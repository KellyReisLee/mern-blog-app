import { useState, useContext, useEffect } from 'react'
import classes from './Dashboard.module.css'
import NoImage from '../assets/noImage.jpg'
import { UserContext } from '../../context/userContext'
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import SkeletonAuthors from '../components/SkeletonAuthors';
import DeleteButton from '../components/DeleteButton'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useFetch } from '../hooks/useFetch'

const Dashboard = () => {
  const { userData } = useContext(UserContext)
  const navigate = useNavigate();
  const { id } = useParams();


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

  const { data, loading, error } = useFetch(axios.get(`api/posts/user/${id}`), 'Could not find data.')

  return (
    <>
      <Header />
      <section className={classes.section}>
        <div className={classes.dashboard}>
          {!loading && data.length === 0 && <div className={classes.noDataFound}><p>This author don't have posts yet.</p></div>}
          {!loading && data.length === 0 && error && <div className={classes.noDataFound}><p>{`Could not find data` || { error }}</p></div>}
          {loading && data.length === 0 && !error && (<>{skeleton}</>)}
          {data.length > 0 && (<>
            {
              data.map((item) => {
                return <article key={item._id} className={classes.dashboardPost}>
                  <div className={classes.imgContainer}>
                    <img src={`http://localhost:4000/uploads/uploadsPostImg/${item.image}`} alt='user image' onError={(e) => {
                      e.currentTarget.src = NoImage,
                        e.currentTarget.onerror = null
                    }} />
                  </div>
                  <div className={classes.title}>
                    <h3>{item.title.length > 10 ? `${item.title.slice(0, 10)}...` : `${item.title}`}</h3>
                  </div>
                  <div className={classes.btns}>
                    <Link className={classes.view} to={`/api/posts/${item._id}`}>View</Link>
                    <Link className={classes.edit} to={`/posts/edit/${item._id}`}><FaEdit size={17} /></Link>
                    <Link className={classes.delete} to={`/posts/delete/${item._id}`}><MdDelete size={17} /></Link>
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