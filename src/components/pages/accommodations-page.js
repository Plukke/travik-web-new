"use client";

import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "@/store";
import { useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationGap,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from "@/components/common/pagination";
import AccommodationsList from "../AccommodationsList";

function useQuote() {
  return useStore(
    useShallow((store) => ({
      setAuthToken: store.setAuthToken,
      setQuote: store.setQuote,
      quote: store.quote,
    }))
  );
}

const PAGE_ITEMS = 16;

export const AccommodationsPage = () => {
  const { quote } = useQuote();
  const searchParams = useSearchParams();
  const page = +searchParams?.get("page") || 1;
  const description = searchParams?.get("description");
  const checkIn = searchParams?.get("checkIn");
  const checkOut = searchParams?.get("checkOut");

  const skip = useMemo(() => (page - 1) * PAGE_ITEMS, [page]);
  const pagesQty = useMemo(
    () => Math.ceil(quote?.total / PAGE_ITEMS),
    [quote?.total]
  );

  const pagesArray = useMemo(() => {
    const arr = Array.from(new Array(pagesQty)).map((_, idx) => idx + 1);
    const leftArr = arr.slice(0, 2);
    const rightArr = arr.slice(-2);

    if (pagesQty == 1) {
      return arr;
    }

    if (page - 2 > 2) {
      leftArr.push(page - 2 == 3 ? page - 2 : "gap");
    }

    if (
      page > 1 &&
      !leftArr.includes(page - 1) &&
      !rightArr.includes(page - 1)
    ) {
      leftArr.push(page - 1);
    }

    if (!leftArr.includes(page) && !rightArr.includes(page)) {
      leftArr.push(page);
    }

    if (pagesQty - 2 > page + 1) {
      rightArr.unshift(pagesQty - 2 - (page + 1) === 1 ? page + 2 : "gap");
    }

    if (
      page < pagesQty &&
      !leftArr.includes(page + 1) &&
      !rightArr.includes(page + 1)
    ) {
      rightArr.unshift(page + 1);
    }

    const newArr = leftArr.concat(rightArr);

    return newArr;
  }, [pagesQty, page]);

  const handlePaginationHref = (p) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", p);
    return "?" + params.toString();
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-4">
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">Products</h2>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {description}
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          De {checkIn} al {checkOut}
        </p>

        <div>
          Se encontraron {quote?.total || 0} resultados para tu búsqueda.
        </div>

        <AccommodationsList
          accommodations={quote?.accommodations.slice(skip, skip + PAGE_ITEMS)}
        />
      </div>

      <Pagination>
        <PaginationPrevious
          href={page > 1 ? handlePaginationHref(page - 1) : null}
        >
          Anterior
        </PaginationPrevious>
        <PaginationList>
          {pagesArray.map((p, i) =>
            p === "gap" ? (
              <PaginationGap key={`${p}-${i}`} />
            ) : (
              <PaginationPage
                key={p}
                href={handlePaginationHref(p)}
                current={p == page}
              >
                {p}
              </PaginationPage>
            )
          )}
        </PaginationList>
        <PaginationNext
          href={page < pagesQty ? handlePaginationHref(page + 1) : null}
        >
          Siguiente
        </PaginationNext>
      </Pagination>
    </main>
  );
};
