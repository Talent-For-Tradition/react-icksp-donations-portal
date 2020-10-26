import React from "react";
import { CheckoutForm, Layout } from "../Stripe";
import Modal from "../Common/Modal";
import { donation } from "../../atoms";
import { useRecoilValue } from "recoil";
const Checkout = ({ open, close }) => {
  const price = useRecoilValue(donation);
  const handleSuccessfulCheckout = () => {
    console.log("hooray! success checkout!");
    close();
  };
  return (
    <>
      <Modal open={open}>
        <Layout>
          <CheckoutForm
            price={price.amount}
            onSuccessfulCheckout={handleSuccessfulCheckout}
          />
        </Layout>
      </Modal>
    </>
  );
};

export default Checkout;
