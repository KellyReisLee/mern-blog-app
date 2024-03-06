import { Link } from 'react-router-dom'
import classes from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <ul>
        <li>
          <Link to="/posts/categories/:Javascript">Javascript</Link>
        </li>
        <li>
          <Link to="/posts/categories/:CSS">CSS</Link>
        </li>
        <li>
          <Link to="/posts/categories/:HTML">HTML</Link>
        </li>
        <li>
          <Link to="/posts/categories/:Node.js">Node.js</Link>
        </li>
        <li>
          <Link to="/posts/categories/:Bootstrap">Bootstrap</Link>
        </li>
        <li>
          <Link to="/posts/categories/:React.js">React.js</Link>
        </li>
        <li>
          <Link to="/posts/categories/:Tailwind">Tailwind</Link>
        </li>

      </ul>
      <div className={classes.copyright}>
        <small>All Rights Reserved &copy; Copyright, Kelly Reis</small>

      </div>
    </footer>
  )
}

export default Footer