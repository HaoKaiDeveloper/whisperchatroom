import React from "react";

const formInput = ({ name, labelName, type, refValue, placeholder }) => {
  return (
    <div>
      <label htmlFor={name}>{labelName}</label>
      <input
        type={type}
        id={name}
        name={name}
        ref={refValue}
        autoComplete="off"
        placeholder={placeholder}
      />
    </div>
  );
};

export default formInput;
