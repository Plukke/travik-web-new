"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export const CheckoutPage = ({ reservationId, reservationDetail }) => {
  const [clientSecret, setClientSecret] = React.useState("");
  console.log("reservationDetail Checkout", reservationDetail);

  React.useEffect(() => {
    if (!reservationDetail?.payment) {
      // Create PaymentIntent as soon as the page loads
      fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reservationId }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        .catch((err) => console.log("err", err));
    }
    const parsedPayment = JSON.parse(reservationDetail?.payment) || {};

    if (parsedPayment?.status !== "PAID") {
      setClientSecret(parsedPayment?.intent?.client_secret);
    }
  }, [reservationDetail?.payment, reservationId]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm reservationId={reservationId} />
        </Elements>
      )}
    </div>
  );
};
