import React from "react";
import {useRecoilState} from "recoil";
import {useHistory} from 'react-router-dom';
import Button from "../Button";
import TitleText from "../TitleText";
import schema from "./MobileSchema";
import {reminder} from "../../atoms";
const TIMEZONES = ["EST", "PST", "MT", "CT"];
const genHours = () => {
  const hrs = [];
  for (let h = 0; h < 24; h++) {
    const i = String(1 + (h % 12));
    const m = hrs.length > (10*4) && hrs.length < (23*4) ? "PM" : "AM";
    hrs.push(i + ':00' + m);
    hrs.push(i + ':15' + m);
    hrs.push(i + ':30' + m);
    hrs.push(i + ':45' + m);
  }
  return hrs;
};
const HOURS = genHours();
function hourToOption(hour, key) {
  return (
  <option key={key} id={hour} name={hour} value={hour}>{hour}</option>
  )
}
function tzToOption(zone, key) {
  return (
    <option key={key} id={zone} name={zone} value={zone}>
      {zone}
    </option>
  );
}

const MobileTextForm = () => {
  // Prayer Card, daily reminder (4)
  const [state, setState] = useRecoilState(reminder)
  const history = useHistory();
  const handleVerify = () => {
    const { error } = schema.validate(state);
    error ? console.log(error) : history.push('/thankyou'); // replace with call to API
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
          <input
            className="FormInput"
            placeholder="Mobile number"
            name="mobile"
            id="mobile"
            value={state.mobile}
            onChange={handleChange}
          />
          <TitleText>send my daily reminder at</TitleText>
          <div className="FormDouble">
            <select
              className="FormHalf"
              placeholder="hour"
              name="hour"
              id="hour"
              value={state.hour}
              onChange={handleChange}
              >
            {HOURS.map(hourToOption)}
            </select>
            <select
              className="FormHalf"
              id="timezome"
              name="timezone"
              onChange={handleChange}
            >
              {TIMEZONES.map(tzToOption)}
            </select>
          </div>
          <Button text="SUBMIT" type="button" handleClick={handleVerify} />
        </form>
      </div>
    </>
  );
};

export default MobileTextForm;
