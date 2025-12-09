import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

export type TButtonVariant = "primary" | "secondary" | "tertiary" | "plain";
export type TButtonSize = "extraSmall" | "small" | "medium" | "large" | "extraLarge" | "plain";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TButtonVariant;
  size?: TButtonSize;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}
