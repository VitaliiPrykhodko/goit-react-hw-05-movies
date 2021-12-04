import { Link, useRouteMatch} from "react-router-dom";
import styles from "./MoviesPage.module.css"
import PropTypes from 'prop-types';

export default function MoviesPageItem({ id, title, location }) {
    const {url} = useRouteMatch()
    return (
        <li>
            <Link className={styles.link} to={{pathname: `${url}/${id}`, state:{from:location}}}>{title}</Link>
        </li>
    )
}

MoviesPageItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};