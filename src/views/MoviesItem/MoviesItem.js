import { Link } from "react-router-dom";
import styles from "./HomePage.module.css"
import PropTypes from 'prop-types';

function MoviesItem({ id, title, location }) {
    return (
        <li>
            <Link className={styles.item} to={{pathname:`/movies/${id}`, state: location}}>{title}</Link>
        </li>
    )
}

MoviesItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default MoviesItem