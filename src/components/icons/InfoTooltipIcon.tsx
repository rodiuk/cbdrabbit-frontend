import * as React from "react";

interface Props {
  styles?: string;
}

const InfoTooltipIcon = ({ styles }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
    className={styles}
    aria-hidden="true"
  >
    <g
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      clipPath="url(#clip0_5279_889)"
    >
      <path d="M8 14.667A6.667 6.667 0 1 0 8 1.333a6.667 6.667 0 0 0 0 13.334M8 10.667V8M8 5.333h.007"></path>
    </g>
    <defs>
      <clipPath id="clip0_5279_889">
        <path fill="#fff" d="M0 0h16v16H0z"></path>
      </clipPath>
    </defs>
  </svg>
);

export default InfoTooltipIcon;
