import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../auth/authContext';
import * as ROUTES from '../../constants/routes';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authUser = useContext(AuthContext);

    return (
        <Route { ...rest } render={props => (
            !authUser ? 
            <Redirect to={ROUTES.SIGN_IN} /> :
            <Component {...props} />
        )} />
    )
};

export default PrivateRoute;
