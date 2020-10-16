import React from "react";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";

import Button from "../Common/Button";
import Input from "../Common/Input";
import TitleText from "../Common/TitleText";
import Select from "../Common/Select";

import schema from "./MobileSchema";
import { reminder } from "../../atoms";

import { HOURS, TIMEZONES, hourToOption, tzToOption } from './options';

/**
 * send my daily reminder at...
 */
const MobileTextForm = () => {
  // Prayer Card, daily reminder (4)
  const [state, setState] = useRecoilState(reminder);
  const history = useHistory();
  const handleVerify = () => {
    const { error } = schema.validate(state);
    error ? console.log(error) : history.push("/thankyou"); // replace with call to API
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
