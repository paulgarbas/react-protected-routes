import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { FirebaseContext } from '../Firebase/context';
import { SignUpLink } from '../SignUp';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
    <div>
        <h1>SignIn</h1>
        <SignInForm />
        <SignUpLink />
    </div>
);

const SignInFormBase = props => {
    const initialState = {
        email: '',
        password: '',
        error: null
    };

    const [user, setUser] = useState(initialState);

    const { email, password, error } = user;

    const firebaseContext = useContext(FirebaseContext);

    const isInvalid = password === '' || email === '';

    const onSubmit = async event => {
        event.preventDefault();

        try {
            await firebaseContext.doSignInWithEmailAndPassword(email, password);
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
        <form onSubmit={onSubmit} >
            <input 
                name="email"
                value={email}
                onChange={onChange}
                type="email" 
                placeholder="Email Address"
            />
            <input 
                name="password"
                value={password}
                onChange={onChange}
                type="password" 
                placeholder="Password"
            />
            <button disabled={isInvalid} type="submit">Sign In</button>
            {error && <p>{error.message}</p>}
        </form>
    )
}

const SignInForm = withRouter(SignInFormBase);

export default SignInPage;
export { SignInForm };
