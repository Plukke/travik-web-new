"use client";
import dayjs from "dayjs";

export default function BookingSummary({ reservationDetail }) {
  const { id, provider } = reservationDetail || {};
  const parsedProvider =
    provider && typeof provider === "string" ? JSON.parse(provider) : {};
  console.log("parsedProvider", parsedProvider);

  // const parsedPayment =
  //   payment && typeof payment === "string" ? JSON.parse(payment) : {};

  const { accommodation } = parsedProvider || {};

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-6 sm:px-6">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Detalle de la reserva
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          {accommodation?.name}
        </p>
      </div>
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Noches</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {dayjs(accommodation?.checkOut).diff(
                accommodation?.checkIn,
                "days"
              )}{" "}
              |{" "}
              <span className="text-xs">
                Del <b className="font-bold">{accommodation?.checkIn}</b> al{" "}
                <b className="font-bold">{accommodation?.checkOut}</b>
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">ID</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {id}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Reserva</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {parsedProvider?.bookingReference}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">
              Alojamiento ID
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {parsedProvider?.accommodation?.bookingReference}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Estatus</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {parsedProvider?.accommodation?.status}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Habitaciones</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {accommodation?.combination?.rooms?.length} -{" "}
              {accommodation?.combination?.rooms?.reduce(
                (sum, val) => `${sum} ${val?.description}`,
                ""
              )}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
