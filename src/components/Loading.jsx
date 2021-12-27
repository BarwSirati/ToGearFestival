import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Loading = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && navigate("/login", { replace: true });
    return () => clearInterval(interval);
  }, [navigate, count]);
  return (
    <div className="md:p-10 p-5 w-full">
      <div className="animate-spin rounded-full h-32 w-32 border-b-8  border-success mx-auto"></div>
      <h1 className="animate-bounce text-center text-5xl text-black mt-10">
        Loading
      </h1>
    </div>
  );
};

export default Loading;
