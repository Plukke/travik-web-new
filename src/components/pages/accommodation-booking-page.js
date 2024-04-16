"use client";

import axios from "axios";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "@/store";
import { useFormik } from "formik";
import { generateClient } from "aws-amplify/data";

import {
  Description,
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from "@/components/common/fieldset";
import { Input } from "@/components/common/input";
import { Select } from "@/components/common/select";
import { Text } from "@/components/common/text";
import { Button } from "@/components/common/button";
import { Textarea } from "@/components/common/textarea";
import { useRouter, useSearchParams } from "next/navigation";

import * as CountriesList from "@/lib/utils/countryCodes.json";

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";

function useConfirm() {
  return useStore(
    useShallow((store) => ({
      confirmation: store.confirmation,
    }))
  );
}

const COMMON_FIELDS = {
  PHONE: "phone",
  PHONE_CC: "phoneCountryCode",
  EMAIL: "email",
  TITLE: "courtesyTitle",
  FIRST_NAME: "name",
  LAST_NAME: "lastName",
  BIRTH_DATE: "birthDate", // YYYY-MM-DD
  requestedAge: "requestedAge",
  ADDRESS: "address", // street, city, postCode, fullAddress
  COUNTRY: "countryId",
  DOCUMENT: "documentNumber",
  DOCUMENT_TYPE: "documentType",
  DOCUMENT_EXPIRY_DATE: "passportExpirationDate",
};

const handleFields = (requiredFields, room, person, formik) => {
  return requiredFields?.map((field, idx) => {
    const fieldPrefix = `distributions[${room}].persons[${person}]`;
    const getArgs = (fieldName = COMMON_FIELDS[field]) => ({
      id: `${fieldPrefix}.${fieldName}`,
      name: `${fieldPrefix}.${fieldName}`,
      value: formik.values[`${fieldPrefix}.${fieldName}`],
      onChange: formik.handleChange,
    });

    switch (field) {
      case "TITLE":
        return (
          <Field key={idx}>
            <Label>Título</Label>
            <Select {...getArgs()}>
              <option value={""}>Selecciona...</option>
              <option value={"MRS"}>Sra.</option>
              <option value={"MS"}>Srta.</option>
              <option value={"MISTER"}>Sr.</option>
            </Select>
          </Field>
        );
      case "FIRST_NAME":
        return (
          <Field key={idx}>
            <Label>Nombre(s)</Label>
            <Input {...getArgs()} />
          </Field>
        );
      case "LAST_NAME":
        return (
          <Field key={idx}>
            <Label>Apellidos</Label>
            <Input {...getArgs()} />
          </Field>
        );
      case "EMAIL":
        return (
          <Field key={idx}>
            <Label>Email</Label>
            <Input {...getArgs()} type="email" />
          </Field>
        );
      case "PHONE":
        return (
          <div
            key={idx}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-2"
          >
            <Field>
              <Label>Código de país</Label>

              <Select {...getArgs(COMMON_FIELDS[`${field}_CC`])}>
                <option value={""}>Selecciona...</option>
                {CountriesList.map((x, idx) => (
                  <option key={idx} value={`${x?.dial_code}`}>
                    ({`${x?.dial_code}`}) {x?.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field>
              <Label>Número de teléfono</Label>
              <Input {...getArgs()} />
            </Field>
          </div>
        );
      case "BIRTH_DATE":
        return (
          <Field key={idx}>
            <Label>Fecha de nacimiento</Label>
            <Input {...getArgs()} type="date" />
          </Field>
        );
      case "ADDRESS":
        return (
          <Field key={idx}>
            <Label>Dirección</Label>
            <Input {...getArgs()} />
          </Field>
        );

      default:
        return null;
    }
  });
};

const client = generateClient();

export const AccommodationBookingPage = () => {
  const searchParams = useSearchParams();
  const { confirmation } = useConfirm();
  const distributions = searchParams.get("distributions");
  const description = searchParams?.get("description");
  console.log("distributions", distributions);
  console.log("confirmation", confirmation);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      distributions: JSON.parse(distributions),
      commentToAccommodation: "",
    },
    onSubmit: async (values) => {
      console.log("values", values);

      // prebook
      // accommodationId
      // accommodation - combinationKey,commentToAccommodation
      // distributions[] - persons[] - {}
      // - - - name,lastName,requestedAge(birthDate),courtesyTitle,email,phoneCountryCode,phone

      const parsedDistributions = values.distributions.map((room) => ({
        persons: room.persons.map((person) => {
          const obj = {
            ...person,
            requestedAge: person.age,
          };

          if (person.age <= 12) {
            obj["birthDate"] = dayjs()
              .subtract(person.age, "years")
              .format("YYYY-MM-DD");
          }

          delete obj["age"];

          return obj;
        }),
      }));
      console.log("parsedDistributions", parsedDistributions);

      const { data } = await axios.request({
        method: "POST",
        url: `/api/tracom/booking/prebook`,
        headers: {
          "x-tracom-token": confirmation?.auditData?.authToken,
        },
        data: {
          accommodationId: confirmation?.accommodation?.code,
          accommodation: {
            combinationKey:
              confirmation?.accommodation?.combination?.combinationKey,
            commentToAccommodation: values.commentToAccommodation,
          },
          distributions: parsedDistributions,
        },
      });
      console.log("data", data);

      if (!data?.error?.length) {
        const { errors, data: newReservation } =
          await client.models.Reservation.create({
            provider: JSON.stringify({
              auditData: { authToken: data?.auditData?.authToken },
              accommodation: data?.accommodation,
              distributions: data?.distributions,
            }),
            query: JSON.stringify({
              description: description,
              geolocation: {
                latitude: null,
                longitude: null,
              },
            }),
          });

        console.log("Reservation Response", errors, newReservation);
        return router.push(`/checkout/${newReservation.id}`);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Fieldset>
        <Legend>Reservación</Legend>
        <Text>Completa los datos de tu reserva y continua al pago.</Text>

        {confirmation?.warnings?.length ? (
          <Text>{confirmation?.warnings?.join(", ")}</Text>
        ) : null}

        <FieldGroup className="w-full px-4">
          <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
            {formik.values?.distributions?.map((room, idx) => {
              return (
                <Disclosure
                  key={idx}
                  as="div"
                  className="mt-2 first:mt-0"
                  defaultOpen={idx == 0}
                >
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between rounded-lg bg-sky-100 px-4 py-2 text-left text-sm font-medium text-sky-900 hover:bg-sky-200 focus:outline-none focus-visible:ring focus-visible:ring-sky-500/75">
                        <span>Habitación {idx + 1}</span>
                        <ChevronUpIcon
                          className={`${
                            open ? "rotate-180 transform" : ""
                          } h-5 w-5 text-sky-500`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                        <div>
                          {room?.persons?.map((person, i) => {
                            return (
                              <div key={i}>
                                {handleFields(
                                  idx === 0 && i === 0
                                    ? confirmation?.requiredField?.contactPerson
                                    : confirmation?.requiredField?.otherPersons?.filter(
                                        (x) =>
                                          (x !== "PHONE" && x !== "EMAIL") ||
                                          person?.age > 12
                                      ),
                                  idx,
                                  i,
                                  formik
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              );
            })}
          </div>
        </FieldGroup>
      </Fieldset>
      <Field>
        <Label>Comentarios al hotel</Label>
        <Textarea
          id="commentToAccommodation"
          name="commentToAccommodation"
          value={formik.values.commentToAccommodation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Description>Agrega comentarios para el hotel.</Description>
      </Field>
      <Button type="submit">Seguir al pago</Button>
    </form>
  );
};
