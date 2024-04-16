"use client";

import { useRef } from "react";
import { initializeStore, Provider } from "./index";

export default function StoreProvider({ children, ...props }) {
  const storeRef = useRef();

  if (!storeRef.current) {
    storeRef.current = initializeStore(props);
  }

  return <Provider value={storeRef.current}>{children}</Provider>;
}
