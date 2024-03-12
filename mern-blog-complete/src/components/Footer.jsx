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
        <small>Created by Kelly Reis - 2024</small>

      </div>
    </footer>
  )
}

export default Footer