import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutInitiate } from "../redux/action";
import Loading from "../components/Loading";
import Form from "./Form";
import { useNavigate } from "react-router-dom";
const Home = ({ email }) => {
  const navigate = useNavigate();
  const { currentUser, sendStatus, timeStatus } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const logout = () => {
    if (currentUser) {
      dispatch(logoutInitiate());
    }
  };
  useEffect(() => {
    if (currentUser) {
      if (timeStatus) {
        navigate("/message", { replace: true });
      } else if (sendStatus) {
        navigate("/wait", { replace: true });
      }
    }
  }, [sendStatus, navigate, timeStatus, currentUser]);
  return (
    <>
      <div
        className={`flex overflow-hidden flex-row  rounded-2xl  justify-center lg:max-w-3xl w-full bg-white  transition-all drop-shadow-2xl`}
      >
        {currentUser && !sendStatus ? <Form email={email} /> : <Loading />}
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

export default Home;
