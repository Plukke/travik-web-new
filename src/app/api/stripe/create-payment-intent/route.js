import { cookiesClient } from "@/utils/amplify-utils";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const body = await request.json();
  const { reservationId } = body || {};

  if (!reservationId) {
    return new Response(`Error: Missing parameters`, { status: 422 });
  }

  //  get from DB
  const { data: reservation, errors } =
    await cookiesClient.models.Reservation.get({
      id: reservationId,
    });

  console.log("reservation data", reservation);
  console.log("errors", errors);

  if (errors) {
    return new Response(`Error: Missing parameters`, { status: 422 });
  }

  const { provider } = reservation || {};
  const parsedProvider = JSON.parse(provider);
  console.log("parsedProvider", parsedProvider);

  //  accommodation -> combination -> price -> amount, currency
  //  accommodation -> combination -> combinationKey

  const paymentIntent = await stripe.paymentIntents.create({
    amount: +(
      parsedProvider.accommodation.combination.price.amount * 100
    ).toFixed(0),
    currency:
      parsedProvider.accommodation.combination.price.currency.toLowerCase() ||
      "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      reservationId,
    },
    statement_descriptor_suffix: "TK",
    statement_descriptor: "TRAVIK",
  });
  console.log("paymentIntent", paymentIntent);

  //  update item from DB
  const { data: updatedReservation } =
    await cookiesClient.models.Reservation.update({
      id: reservationId,
      payment: JSON.stringify({
        status: "PENDING",
        intent: paymentIntent,
      }),
    });
  console.log("updatedReservation", updatedReservation);

  return Response.json({
    success: true,
    clientSecret: paymentIntent.client_secret,
  });
}
