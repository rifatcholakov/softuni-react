import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from './pages/Home';

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={HomePage} />
        </Switch>
    );
};

export default Routes;
