import { Link, To } from "react-router-dom";
import { StylesType } from "../types/types";

type PropsType = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean | undefined;
  nature: "primary" | "small" | "link" | "secondary" | "round";
  to?: To | undefined;
};

function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  nature,
  to,
}: PropsType) {
  const base =
    "inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles: StylesType = {
    primary: base + " " + "px-4 py-3 md:px-6 md:py-4",
    link: base + " " + "px-4 py-3 md:px-6 md:py-4",
    small: base + " " + "px-4 py-2 md:px-5 md:py-2.5 text-xs",
    secondary:
      "inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 focus:text-stone-800 focus:bg-stone-300 hover:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5",
    round: base + " " + "px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
  };

  if (nature != "link")
    return (
      <button
        disabled={disabled}
        type={type}
        onClick={onClick}
        className={styles[nature]}
      >
        {children}
      </button>
    );

  return (
    <Link className={styles[nature]} to={to as To}>
      {children}
    </Link>
  );
}

export default Button;
