import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import TitleText from "../Common/TitleText";
import BodyText from "../Common/BodyText";
import Button from "../Common/Button";
import { member as memberAtom } from "../../atoms";
import { useRecoilValue } from "recoil";
import { API } from "aws-amplify";
import { getUser } from "../../amplifyHelpers";
const ThankYou = () => {
  // Prayer Card, Thank you page (5)
  const history = useHistory();
  const member = useRecoilValue(memberAtom); // read-only
  const [state, setState] = useState({ ...member });
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

  return (
    <>
      <TitleText>{state?.fullname}, Thank You.</TitleText>
      <BodyText>
        <p>Your prayers are the most powerful support you can offer</p>
        <p>
          We would also like to invite you to become a monthly supporter of the
          Restoration with whatever treasure God has blessed you with.
        </p>
        <p>
          Would you like to see the most common levels of recurring monthly
          support offered by members of the Restoration?
        </p>
        <Button
          text="YES, PLEASE SHOW ME!"
          onClick={() => history.push("/donate")}
        />
      </BodyText>
    </>
  );
};

export default ThankYou;
