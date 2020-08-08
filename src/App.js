import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styles from './app.module.css';
import Header from './components/Header';
import Footer from './components/Footer';
import NewPost from './pages/NewPost';
import SingleNews from './pages/SingleNews';

const App = () => {
    return (
        <div className={styles.container}>
            <BrowserRouter>
                <Header />

                <Switch>
                    <Route path="/new-post" component={NewPost} />
                    <Route path="/:category/:postURL" component={SingleNews} />
                </Switch>

                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;
