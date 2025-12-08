import type { TButtonSize, TButtonVariant } from "./type";

export const BUTTON_VARIANTS: Record<TButtonVariant, string> = {
  primary:
    "bg-purple-700 rounded-lg hover:bg-purple-700 text-white hover:text-white " +
    "active:bg-purple-800 disabled:bg-purple-200 disabled:text-purple-400 " +
    "border border-purple-600 hover:border-purple-700 active:border-purple-800",

  secondary:
    "bg-purple-100 rounded-lg hover:bg-purple-200 text-purple-700 hover:text-purple-800 " +
    "active:bg-purple-300 disabled:bg-neutral-30 disabled:text-neutral-60 " +
    "border border-purple-300 hover:border-purple-400 active:border-purple-500",

  tertiary:
    "bg-gradient-to-l from-purple-600 via-purple-400 to-pink-400 " +
    "rounded-[12px] text-white hover:opacity-90 active:opacity-80 " +
    "disabled:opacity-50 disabled:cursor-not-allowed",

  plain: "",
};

export const BUTTON_SIZES: Record<TButtonSize, string> = {
  extraSmall: "text-xs font-semibold py-1.5 px-2.5",
  small: "text-sm font-semibold py-2 px-3",
  medium: "text-base font-semibold px-4 py-2",
  large: "text-lg font-semibold px-5 py-2.5",
  extraLarge: "text-xl font-bold px-6 py-3",
  plain: "",
};
