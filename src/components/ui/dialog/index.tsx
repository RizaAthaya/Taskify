import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onOpenChange]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={() => onOpenChange(false)}
    >
      {/* OVERLAY */}
      <div
        className="
          absolute inset-0 bg-black/40 backdrop-blur-sm
          animate-[fadeIn_0.2s_ease-out]
        "
      />

      {/* CONTENT WRAPPER */}
      <div
        className="
          relative z-10 w-full max-w-lg
          animate-[fadeIn_0.25s_ease-out,scaleIn_0.25s_ease-out]
        "
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

// CONTENT
export function DialogContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-xl shadow-xl p-5 border border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

// HEADER
export function DialogHeader({ children }: { children: ReactNode }) {
  return <div className="mb-3">{children}</div>;
}

// TITLE
export function DialogTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-xl font-semibold text-gray-800">{children}</h2>;
}
