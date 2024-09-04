import styles from './content.module.css';
import News from '../News/News';

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
        case 'test':
            content = <div>Test</div>;
            break;
        case 'news':
            content = <News />;
            break;
        case 'games':
            content = <div>Gry</div>;
            break;
        case 'menu':
            content = <div>Menu</div>;
            break;
        case 'content':
            content = <div>Treści</div>;
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