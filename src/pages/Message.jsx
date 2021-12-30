import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { logoutInitiate } from "../redux/action";
import { db } from "../utils/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Message = ({ email }) => {
  const navigate = useNavigate();
  const [content, setContent] = useState([]);
  const [open, IsOpen] = useState(false);
  const [count, setCount] = useState(0);
  const { currentUser, timeStatus } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logout = () => {
    if (currentUser) {
      dispatch(logoutInitiate());
    }
  };
  if (open) {
    setTimeout(() => {
      IsOpen(false);
    }, 2000);
  }
  useEffect(() => {
    let message = [];
    onSnapshot(collection(db, "comments"), (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data().email !== email) {
          message.push({ name: doc.data().name, content: doc.data().content });
        }
      });
    });
    setContent(message);
  }, [email]);
  const randArr = Math.floor(Math.random() * content.length);
  return (
    <>
      <div
        className={`flex overflow-hidden flex-row  rounded-2xl  justify-center lg:max-w-3xl w-full bg-white  transition-all drop-shadow-2xl  ${
          open ? "flip" : ""
        }`}
      >
        {currentUser && timeStatus ? (
          <>
            <div className="md:p-10 p-5 w-full">
              {count % 2 === 0 ? (
                <>
                  <div className="w-full -mt-7 text-left">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-black mt-4 hover:text-green-500 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={() => navigate("/", { replace: true })}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="envelope"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="md:w-80 md:h-80 mx-auto text-lime-400 w-60 h-60 transition-all animate-rotate  cursor-pointer"
                    onClick={() => {
                      IsOpen(!open);
                      setCount(count + 1);
                    }}
                  >
                    <path
                      fill="currentColor"
                      d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
                    />
                  </svg>
                </>
              ) : open ? (
                <>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="envelope"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="md:w-80 md:h-80 mx-auto text-lime-400 w-60 h-60 transition-all animate-bounce "
                  >
                    <path
                      fill="currentColor"
                      d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <div className="w-full -mt-7 text-right ml-3">
                    <span
                      className="text-5xl text-black hover:text-red-600 cursor-pointer"
                      onClick={() => {
                        IsOpen(!open);
                        setCount(count + 1);
                      }}
                    >
                      &times;
                    </span>
                  </div>
                  <div className="w-full text-right p-2">
                    <span className="text-2xl text-black">
                      จาก {content[randArr].name}
                    </span>
                  </div>
                  <div className="w-full p-2 break-words">
                    <span className="text-2xl text-black">
                      {content[randArr].content}
                    </span>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
      {currentUser && (
        <div className="space-x-2">
          <button
            type="button"
            className="btn btn-error text-white"
            onClick={logout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            &nbsp;Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Message;
