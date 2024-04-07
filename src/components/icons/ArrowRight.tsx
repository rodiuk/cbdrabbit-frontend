import React from "react";

import cn from "clsx";

interface Props {
  iconStyle?: string;
}

export function ArrowRightIcon({ iconStyle }: Props): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      fill="currentColor"
      className={cn({
        [iconStyle!]: iconStyle !== undefined,
      })}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M15.086 12L8.5 5.414A1 1 0 019.914 4l8 8-8 8A1 1 0 018.5 18.586L15.086 12z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
