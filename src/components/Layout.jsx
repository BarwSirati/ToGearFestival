import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center px-4 space-y-5 min-h-screen">
      {children}
    </div>
  );
};

export default Layout;
