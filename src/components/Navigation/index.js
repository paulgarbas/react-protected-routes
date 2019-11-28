import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import AuthContext from '../auth/authContext';

import * as ROUTES from '../../constants/routes';

const Navigation = () => {
    const authUser = useContext(AuthContext);
    
    return (
        <div>
            { authUser ? <NavigationAuth /> : <NavigationNonAuth /> }
        </div>
    )
}

const NavigationAuth = () => (
    <Fragment>
        <h3>Hello, user!</h3>
        <ul>
            <li>
                <Link to={ROUTES.LANDING}>Landing</Link>
            </li>
            <li>
                <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
                <Link to={ROUTES.ACCOUNT}>Account</Link>
            </li>
            <li>
                <Link to={ROUTES.ADMIN}>Admin</Link>
            </li>
            <li>
                <SignOutButton />
            </li>
        </ul>
    </Fragment>
);

const NavigationNonAuth = () => (
    <Fragment>
        <h3>Hello, guest!</h3>
        <ul>
            <li>
                <Link to={ROUTES.LANDING}>Landing</Link>
            </li>
            <li>
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </li>
        </ul>
    </Fragment>
);

export default Navigation;
