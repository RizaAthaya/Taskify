import { Icon } from "@iconify/react";
import React, { useState, useRef, useEffect } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

export interface ISelectProps<T extends string> {
  label?: string;
  errorMessage?: string;
  required?: boolean;
  value: T;
  onChange: (v: T) => void;
  options: { label: string; value: T }[];
  register?: UseFormRegisterReturn;
}

function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

const Select = <T extends string>({
  label,
  errorMessage,
  required = false,
  value,
  onChange,
  options,
  register,
}: ISelectProps<T>) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(wrapperRef, () => setOpen(false));

  const isError = Boolean(errorMessage);

  return (
    <div className="w-full flex flex-col gap-1 relative min-w-20" ref={wrapperRef}>
      {/* Label */}
      {label && (
        <label className="text-sm font-semibold text-purple-700">
          {label}
          {required && <span className="text-purple-500 ml-1">*</span>}
        </label>
      )}

      {/* Trigger */}
      <button
        type="button"
        {...register}
        onClick={() => setOpen(!open)}
        className={`
          w-full px-4 py-2 rounded-lg border bg-white text-purple-900 text-left flex justify-between items-center
          transition-all duration-200 ease-in-out focus:outline-none focus:ring-2
          ${
            isError
              ? "border-red-400 focus:ring-red-300"
              : "border-gray-300 focus:border-purple-500 focus:ring-purple-300"
          }
        `}
      >
        {options.find((opt) => opt.value === value)?.label || "Pilih..."}
        <Icon
          icon="mdi:chevron-down"
          className="float-right flex items-center justify-center text-gray-500 w-6 h-6"
        />
      </button>

      {/* Dropdown List */}
      {open && (
        <div className="absolute mt-18 w-full bg-white border border-gray-300 rounded-lg shadow-md z-50 max-h-60 overflow-auto">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`
                px-4 py-2 text-sm cursor-pointer hover:bg-purple-50
                ${opt.value === value ? "bg-purple-100 font-semibold" : ""}
              `}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {errorMessage && <p className="text-sm text-red-500 animate-pulse">{errorMessage}</p>}
    </div>
  );
};

export default Select;
