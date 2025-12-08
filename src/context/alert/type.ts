import type { TAlertPosition, TAlertVariant, IAlert } from "@/components/ui/alert/type";

export interface TShowAlertPayload {
  message: string;
  variant?: TAlertVariant;
  position?: TAlertPosition;
}

export interface TAlertContext {
  alerts: IAlert[];
  showAlert: (payload: TShowAlertPayload) => void;
}
