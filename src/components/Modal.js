"use client";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "./common/dialog";

export function Modal({ children }) {
  const router = useRouter();

  return (
    <Dialog
      open
      size="xl"
      onClose={() => {
        router.back();
      }}
      className={"!px-4"}
    >
      {/* <DialogTitle>Refund payment</DialogTitle>
      <DialogDescription>
        The refund will be reflected in the customer’s bank account 2 to 3
        business days after processing.
      </DialogDescription> */}
      <DialogBody>{children}</DialogBody>
      {/* <DialogActions>
        <Button plain onClick={() => router.back()}>
          Cancel
        </Button>
        <Button>Refund</Button>
      </DialogActions> */}
    </Dialog>
  );
}
