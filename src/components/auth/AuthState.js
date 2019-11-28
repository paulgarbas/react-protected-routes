import React, { useEffect, useContext, useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { AUTH_USER, NOT_AUTH_USER } from '../../types';
import { FirebaseContext } from '../Firebase/context';

const AuthState = props => {
    const initialState = {
        authUser: sessionStorage.getItem('user')
    };

    const firebaseContext = useContext(FirebaseContext);

    useEffect(() => {
        const listener = firebaseContext.auth.onAuthStateChanged(authenticated => (
            authenticated ? 
                dispatch({ "type": AUTH_USER, payload: authenticated }) : 
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
