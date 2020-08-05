import React from 'react';
import styles from './index.module.css';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <p>
                &copy; {year} <strong>The News</strong>. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
