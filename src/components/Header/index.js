import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <h1 className={styles.logo}>the news</h1>
            <nav className={styles.navigation}>
                <Link to="#" className={styles.link}>
                    World
                </Link>
                <Link to="#" className={styles.link}>
                    Politics
                </Link>
                <Link to="#" className={styles.link}>
                    Business
                </Link>
                <Link to="#" className={styles.link}>
                    Health
                </Link>
                <Link to="#" className={styles.link}>
                    Entertainment
                </Link>
                <Link to="#" className={styles.link}>
                    Travel
                </Link>
                <Link to="#" className={styles.link}>
                    Sport
                </Link>
            </nav>
        </div>
    );
};

export default Header;
