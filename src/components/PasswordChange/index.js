import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../Firebase/context';

const PasswordChangeForm = () => {
    const initialState = {
        passwordOne: '',
        passwordTwo: '',
        error: null
    };

    const [emailChange, setEmailChange] = useState(initialState);

    const { passwordOne, passwordTwo, error } = emailChange;

    const firebaseContext = useContext(FirebaseContext);

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

    const onSubmit = async event => {
        event.preventDefault();

        try {
            await firebaseContext.doPasswordUpdate(passwordOne);
            setEmailChange(initialState);
        } catch (error) {
            setEmailChange({
                ...emailChange,
                error
            });
        }
    };

    const onChange = event => setEmailChange({
        ...emailChange,
        [event.target.name]: event.target.value
    });

    return (
        <form onSubmit={onSubmit} >
            <input 
                name="passwordOne"
                value={passwordOne}
                onChange={onChange}
                type="password"
                placeholder="New Password"
            />
            <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={onChange}
                type="password"
                placeholder="Confirm New Password"
            />
            <button 
                disabled={isInvalid} 
                type="submit"
            >
                Change My Password
            </button>

            { error && <p>{ error.message }</p> }
        </form>
    )
};

export default PasswordChangeForm;
