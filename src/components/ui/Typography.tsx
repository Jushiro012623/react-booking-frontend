import clsx from "clsx";
import React from "react";

const variants = {
  h1: { type: "h1", class: "text-4xl font-bold" },
  h2: { type: "h2", class: "text-3xl font-semibold" },
  h3: { type: "h3", class: "text-2xl font-medium" },
  h4: { type: "h4", class: "text-xl font-normal" },
  h5: { type: "h5", class: "text-lg font-normal" },
  h6: { type: "h6", class: "text-base font-normal" },
  subheading1: { type: "h6", class: "text-base font-semibold" },
  subheading2: { type: "h6", class: "text-sm font-medium" },
  body1: { type: "p", class: "text-base" },
  body2: { type: "p", class: "text-sm" },
  small: { type: "p", class: "text-xs" },
  small2: { type: "p", class: "text-xs font-medium" },
  small3: { type: "p", class: "text-xs font-semibold" },
  info: { type: "p", class: "text-[11px]" },
  info2: { type: "p", class: "text-[13px]" },
  label: { type: "label", class: "text-xs" },
  label1: { type: "label", class: "text-[11px]" },
  span: { type: "span", class: "" },
};

export const colors = {
  default: "text-slate-900",
  primary: "text-blue-500",
  secondary: "text-green-500",
  teal: "text-teal-500",
  danger: "text-red-400",
  warning: "text-yellow-500",
  highlight: "text-teal-500",
  info: "text-sky-500",
  light: "text-gray-400",
  dark: "text-gray-800",
  gray: "text-gray-500",
  white: "text-white",
  none: "",
} as const;

interface TypographyProps {
  variant?: keyof typeof variants;
  color?: keyof typeof colors;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

const Typography: React.FC<TypographyProps> = ({
  variant = "body1",
  color = "none",
  children,
  className,
  ...props
}) => {
  const variantConfig = variants[variant];
  const Component = variantConfig.type as React.ElementType;

  return (
    <Component
      className={clsx(colors[color], variantConfig.class, className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;
