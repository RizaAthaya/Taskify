import { Icon } from "@iconify/react";
import { ALERT_POSITIONS, ALERT_VARIANTS } from "./constants";
import type { IAlertProps } from "./type";

const Alert = ({ posKey, alerts }: IAlertProps) => {
  return (
    <div
      id={`alert-container-${posKey}`}
      className={`fixed z-9999 flex flex-col gap-2 ${ALERT_POSITIONS[posKey]} pointer-events-none`}
    >
      {alerts
        .filter((alert) => alert.position === posKey)
        .map(({ id, message, variant }) => {
          const { color, icon } = ALERT_VARIANTS[variant] ?? ALERT_VARIANTS.info;

          return (
            <div
              id={`alert-${id}`}
              key={id}
              role="alert"
              className={`flex items-start px-4 py-3 text-sm w-[250px] md:w-[350px]
                ${color} border rounded-lg shadow-md
                transition-opacity duration-300 ease-in-out opacity-100
              `}
            >
              <Icon id={`alert-icon-${id}`} icon={icon} className="w-4 h-4 mr-2 shrink-0 mt-1" />

              <span
                id={`alert-message-${id}`}
                className="font-medium break-all whitespace-pre-wrap"
              >
                {message}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default Alert;
