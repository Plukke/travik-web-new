import { createContext, useContext } from "react";
import { createStore, useStore as useZustandStore } from "zustand";

function getDefaultInitialState() {
  return {
    lastUpdate: new Date(1970, 1, 1).getTime(),
    light: false,
    count: 0,
    authToken: null,
    quote: {
      total: null,
      accommodations: [],
    },
    confirmation: null,
  };
}

const storeContext = createContext(null);

export const Provider = storeContext.Provider;

export function useStore(selector) {
  const store = useContext(storeContext);

  if (!store) throw new Error("Store is missing the provider");

  return useZustandStore(store, selector);
}

export function initializeStore(preloadedState) {
  return createStore((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    setAuthToken: (value) => set({ authToken: value }),
    setQuote: (value) => set({ quote: value }),
    setConfirmation: (value) => set({ confirmation: value }),
    tick: (lastUpdate) =>
      set({
        lastUpdate,
        light: !get().light,
      }),
    increment: () =>
      set({
        count: get().count + 1,
      }),
    decrement: () =>
      set({
        count: get().count - 1,
      }),
    reset: () =>
      set({
        count: getDefaultInitialState().count,
      }),
  }));
}
