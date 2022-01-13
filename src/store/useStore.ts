import { createContext, useContext } from "react";
import { PatientDetailStore } from "./PatientDetailStore";

const StoreContext = createContext({
  patientDetailStore: new PatientDetailStore(),
});

export const useStore = () => useContext(StoreContext);
