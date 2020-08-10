import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styles from './app.module.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SingleNews from './pages/SingleNews';
import NewsForm from './components/NewsForm';
import Category from './pages/Category';

const App = () => {
    return (
        <div className={styles.container}>
            <BrowserRouter>
                <Header />

                <Switch>
                    <Route
                        path="/new-article"
                        render={routeProps => (
                            <NewsForm
                                {...routeProps}
                                quote="You create the news 😉"
                            />
                        )}
                    />
                    <Route
                        path="/edit/:category/:postURL"
                        render={routeProps => (
                            <NewsForm
                                {...routeProps}
                                editMode={true}
                                quote="Editing is - perfecting it 👌"
                            />
                        )}
                    />
                    <Route path="/category/world" component={Category} />
                    <Route path="/category/politics" component={Category} />
                    <Route path="/category/business" component={Category} />
                    <Route path="/category/health" component={Category} />
                    <Route
                        path="/category/entertainment"
                        component={Category}
                    />
                    <Route path="/category/travel" component={Category} />
                    <Route path="/category/sport" component={Category} />
                    <Route path="/:category/:postURL" component={SingleNews} />
                </Switch>

                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;
