import type { ReactNode } from "react";
import { AlertContext, useAlertProvider } from "./useAlert";
import { ALERT_POSITIONS } from "@/components/ui/alert/constants";
import Alert from "@/components/ui/alert";

interface AlertProviderProps {
  children: ReactNode;
}

const AlertProvider = ({ children }: AlertProviderProps) => {
  const { alerts, showAlert } = useAlertProvider();

  return (
    <AlertContext.Provider value={{ alerts, showAlert }}>
      {children}

      {Object.keys(ALERT_POSITIONS).map((posKey) => (
        <Alert key={posKey} posKey={posKey as keyof typeof ALERT_POSITIONS} alerts={alerts} />
      ))}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
