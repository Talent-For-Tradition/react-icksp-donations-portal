import React from "react";

const Input = (props) => {
  const { type, name, placeholder, value, onChange, err, half } = props;
  if (type === "submit") {
    return <input {...props} />
  }
  return (
    <>
      <input
        className={`FormInput${half ? " FormHalf":""}${err && err(name) ? " Invalid":""}`}
        placeholder={placeholder}
        value={value}
        id={name}
        name={name}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
