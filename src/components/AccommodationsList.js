"use client";

import clsx from "clsx";
import axios from "axios";
import minBy from "lodash/minBy";
import { StarIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Link } from "./common/link";
import { useSearchParams } from "next/navigation";

const AccommodationsList = ({ accommodations = [] }) => {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [accommodationsDetail, setAccommodationsDetail] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.request({
          method: "GET",
          url: `/api/tracom/content-data/accommodations-detail`,
          params: {
            accommodations: JSON.stringify(accommodations.map((x) => x.code)),
          },
        });
        setAccommodationsDetail(data?.accommodations || []);
      } catch (error) {
        // setErrorMessage(error.message)
        setAccommodationsDetail([]);
      } finally {
        setLoading(false);
      }
    };

    if (accommodations && accommodations.length) {
      fetch();
    }
  }, [accommodations]);

  const handleAccommodationHref = (id) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    return `/create-plan/accommodations/${id}?` + params.toString();
  };

  return (
    <div className="-mx-px grid grid-cols-2 border-l border-gray-300 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
      {accommodations.map((accommodation) => {
        const minCombination = minBy(
          accommodation?.combinations,
          "price.amount"
        );
        const detail = accommodationsDetail?.find(
          (x) => x.id === accommodation.code
        );

        return (
          <div
            key={`${accommodation.code}-${accommodation.giata}`}
            className="group relative border-b border-r border-gray-300 p-4 sm:p-6"
          >
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-300 group-hover:opacity-75">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={detail?.imageUrls?.[0]}
                alt={accommodation?.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="pb-4 pt-10 text-center">
              <h3 className="text-sm font-medium text-gray-900">
                <Link href={handleAccommodationHref(accommodation?.code)}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {accommodation?.name}
                </Link>
              </h3>
              <div className="mt-3 flex flex-col items-center">
                <p className="sr-only">
                  {detail?.ratings?.[0].score / 2} out of 5 stars
                </p>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={clsx(
                        detail?.ratings?.[0].score / 2 > rating
                          ? "text-yellow-400"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {detail?.ratings?.[0].numReviews} reviews
                </p>
              </div>
              <p className="mt-4 text-base font-medium text-gray-900">
                Desde {minCombination?.price?.amount}
                {minCombination?.price?.currency === "EUR" ? "€" : "$"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccommodationsList;
