/* eslint-disable @next/next/no-img-element */
import { clsx } from "clsx";
import { headers } from "next/headers";
// import { useSearchParams } from "next/navigation";
import { StarIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import CombinationSelector from "@/components/pages/accommodation-detail/CombinationSelector";

// This function can be named anything
async function getAccommodationDetail({ accommodationId }) {
  const authToken = headers().get("x-tracom-token");

  if (!accommodationId) {
    return null;
  }

  const res = await fetch(
    process.env.TC_BASE_URL +
      `/resources/accommodations/${accommodationId}/datasheet`,
    {
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    }
  );
  const data = await res.json();

  return data;
}

async function quoteSingle({
  accommodationId,
  checkIn,
  checkOut,
  distributions,
}) {
  const authToken = headers().get("x-tracom-token");

  if (!accommodationId) {
    return null;
  }

  const res = await fetch(
    process.env.TC_BASE_URL +
      `/resources/booking/accommodations/${accommodationId}/quote`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({
        checkIn,
        checkOut,
        distributions: JSON.parse(distributions),
        language: "ES",
        sourceMarket: "ES",
      }),
    }
  );
  const data = await res.json();

  return data;
}

export default async function AccommodationDetail({ params, searchParams }) {
  const { accommodationId } = params || {};
  const { checkIn, checkOut, distributions } = searchParams || {};
  const detail = await getAccommodationDetail({
    accommodationId,
  });
  console.log("detail", detail);
  const quote = await quoteSingle({
    accommodationId,
    checkIn,
    checkOut,
    distributions,
  });
  console.log("quote", JSON.stringify(quote, null, 2));

  return (
    <>
      {/* Image gallery */}
      <div className="mx-auto mt-6 min-w-full max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8">
        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
          <img
            src={detail.imageUrls[0]}
            alt={detail.imageUrls[0]}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img
              src={detail.imageUrls[1]}
              alt={detail.imageUrls[1]}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img
              src={detail.imageUrls[2]}
              alt={detail.imageUrls[2]}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
          <img
            src={detail.imageUrls[3]}
            alt={detail.imageUrls[3]}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>

      {/* Product info */}
      <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {detail.name}
          </h1>
        </div>

        {/* Options */}
        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <h2 className="sr-only">Product information</h2>
          <p className="text-3xl tracking-tight text-gray-900">
            {detail.price}
          </p>

          {/* Reviews */}
          <div className="mb-6">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
              <p className="text-sm font-medium text-yellow-500">Categoría</p>
              <div className="flex items-center ml-2">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={clsx(
                      +detail?.category?.substr(1, 1) > rating
                        ? "text-yellow-500"
                        : "text-gray-200",
                      "h-5 w-5 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-sky-600">
              {detail?.ratings?.[0]?.score / 2} (
              {detail?.ratings?.[0]?.numReviews})
            </p>
            <p className="text-base text-gray-900">
              {detail?.accomodationType}
            </p>
            <p className="text-base text-gray-900">{detail?.address}</p>
            <p className="text-base text-gray-900">
              {detail?.destination?.name}
            </p>
            <p className="mt-4 text-base text-gray-900">
              <span className="font-bold">
                {dayjs(checkOut).diff(checkIn, "days")} noche(s)
              </span>{" "}
              del {dayjs(checkIn).format("DD/MM/YYYY")} al{" "}
              {dayjs(checkOut).format("DD/MM/YYYY")}
            </p>
          </div>

          <div className="mt-10">
            <h3 className="text-sm font-medium text-gray-900">
              Otros servicios
            </h3>

            <div className="mt-4">
              <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                {detail.otherServices.map((highlight) => (
                  <li key={highlight} className="text-gray-400">
                    <span className="text-gray-600">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          {/* Description and details */}
          <div>
            <h3 className="sr-only">Description</h3>

            <div className="space-y-6">
              <div
                dangerouslySetInnerHTML={{ __html: detail.description }}
                className="prose text-base text-gray-900"
              />
            </div>
          </div>

          <section aria-labelledby="shipping-heading" className="mt-10">
            <div className="mx-auto max-w-2xl lg:max-w-7xl">
              <h2
                id="related-products-heading"
                className="text-xl font-bold tracking-tight text-gray-900"
              >
                Habitaciones
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {quote?.accommodation?.combinations.map((combination) => (
                  <div
                    key={combination.combinationKey}
                    className="group relative bg-gray-50 rounded-md p-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-base text-gray-700">
                            <a href={combination.href}>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {combination?.rooms?.reduce(
                                (sum, val) => sum + val?.description + " ",
                                ""
                              )}
                            </a>
                          </h3>
                          <p className="mt-1 text-xs text-gray-500">
                            {combination?.mealPlan?.description}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {combination?.price?.amount}
                          {combination?.price?.currency == "EUR" ? "€" : "$"}
                        </p>
                      </div>
                      <div className="mt-4">
                        <ul
                          role="list"
                          className="list-disc space-y-2 pl-4 text-xs"
                        >
                          {combination?.remarks.map((remark) => (
                            <li key={remark} className="text-gray-400">
                              <span className="text-gray-600 line-clamp-3">
                                {remark}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6">
                      <CombinationSelector
                        sessionToken={quote?.auditData?.authToken}
                        accommodationId={accommodationId}
                        combinationKey={combination?.combinationKey}
                        distributions={distributions}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
