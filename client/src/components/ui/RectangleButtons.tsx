import React, { useRef } from "react";

export type RectangleButtonVariant =
  | "bloom-outline-button"
  | "ember-keycap"
  | "dark-glass";

export interface RectangleButtonsProps {
  variant?: RectangleButtonVariant;
  mode?: "dark" | "light";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  id?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const RectangleButtons: React.FC<RectangleButtonsProps> = ({
  variant = "bloom-outline-button",
  mode = "dark",
  href,
  target,
  rel,
  onClick,
  className = "",
  children,
  icon,
  id,
  type = "button",
  disabled = false,
}) => {
  const buttonRef = useRef<HTMLElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    buttonRef.current.style.setProperty("--mouse-x", `${x}%`);
    buttonRef.current.style.setProperty("--mouse-y", `${y}%`);
  };

  const getVariantClass = () => {
    switch (variant) {
      case "bloom-outline-button":
        return "bloom-outline-btn";
      case "ember-keycap":
        return "ember-keycap-btn";
      case "dark-glass":
      default:
        return "dark-glass-btn";
    }
  };

  const combinedClasses = `${getVariantClass()} group select-none ${className} ${
    disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
  }`;

  // If href is provided, render as <a>
  if (href) {
    return (
      <a
        id={id}
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : rel}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        ref={(el) => {
          buttonRef.current = el;
        }}
        className={combinedClasses}
        data-mode={mode}
        data-variant={variant}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {icon && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
        </span>
      </a>
    );
  }

  // Render as <button>
  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      ref={(el) => {
        buttonRef.current = el;
      }}
      className={combinedClasses}
      data-mode={mode}
      data-variant={variant}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
      </span>
    </button>
  );
};

export default RectangleButtons;
