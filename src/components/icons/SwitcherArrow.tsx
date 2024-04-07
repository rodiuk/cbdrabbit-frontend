import React from "react";

import cn from "clsx";

interface Props {
  iconStyle?: string;
}

function SwitcherArrowIcon({ iconStyle }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="24"
      fill="currentColor"
      viewBox="0 0 23 24"
      className={cn({
        [iconStyle!]: iconStyle !== undefined,
      })}
    >
      <path
        fill="currentColor"
        d="M15.333 8l-4.114 4.293L7.105 8 5.75 9.414l5.47 5.707 5.468-5.707L15.333 8z"
      ></path>
    </svg>
  );
}

export default SwitcherArrowIcon;
