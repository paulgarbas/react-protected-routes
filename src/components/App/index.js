import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import AuthState from '../auth/AuthState';
import PrivateRoute from '../Session/PrivateRoute';

import * as ROUTES from '../../constants/routes';

const App = () => {
    return (
        <AuthState>
            <Router>
                <Navigation />

                <hr />
                
                <Route exact path={ROUTES.LANDING} component={LandingPage} />
                <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                <PrivateRoute path={ROUTES.HOME} component={HomePage} />
                <PrivateRoute path={ROUTES.ACCOUNT} component={AccountPage} />
                <Route path={ROUTES.ADMIN} component={AdminPage} />
            </Router>
        </AuthState>
    )
};

export default App;
