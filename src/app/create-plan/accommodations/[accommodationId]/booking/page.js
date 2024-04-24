import { AccommodationBookingPage } from "@/components/pages/accommodation-booking-page";

export default async function BookingConfirm() {
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        Confirma tu reservación
      </h1>
      <AccommodationBookingPage />
    </>
  );
}
