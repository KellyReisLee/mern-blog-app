import { useState } from 'react'
import classes from './Dashboard.module.css'
import { dummy_Data } from '../helpers/dataPost';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [posts, setPosts] = useState(dummy_Data || []);
  return (
    <section>
      {posts.length > 0 ? (<>
        <div className={classes.dashboard}>
          {
            posts.map((item) => {
              return <article key={item.id} className={classes.dashboardPost}>
                <div className={classes.imgContainer}>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className={classes.title}>
                  <h3>{item.title}</h3>
                </div>
                <div className={classes.btns}>
                  <Link className={classes.view} to={`/posts/${item.id}`}>View</Link>
                  <Link className={classes.edit} to={`/posts/${item.id}/edit`}>Edit</Link>
                  <Link className={classes.delete} to={`/posts/${item.id}/delete`}>Delete</Link>
                </div>

              </article>
            })
          }
        </div>
      </>

      ) : (<h2>You have no posts yet!</h2>)
      }
    </section >
  )
}

export default Dashboard