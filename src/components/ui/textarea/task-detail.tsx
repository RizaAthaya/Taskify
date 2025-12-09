import React from "react";
import type { ITextareaProps } from ".";

// Variant: Task Detail textarea style
const TextareaTaskDetail = React.forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ register, className, ...rest }, ref) => {
    const base =
      "w-full text-base outline-none resize-none border border-gray-100 p-3 rounded-md mb-4 flex-1";
    const classes = [base, className].filter(Boolean).join(" ");

    return <textarea ref={ref} {...register} {...rest} className={classes} />;
  }
);

export default TextareaTaskDetail;
