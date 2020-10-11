import React, { useState, useEffect } from "react";
import "./buttonStyle.less";

const Button = ({ text, handleClick }) => {
  const [state, setState] = useState({ text: "", status: "" });

  useEffect(() => {
    if (state.text !== text) {
      setState({ ...state, text });
    }
  }, [text, state]);

  return (
    <div className="Button-Red" onClick={() => handleClick()}>
      {text}
    </div>
  );
};

export default Button;
