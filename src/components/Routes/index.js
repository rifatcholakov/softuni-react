import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SingleNews from '../../pages/SingleNews';
import NewsForm from '../NewsForm';
import Category from '../../pages/Category';
import ProtectedRoute from '../ProtectedRoute';
import NotFound from '../../pages/NotFound';
import AuthForm from '../AuthForm';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/category/world" />
            </Route>
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
            <Route path="/category/world" component={Category} />
            <Route path="/category/politics" component={Category} />
            <Route path="/category/business" component={Category} />
            <Route path="/category/health" component={Category} />
            <Route path="/category/entertainment" component={Category} />
            <Route path="/category/travel" component={Category} />
            <Route path="/category/sport" component={Category} />
            <Route path="/:category/:postURL" component={SingleNews} />
            <Route path="*" component={NotFound} />
        </Switch>
    );
};

export default Routes;
