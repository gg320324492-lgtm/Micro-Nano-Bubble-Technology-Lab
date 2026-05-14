// src/components/Container.tsx
import React from "react";

export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`site-container ${className}`.trim()}>
      {children}
    </div>
  );
}
