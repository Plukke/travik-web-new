"use client";

import dayjs from "dayjs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMemo } from "react";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { useJsApiLoader } from "@react-google-maps/api";
import { DateRange } from "react-date-range";
import {
  Field as HeadlessField,
  Fieldset as HeadlessFieldset,
  Label as HeadlessLabel,
  Legend as HeadlessLegend,
  RadioGroup as HeadlessRadioGroup,
} from "@headlessui/react";

import { Description, Field, Label } from "@/components/common/fieldset";
import { Button } from "@/components/common/button";
import { Radio } from "@/components/common/radio";
import SearchInput from "@/components/SearchInput";
import RoomDistributionsSelector from "../RoomDistributionsSelector";
import clsx from "clsx";

const initialValues = {
  checkIn: dayjs().toDate(),
  checkOut: dayjs().add(4, "days").toDate(),
  rooms: 1,
  distributions: [
    {
      adults: 1,
      children: 0,
      infants: 0,
    },
  ],
  locationDescription: "",
  geolocation: {
    latitude: null,
    longitude: null,
    radius: 20,
  },
};

const validationSchema = Yup.object().shape({
  checkIn: Yup.date(),
  checkOut: Yup.date(),
  rooms: Yup.number().required().positive().integer(),
  distributions: Yup.array().of(
    Yup.object().shape({
      adults: Yup.number().required().integer().default(0),
      children: Yup.number().required().integer().default(0),
      infants: Yup.number().required().integer().default(0),
    })
  ),
  locationDescription: Yup.string(),
  geolocation: Yup.object().shape({
    latitude: Yup.number().nullable(),
    longitude: Yup.number().nullable(),
    radius: Yup.number().required().positive().integer().default(20),
  }),
});

function useQuote() {
  return useStore(
    useShallow((store) => ({
      setAuthToken: store.setAuthToken,
      setQuote: store.setQuote,
      quote: store.quote,
    }))
  );
}

export const CreatePlanPage = () => {
  const libraries = useMemo(() => ["places"], []);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries,
  });
  const { setAuthToken, setQuote } = useQuote();
  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));

      const distributions = values?.distributions.map((x) => {
        return {
          persons: Array.from(new Array(x.adults || 0), () => {
            return {
              age: 30,
            };
          })
            .concat(
              Array.from(new Array(x.children || 0), (i) => {
                return {
                  age: 12,
                };
              })
            )
            .concat(
              Array.from(new Array(x.infants || 0), (i) => {
                return {
                  age: 2,
                };
              })
            ),
        };
      });

      const req = {
        ...values,
        checkIn: dayjs(values.checkIn).format("YYYY-MM-DD"),
        checkOut: dayjs(values.checkOut).format("YYYY-MM-DD"),
        distributions,
        language: "ES",
        sourceMarket: "ES",
        filter: {
          bestCombinations: false,
        },
      };
      console.log("req", req);

      const res = await fetch("/api/tracom/booking/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      });

      const data = await res.json();
      setClientSecret(data.clientSecret);
      console.log("data", data);

      setAuthToken(data?.auditData?.authToken);
      setQuote({ total: data?.total, accommodations: data?.accommodations });

      const params = new URLSearchParams();
      params.append("description", req.locationDescription);
      params.append("checkIn", req.checkIn);
      params.append("checkOut", req.checkOut);
      params.append("distributions", JSON.stringify(distributions));

      router.push(`/create-plan/accommodations?${params.toString()}`, {
        scroll: true,
      });
    },
  });

  return (
    <div className="mx-auto max-w-screen-md">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Crear plan
        </h2>
        {/* <p className="mt-6 text-lg leading-8 text-gray-600">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
          aliqua.
        </p> */}
      </div>

      <form onSubmit={formik.handleSubmit} className="w-full space-y-2">
        {isLoaded ? (
          <SearchInput
            onSelect={({ description, lat, lng }) => {
              formik.setFieldValue("locationDescription", description);
              formik.setFieldValue("geolocation", {
                latitude: lat,
                longitude: lng,
                radius: 20,
              });
            }}
          />
        ) : (
          "Cargando..."
        )}

        <div
          className={clsx([
            { hidden: !formik.values.locationDescription },
            "space-y-2",
          ])}
        >
          <Field>
            <Label>Habitaciones</Label>
            <Description>
              Selecciona el número de habitaciones para tu reserva
            </Description>
            <HeadlessRadioGroup
              id="rooms"
              name="rooms"
              className="mt-4 flex gap-6 sm:gap-8"
              value={formik.values.rooms}
              onChange={(value) => {
                formik.setFieldTouched("rooms", true);
                formik.setFieldValue("rooms", value);

                const newArr = [...formik.values.distributions];
                if (formik.values.rooms > value) {
                  const elemsToDelete = formik.values.rooms - value;
                  newArr.splice(newArr.length - elemsToDelete, elemsToDelete);

                  formik.setFieldValue("distributions", newArr);
                } else {
                  const elemsToAdd = value - formik.values.rooms;
                  for (let index = 0; index < elemsToAdd; index++) {
                    newArr.push(initialValues?.distributions?.[0]);
                  }
                  formik.setFieldValue("distributions", newArr);
                }
              }}
            >
              {[1, 2, 3, 4, 5].map((roomsQty) => (
                <HeadlessField
                  key={roomsQty}
                  className="flex items-center gap-2"
                >
                  <Radio value={roomsQty} />
                  <HeadlessLabel className="select-none text-base/6 sm:text-sm/6">
                    {roomsQty}
                  </HeadlessLabel>
                </HeadlessField>
              ))}
            </HeadlessRadioGroup>
          </Field>

          {formik.values.distributions.map((i, idx) => {
            return (
              <RoomDistributionsSelector
                key={idx}
                label={`Habitación ${idx + 1}`}
                value={formik.values.distributions?.[idx]}
                onChange={(data) =>
                  formik.setFieldValue(`distributions.[${idx}]`, data)
                }
              />
            );
          })}

          <Field>
            <Label>Fechas</Label>
            <Description>
              Selecciona la fecha de entrada y salida de tu estadía.
            </Description>

            <DateRange
              onChange={(item) => {
                formik.setFieldValue("checkIn", item.selection.startDate);
                formik.setFieldValue("checkOut", item.selection.endDate);
              }}
              dateDisplayFormat={"dd/MM/yyyy"}
              months={1}
              moveRangeOnFirstSelection={false}
              renderStaticRange={false}
              minDate={dayjs().toDate()}
              maxDate={dayjs().add(180, "days").toDate()}
              ranges={[
                {
                  startDate: formik.values.checkIn,
                  endDate: formik.values.checkOut,
                  key: "selection",
                },
              ]}
            />
          </Field>

          <div className="flex flex-col items-end my-4 py-4">
            <Button type="submit" className="cursor-pointer">
              Buscar alojamiento
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
