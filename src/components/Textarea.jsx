import React from "react";

const Textarea = ({ placeholder, register, className }) => {
  return (
    <textarea
      className={`input-form ${className}`}
      autoComplete="off"
      placeholder={placeholder}
      cols="30"
      rows="6"
      {...register}
    ></textarea>
  );
};

export default Textarea;
