import React from "react";

import cn from "clsx";

interface Props {
  iconStyle?: string;
}

export function CartIcon({ iconStyle }: Props): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      className={cn({
        [iconStyle!]: iconStyle !== undefined,
      })}
    >
      <g
        stroke="#69332B"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        clipPath="url(#clip0_93_1669)"
      >
        <path d="M7.5 18.333a.833.833 0 100-1.667.833.833 0 000 1.667zM16.667 18.333a.833.833 0 100-1.667.833.833 0 000 1.667zM.833.833h3.334L6.4 11.992a1.667 1.667 0 001.667 1.341h8.1a1.667 1.667 0 001.666-1.341L19.168 5H5"></path>
      </g>
      <defs>
        <clipPath id="clip0_93_1669">
          <path fill="#fff" d="M0 0H20V20H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}
