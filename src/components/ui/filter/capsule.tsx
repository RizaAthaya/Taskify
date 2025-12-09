interface IFilterCapsuleProps {
  label: string;
  active: boolean;
  onClick: () => void;
  color?: string;
  position?: "left" | "middle" | "right" | "solo";
}

const FilterCapsule = ({
  label,
  active,
  onClick,
  color,
  position = "solo",
}: IFilterCapsuleProps) => {
  const shape =
    position === "left"
      ? "rounded-l-full rounded-r-none border-r-0"
      : position === "middle"
        ? "rounded-none border-l-0 border-r-0"
        : position === "right"
          ? "rounded-r-full rounded-l-none border-l-0"
          : "rounded-full";

  // ACTIVE STYLE → clean, no double border, nice colors
  const activeStyle = color
    ? `${color} text-white border-[1.5px] border-black/10`
    : "bg-purple-600 text-white border-purple-700";

  // INACTIVE STYLE
  const inactiveStyle = "border-gray-300 text-gray-600 bg-white hover:bg-gray-100";

  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-1.5 text-base font-medium capitalize transition
        border
        ${shape}
        ${active ? activeStyle : inactiveStyle}
      `}
    >
      {label.replace("-", " ")}
    </button>
  );
};

export default FilterCapsule;
