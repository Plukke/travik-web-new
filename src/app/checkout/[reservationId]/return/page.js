import { cookiesClient } from "@/utils/amplify-utils";
import CheckoutReturn from "@/components/CheckoutReturn";
import BookingSummary from "@/components/BookingSummary";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getReservation = async ({ reservationId }) => {
  if (!reservationId) {
    return null;
  }

  const { data: reservation, errors } =
    await cookiesClient.models.Reservation.get({
      id: reservationId,
    });

  if (!errors) {
    return reservation;
  }
};

const getCharge = async ({ chargeId }) => {
  const charge = await stripe.charges.retrieve(chargeId);

  return charge || {};
};

export default async function CheckoutReturnPage({ searchParams, params }) {
  const { payment_intent, payment_intent_client_secret, redirect_status } =
    searchParams || {};
  const { reservationId } = params || {};

  const reservationDetail = await getReservation({
    reservationId,
  });
  console.log("reservationDetail", reservationDetail);
  const { payment, provider } = reservationDetail || {};
  const parsedPayment =
    payment && typeof payment === "string" ? JSON.parse(payment) : {};
  const { intent } = parsedPayment || {};
  const parsedProvider =
    provider && typeof provider === "string" ? JSON.parse(provider) : {};
  const { distributions } = parsedProvider || {};

  const chargeDetail = await getCharge({ chargeId: intent?.latest_charge });
  console.log("chargeDetail", chargeDetail);

  const { card } = chargeDetail?.payment_method_details || {};

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        {redirect_status === "succeeded"
          ? "Pago completado exitosamente"
          : "Ocurrio un error"}
      </h1>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-2">
        <BookingSummary reservationDetail={reservationDetail} />
        <CheckoutReturn
          reservationId={reservationId}
          clientSecret={payment_intent_client_secret}
          card={card}
          intent={intent}
          distributions={distributions}
        />
      </div>
    </>
  );
}
