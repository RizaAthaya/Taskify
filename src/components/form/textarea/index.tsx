import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

export interface ITextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errorMessage?: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ label, errorMessage, required = false, register, ...rest }, ref) => {
    const isError = Boolean(errorMessage);

    return (
      <div className="w-full flex flex-col gap-1">
        {/* Label */}
        {label && (
          <label className="text-sm font-semibold text-purple-700">
            {label}
            {required && <span className="text-purple-500 ml-1">*</span>}
          </label>
        )}

        {/* Textarea Field */}
        <textarea
          ref={ref}
          {...register}
          {...rest}
          className={`
            w-full px-4 py-2 rounded-lg border resize-none
            bg-white text-purple-900
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2
            ${
              isError
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:border-purple-500 focus:ring-purple-300"
            }
          `}
        />

        {/* Error Message */}
        {errorMessage && <p className="text-sm text-red-500 animate-pulse">{errorMessage}</p>}
      </div>
    );
  }
);

export default Textarea;
