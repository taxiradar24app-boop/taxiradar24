import React from "react";

export default function HeadphonesIcon(props) {
  const size = props.size || 32;

  return (
    <svg
      width={props.width || size}
      height={props.height || size}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {/* Arco superior (diadema) — amarillo TaxiRadar24 */}
      <path
        d="M128 240c0-70.7 57.3-128 128-128s128 57.3 128 128v32h40v-32C424 138.1 349.9 64 256 64S88 138.1 88 240v32h40v-32z"
        fill="#FFC83D" // yellow
      />

      {/* Conectores laterales — verde TaxiRadar24 */}
      <rect x="148" y="232" width="26" height="48" rx="8" fill="#10a37f" />
      <rect x="338" y="232" width="26" height="48" rx="8" fill="#10a37f" />

      {/* Almohadillas izquierda/derecha — verde TaxiRadar24 */}
      <rect
        x="80"
        y="240"
        width="96"
        height="176"
        rx="32"
        fill="#10a37f"
      />
      <rect
        x="336"
        y="240"
        width="96"
        height="176"
        rx="32"
        fill="#10a37f"
      />
    </svg>
  );
}
