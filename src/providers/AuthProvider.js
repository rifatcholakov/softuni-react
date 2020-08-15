import React, { useEffect, useState } from 'react';
import { auth } from '../configs/firebase';
import styles from './authProvider.module.css';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setPending(false);
        });
    }, []);

    if (pending) {
        // Spinner
        return (
            <div className={styles['lds-ring']}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
