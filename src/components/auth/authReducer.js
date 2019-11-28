import { AUTH_USER, NOT_AUTH_USER } from '../../types';

export default (state, action) => {
    switch (action.type) {
        case AUTH_USER:
            sessionStorage.setItem('user', action.payload);

            return {
                authUser: action.payload
            }
        case NOT_AUTH_USER:
            sessionStorage.removeItem('user');

            return {
                authUser: null
            }
        default:
            return state;
    }
}