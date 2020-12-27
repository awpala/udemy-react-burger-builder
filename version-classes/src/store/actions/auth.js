import axios from 'axios';

import * as actionTypes from './actionTypes';
import { authURL, loginURL } from '../../redacted';

// action creators
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => { // async via redux-thunk
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000); // convert ms to s
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => { // async via redux-thunk
        dispatch(authStart());

        let url = isSignUp ? authURL : loginURL;

        const authData = { // formatted for Firebase
            email,
            password,
            returnSecureToken: true
        }

        axios.post(url, authData)
            .then(response => {
                // console.log(response);
                const { idToken, localId, expiresIn } = response.data; // from Firebase
                dispatch(authSuccess(idToken, localId));
                dispatch(checkAuthTimeout(expiresIn))
            })
            .catch(err => {
                // console.log(err);
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    };
};
