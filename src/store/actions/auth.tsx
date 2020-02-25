import AsyncStorage from "@react-native-community/async-storage";

import { uiStartLoading, uiStopLoading, isLoggedIn, isSignedUp } from "./ui";

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';


const API_KEY = "AIzaSyA_IaukteMtEbuGMJx_3xbD_JOkEUJl4HM";

export const doAuth = (authData, signUp) => {
    return async dispatch => {
        dispatch(uiStartLoading());
        let url =
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
            API_KEY;
        if (signUp) {
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
                API_KEY;
        }
        console.log("signIn", url, authData, signUp)
        await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .catch(err => {
                console.log(err);
                alert("Authentication failed, please try again!");
                signUp && dispatch(isSignedUp(false));
                dispatch(isLoggedIn(false));
                dispatch(uiStopLoading());
            })
            .then((res: any) => res.json())
            .then(parsedRes => {
                dispatch(uiStopLoading());
                console.log(parsedRes);
                
                if (!parsedRes.idToken) {
                    signUp && dispatch(isSignedUp(false));
                    dispatch(isLoggedIn(false));
                    alert(parsedRes.error.message)
                    //alert("Authentication failed, please try again!");
                } else {
                    signUp && dispatch(isSignedUp(true));
                    if (!signUp) {
                        dispatch({ type: AUTHENTICATE, userId: parsedRes.localId, token: parsedRes.idToken });
                        AsyncStorage.setItem('userId', (parsedRes.localId).toString())
                        AsyncStorage.setItem('userLogin', 'true');
                        dispatch(isLoggedIn(true));
                    }
                }
            });
    };
};

export const authClearStorage = () => {
    return (dispatch) => {
        dispatch(isLoggedIn(false));
        dispatch({ type: AUTHENTICATE, userId: '', token: '' });
        return AsyncStorage.removeItem("userLogin");
    };
};

export const authLogout = () => {
    return dispatch => {
        return dispatch(authClearStorage())
    };
};