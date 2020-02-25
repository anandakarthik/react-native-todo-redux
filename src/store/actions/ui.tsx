import { UI_START_LOADING, UI_STOP_LOADING, IS_LOGIN, IS_SIGNUP } from './actionTypes';

export const uiStartLoading = () => {
    return {
        type: UI_START_LOADING
    };
};

export const uiStopLoading = () => {
    return {
        type: UI_STOP_LOADING
    };
};

export const isLoggedIn = (isLogin) => {
    return {
        type: IS_LOGIN,
        payload : isLogin
    };
};

export const isSignedUp = (isSignUp) => {
    return {
        type: IS_SIGNUP,
        payload : isSignUp
    };
};