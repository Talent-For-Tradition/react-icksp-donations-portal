import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TitleText, BodyText, Button } from "./index";
import "./formStyle.css";
import StatesList from "./statesList";

function StateToOption({ name, abbreviation, key }) {
  return (
    <option key={key} value={abbreviation}>
      {name}
    </option>
  );
}

const AddressForm = () => {
  const history = useHistory();
  const [state, setState] = useState({
    fullname: "",
    country: "",
    addr1: "",
    addr2: "",
    city: "",
    zip: "",
    state: "",
    email: ""
  });
  const handleChange = (e) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleChangeCountry = (e) => {
    e.preventDefault();
    setState({ ...state, country: e.target.value });
  };
  const handleChangeState = (e) => {
    e.preventDefault();
    setState({ ...state, state: e.target.value });
  };
  return (
    <div className="AddressForm">
      <TitleText>
        WHERE SHOULD WE SEND YOUR FREE MEMORARE PRAYER CARDS?
      </TitleText>
      <BodyText>
        <form className="BodyTextForm" onSubmit={() => history.push("/")}>
          <input
            className="FormInput"
            placeholder="John Smith"
            name="fullname"
            id="fullname"
            value={state.fullname}
            onChange={handleChange}
          />
          <select
            className="FormSelect"
            id="country"
            name="country"
            onChange={handleChangeCountry}
          >
            <option value={0}>Select Country</option>
            <option name="country" value="US">
              United States of America
            </option>
          </select>
          <input
            className="FormInput"
            placeholder="Address Line 1"
            name="addr1"
            id="addr1"
            value={state.addr1}
            onChange={handleChange}
          />
          <input
            className="FormInput"
            placeholder="Address Line 2"
            name="addr2"
            id="addr2"
            value={state.addr2}
            onChange={handleChange}
          />
          <div
            style={{
              width: `calc(50 * 1vmin)`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <input
              className="FormHalf"
              placeholder="City"
              name="city"
              id="city"
              value={state.city}
              onChange={handleChange}
            />
            <input
              className="FormHalf"
              placeholder="Zip"
              name="zip"
              id="zip"
              value={state.zip}
              onChange={handleChange}
            />
          </div>
          <select
            className="FormSelect"
            id="state"
            name="state"
            onChange={handleChangeState}
          >
            <option value={0}>Select State</option>
            {StatesList.map(({ name, abbreviation }, idx) =>
              StateToOption({ name, abbreviation, key: idx })
            )}
          </select>
          <input
            className="FormInput"
            placeholder="Email"
            name="email"
            id="email"
            value={state.email}
            onChange={handleChange}
          />
          <Button text="SUBMIT" handleClick={() => console.log(state)} />
        </form>
      </BodyText>
    </div>
  );
};

export default AddressForm;
