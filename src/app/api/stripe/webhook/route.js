import { cookiesClient } from "@/utils/amplify-utils";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  let event;
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers.get("stripe-signature");
    try {
      event = stripe.webhooks.constructEvent(
        await request.text(),
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return new Response(`Error: ${err.message}`, { status: 500 });
    }
  }

  // Successfully constructed event.
  console.log("✅ Success:", event.id);

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);

      //   get reservation
      const { data: reservation } = await cookiesClient.models.Reservation.get({
        id: paymentIntent.metadata.reservationId,
      });
      console.log("reservation", reservation);

      //  send request to book (after payment maybe in stripe webhook)
      //  --- accommodationId, combinationKey, externalReference

      const res = await fetch(
        process.env.TC_BASE_URL +
          `/resources/booking/accommodations/${reservation.provider.accommodation.code}/book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": reservation.provider.auditData.authToken,
          },
          body: JSON.stringify({
            accommodation: {
              combinationKey:
                reservation.provider.accommodation.combination.combinationKey,
            },
            externalReference: paymentIntent.metadata.reservationId,
          }),
        }
      );
      const data = await res.json();
      console.log("book response", data);

      await cookiesClient.models.Reservation.update({
        id: paymentIntent.metadata.reservationId,
        provider: JSON.stringify({ ...data }),
        payment: JSON.stringify({
          payment: "PAID",
          intent: paymentIntent,
        }),
      });

      break;
    default:
      console.log(`Unhandled event type ${event.type}.`);
  }

  return new Response("Received", {
    status: 200,
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
