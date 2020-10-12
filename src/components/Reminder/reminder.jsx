import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../Button";
import "./reminder.less";

const Reminder = ({ escape }) => {
  // Prayer Card, contents of modal (3)
  const history = useHistory();
  const handleYes = () => {
    console.log("yes");
    escape(); // close modal
    history.push("/mobile"); // send to mobile form (4)
  };
  const handleNo = () => {
    console.log("no");
    escape(); // close modal
    history.push("/thankyou"); // send to thankyou page (5)
  };
  return (
    <>
      <div className="ModalTitle">
        <h2>IT'S EASY TO FORGET</h2>
      <p>May we send you daily text reminders to pray the Memorare?</p>
      </div>
      <div className="container-YesNo">
        <Button
          buttonClass="Button-Blue-half"
          text="yes, please"
          handleClick={handleYes}
        />
        <Button
          buttonClass="Button-Red-half"
          text="no thank you"
          handleClick={handleNo}
        />
      </div>
    </>
  );
};

export default Reminder;
