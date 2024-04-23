import { CheckoutPage } from "@/components/pages/checkout";
import { cookiesClient } from "@/utils/amplify-utils";

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

export default async function Checkout({ params }) {
  const { reservationId } = params || {};

  const reservationDetail = await getReservation({
    reservationId,
  });
  console.log("reservationDetail", reservationDetail);

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        Paga tu reserva
      </h1>
      <CheckoutPage
        reservationId={reservationId}
        reservationDetail={reservationDetail}
      />
    </>
  );
}
