import { type ReactNode } from "react";
import { createPortal } from "react-dom";

interface PopupProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  className?: string;
  containerClassName?: string;
  closeOnOverlayClick?: boolean;
}

const Popup = ({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  className,
  containerClassName,
  closeOnOverlayClick = true,
}: PopupProps) => {
  if (!open) return null;

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999]"
      onClick={handleOverlayClick}
    >
      <div
        className={[
          "bg-white w-full max-w-md rounded-xl shadow-lg p-6 space-y-4",
          containerClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || description) && (
          <div className="space-y-1">
            {title && <h2 className="text-xl font-semibold text-gray-800">{title}</h2>}
            {description && <p className="text-sm text-gray-600">{description}</p>}
          </div>
        )}

        {children}

        {actions && (
          <div className={["flex justify-end gap-2 pt-2", className].filter(Boolean).join(" ")}>
            {actions}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Popup;
