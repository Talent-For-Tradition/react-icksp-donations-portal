import React, { useState, useEffect } from "react";

const Button = ({ text, buttonClass, ...rest }) => {
  const [state, setState] = useState({ text: "", status: "" });

  useEffect(() => {
    if (state.text !== text) {
      setState({ ...state, text });
    }
  }, [text, state]);

  return (
    <button className={buttonClass ? buttonClass : "Button-Red"} {...rest} >
      {text}
    </button>
  );
};

export default Button;
