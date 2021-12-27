import * as types from "./actionTypes";
const initialState = {
  loading: false,
  currentUser: null,
  sendStatus: false,
  timeStatus: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SEND_START:
    case types.REGISTER_START:
    case types.GOOGLE_START:
    case types.LOGIN_START:
    case types.LOGOUT_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };

    case types.SET_USER:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case types.SET_SEND:
      return {
        ...state,
        loading: false,
        sendStatus: action.payload,
      };
    case types.SET_TIME:
      return {
        ...state,
        loading: false,
        timeStatus: action.payload,
      };
    case types.SEND_SUCCESS:
    case types.REGISTER_SUCCESS:
    case types.GOOGLE_SUCCESS:
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case types.SEND_FAIL:
    case types.REGISTER_FAIL:
    case types.GOOGLE_FAIL:
    case types.LOGIN_FAIL:
    case types.LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
