import React from "react";

import cn from "clsx";

interface Props {
  iconStyle?: string;
}

export function InstaWhiteIcon({ iconStyle }: Props): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      className={cn({
        [iconStyle!]: iconStyle !== undefined,
      })}
    >
      <path
        d="M17 2.5H7C4.23858 2.5 2 4.73858 2 7.5V17.5C2 20.2614 4.23858 22.5 7 22.5H17C19.7614 22.5 22 20.2614 22 17.5V7.5C22 4.73858 19.7614 2.5 17 2.5Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.9997 11.8703C16.1231 12.7025 15.981 13.5525 15.5935 14.2993C15.206 15.0461 14.5929 15.6517 13.8413 16.03C13.0898 16.4082 12.2382 16.5399 11.4075 16.4062C10.5768 16.2726 9.80947 15.8804 9.21455 15.2855C8.61962 14.6905 8.22744 13.9232 8.09377 13.0925C7.96011 12.2619 8.09177 11.4102 8.47003 10.6587C8.84829 9.90716 9.45389 9.29404 10.2007 8.90654C10.9475 8.51904 11.7975 8.37689 12.6297 8.5003C13.4786 8.62619 14.2646 9.02176 14.8714 9.62861C15.4782 10.2355 15.8738 11.0214 15.9997 11.8703Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 7H17.51"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
