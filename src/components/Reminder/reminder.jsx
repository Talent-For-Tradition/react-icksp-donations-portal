import React from "react";
import {useHistory} from "react-router-dom";
import Button from "../Button";
import "./reminder.less";

const Reminder = ({ escape }) => {
  const history = useHistory();
  const handleYes = () => {
    console.log("yes");
    escape(); // close modal
    history.push('/mobile') // send to next form
  };
  const handleNo = () => {
    console.log("no");
    escape(); // close modal
  };
  return (
    <div className="ModalTitle">
      <h2>IT'S EASY TO FORGET</h2>
        <p>May we send you daily text reminders to pray the Memorare?</p>
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
    </div>
  );
};

export default Reminder;
