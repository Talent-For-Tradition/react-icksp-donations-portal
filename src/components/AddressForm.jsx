import React from "react";
import { useHistory } from "react-router-dom";
import { TitleText, BodyText, Button } from "./index";
import "./formStyle.css";
import StatesList from "./statesList";

function StateToOption({ name, abbreviation, key }) {
  return <option key={key} value={abbreviation}>{name}</option>;
}

const AddressForm = () => {
  const history = useHistory();
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
          />
          <select className="FormSelect" id="country">
            <option value={0}>Select Country</option>
            <option value="US">United States of America</option>
          </select>
          <input
            className="FormInput"
            placeholder="Address Line 1"
            name="addr1"
            id="addr1"
          />
          <input
            className="FormInput"
            placeholder="Address Line 2"
            name="addr2"
            id="addr2"
          />
          <div
            style={{
              width: `calc(50 * 1vmin)`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <input className="FormHalf" placeholder="City" />
            <input className="FormHalf" placeholder="Zip" />
          </div>
          <select className="FormSelect" id="country">
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
          />
          <Button text="SUBMIT" handleClick={() => history.push("/")} />
        </form>
      </BodyText>
    </div>
  );
};

export default AddressForm;
