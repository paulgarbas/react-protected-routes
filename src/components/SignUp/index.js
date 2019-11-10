import React, { useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FirebaseContext } from '../Firebase/context';

import * as ROUTES from '../../constants/routes';

const SignUpPage = () => {
    return (
        <div>
            <h1>Sign Out</h1>
            <SignUpForm />
        </div>
    )
};

const SignUpFormBase = props => {
    const initialState = {
        username: '',
        email: '',
        passwordOne: '',
        passwordTwo: '',
        error: null
    };

    const [user, setUser] = useState(initialState);

    const { username, email, passwordOne, passwordTwo, error } = user;

    const firebaseContext = useContext(FirebaseContext);

    const isInvalid = 
        passwordOne !== passwordTwo || 
        passwordOne === '' 
        || email === '' 
        || username === '';

    const onSubmit = async event => {
        event.preventDefault();

        try {
            await firebaseContext.doCreateUserWithEmailAndPassword(email, passwordOne);
            setUser(initialState);
            props.history.push(ROUTES.HOME);
        } catch (error) {
            setUser({
                ...user,
                error
            });
        }
    }

    const onChange = event => setUser({
        ...user,
        [event.target.name]: event.target.value
    });

    return (
        <form onSubmit={onSubmit}>
            <input
                name="username"
                value={username}
                onChange={onChange}
                type="text"
                placeholder="Full Name"
            />
            <input
                name="email"
                value={email}
                onChange={onChange}
                type="email"
                placeholder="Email Address"
            />
            <input
                name="passwordOne"
                value={passwordOne}
                onChange={onChange}
                type="password"
                placeholder="Password"
            />
            <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={onChange}
                type="password"
                placeholder="Confirm Password"
            />
            <button disabled={ isInvalid } type="submit">Sign Up</button>
            { error && <p>{error.message}</p> }
        </form>
    )
};

const SignUpLink = () => (
    <p>
        Don't have account? <Link to={ROUTES.SIGN_UP} >Sign Up</Link>
    </p>
);

const SignUpForm = withRouter(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };
