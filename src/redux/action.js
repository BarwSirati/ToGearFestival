import * as types from "./actionTypes";
import { authentication } from "../utils/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../utils/firebase";
import { collection, addDoc } from "firebase/firestore";

const registerStart = () => ({
  type: types.REGISTER_START,
});
const registerSuccess = (user) => ({
  type: types.REGISTER_SUCCESS,
  payload: user,
});
const registerFail = (error) => ({
  type: types.REGISTER_FAIL,
  payload: error,
});

const loginStart = () => ({
  type: types.LOGIN_START,
});
const loginSuccess = (user) => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
});
const loginFail = (error) => ({
  type: types.LOGIN_FAIL,
  payload: error,
});

const logoutStart = () => ({
  type: types.LOGOUT_START,
});
const logoutSuccess = (user) => ({
  type: types.LOGOUT_SUCCESS,
  payload: user,
});
const logoutFail = (error) => ({
  type: types.LOGOUT_FAIL,
  payload: error,
});

const googleStart = () => ({
  type: types.GOOGLE_START,
});
const googleSuccess = (user) => ({
  type: types.GOOGLE_SUCCESS,
  payload: user,
});
const googleFail = (error) => ({
  type: types.GOOGLE_FAIL,
  payload: error,
});

const sendStart = () => ({
  type: types.SEND_START,
});
const sendSuccess = (user) => ({
  type: types.SEND_SUCCESS,
  payload: user,
});
const sendFail = (error) => ({
  type: types.SEND_FAIL,
  payload: error,
});

export const setUser = (user) => ({
  type: types.SET_USER,
  payload: user,
});

export const setSend = (send) => ({
  type: types.SET_SEND,
  payload: send,
});

export const setTime = (time) => ({
  type: types.SET_TIME,
  payload: time,
});

export const registerInitiate = (email, password) => {
  return (dispatch) => {
    dispatch(registerStart());
    createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          dispatch(registerSuccess(user));
        }
      })
      .catch((error) => {
        dispatch(registerFail(error.message));
      });
  };
};

export const loginInitiate = (email, password) => {
  return (dispatch) => {
    dispatch(loginStart());
    signInWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(loginSuccess(user));
      })
      .catch((error) => dispatch(loginFail(error.message)));
  };
};

export const logoutInitiate = () => {
  return (dispatch) => {
    dispatch(logoutStart());
    signOut(authentication)
      .then((res) => {
        dispatch(logoutSuccess(res));
      })
      .catch((error) => {
        dispatch(logoutFail(error.message));
      });
  };
};

export const googleInitiate = () => {
  return (dispatch) => {
    dispatch(googleStart());
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((res) => {
        dispatch(googleSuccess(res));
      })
      .catch((error) => {
        dispatch(googleFail(error.message));
      });
  };
};

export const sendInitiate = (email, name, content) => {
  return (dispatch) => {
    dispatch(sendStart());
    const commentCollectionRef = collection(db, "comments");
    const createCommand = async () => {
      await addDoc(commentCollectionRef, {
        email: email,
        name: name,
        content: content,
      })
        .then((send) => {
          dispatch(sendSuccess(send));
        })
        .catch((error) => {
          dispatch(sendFail(error.message));
        });
    };
    createCommand();
  };
};
