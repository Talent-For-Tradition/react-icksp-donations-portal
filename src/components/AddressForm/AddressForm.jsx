import React, { useState, useRef } from "react";
import { TitleText, Button, Modal, Reminder } from "../index";
// import "./formStyle.less";
import StatesList from "./statesList";
import schema from "./AddressSchema";
import { useRecoilState } from "recoil";
import { member } from "../../atoms";

function StateToOption({ name, abbreviation, key }) {
  return (
    <option key={key} value={abbreviation}>
      {name}
    </option>
  );
}

const AddressForm = ({ handleSubmit }) => {
  // Prayer Card, where? (2)
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [state, setState] = useRecoilState(member);
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
  const submitForm = () => {
    // after verification
    setOpen(true); // open reminder modal
  }
  const handleVerify = () => {
    // verify state and send to callback
    const { error } = schema.validate(state);
    error ? console.log(error) : submitForm() // replace with call to API
  };
  return (
    <>
      <Modal open={open}>
        <Reminder escape={() => setOpen(false)} />
      </Modal>
      <div className="AddressForm">
        <TitleText>
          WHERE SHOULD WE SEND YOUR FREE MEMORARE PRAYER CARDS?
        </TitleText>
        <form
          ref={ref}
          id="addressForm"
          className="BodyTextForm"
          onSubmit={() => handleVerify()}
        >
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
          <div className="FormDouble">
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
          <Button text="SUBMIT" type="button" handleClick={handleVerify} />
        </form>
      </div>
    </>
  );
};

export default AddressForm;
