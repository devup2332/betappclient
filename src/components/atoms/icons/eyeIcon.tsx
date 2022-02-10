import React from "react";

const EyeIcon = (props: any) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 18" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        transform="translate(1 1)"
      >
        <path d="M0 8s4-8 11-8 11 8 11 8-4 8-11 8S0 8 0 8z" />
        <circle cx="11" cy="8" r="3" />
      </g>
    </svg>
  );
};
export default EyeIcon;
