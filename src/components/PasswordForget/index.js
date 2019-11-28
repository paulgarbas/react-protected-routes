import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../Firebase/context';

import * as ROUTES from '../../constants/routes';

const PasswordForget = () => {
    return (
        <div>
            <h1>Password Forget</h1>
            <PasswordForgetForm />
        </div>
    )
};

const PasswordForgetForm = () => {
    const initialState = {
        email: '',
        error: null
    };

    const [emailReset, setEmailReset] = useState(initialState);

    const { email, error } = emailReset;

    const firebaseContext = useContext(FirebaseContext);

    const isInvalid = email === '';

    const onSubmit = async event => {
        event.preventDefault();

        try {
            await firebaseContext.doPasswordReset(email);
            setEmailReset(initialState);
        } catch (error) {
            setEmailReset({
                ...emailReset,
                error
            });
        }
    };

    const onChange = event => setEmailReset({
        ...emailReset,
        [event.target.name]: event.target.value
    });

    return (
        <form onSubmit={onSubmit} >
            <input 
                name="email"
                value={email}
                onChange={onChange}
                type="email" 
                placeholder="Email Address"
            />
            <button 
                disabled={isInvalid} 
                type="submit"
            >
                Reset My Password
            </button>

            { error && <p>{ error.message }</p> }
        </form>
    )
};

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
);

export default PasswordForget;

export { PasswordForgetForm, PasswordForgetLink };
