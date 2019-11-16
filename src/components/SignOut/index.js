import React, { useContext } from 'react';
import { FirebaseContext } from '../Firebase/context';

const SignOutButton = () => {
    const firebaseContext = useContext(FirebaseContext);

    return (
        <button 
            type="button" 
            onClick={firebaseContext.doSignOut}
        >
            Sign Out
        </button>
    )
};

export default SignOutButton;
