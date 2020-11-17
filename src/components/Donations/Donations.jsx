import React, { useState, useEffect, useCallback } from "react";
import { member } from "../../atoms";
import { useRecoilState } from "recoil";
import BodyText from "../Common/BodyText";
import TitleText from "../Common/TitleText";
import Button from "../Common/Button";
// import { processDonation, donationByMember, updateDonation } from "../../integrations/donationAPI";
import Modal from "../Common/Modal";
import OtherAmount from "../OtherAmount";
import { CSSTransition } from "react-transition-group";
import { getUser } from "../../amplifyHelpers";
import { API } from "aws-amplify";

import { useHistory } from "react-router-dom";
const Donations = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [memberValues, setMemberValues] = useRecoilState(member);
  const [state, setState] = useState({...memberValues});

  // const person = useRecoilValue(member);
  const cbRefresh = useCallback(() => {
    if (state.phone_number) return;
    getUser().then((memberData) => {
      console.log(memberData);
      setState((s) => setState({ ...s, ...memberData }));
      // get member record from the API.
      API.get("apic825e45a", "/members/username/", {
        username: memberData.username
      }).then((res) => {
        if (res.length > 0) {
          console.log(res.length);
          console.log(res[0]);
          setState({ ...state, ...res[0] });
          // setLoading(false);
          // setRstate({ ...state });
        }
      });
      // updateFromAuth({email, state, setState});
    });
  }, []); // eslint-disable-line
  useEffect(() => {
    cbRefresh();
    console.log(state);
  }, []); // eslint-disable-line

  const handleDonate = (amount) => {
    console.log(amount);
    if (!Number(amount)) return
    // setMemberValues({...state, amount})
    setState({...state, amount})
  };
  const processMonthlyDonation = async (amount) => {
    console.log(amount)
    if (amount) {
      console.log('updating state with amount')
      setState({...state, amount})
      setMemberValues({...state, amount})
    }
    if (!state.donation) {
      console.log('enable donations')
      setState({...memberValues, donation: true})
    } else {
      console.log('update donation')
    }
    history.push("/checkout");
  };
  function notSelectable(amount) {
    switch(amount){
      case 20:
        return false;
      case 40:
        return false;
      case 60:
        return false;
      case 80:
        return false;
      default:
        return amount > 0;
    }
  }
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
                state?.amount === 20 ? " active" : ""
              }`}
              onClick={() => handleDonate(20)}
            />
            <Button
              text="$40 usd/mo"
              buttonClass={`Button-donate${
                state?.amount === 40 ? " active" : ""
              }`}
              onClick={() => handleDonate(40)}
            />
            <Button
              text="$60 usd/mo"
              buttonClass={`Button-donate${
                state?.amount === 60 ? " active" : ""
              }`}
              onClick={() => handleDonate(60)}
            />
          </div>
          <div className="container-buttons">
            <Button
              text="$80 usd/mo"
              buttonClass={`Button-donate${
                state?.amount === 80 ? " active" : ""
              }`}
              onClick={() => handleDonate(80)}
            />
            <Button
              text="Other Amount"
              buttonClass={`Button-donate-other${
                state?.amount && notSelectable(state.amount) ? " active": ""
              }`}
              onClick={(e) => {
                // console.log("click");
                console.log(e.target.value)
                // setState({ ...state, amount: Number(e.target.value) });
                setOpen(true);
              }}
            />
          </div>
          <Button text="DONATE MONTHLY" onClick={()=>processMonthlyDonation(state?.amount)} />
          <div className="boxed-text">
            You can adjust or cancel your recurring donation at anytime.
          </div>
        </div>
      </BodyText>
    </>
  );
};

export default Donations;
