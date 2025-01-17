import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const GrokIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      fill="currentColor"
      fillRule="evenodd"
      height="1em"
      style={{ flex: "none", lineHeight: "1" }}
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Grok</title>
      <path d="M6.469 8.776L16.512 23h-4.464L2.005 8.776H6.47zm-.004 7.9l2.233 3.164L6.467 23H2l4.465-6.324zM22 2.582V23h-3.659V7.764L22 2.582zM22 1l-9.952 14.095-2.233-3.163L17.533 1H22z"></path>
    </svg>
  );
};

export default GrokIcon;
