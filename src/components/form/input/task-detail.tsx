import React from "react";
import type { IInputProps } from ".";

// Variant: Task Detail input style
const InputTaskDetail = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ register, className, ...rest }, ref) => {
    const base = "w-full text-2xl font-bold outline-none border-b border-gray-200 pb-2 mb-2";
    const classes = [base, className].filter(Boolean).join(" ");

    return <input ref={ref} {...register} {...rest} className={classes} />;
  }
);

export default InputTaskDetail;
