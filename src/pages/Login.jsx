import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  loginInitiate,
  registerInitiate,
  googleInitiate,
} from "../redux/action";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [type, setType] = useState(null);
  const schema = yup
    .object()
    .shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { currentUser } = useSelector((state) => state.user);
  const { sendStatus } = useSelector((state) => state.user);
  useEffect(() => {
    if (currentUser && sendStatus) {
      navigate("/wait", { replace: true });
    } else if (currentUser) {
      navigate("/", { replace: true });
    }
  }, [navigate, currentUser, sendStatus]);
  const onSubmit = (data) => {
    if (type === "signUp") {
      dispatch(registerInitiate(data.email, data.password));
    } else if (type === "signIn") {
      dispatch(loginInitiate(data.email, data.password));
    }
  };

  const signInWithGooglePopUp = () => {
    dispatch(googleInitiate());
  };
  return (
    <>
      <h1 className="md:text-5xl text-3xl font-bold text-black flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 rotate-45"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
        Paper Plane
      </h1>
      <div
        className={`flex overflow-hidden flex-row  rounded-2xl  justify-center lg:max-w-3xl w-full drop-shadow-2xl`}
      >
        <div className="card lg:card-side bg-white text-neutral-content drop-shadow-lg w-full">
          <div className="lg:block hidden md:max-h-96 bg-blue-400 w-1/2">
            <div className="mx-auto w-full h-full shadow-2xl relative overflow-hidden">
              <div className="plane top-32 left-48">
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
          </div>
          <div className="card-body text-black">
            <h1 className="card-title text-center text-5xl">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-2">
              <div className="form-control">
                <Input
                  type="text"
                  placeholder="Email"
                  register={register("email")}
                  className={`${errors.email && "border-red-600 border-8"}`}
                />
              </div>
              <div className="form-control">
                <Input
                  type="password"
                  placeholder="Password"
                  register={register("password")}
                  className={`${errors.password && "border-red-600 border-8"}`}
                />
              </div>
              <div className="mx-auto w-full flex space-x-4">
                <div className=" w-1/2">
                  <button
                    className="loginButton btn btn-accent"
                    type="submit"
                    onClick={() => setType("signIn")}
                  >
                    Sign In
                  </button>
                </div>
                <div className="w-1/2">
                  <button
                    className="loginButton btn btn-primary"
                    type="submit"
                    onClick={() => setType("signUp")}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
              <button
                className="loginButton  btn  w-full btn-outline btn text-black border-1 hover:bg-gray-100 hover:text-black"
                type="button"
                onClick={() => signInWithGooglePopUp()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path
                      fill="#4285F4"
                      d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                    />
                    <path
                      fill="#34A853"
                      d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                    />
                  </g>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path
                        fill="#4285F4"
                        d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                      />
                      <path
                        fill="#34A853"
                        d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                      />
                      <path
                        fill="#EA4335"
                        d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                      />
                    </g>
                  </svg>
                </svg>
                &nbsp; Sign in with Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
