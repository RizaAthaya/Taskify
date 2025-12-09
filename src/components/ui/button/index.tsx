import { BUTTON_SIZES, BUTTON_VARIANTS } from "./constants";
import type { IButtonProps } from "./type";

const Button = ({
  variant = "primary",
  size = "medium",
  className = "w-fit h-fit",
  style,
  children,
  ...props
}: IButtonProps) => {
  const classes = ["cursor-pointer", BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} style={style} {...props}>
      {children}
    </button>
  );
};

export default Button;
