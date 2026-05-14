import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  asChildClassName?: string;
};

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--accent)] text-[var(--bg-deep)] border-[var(--accent)] hover:bg-[var(--accent-hover)]",
  secondary:
    "bg-transparent text-[var(--text)] border-[var(--border)] hover:bg-[var(--accent-soft)] hover:border-[var(--border-strong)]",
  ghost:
    "bg-transparent text-[var(--text-secondary)] border-transparent hover:bg-[var(--accent-soft)]",
};

export const buttonBaseClass =
  "inline-flex items-center justify-center rounded-[var(--radius-md)] border px-4 py-2.5 text-sm font-medium transition";

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
