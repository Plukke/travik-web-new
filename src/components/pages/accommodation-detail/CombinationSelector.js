"use client";

import axios from "axios";
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

    const { data } = await axios.request({
      method: "POST",
      url: `/api/tracom/booking/confirm`,
      headers: {
        "x-tracom-token": sessionToken,
      },
      data: {
        accommodationId,
        combinationKey,
      },
    });
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
