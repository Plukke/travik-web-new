"use client";

import { useState } from "react";
import { Button } from "@/components/common/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from "@/components/common/dialog";
import { DateRange } from "react-date-range";
import dayjs from "dayjs";
import { TextLink } from "./common/text";

export default function DateRangeDialog() {
  let [isOpen, setIsOpen] = useState(false);
  let [checkIn, setCheckIn] = useState(dayjs().toDate());
  let [checkOut, setCheckOut] = useState(dayjs().add(4, "days").toDate());

  return (
    <>
      {/* <Button type="button" plain>
        Agree to terms
      </Button> */}
      <TextLink href="#" onClick={() => setIsOpen(true)}>
        Explorar
      </TextLink>
      <Dialog open={isOpen} onClose={setIsOpen} size="xl" className="px-4">
        <DialogTitle>Selecciona tus fechas</DialogTitle>
        <DialogBody className="text-sm/6 flex justify-center text-zinc-900 dark:text-white">
          <DateRange
            onChange={(item) => {
              setCheckIn(item.selection.startDate);
              setCheckOut(item.selection.endDate);
            }}
            dateDisplayFormat={"dd/MM/yyyy"}
            months={2}
            direction="vertical"
            moveRangeOnFirstSelection={false}
            renderStaticRange={false}
            minDate={dayjs().toDate()}
            maxDate={dayjs().add(1, "years").toDate()}
            ranges={[
              {
                startDate: checkIn,
                endDate: checkOut,
                key: "selection",
              },
            ]}
            color="#fb923c"
            rangeColors={["#f97316", "#c2410c", "#9a3412"]}
          />
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button color="orange" onClick={() => setIsOpen(false)}>
            Aplicar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
