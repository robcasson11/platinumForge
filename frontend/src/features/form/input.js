import React from "react";

const Input = ({ name, title, value, innerRef, type, handleInputChange }) => {
  return (
    <>
      <label htmlFor={name}>{title}</label>
      <input
        id={name}
        type={type}
        name={name}
        ref={innerRef}
        value={value}
        onChange={handleInputChange}
      />
    </>
  );
};

export default Input;
