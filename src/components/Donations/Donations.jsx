import React, { useState } from "react";
import { donation, member } from "../../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import BodyText from "../Common/BodyText";
import TitleText from "../Common/TitleText";
import Button from "../Common/Button";
import { processDonation } from "../../integrations/donationAPI";
import Modal from "../Common/Modal";
import OtherAmount from "../OtherAmount";

const Donations = () => {
  const [open, setOpen] = useState(false);
  const [donate, setDonate] = useRecoilState(donation);
  const person = useRecoilValue(member);
  const handleDonate = (amount) => {
    setDonate({ ...donate, amount });
  };
  // const handleOther = () => {
  //   setDonate({ ...donate, amount: 0 });
  // };
  const processMonthlyDonation = () => {
    processDonation({ person, donate });
  };
  return (
    <>
      <Modal open={open}>
        <OtherAmount close={() => setOpen(false)} processMonthlyDonation={processMonthlyDonation} />
      </Modal>
      <TitleText>
        JOIN OUR FAMILY OF MONTHLY DONORS SPREADING THE REIGN OF OUR LORD JESUS
        CHRIST IN ALL SPHERES OF HUMAN LIFE.
      </TitleText>
      <BodyText>
        <div className="container-Donations">
          <p>Choose an amount to give per month</p>
          <div className="container-buttons">
            <Button
              text="$20 usd/mo"
              buttonClass="Button-donate"
              onClick={() => handleDonate(20)}
            />
            <Button
              text="$40 usd/mo"
              buttonClass="Button-donate"
              onClick={() => handleDonate(40)}
            />
            <Button
              text="$60 usd/mo"
              buttonClass="Button-donate"
              onClick={() => handleDonate(60)}
            />
          </div>
          <div className="container-buttons">
            <Button
              text="$80 usd/mo"
              buttonClass="Button-donate"
              onClick={() => handleDonate(80)}
            />
            <Button
              text="Other Amount"
              buttonClass="Button-donate-other"
              onClick={() => {
                console.log('click');
                setDonate({...donate, amount: ''})
                setOpen(true);
              }}
            />
          </div>
          <Button text="DONATE MONTHLY" onClick={processMonthlyDonation} />
          <div className="boxed-text">
            You can adjust or cancel your recurring donation at anytime.
          </div>
        </div>
      </BodyText>
    </>
  );
};

export default Donations;
