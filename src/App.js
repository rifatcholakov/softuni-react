import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import styles from './app.module.css';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
    return (
        <div className={styles.container}>
            <BrowserRouter>
                <Header />
                <h1>App main</h1>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;
