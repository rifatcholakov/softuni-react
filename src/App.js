import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import styles from './app.module.css';
import Header from './components/Header';
import Footer from './components/Footer';
import NewPost from './pages/NewPost';

const App = () => {
    return (
        <div className={styles.container}>
            <BrowserRouter>
                <Header />

                {/* Middle */}
                <NewPost />

                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;
