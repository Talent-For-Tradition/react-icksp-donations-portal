import React from "react";
// import Input from "../Common/Input";

const FormField = ({ label, type, name, placeholder, required, value }) => {
  return (
    <div className="form-field-container">
      <label className="StripeFormLabel" htmlFor={name}>{label}</label>
      <input className="StripeFormInput" name={name} type={type} placeholder={placeholder} required={required} defaultValue={value} />
    </div>
  );
};

export default FormField;
