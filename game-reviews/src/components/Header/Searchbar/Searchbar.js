import styles from './searchbar.module.css';

function Searchbar(props){
    return(
        <div>
            <input type="text" id="searchbar" />
            <button>Szukaj</button>
        </div>
    );
}

export default Searchbar;