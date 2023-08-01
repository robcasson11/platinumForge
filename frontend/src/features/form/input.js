import React from "react";

const Input = ({
  name,
  title,
  value,
  innerRef,
  type,
  handleInputChange,
  placeHolder,
}) => {
  return (
    <>
      <label htmlFor={name}>{title}</label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeHolder}
        ref={innerRef}
        value={value}
        onChange={handleInputChange}
      />
    </>
  );
};

export default Input;
