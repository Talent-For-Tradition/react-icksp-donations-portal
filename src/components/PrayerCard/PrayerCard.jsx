import React from "react";
import { useHistory } from "react-router-dom";
import TitleText from "../Common/TitleText";
import BodyText from "../Common/BodyText";
import Button from "../Common/Button";
// import { useAuth0 } from "@auth0/auth0-react";
const PrayWithUs = () => {
  // const { isAuthenticated, loginWithRedirect } = useAuth0();
  // Prayer Card (1)
  const history = useHistory();
  return (
    <div className="PrayWithUs">
      <TitleText>PRAY WITH US</TitleText>
      <BodyText>
        <p>
          The Restoration is a growing family of Catholics who support the
          Institute's mission to spread the reign of our Lord Jesus Christ in
          all spheres of human life.
        </p>
        <p>
          The most fundamental means of this support is praying the Memorare
          everyday.
        </p>
        <p>
          When you join The Restoration we will send you a new Memorare prayer
          card every season to remind you of your critical role in this divine
          mission.
        </p>
        <p>Will you pray the Memorare with us daily?</p>
        <Button
            text="YES, PLEASE SEND ME MY FIRST PRAYER CARD!"
            onClick={() => history.push("/where")}
          />

        {/* {isAuthenticated ? (
          <Button
            text="YES, PLEASE SEND ME MY FIRST PRAYER CARD!"
            onClick={() => history.push("/where")}
          />
        ) : (
          <Button
            text="YES, PLEASE SEND ME MY FIRST PRAYER CARD!"
            onClick={() => loginWithRedirect([`redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`])}
          />
        )} */}
      </BodyText>
    </div>
  );
};

export default PrayWithUs;
