import styles from './searchbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Searchbar(props){
    return(
        <div>
            <input type="text" id="searchbar" />
            <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </div>
    );
}

export default Searchbar;