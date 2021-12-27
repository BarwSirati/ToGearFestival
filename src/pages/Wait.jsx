import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutInitiate } from "../redux/action";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
const Wait = ({ second }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { timeStatus } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const getDay = () => {
    return Math.floor(second / (60 * 60 * 24));
  };
  const getHour = () => {
    return Math.floor((second % (60 * 60 * 24)) / (60 * 60));
  };
  const getMinute = () => {
    return Math.floor((second % (60 * 60)) / 60);
  };
  const getSecond = () => {
    return Math.floor(second % 60);
  };
  const logout = () => {
    if (currentUser) {
      dispatch(logoutInitiate());
    }
  };
  useEffect(() => {
    if (timeStatus) {
      navigate("/message", { replace: true });
    }
  }, [timeStatus, navigate]);
  return (
    <>
      <div
        className={`flex overflow-hidden flex-row  rounded-2xl  justify-center lg:max-w-3xl w-full bg-white  transition-all drop-shadow-2xl resize-animate`}
      >
        {currentUser ? (
          <div className="md:p-10 p-5 w-full">
            <div className="paperplane mx-auto w-60 h-60 shadow-2xl">
              <div className="plane top-16 left-32">
                <div className="wingRight" />
                <div className="wingLeft" />
                <div className="bottom" />
                <div className="top" />
                <div className="middle" />
              </div>
              <div className="clouds">
                <div className="cloudOne" />
                <div className="cloudTwo" />
                <div className="cloudThree" />
              </div>
            </div>

            <div className="space-y-6 mt-5 text-center w-full">
              <h1 className="text-black md:text-3xl text-lg">
                เครื่องบินกระดาษของน้องกำลังจะลงจอดในอีก
              </h1>
            </div>

            <div className="justify-center flex mt-7 text-center space-x-3">
              <div className="p-3 bg-neutral rounded-box text-neutral-content w-24">
                <span className="md:text-5xl countdown text-lg">
                  {getDay() < 10 ? "0" : ""}
                  {getDay()}
                </span>
                <br />
                day
              </div>
              <div className="p-3 bg-neutral rounded-box text-neutral-content w-24">
                <span className="md:text-5xl countdown text-lg">
                  {getHour() < 10 ? "0" : ""}
                  {getHour()}
                </span>
                <br />
                hours
              </div>
              <div className="p-3 bg-neutral rounded-box text-neutral-content w-24">
                <span className="md:text-5xl countdown text-lg">
                  {getMinute() < 10 ? "0" : ""}
                  {getMinute()}
                </span>
                <br />
                min
              </div>
              <div className="p-3 bg-neutral rounded-box text-neutral-content w-24">
                <span className="md:text-5xl countdown text-lg">
                  {getSecond() < 10 ? "0" : ""}
                  {getSecond()}
                </span>
                <br />
                sec
              </div>
            </div>
          </div>
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

export default Wait;
