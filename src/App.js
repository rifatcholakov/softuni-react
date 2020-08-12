import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styles from './app.module.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SingleNews from './pages/SingleNews';
import NewsForm from './components/NewsForm';
import Category from './pages/Category';
import AuthForm from './components/AuthForm';
import { AuthProvider } from './providers/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <AuthProvider>
            <div className={styles.container}>
                <BrowserRouter>
                    <Header />

                    <Switch>
                        <ProtectedRoute
                            authenticate={true}
                            path="/new-article"
                            component={NewsForm}
                        />
                        <ProtectedRoute
                            authenticate={true}
                            path="/edit/:category/:postURL"
                            component={NewsForm}
                        />
                        <ProtectedRoute
                            authenticate={false}
                            path="/create-account"
                            component={AuthForm}
                        />
                        <ProtectedRoute
                            authenticate={false}
                            path="/sign-in"
                            component={AuthForm}
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
                        <Route
                            path="/:category/:postURL"
                            component={SingleNews}
                        />
                    </Switch>

                    <Footer />
                </BrowserRouter>
            </div>
        </AuthProvider>
    );
};

export default App;
