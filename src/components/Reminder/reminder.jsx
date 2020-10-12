import React from "react";
import Button from "../Button";
import "./reminder.less";

const Reminder = ({ escape }) => {
  return (
    <div className="ModalTitle">
      <button
        style={{ width: "2rem", position: "relative", top: 0 }}
        onClick={escape}
      >
        x
      </button>
      <h2>IT'S EASY TO FORGET</h2>
      <>
        <p>May we send you daily text</p>
        <p>reminders to pray the Memorare?</p>
        <div className="container-YesNo">
          <Button
            buttonClass="Button-Blue-half"
            text="yes, please"
            handleClick={() => console.log("yes")}
          />
          <Button
            buttonClass="Button-Red-half"
            text="no thank you"
            handleClick={() => console.log("no")}
          />
        </div>
      </>
    </div>
  );
};

export default Reminder;
