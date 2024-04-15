import classes from './Footer.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { categories } from '../helpers/dataPost';

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear()
  const navigate = useNavigate();

  const categoriesFooter = categories.filter((item) => item !== 'Uncategorized')

  //Redirect to the page and show new content.
  const handleLinkClick = (name) => {
    navigate(`posts/categories/${name}`)
    setTimeout(() => {
      window.location.reload()
    }, 100);
  };



  return (
    <footer className={classes.footer}>
      <div className={classes.list}>
        <ul>
          {
            categoriesFooter.map((item) => (
              <li key={item}>
                <Link onClick={() => handleLinkClick(item)} to={`/posts/categories/${item}`}>{item}</Link>
              </li>
            ))
          }

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