import React, {useEffect} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";

import Button from "../Common/Button";
import Input from "../Common/Input";
import TitleText from "../Common/TitleText";
import Select from "../Common/Select";

import schema from "./MobileSchema";
import { reminder, member } from "../../atoms";
import { newReminder, reminderByMember } from "../../integrations/donationAPI";

import { HOURS, TIMEZONES, hourToOption, tzToOption } from "./options";

/**
 * send my daily reminder at...
 */
const MobileTextForm = () => {
  // Prayer Card, daily reminder (4)
  const [state, setState] = useRecoilState(reminder);
  const {id: member_id} = useRecoilValue(member);
  const history = useHistory();
  
  useEffect(() => {
    console.log(member_id)
    reminderByMember(member_id)
    .then(oldReminder => {
      if (oldReminder.id) {
        setState({ ...oldReminder})
      } else {
        setState({...state, member_id})
      }
    })
  }, [member_id]) // eslint-disable-line

  const handleVerify = async () => {
    const fields = { ...state };
    delete fields["id"];
    delete fields["member_id"];
    const { error } = schema.validate(fields);
    if (error) {
      console.log(error);
    } else {
      console.log("creating new reminder...");
      try {
        await newReminder({ ...fields, member_id });
        history.push("/thankyou");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="AddressForm">
        <form
          id="mobileForm"
          className="BodyTextForm"
          style={{ marginTop: "3rem" }}
          onSubmit={(e) => e.preventDefault() && handleVerify()}
        >
          <Input
            name="mobile"
            placeholder="Mobile number"
            onChange={handleChange}
            value={state.mobile}
          />
          <TitleText>send my daily reminder at</TitleText>
          <div className="FormDouble">
            <Select
              name="hour"
              placeholder="hour"
              value={state.hour}
              onChange={handleChange}
              half={true}
            >
              {HOURS.map(hourToOption)}
            </Select>
            <Select
              name="timezone"
              onChange={handleChange}
              value={state.timezone}
              half={true}
            >
              {TIMEZONES.map(tzToOption)}
            </Select>
          </div>
          <Button text="SUBMIT" type="button" onClick={handleVerify} />
        </form>
      </div>
    </>
  );
};

export default MobileTextForm;
