import styles from './content.module.css';
import News from '../News/News';
import Games from '../Games/Games';
import MenuStructure from '../Structure/MenuStructure';
import Logs from '../Logs/Logs';
import Catalog from '../Catalog/Catalog';

function Content({ contentType }){

    let content;

    switch (contentType) {
        case 'settings':
            content = <div>Ustawienia</div>;
            break;
        case 'users':
            content = <div>Użytkownicy</div>;
            break;
        case 'permissions':
            content = <div>Prawa dostępu</div>;
            break;
        case 'struktura':
            content = <MenuStructure />;
            break;
        case 'katalogi':
            content = <Catalog />;
            break;
        case 'news':
            content = <News />;
            break;
        case 'games':
            content = <Games />;
            break;
        case 'menu':
            content = <div>Menu</div>;
            break;
        case 'content':
            content = <div>Treści</div>;
            break;
        case 'logs':
            content = <Logs />;
            break;
        default:
            content = <div>Wybierz opcję z menu</div>;
    }

    return(
        <div className={`${styles.content_container}`}>
            <div className={`${styles.content}`}>
                {content}
            </div>
        </div>
    );
}

export default Content;