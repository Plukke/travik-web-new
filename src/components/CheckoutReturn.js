"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import { useStripe } from "@stripe/react-stripe-js";
// import { useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  CalendarDaysIcon,
  CreditCardIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import dayjs from "dayjs";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

// function IntentComponent() {
//   const stripe = useStripe();
//   const searchParams = useSearchParams();

//   React.useEffect(() => {
//     if (!stripe) {
//       return;
//     }

//     const clientSecret = searchParams.get("payment_intent_client_secret");

//     if (!clientSecret) {
//       return;
//     }

//     stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
//       console.log("paymentIntent", paymentIntent);

//       switch (paymentIntent.status) {
//         case "succeeded":
//           console.log("Payment succeeded!");
//           break;
//         case "processing":
//           console.log("Your payment is processing.");
//           break;
//         case "requires_payment_method":
//           console.log("Your payment was not successful, please try again.");
//           break;
//         default:
//           console.log("Something went wrong.");
//           break;
//       }
//     });
//   }, [searchParams, stripe]);

//   return null;
// }

export default function CheckoutReturn({
  reservationId,
  clientSecret,
  card,
  intent,
  distributions,
}) {
  return (
    <Elements
      options={{
        clientSecret,
      }}
      stripe={stripePromise}
    >
      <div>
        <h2 className="sr-only">Summary</h2>
        <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
          <dl className="flex flex-wrap">
            <div className="flex-auto pl-6 pt-6">
              <dt className="text-sm font-semibold leading-6 text-gray-900">
                Importe
              </dt>
              <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">
                €{intent.amount / 100}
              </dd>
            </div>
            <div className="flex-none self-end px-6 pt-4">
              <dt className="sr-only">Status</dt>
              <dd className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                Pagado
              </dd>
            </div>
            <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
              <dt className="flex-none">
                <span className="sr-only">Client</span>
                <UserCircleIcon
                  className="h-6 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </dt>
              <dd className="text-sm font-medium leading-6 text-gray-900">
                {distributions?.[0]?.person?.[0]?.name}{" "}
                {distributions?.[0]?.person?.[0]?.lastName}
              </dd>
            </div>
            <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
              <dt className="flex-none">
                <span className="sr-only">Due date</span>
                <CalendarDaysIcon
                  className="h-6 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </dt>
              <dd className="text-sm leading-6 text-gray-500">
                <time
                  dateTime={dayjs.unix(intent.created).format("YYYY-MM-DD")}
                >
                  {dayjs.unix(intent.created).format("LLLL")}
                </time>
              </dd>
            </div>
            <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
              <dt className="flex-none">
                <span className="sr-only">Status</span>
                <CreditCardIcon
                  className="h-6 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </dt>
              <dd className="text-sm leading-6 text-gray-500 flex items-center space-x-2">
                <span>Paid with</span>
                <Image
                  src={`/cards/brands/${card?.brand}.svg`}
                  width={32}
                  height={32}
                  alt={card?.brand}
                />
                <span>{card?.funding}</span>
                <span>****{card?.last4}</span>
              </dd>
            </div>
          </dl>
          <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Descargar recibo <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>

      {/* <IntentComponent reservationId={reservationId} /> */}
    </Elements>
  );
}
