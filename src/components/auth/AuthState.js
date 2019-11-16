import React, { useEffect, useContext, useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { AUTH_USER, NOT_AUTH_USER } from '../../types';
import { FirebaseContext } from '../Firebase/context';

const AuthState = props => {
    const initialState = {
        authUser: null
    };

    const firebaseContext = useContext(FirebaseContext);

    useEffect(() => {
        const listener = firebaseContext.auth.onAuthStateChanged(authUser => (
            authUser ? 
                dispatch({ "type": AUTH_USER, payload: authUser }) : 
                dispatch({ "type": NOT_AUTH_USER })
        ));

        // Cleanup function
        return () => {
            listener();
        };
    }, [firebaseContext.auth])

    const [state, dispatch] = useReducer(authReducer, initialState);
    
    return (
        <AuthContext.Provider value={state.authUser} >
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthState;
