import cn from "clsx";
import * as React from "react";

interface Props {
  iconStyle?: string;
}

const PercentageHeartIcon: React.FC<Props> = ({ iconStyle }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    className={cn({
      [iconStyle!]: iconStyle !== undefined,
    })}
  >
    <path
      stroke="#42623B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M22.651 5.387a5.66 5.66 0 0 0-5.4-3.128C14.966 2.385 14.01 3.533 12 5.25 9.99 3.533 9.034 2.385 6.75 2.259a5.66 5.66 0 0 0-5.4 3.128C-1.5 11.25 7.368 17.924 12 21.75c4.632-3.826 13.5-10.5 10.651-16.363M8.667 14.332l6.667-6.666"
    ></path>
    <path
      stroke="#42623B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M9.334 9.666a1.333 1.333 0 1 0 0-2.666 1.333 1.333 0 0 0 0 2.666M14.667 15a1.333 1.333 0 1 0 0-2.666 1.333 1.333 0 0 0 0 2.666"
    ></path>
  </svg>
);

export default PercentageHeartIcon;
