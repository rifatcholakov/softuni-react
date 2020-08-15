import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const ProtectedRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={routeProps => {
                if (rest.authenticate) {
                    if (!!currentUser) {
                        return (
                            <RouteComponent
                                key={window.location.pathname}
                                {...routeProps}
                            />
                        );
                    } else {
                        return <Redirect to={'/sign-in'} />;
                    }
                } else {
                    if (!currentUser) {
                        return (
                            <RouteComponent
                                key={window.location.pathname}
                                {...routeProps}
                            />
                        );
                    } else {
                        return <Redirect to={'/'} />;
                    }
                }
            }}
        />
    );
};

export default ProtectedRoute;
