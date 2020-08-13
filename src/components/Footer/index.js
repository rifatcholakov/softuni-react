import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <p>
                &copy; {year}{' '}
                <Link to="/" className={styles.link}>
                    The News
                </Link>
                . All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
