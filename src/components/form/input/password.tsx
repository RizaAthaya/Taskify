import { useState, forwardRef } from "react";
import { Icon } from "@iconify/react";
import type { IInputProps } from ".";

const InputPassword = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, errorMessage, required = false, ...rest }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isError = Boolean(errorMessage);

    const toggleVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    return (
      <div className="w-full flex flex-col gap-1">
        {/* Label */}
        {label && (
          <label className="text-sm font-semibold text-purple-700">
            {label}
            {required && <span className="text-purple-500 ml-1">*</span>}
          </label>
        )}

        {/* Input Wrapper */}
        <div className="relative">
          <input
            ref={ref}
            type={isPasswordVisible ? "text" : "password"}
            {...rest}
            className={`
              w-full px-4 py-3 rounded-lg border
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

          {/* Toggle Button */}
          <button
            type="button"
            onClick={toggleVisibility}
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              text-purple-600 hover:text-purple-800
              transition-colors
            "
          >
            <Icon
              icon={isPasswordVisible ? "mdi:eye-off-outline" : "mdi:eye-outline"}
              className="w-5 h-5"
            />
          </button>
        </div>

        {/* Error Message */}
        {errorMessage && <p className="text-sm text-red-500 animate-pulse">{errorMessage}</p>}
      </div>
    );
  }
);

export default InputPassword;
