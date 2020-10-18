import React from "react";
import Input from "../Common/Input";
import Button from "../Common/Button";
import { donation } from "../../atoms";
import { useRecoilState } from "recoil";

const OtherAmount = ({ close, processMonthlyDonation }) => {
  const [donate, setDonate] = useRecoilState(donation);
  const setAmount = (e) => setDonate({ ...donate, amount: Number(e.target.value) });
  return (
    <>
      <div className="ModalTitle">
        <h2>Enter another amount</h2>
        <Input
          autoFocus={true}
          inputMode="numeric"
          name="otheramount"
          placeholder="$0.00"
          value={donate.amount}
          onChange={setAmount}
          style={{ outline: "solid 1px #233b7b", textAlign: 'right' }}
        />
        <div className="container-Donate">
          <Button
            name="close"
            onClick={() => {
              processMonthlyDonation();
              close();
            }}
            className="Button-Red"
            text="DONATE MONTHLY"
          >
          </Button>
        </div>

      </div>
    </>
  );
};

export default OtherAmount;
