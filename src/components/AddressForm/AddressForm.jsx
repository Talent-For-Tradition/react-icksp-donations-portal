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
import { newMember, memberByEmail } from "../../integrations/donationAPI";

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
    if (!user) return;
    const { name, email } = user;
    const updateFromAuth = async () => {
      const result = await memberByEmail(email);
      let update = {};
      if (!state.fullname) update["fullname"] = name;
      if (!state.email) update["email"] = email;
      // exampleCall();
      console.log(result);
      if (result.fullname) update["fullname"] = result.fullname;
      update["id"] = result.id;
      update["email"] = result.email ? result.email:email;
      update["addr1"] = result.addr1;
      update["addr2"] = result.addr2 ? result.addr2: " ";
      update["city"] = result.city;
      update["country"] = result.country;
      update["state"] = result.state;
      update["zip"] = result.zip;
      console.log("update: ", update);
      setState({ ...update });
    };
    updateFromAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    cbUpdate();
  }, [cbUpdate]);

  const submitForm = async () => {
    // after verification
    // update the backend
    const id = await newMember(state);
    console.log(id);
    setState({...state, id });
    setOpen(true);
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
    if (value.name !== 'addr2') {
      const error = validateProperty({ name, value });
      setErrorMessage({ ...errorMessage, [name]: error });
    }
    setState({ ...state, [name]: value });
  };

  const handleVerify = (e) => {
    // verify state and send to callback
    e.preventDefault();
    console.log("submitted");
    const schema = Joi.object(addressSchema);
    const fields = { ...state };
    delete fields["id"];
    delete fields["addr2"];
    const { error } = schema.validate(fields, { abortEarly: false });
    if (!error) {
      submitForm();
    } else {
      console.log(error);
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
          <Select
            name="country"
            onChange={handleChange}
            err={err}
            value={state.country}
          >
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
            value={state.addr1}
          />
          <Input
            placeholder="Address Line 2"
            name="addr2"
            err={err}
            onChange={handleChange}
            value={state.addr2}
          />
          <div className="FormDouble">
            <Input
              placeholder="City"
              name="city"
              half={true}
              err={err}
              onChange={handleChange}
              value={state.city}
            />
            <Input
              placeholder="Zip"
              name="zip"
              half={true}
              err={err}
              onChange={handleChange}
              value={state.zip}
            />
          </div>
          <Select
            name="state"
            onChange={handleChange}
            err={err}
            value={state.state}
          >
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
