"use client";

import { useShallow } from "zustand/react/shallow";
import { useStore } from "@/store";
import * as Yup from "yup";
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

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import { orderBy } from "lodash";
import countries from "@/lib/utils/countryCodes";

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
  return orderBy(
    requiredFields?.map((field, idx) => {
      const fieldPrefix = `distributions[${room}].persons[${person}]`;
      const getArgs = (fieldName = COMMON_FIELDS[field]) => ({
        id: `${fieldPrefix}.${fieldName}`,
        name: `${fieldPrefix}.${fieldName}`,
        value: formik.values[`${fieldPrefix}.${fieldName}`],
        onChange: formik.handleChange,
      });

      switch (field) {
        case "TITLE":
          return {
            order: 0,
            Comp: (
              <Field key={idx}>
                <Label>Título</Label>
                <Select {...getArgs()}>
                  <option value={""}>Selecciona...</option>
                  <option value={"MRS"}>Sra.</option>
                  <option value={"MS"}>Srta.</option>
                  <option value={"MISTER"}>Sr.</option>
                </Select>
              </Field>
            ),
          };
        case "FIRST_NAME":
          return {
            order: 1,
            Comp: (
              <Field key={idx}>
                <Label>Nombre(s)</Label>
                <Input {...getArgs()} />
              </Field>
            ),
          };
        case "LAST_NAME":
          return {
            order: 2,
            Comp: (
              <Field key={idx}>
                <Label>Apellidos</Label>
                <Input {...getArgs()} />
              </Field>
            ),
          };
        case "EMAIL":
          return {
            order: 3,
            Comp: (
              <Field key={idx}>
                <Label>Email</Label>
                <Input {...getArgs()} type="email" />
              </Field>
            ),
          };
        case "PHONE":
          return {
            order: 4,
            Comp: (
              <div
                key={idx}
                className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-2"
              >
                <Field>
                  <Label>Código de país</Label>

                  <Select {...getArgs(COMMON_FIELDS[`${field}_CC`])}>
                    <option value={""}>Selecciona...</option>
                    {countries.map((x, idx) => (
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
            ),
          };
        case "BIRTH_DATE":
          return {
            order: 5,
            Comp: (
              <Field key={idx}>
                <Label>Fecha de nacimiento</Label>
                <Input {...getArgs()} type="date" />
              </Field>
            ),
          };
        case "ADDRESS":
          return {
            order: 6,
            Comp: (
              <div
                key={idx}
                className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-1"
              >
                <Field className="col-span-2">
                  <Label>Calle</Label>
                  <Input {...getArgs(COMMON_FIELDS[`${field}.street`])} />
                </Field>
                <Field>
                  <Label>Ciudad</Label>
                  <Input {...getArgs(COMMON_FIELDS[`${field}.city`])} />
                </Field>
                <Field>
                  <Label>Código postal</Label>
                  <Input {...getArgs(COMMON_FIELDS[`${field}.postCode`])} />
                </Field>
              </div>
            ),
          };

        default:
          return null;
      }
    }),
    ["order"],
    ["asc"]
  ).map((x) => x.Comp);
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
    validationSchema: Yup.object().shape({
      distributions: Yup.array().of(Yup.object()),
      commentToAccommodation: Yup.string(),
    }),
    onSubmit: async (values, actions) => {
      console.log("values", values);
      actions.setSubmitting(true);
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

          if (person.address) {
            obj["address"] = {
              ...person.address,
              fullAddress:
                person.address.street +
                " " +
                person.address.city +
                " " +
                person.address.postCode,
            };
          }

          return obj;
        }),
      }));
      console.log("parsedDistributions", parsedDistributions);

      const res = await fetch("/api/tracom/booking/prebook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-tracom-token": confirmation?.auditData?.authToken,
        },
        body: JSON.stringify({
          accommodationId: confirmation?.accommodation?.code,
          accommodation: {
            combinationKey:
              confirmation?.accommodation?.combination?.combinationKey,
            commentToAccommodation: values.commentToAccommodation,
          },
          distributions: parsedDistributions,
        }),
      });

      const data = await res.json();

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

  console.log("formik.errors", formik.errors);

  return (
    <form className="space-y-2" onSubmit={formik.handleSubmit}>
      <Fieldset>
        <Text>Completa los datos de tu reserva y continua al pago.</Text>

        {confirmation?.warnings?.length ? (
          <Text>{confirmation?.warnings?.join(", ")}</Text>
        ) : null}

        <FieldGroup className="w-full sm:px-4">
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
        <Label>Comentarios al hotel (opcional)</Label>
        <Textarea
          id="commentToAccommodation"
          name="commentToAccommodation"
          value={formik.values.commentToAccommodation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Description>Agrega comentarios para el hotel.</Description>
      </Field>
      <div className="flex flex-col items-end py-4">
        <Button type="submit" disabled={formik.isSubmitting}>
          Seguir al pago
        </Button>
      </div>
    </form>
  );
};
