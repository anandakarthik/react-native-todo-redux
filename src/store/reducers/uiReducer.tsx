import { UI_START_LOADING, UI_STOP_LOADING, IS_LOGIN, IS_SIGNUP } from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  isSignedUp: false
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case UI_START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case UI_STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case IS_LOGIN:
        return {
          ...state,
          isLoggedIn: action.payload
        };
    case IS_SIGNUP:
        return {
          ...state,
          isSignedUp: action.payload
        };
    default:
      return state;
  }
};

export default uiReducer;