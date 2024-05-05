import React from "react";

import cn from "clsx";

interface Props {
  iconStyle?: string;
  handleClick?: () => void;
}

const Close = ({ iconStyle, handleClick }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      onClick={handleClick}
      className={cn({
        [iconStyle!]: iconStyle !== undefined,
      })}
    >
      <path
        d="M16 4L4 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 4L16 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Close;
