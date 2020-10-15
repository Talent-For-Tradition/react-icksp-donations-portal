import React, { useState, useRef } from "react";
import { TitleText, Button, Modal, Reminder } from "../index";
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
  const [errorMessage, setErrorMessage] = useState(null);
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
    setErrorMessage(error || null);
    if (!error) {
      submitForm();
    }
    // console.log(error)
  };
  const hasError = (key) => {
    if(errorMessage) {
      // determine if error belongs to key
      return errorMessage.details.filter((err) => err.context.key === key).length > 0;
    }
    return false
  }
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
          onSubmit={(e) => e.preventDefault() && handleVerify()}
        >
          <input
            className="FormInput"
            placeholder="John Smith"
            name="fullname"
            id="fullname"
            value={state.fullname}
            onChange={handleChange}
            style={{border: hasError('fullname') ? '2px solid red':'none'}}
          />
          <select
            className="FormSelect"
            id="country"
            name="country"
            onChange={handleChangeCountry}
            style={{border: hasError('country') ? '2px solid red':'none'}}
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
            style={{border: hasError('addr1') ? '2px solid red':'none'}}
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
              style={{border: hasError('city') ? '2px solid red':'none'}}
              />
            <input
              className="FormHalf"
              placeholder="Zip"
              name="zip"
              id="zip"
              value={state.zip}
              onChange={handleChange}
              style={{border: hasError('zip') ? '2px solid red':'none'}}
            />
          </div>
          <select
            className="FormSelect"
            id="state"
            name="state"
            onChange={handleChangeState}
            style={{border: hasError('state') ? '2px solid red':'none'}}
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
            style={{border: hasError('email') ? '2px solid red':'none'}}
          />
          <Button text="SUBMIT" type="button" handleClick={handleVerify} />
        </form>
      </div>
    </>
  );
};

export default AddressForm;
