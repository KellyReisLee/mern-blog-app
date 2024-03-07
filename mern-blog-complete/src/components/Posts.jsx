import { useState } from 'react'

import blog1 from '../assets/post-images/blog1.jpg'
import blog2 from '../assets/post-images/blog2.jpg'
import blog3 from '../assets/post-images/blog3.jpg'
import blog4 from '../assets/post-images/blog4.jpg'

import PostItem from '../components/PostItem'
import classes from './Posts.module.css'


const dummy_Data = [
  {
    id: '1',
    image: blog1,
    category: 'Javascript',
    title: 'How to develop games using Javascript',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    authorId: 3

  },
  {
    id: '2',
    image: blog2,
    category: 'CSS',
    title: 'How to ikmprove your CSS skills',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    authorId: 4

  },
  {
    id: '3',
    image: blog3,
    category: 'HTML',
    title: 'Learn more about forms using HTML',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    authorId: 5

  },
  {
    id: '6',
    image: blog4,
    category: 'React.js',
    title: 'Wha is a Prop Drilling?',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    authorId: 7

  },
  {
    id: '10',
    image: blog2,
    category: 'React.js',
    title: 'Wha is a Prop Drilling?',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    authorId: 10

  },
  {
    id: '9',
    image: blog3,
    category: 'React.js',
    title: 'Wha is a Prop Drilling?',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    authorId: 11

  },

]

const Posts = () => {
  const [posts, setPosts] = useState(dummy_Data);
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
