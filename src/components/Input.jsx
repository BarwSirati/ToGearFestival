import React from "react";

const Input = ({ type, placeholder, register, className }) => {
  return (
    <input
      className={`input-form ${className}`}
      autoComplete="off"
      type={type}
      placeholder={placeholder}
      {...register}
    />
  );
};

export default Input;
