import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Layout = ({ children }) => {
  return (
    <>
      <Elements stripe={stripePromise}>{children}</Elements>
    </>
  );
};

export default Layout;
