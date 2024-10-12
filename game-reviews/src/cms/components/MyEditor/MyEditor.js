import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import styles from './myeditor.module.css';
import 'react-quill/dist/quill.snow.css'; // Import stylów Quill
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

function MyEditor({ value, onChange }) {
    const [isHtmlView, setIsHtmlView] = useState(false); // Stan przechowujący tryb podglądu HTML

    const toggleHtmlView = () => {
        setIsHtmlView(!isHtmlView); // Przełącz tryb podglądu
    };

    const handleHtmlChange = (e) => {
        onChange(e.target.value); // Aktualizuj zawartość edytora po zmianie HTML
    };

    return (
        <div className={`${styles.editQuill}`}>
            <button onClick={toggleHtmlView}>
                {isHtmlView ? <FontAwesomeIcon icon={faCode} /> : <FontAwesomeIcon icon={faCode} />}
            </button>

            {isHtmlView ? (
                <textarea
                    className={styles.htmlTextarea}
                    value={value}
                    onChange={handleHtmlChange}
                />
            ) : (
                <ReactQuill
                    value={value}
                    onChange={onChange}
                    modules={MyEditor.modules}
                    formats={MyEditor.formats}
                    placeholder="Content"
                />
            )}
        </div>
    );
}

MyEditor.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }],
        [{ 'font': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'size': ['small', 'medium', 'large', 'huge'] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['link', 'image'],
        ['clean']
    ],
};

MyEditor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'color', 'background',
    'align', 'script', 'size'
];

export default MyEditor;
