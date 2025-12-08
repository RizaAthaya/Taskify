import { createContext, useContext, useState } from "react";
import type { TAlertContext, TShowAlertPayload } from "./type";
import type { IAlert } from "@/components/ui/alert/type";

export const AlertContext = createContext<TAlertContext | undefined>(undefined);

export const useAlert = (): TAlertContext => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within AlertProvider");
  }
  return context;
};

let idCounter = 0;

export const useAlertProvider = () => {
  const [alerts, setAlerts] = useState<IAlert[]>([]);

  const showAlert = ({ message, variant = "info", position = "top-right" }: TShowAlertPayload) => {
    const id = idCounter++;

    const newAlert: IAlert = {
      id,
      message,
      variant,
      position,
    };

    setAlerts((prev) => [...prev, newAlert]);

    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 2000);
  };

  return { alerts, showAlert };
};
