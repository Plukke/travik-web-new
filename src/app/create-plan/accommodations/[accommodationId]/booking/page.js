import { AccommodationBookingPage } from "@/components/pages/accommodation-booking-page";

export default async function BookingConfirm() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-4">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        Confirma tu reservación
      </h1>
      <AccommodationBookingPage />
    </main>
  );
}
