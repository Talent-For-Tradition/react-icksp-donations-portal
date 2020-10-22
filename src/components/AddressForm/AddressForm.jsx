import React, { useState, useEffect, useCallback } from "react";
import { CSSTransition } from "react-transition-group";

import TitleText from "../Common/TitleText";
import Input from "../Common/Input";
import Modal from "../Common/Modal";
import Select from "../Common/Select";
import Reminder from "../Reminder";
import addressSchema from "./AddressSchema";
import { useRecoilState } from "recoil";
import { member } from "../../atoms";
import Joi from "joi";

import { STATES } from "./options";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * Where should we send
 * your free memorare cards?
 */
const AddressForm = () => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useRecoilState(member);
  const [errorMessage, setErrorMessage] = useState(null);
  const { user } = useAuth0();

  const cbUpdate = useCallback(() => {
    const { name, email } = user;
    const updateFromAuth = () => {
      let update = {};
      if (!state.fullname) update["fullname"] = name;
      if (!state.email) update["email"] = email;
      setState({ ...state, ...update });
    };
    updateFromAuth();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    cbUpdate();
  }, [cbUpdate]);

  const submitForm = () => {
    // after verification
    setOpen(true); // open reminder modal
  };
  /**
   * validate a single property.
   * @param {String} name element name
   * @param {String} value element value
   */
  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = Joi.object({ [name]: addressSchema[name] });
    const { error } = schema.validate(obj);
    return error ? error.details[0].message : null;
  };

  const handleChange = (e) => {
    e.preventDefault();
    const [name, value] = [[e.target.name], e.target.value];
    const error = validateProperty({ name, value });
    setState({ ...state, [name]: value });
    setErrorMessage({ ...errorMessage, [name]: error });
  };

  const handleVerify = (e) => {
    // verify state and send to callback
    e.preventDefault();
    console.log("submitted");
    const schema = Joi.object(addressSchema);
    const { error } = schema.validate(state, { abortEarly: false });
    if (!error) {
      submitForm();
    }
    const errors = {};
    if (error && error.details) {
      for (let item of error.details) errors[item.path[0]] = item.message;
      setErrorMessage(errors);
    }
  };

  const err = (key) => (errorMessage ? errorMessage[key] : false);

  return (
    <>
      <CSSTransition in={open} timeout={300} classNames="alert" unmountOnExit>
        <Modal open={open} dismissible>
          <Reminder escape={() => setOpen(false)} />
        </Modal>
      </CSSTransition>
      <div className="AddressForm">
        <TitleText>
          WHERE SHOULD WE SEND YOUR FREE MEMORARE PRAYER CARDS?
        </TitleText>
        <form id="addressForm" className="BodyTextForm" onSubmit={handleVerify}>
          <Input
            placeholder="John Smith"
            name="fullname"
            value={state.fullname}
            err={err}
            onChange={handleChange}
          />
          <Select name="country" onChange={handleChange} err={err}>
            <option value={0}>Select Country</option>
            <option name="country" value="US">
              United States of America
            </option>
          </Select>
          <Input
            placeholder="Address Line 1"
            name="addr1"
            err={err}
            onChange={handleChange}
          />
          <Input
            placeholder="Address Line 2"
            name="addr2"
            err={err}
            onChange={handleChange}
          />
          <div className="FormDouble">
            <Input
              placeholder="City"
              name="city"
              half={true}
              err={err}
              onChange={handleChange}
            />
            <Input
              placeholder="Zip"
              name="zip"
              half={true}
              err={err}
              onChange={handleChange}
            />
          </div>
          <Select name="state" onChange={handleChange} err={err}>
            <option value={0}>Select State</option>
            {STATES}
          </Select>
          <Input
            placeholder="Email"
            name="email"
            value={state.email}
            err={err}
            onChange={handleChange}
          />
          <Input type="submit" className="Button-Red" onChange={handleChange} />
        </form>
      </div>
    </>
  );
};

export default AddressForm;
