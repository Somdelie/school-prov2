import React from "react";

export function WelcomeIllustration() {
  return (
    <svg
      width="240"
      height="200"
      viewBox="0 0 240 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto mb-6"
    >
      <rect
        x="40"
        y="20"
        width="160"
        height="140"
        rx="8"
        fill="#E6FAF5"
        stroke="#10B981"
        strokeWidth="2"
      />
      <rect
        x="60"
        y="40"
        width="120"
        height="20"
        rx="4"
        fill="#10B981"
        fillOpacity="0.2"
      />
      <rect
        x="60"
        y="70"
        width="120"
        height="20"
        rx="4"
        fill="#10B981"
        fillOpacity="0.2"
      />
      <rect
        x="60"
        y="100"
        width="120"
        height="40"
        rx="4"
        fill="#10B981"
        fillOpacity="0.2"
      />
      <circle cx="200" cy="40" r="30" fill="#FDE68A" fillOpacity="0.4" />
      <circle cx="40" cy="160" r="20" fill="#10B981" fillOpacity="0.2" />
    </svg>
  );
}
