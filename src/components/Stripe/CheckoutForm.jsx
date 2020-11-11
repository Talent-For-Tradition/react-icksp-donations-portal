import React, { useState } from "react";
import { donation, member as memberAtom } from "../../atoms";
import { useRecoilValue } from "recoil";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { postPayment } from "../../integrations/donationAPI";

import BillingDetailsFields from "./BillingDetails";
import Button from "../Common/Button";
import CheckoutError from "./CheckoutError";

const CheckoutForm = ({ price, onSuccessfulCheckout }) => {
  const donate = useRecoilValue(donation);
  const member = useRecoilValue(memberAtom);
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  const stripe = useStripe();
  const elements = useElements();

  // TIP
  // use the cardElements onChange prop to add a handler
  // for setting any errors:

  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();

    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value,
      address: {
        city: ev.target.city.value,
        line1: ev.target.address.value,
        state: ev.target.state.value,
        postal_code: ev.target.zip.value
      }
    };
    setProcessingTo(true);

    const cardElement = elements.getElement("card");
    try {
      // ask the API to create a payment_intent on the server
      const { data: clientSecret } = await postPayment({ email: member.email, amount: donate.amount });

      // create stripe-method
      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails,
      });

      // check for method errors
      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      // connect method to madness
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id
      });

      // final sanity check
      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
        return;
      }

      // success 
      onSuccessfulCheckout();
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  // const iframeStyles = {
  //   base: {
  //     color: "#742c20",
  //     fontSize: "16px",
  //     iconColor: "#742c20",
  //     "::placeholder": {
  //       color: "#233b7b"
  //     }
  //   },
  //   invalid: {
  //     iconColor: "red",
  //     color: "red"
  //   },
  //   complete: {
  //     iconColor: "#cbf4c9"
  //   }
  // };

  const cardElementOpts = {
    iconStyle: "solid",
    // style: iframeStyles,
    hidePostalCode: true
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="div-Row">
        <BillingDetailsFields />
      </div>
      <div>
        <div className="CardElementContainer">
          <CardElement
            options={cardElementOpts}
            onChange={handleCardDetailsChange}
          />
        </div>
      </div>
      {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
      <div className="div-Row">
        {/* TIP always disable your submit button while processing payments */}
        <Button
          className="form-submit-button"
          disabled={isProcessing || !stripe}
          text={isProcessing ? "Processing..." : `Donate $${price}`}
        />
      </div>
    </form>
  );
};

export default CheckoutForm;
