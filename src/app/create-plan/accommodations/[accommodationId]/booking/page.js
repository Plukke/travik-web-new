import { promises as fs } from "fs";
import { AccommodationBookingPage } from "@/components/pages/accommodation-booking-page";

export default async function BookingConfirm() {
  const file = await fs.readFile(
    process.cwd() + "/src/lib/utils/countryCodes.json",
    "utf8"
  );
  const countriesList = JSON.parse(file);

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        Confirma tu reservación
      </h1>
      <AccommodationBookingPage countriesList={countriesList} />
    </>
  );
}
