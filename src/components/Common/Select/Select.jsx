import React from "react";

const Select = ({ children: options, name, onChange: handleChange, err, half, ...props }) => {
  return (
    <select
      className={`FormSelect${half ? " FormHalf":""}${err && err(name) ? " Invalid":""}`}
      // className={`FormSelect${err && err(name) ? " Invalid":""}`}
      id={name}
      name={name}
      onChange={handleChange}
      {...props}
    >
      {options}
    </select>
  );
};

export default Select;
