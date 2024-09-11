import React from 'react';
import ReactQuill from 'react-quill';
import styles from './myeditor.module.css';
import 'react-quill/dist/quill.snow.css'; // Import stylów Quill

function MyEditor({ value, onChange }) {
    return (
        <div className={`${styles.editQuill}`}>
            <ReactQuill
                value={value}
                onChange={onChange}
                modules={MyEditor.modules}
                formats={MyEditor.formats}
                placeholder="Content"
            />
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
