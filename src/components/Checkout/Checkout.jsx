import React from "react";
import { CheckoutForm, Layout } from "../Stripe";
import Modal from "../Common/Modal";
import { member } from "../../atoms";
import { useRecoilValue } from "recoil";
const Checkout = ({ open, close }) => {
  const donation = useRecoilValue(member);
  const handleSuccessfulCheckout = () => {
    console.log("hooray! success checkout!");
    close();
  };
  return (
    <>
      <Modal mclasses={{modal: "ModalStripe"}} open={open}>
        <Layout>
          <CheckoutForm
            price={donation.amount}
            onSuccessfulCheckout={handleSuccessfulCheckout}
          />
        </Layout>
      </Modal>
    </>
  );
};

export default Checkout;
