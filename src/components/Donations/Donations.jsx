import React, { useState, useEffect } from "react";
import { donation, member } from "../../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import BodyText from "../Common/BodyText";
import TitleText from "../Common/TitleText";
import Button from "../Common/Button";
import { processDonation, donationByMember, updateDonation } from "../../integrations/donationAPI";
import Modal from "../Common/Modal";
import OtherAmount from "../OtherAmount";
import { CSSTransition } from "react-transition-group";
import { useHistory } from "react-router-dom";
const Donations = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [donate, setDonate] = useRecoilState(donation);
  const { id:member_id } = useRecoilValue(member);
  // const person = useRecoilValue(member);
  useEffect(() => {
    donationByMember(member_id).then(oldDonation => {
      if (oldDonation && oldDonation.id) {
        // console.log('old donation found', oldDonation)
        delete oldDonation['created_at'];
        delete oldDonation['member_id'];
        setDonate(oldDonation)
      }
    })
  }, [member_id]) // eslint-disable-line
  const handleDonate = (amount) => {
    setDonate({ ...donate, amount });
  };
  const processMonthlyDonation = () => {
    if (!donate.id) {
      processDonation({ ...donate, member_id });
    } else {
      updateDonation(donate);
    }
    history.push("/checkout");
  };
  return (
    <>
      <CSSTransition in={open} timeout={300} classNames="alert" unmountOnExit>
        <Modal open={open} dismissible>
          <OtherAmount
            close={() => setOpen(false)}
            processMonthlyDonation={processMonthlyDonation}
          />
        </Modal>
      </CSSTransition>
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
              buttonClass={`Button-donate${
                donate.amount === 20 ? " active" : ""
              }`}
              onClick={() => handleDonate(20)}
            />
            <Button
              text="$40 usd/mo"
              buttonClass={`Button-donate${
                donate.amount === 40 ? " active" : ""
              }`}
              onClick={() => handleDonate(40)}
            />
            <Button
              text="$60 usd/mo"
              buttonClass={`Button-donate${
                donate.amount === 60 ? " active" : ""
              }`}
              onClick={() => handleDonate(60)}
            />
          </div>
          <div className="container-buttons">
            <Button
              text="$80 usd/mo"
              buttonClass={`Button-donate${
                donate.amount === 80 ? " active" : ""
              }`}
              onClick={() => handleDonate(80)}
            />
            <Button
              text="Other Amount"
              buttonClass="Button-donate-other"
              onClick={() => {
                // console.log("click");
                setDonate({ ...donate, amount: "" });
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
