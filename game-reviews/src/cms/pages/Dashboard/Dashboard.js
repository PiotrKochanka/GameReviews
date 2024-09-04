import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import styles from './dashboard.module.css';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';
import Content from '../../components/Content/Content';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function Dashboard(props){
    const [selectedContent, setSelectedContent] = useState('');

    const handleMenuClick = (contentType) => {
        setSelectedContent(contentType);
    };

    let layout = {
        header: (
            <Header />
        ),
        menu: (
            <Menu onMenuClick={handleMenuClick}/>
        ),
        content: (
            <Content contentType={selectedContent}/>
        ),
        footer: (
            <Footer />
        )
    };

    return(
        <Layout>
            <div className={`${styles.cms_container}`}>
                {layout.header}
                <div className={`${styles.cms_container_rows}`}>
                    {layout.menu}
                    {layout.content}
                </div>
                {layout.footer}
            </div>
        </Layout>
    );
}

export default Dashboard;