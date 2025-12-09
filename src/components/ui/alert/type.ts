export type TAlertVariant = "info" | "success" | "warning" | "error";
export type TAlertPosition = "top-right" | "top-left" | "top-center";

export interface IAlert {
  id: number;
  message: string;
  variant: TAlertVariant;
  position: TAlertPosition;
}

export interface IAlertVariantConfig {
  color: string;
  icon: string;
}

export interface IAlertProps {
  posKey: TAlertPosition;
  alerts: IAlert[];
}
