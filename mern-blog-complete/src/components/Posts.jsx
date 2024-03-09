import { useState } from 'react'
import PostItem from '../components/PostItem'
import classes from './Posts.module.css'
import dummyData from '../helpers/dataPost'


const Posts = () => {
  const [posts, setPosts] = useState(dummyData);
  return (
    <section >
      <div className={classes.posts}>
        {
          posts.map((post) => (
            <PostItem key={post.id} id={post.id} image={post.image} category={post.category} title={post.title} description={post.description} authorId={post.authorId} />
          ))
        }
      </div>
    </section>
  )
}

export default Posts
