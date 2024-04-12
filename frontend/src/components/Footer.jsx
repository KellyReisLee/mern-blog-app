import { Link } from 'react-router-dom'
import classes from './Footer.module.css'
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { categories } from '../helpers/dataPost'

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear()
  const [categoryData, setCategoryData] = useState('');
  const navigate = useNavigate();



  // Redirecionar para a página correspondente ao clicar no link
  const handleLinkClick = (name) => {
    navigate(`posts/categories/${name}`)
    setTimeout(() => {
      window.location.reload()
    }, 0);
  };



  // Redirecionar para a página correspondente ao clicar no link
  // const handleLinkClick = (name) => {
  //   setCategoryData(name);
  //   navigate(`/posts/categories/${name}`);
  // };

  return (
    <footer className={classes.footer}>
      <div className={classes.list}>
        <ul>
          <li>
            <Link onClick={() => handleLinkClick('javascript')} to="/posts/categories/Javascript">Javascript</Link>
          </li>
          <li>
            <Link onClick={() => handleLinkClick('CSS')} to="/posts/categories/CSS">CSS</Link>
          </li>
          <li>
            <Link onClick={() => handleLinkClick('HTML')} to="/posts/categories/HTML">HTML</Link>
          </li>
          <li>
            <Link onClick={() => handleLinkClick('Node.js')} to="/posts/categories/Node.js">Node.js</Link>
          </li>
          <li>
            <Link onClick={() => handleLinkClick('Bootstrap')} to="/posts/categories/Bootstrap">Bootstrap</Link>
          </li>
          <li>
            <Link onClick={() => handleLinkClick('React.js')} to="/posts/categories/React.js">React.js</Link>
          </li>
          <li>
            <Link onClick={() => handleLinkClick('Tailwind')} to="/posts/categories/Tailwind">Tailwind</Link>
          </li>
          <li>
            <Link onClick={() => handleLinkClick('MongoDB')} to="/posts/categories/MongoDB">MongoDB</Link>
          </li>
          <li>
            <Link onClick={() => handleLinkClick('MySQL')} to="/posts/categories/MySQL">MySQL</Link>
          </li>
          <li>
            <Link onClick={() => handleLinkClick('TypeScript.js')} to="/posts/categories/TypeScript.js">TypeScript.js</Link>
          </li>

        </ul>
      </div>
      <div className={classes.creator}>
        <hr className={classes.line} />
        <div className={classes.copyright}>
          <small>Created by Kelly Reis - {year}</small>

        </div>
      </div>
    </footer>
  )
}

export default Footer