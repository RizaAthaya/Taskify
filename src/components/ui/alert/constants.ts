import type { IAlertVariantConfig, TAlertPosition, TAlertVariant } from "./type";

export const ALERT_VARIANTS: Record<TAlertVariant, IAlertVariantConfig> = {
  success: {
    color: "text-green-800 border-green-800 bg-green-50",
    icon: "mdi:check-circle",
  },
  error: {
    color: "text-red-800 border-red-800 bg-red-50",
    icon: "mdi:alert-circle",
  },
  info: {
    color: "text-blue-800 border-blue-800 bg-blue-50",
    icon: "mdi:information",
  },
  warning: {
    color: "text-yellow-800 border-yellow-800 bg-yellow-50",
    icon: "mdi:alert",
  },
};

export const ALERT_POSITIONS: Record<TAlertPosition, string> = {
  "top-left": "top-4 left-4 items-start",
  "top-right": "top-4 right-4 items-end",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
};
