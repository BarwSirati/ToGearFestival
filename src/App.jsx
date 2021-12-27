import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Message from "./pages/Message";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authentication } from "./utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setTime, setUser } from "./redux/action";
import { setSend } from "./redux/action";
import { db } from "./utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Wait from "./pages/Wait";
const countDownDate = new Date("Dec 27, 2021 23:30:00").getTime();
const App = () => {
  const [email, setEmail] = useState(null);
  const [second, setSecond] = useState(
    (countDownDate - new Date().getTime()) / 1000
  );
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setEmail(user.email);
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);
  useEffect(() => {
    const getUsers = async () => {
      const usersCollectionRef = query(
        collection(db, "comments"),
        where("email", "==", email)
      );
      const querySnapshot = await getDocs(usersCollectionRef);
      querySnapshot.forEach((doc) => {
        if (doc.data().email === email) {
          dispatch(setSend(true));
        }
      });
    };
    getUsers();
  }, [dispatch, email]);
  useEffect(() => {
    const interval = setInterval(() => {
      let now = new Date().getTime();
      let distance = countDownDate - now;
      if (distance < 1) {
        setSecond(0);
        dispatch(setTime(true));
        clearInterval(interval);
      } else {
        setSecond(distance / 1000);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home email={email} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wait" element={<Wait second={second} />} />
          <Route path="/message" element={<Message email={email}  />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
