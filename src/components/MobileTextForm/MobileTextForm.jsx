import React, {useState, useEffect, useCallback} from "react";
import { member } from "../../atoms";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";

import Input from "../Common/Input";
import TitleText from "../Common/TitleText";
import Select from "../Common/Select";

import schema from "./MobileSchema";
// import { newReminder, reminderByMember } from "../../integrations/donationAPI";

import { HOURS, TIMEZONES, hourToOption, tzToOption } from "./options";
import { API } from "aws-amplify";
import { getUser } from "../../amplifyHelpers";
import Spinner from "../Spinner";

/**
 * send my daily reminder at...
 */
const MobileTextForm = (props) => {
  // Prayer Card, daily reminder (4)
  const [rState, setRstate] = useRecoilState(member);
  const [state, setState] = useState({...rState});
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const cbRefresh = useCallback(() => {
    getUser().then((memberData) => {
      console.log(memberData)
      setState(s => setState({...s, ...memberData}));
      // get member record from the API.
      API.get("apic825e45a", "/members/username/", {username: memberData.username}).then((res) => {
        if (res.length > 0) {
          console.log(res.length)
          console.log(res[0]);
          setState({...state, ...res[0]});
          setLoading(false);
          setRstate({ ...state });
        }
      });
      // updateFromAuth({email, state, setState});
    });
  }, []); // eslint-disable-line
  useEffect(() => {
    if (!state.phone_number){
      cbRefresh();
    }
    setLoading(false)
  }, []) // eslint-disable-line
  
  const handleVerify = async () => {
    console.log('verifying...')
    const fields = {};
    fields["hour"] = state.hour;
    fields["timezone"] = state.timezone;
    fields["mobile"] = state.phone_number;
    console.log(fields)
    console.log(state)
    const { error } = schema.validate(fields);
    if (error) {
      console.log(error);
    } else {
      console.log('updating recoil state')
      setRstate({...rState, ...state})
      console.log("creating new reminder...");
      try {
        console.log("API!")
        console.log("posting...");
        const result = await API.post("apic825e45a", "/members", {
          body: state
        });
        console.log(result);
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
  if (loading) return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Spinner />
      </div>
    </>
  )
  const handleSubmitForm = e => {
    e.preventDefault();
    console.log('test');
    handleVerify();
  }
  return (
    <>
      <div className="AddressForm">
        <form
          id="mobileForm"
          className="BodyTextForm"
          style={{ marginTop: "3rem" }}
          onSubmit={handleSubmitForm}
        >
          <Input
            name="phone_number"
            placeholder="Mobile number"
            onChange={handleChange}
            value={state.phone_number}
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
          <Input type="submit" className="Button-Red" onChange={handleChange} />
        </form>
      </div>
    </>
  );
};

export default MobileTextForm;
