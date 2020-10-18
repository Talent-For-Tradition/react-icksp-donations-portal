import React from "react";

const Input = (props) => {
  const { type, name, placeholder, value, onChange, err, half,extra,...rest } = props;
  if (type === "submit") {
    return <input {...props} />
  }
  return (
    <>
      <input
        {...extra}
        className={`FormInput${half ? " FormHalf":""}${err && err(name) ? " Invalid":""}`}
        placeholder={placeholder}
        value={value}
        id={name}
        name={name}
        onChange={onChange}
        {...rest}
      />
    </>
  );
};

export default Input;
