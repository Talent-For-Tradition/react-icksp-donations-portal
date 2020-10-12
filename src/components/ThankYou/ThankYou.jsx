import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import TitleText from "../TitleText";
import BodyText from "../BodyText";
import Button from "../Button";
import { member, reminder } from "../../atoms";
import { useRecoilValue } from "recoil";

const ThankYou = ({ fullname }) => {
  // Prayer Card, Thank you page (5)
  const history = useHistory();
  const memberValue = useRecoilValue(member); // read-only
  const reminderValue = useRecoilValue(reminder); // read-only
  
  useEffect(() => {
    console.log(memberValue.fullname + ", thank you.")
  }, [memberValue, reminderValue])

  return (
    <>
      <TitleText>{memberValue.fullname}, Thank You.</TitleText>
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
        <Button
          text="YES, PLEASE SHOW ME!"
          handleClick={() => history.push("/donate")}
        />
      </BodyText>
    </>
  );
};

export default ThankYou;
