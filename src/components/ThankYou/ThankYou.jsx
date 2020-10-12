import React from "react";
import {useHistory} from "react-router-dom";
import TitleText from "../TitleText";
import BodyText from "../BodyText";
import Button from "../Button";
const ThankYou = ({ fullname }) => {
  // Prayer Card, Thank you page (5)
  const history = useHistory();
  return (
    <>
      <TitleText>{fullname}, Thank You.</TitleText>
      <BodyText>
        <p>Your prayers are the most powerful support you can offer</p>
        <p>
          We would also like to invite you to become a monthly supporter of the
          Restoration with whatever treasure God has blessed you with.
        </p>
        <p>
          Would you like to see the most common levels of recurring monthly
          support offered by members of the Restoration?
        </p>
        <Button text="YES, PLEASE SHOW ME!" handleClick={()=>history.push('/donate')}/>
      </BodyText>
    </>
  );
};

export default ThankYou;
