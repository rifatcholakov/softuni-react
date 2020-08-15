import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import TopNav from './components/TopNav';
import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './components/Routes';
import { AuthProvider } from './providers/AuthProvider';
import styles from './app.module.css';

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <TopNav />
                <div className={styles.container}>
                    <Header />
                    <Routes />
                    <Footer />
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
