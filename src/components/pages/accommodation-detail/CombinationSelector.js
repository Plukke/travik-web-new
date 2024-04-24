"use client";

import { Button } from "@/components/common/button";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
import { useShallow } from "zustand/react/shallow";

function useConfirm() {
  return useStore(
    useShallow((store) => ({
      setConfirmation: store.setConfirmation,
      confirmation: store.confirmation,
    }))
  );
}

const CombinationSelector = ({
  sessionToken,
  accommodationId,
  combinationKey,
  distributions,
}) => {
  const router = useRouter();
  const { setConfirmation } = useConfirm();

  const handleConfirm = (combinationKey) => async () => {
    console.log("combinationKey", combinationKey);

    const res = await fetch("/api/tracom/booking/confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-tracom-token": sessionToken,
      },
      body: JSON.stringify({
        accommodationId,
        combinationKey,
      }),
    });

    const data = await res.json();

    console.log("data", data);
    setConfirmation(data);

    const params = new URLSearchParams();
    params.append("distributions", distributions);

    return router.push(
      `/create-plan/accommodations/${accommodationId}/booking?${params.toString()}`
    );
  };

  return (
    <Button
      color="zinc"
      className="relative flex items-center justify-center w-full"
      onClick={handleConfirm(combinationKey)}
    >
      Selecciona y continua
    </Button>
  );
};

export default CombinationSelector;
