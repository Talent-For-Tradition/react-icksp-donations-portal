import React from "react";
import { member} from "../../atoms";
import { useRecoilValue} from 'recoil'
import FormField from "./FormField";

const BillingDetailsFields = () => {
  const address = useRecoilValue(member);
  return (
    <>
      <FormField
        name="name"
        label="Name"
        type="text"
        value={address.fullname}
        placeholder={address.fullname}
        required
      />
      <FormField
        name="email"
        label="Email"
        type="email"
        value={address.email}
        placeholder={address.email}
        required
      />
      <FormField
        name="address"
        label="Address"
        type="text"
        value={address.addr1}
        placeholder={address.addr1}
        required
      />
      <FormField
        name="city"
        label="City"
        type="text"
        value={address.city}
        placeholder={address.city}
        required
      />
      <FormField
        name="state"
        label="State"
        type="text"
        value={address.state}
        placeholder={address.state}
        required
      />
      <FormField
        name="zip"
        label="ZIP"
        type="text"
        value={address.zip}
        placeholder={address.zip}
        required
      />
    </>
  );
};

export default BillingDetailsFields;
