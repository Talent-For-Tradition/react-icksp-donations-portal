import React, { useState } from "react";
import { donation } from "../../atoms";
import { useRecoilValue } from "recoil";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

import BillingDetailsFields from "./BillingDetails";
import Button from "../Common/Button";
import CheckoutError from "./CheckoutError";

const CheckoutForm = ({ price, onSuccessfulCheckout }) => {
  const donate = useRecoilValue(donation);
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
        // create a payment intent on the server
        // client secret of that payment intent.
      const { data: clientSecret } = await axios.post("/api/payment_intents", {
        amount: donate.amount * 100
        // TIP Stripe, amount is lowest common denomination
        // ie. 1 cent multiplied by 100 is 1 dollar.
      });
      console.log(clientSecret);
      
    //    // ref to cardElement
    // stripe.js
    // create a payment method

    // confirm card payments
    // payment method id
    // client_secret

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails
      });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id
      });

      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
        return;
      }

      onSuccessfulCheckout();
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  // Learning
  // A common ask/bug that users run into is:
  // How do you change the color of the card element input text?
  // How do you change the font-size of the card element input text?
  // How do you change the placeholder color?
  // The answer to all of the above is to use the `style` option.
  // It's common to hear users confused why the card element appears impervious
  // to all their styles. No matter what classes they add to the parent element
  // nothing within the card element seems to change. The reason for this is that
  // the card element is housed within an iframe and:
  // > styles do not cascade from a parent window down into its iframes

  const iframeStyles = {
    base: {
      color: "#fff",
      fontSize: "16px",
      iconColor: "#fff",
      "::placeholder": {
        color: "#87bbfd"
      }
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE"
    },
    complete: {
      iconColor: "#cbf4c9"
    }
  };

  const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
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
        >
          {isProcessing ? "Processing..." : `Pay $${price}`}
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
