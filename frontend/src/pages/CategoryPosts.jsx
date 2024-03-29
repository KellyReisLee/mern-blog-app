import { useState } from 'react'
import PostItem from '../components/PostItem'
import { dummy_Data } from '../helpers/dataPost'
import classes from './CategoryPosts.module.css'
const CategoryPosts = () => {
  const [posts, setPosts] = useState(dummy_Data)
  return (
    <section className={classes.container}>
      {
        posts.map((post) => (
          <PostItem key={post.id} id={post.id} image={post.image} category={post.category} title={post.title} description={post.description} authorId={post.authorId} />
        ))
      }
    </section>
  )
}

export default CategoryPosts