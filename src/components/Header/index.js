import React, { useState } from 'react';
import styles from './index.module.css';
import { Link, NavLink } from 'react-router-dom';
import { auth } from '../../configs/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const [showMenu, setShowMenu] = useState(true);

    return (
        <div>
            <Link to="/" className={styles.nostyle}>
                <h1 className={styles.logo}>the news</h1>
            </Link>
            <div className={styles['menu-wrapper']}>
                <button
                    className={styles['mobile-btn']}
                    onClick={() =>
                        showMenu ? setShowMenu(false) : setShowMenu(true)
                    }
                >
                    {showMenu ? (
                        <FontAwesomeIcon icon={faChevronDown} size="2x" />
                    ) : (
                        <FontAwesomeIcon icon={faTimes} size="2x" />
                    )}
                </button>
                <nav
                    className={`${styles.topnav} ${
                        showMenu ? styles.menu : 'none'
                    }`}
                >
                    <NavLink
                        to="/category/world"
                        className={styles.link}
                        activeClassName={styles.active}
                    >
                        World
                    </NavLink>
                    <NavLink
                        to="/category/politics"
                        className={styles.link}
                        activeClassName={styles.active}
                    >
                        Politics
                    </NavLink>
                    <NavLink
                        to="/category/business"
                        className={styles.link}
                        activeClassName={styles.active}
                    >
                        Business
                    </NavLink>
                    <NavLink
                        to="/category/health"
                        className={styles.link}
                        activeClassName={styles.active}
                    >
                        Health
                    </NavLink>
                    <NavLink
                        to="/category/entertainment"
                        className={styles.link}
                        activeClassName={styles.active}
                    >
                        Entertainment
                    </NavLink>
                    <NavLink
                        to="/category/travel"
                        className={styles.link}
                        activeClassName={styles.active}
                    >
                        Travel
                    </NavLink>
                    <NavLink
                        to="/category/sport"
                        className={styles.link}
                        activeClassName={styles.active}
                    >
                        Sport
                    </NavLink>
                </nav>
            </div>
        </div>
    );
};

export default Header;
