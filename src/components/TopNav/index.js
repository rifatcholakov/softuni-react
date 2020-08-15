import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { auth } from '../../configs/firebase';
import styles from './index.module.css';

const logOut = history => {
    console.log(history);
    auth.signOut().then(() => history.push('/'));
};

const TopNav = () => {
    let history = useHistory();
    const { currentUser } = useContext(AuthContext);

    return (
        <div className={styles.wrapper}>
            {!currentUser ? (
                <>
                    <div className={styles['mobile-login']}>
                        Want to get inside?{' '}
                        <Link to="/sign-in" className={styles.link}>
                            Click here
                        </Link>
                    </div>
                    <div className={styles.right}>
                        <Link to="/sign-in">Sign In</Link> /{' '}
                        <Link to="/create-account">Create Account</Link>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <Link to="/new-article">New Article</Link>
                    </div>
                    <div>
                        <Link to="#" onClick={() => logOut(history)}>
                            Log Out
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default TopNav;
