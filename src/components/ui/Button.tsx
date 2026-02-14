import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  asChildClassName?: string;
};

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-[color:var(--text)] text-white border-[color:var(--text)] hover:opacity-90",
  secondary:
    "bg-[color:var(--surface)] text-[color:var(--text)] border-[color:var(--border)] hover:bg-white",
  ghost:
    "bg-transparent text-[color:var(--text)] border-transparent hover:bg-white/70",
};

export const buttonBaseClass =
  "inline-flex items-center justify-center rounded-full border px-4 py-2.5 text-sm font-medium transition";

export function buttonClassName(variant: ButtonVariant = "primary", extra = "") {
  return `${buttonBaseClass} ${variantClass[variant]} ${extra}`.trim();
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  asChildClassName,
  ...rest
}: ButtonProps) {
  return (
    <button className={buttonClassName(variant, `${className} ${asChildClassName ?? ""}`)} {...rest}>
      {children}
    </button>
  );
}
