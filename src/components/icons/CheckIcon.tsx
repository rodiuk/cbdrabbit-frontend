import React from "react";

import cn from "clsx";

interface Props {
	iconStyle?: string;
}
  
const CheckIcon = ({ iconStyle }: Props) => {
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
        d="M22 11.58V12.5C21.9988 14.6564 21.3005 16.7547 20.0093 18.4818C18.7182 20.209 16.9033 21.4725 14.8354 22.0839C12.7674 22.6953 10.5573 22.6219 8.53447 21.8746C6.51168 21.1273 4.78465 19.7461 3.61096 17.9371C2.43727 16.128 1.87979 13.9881 2.02168 11.8363C2.16356 9.68455 2.99721 7.63631 4.39828 5.99706C5.79935 4.35781 7.69279 3.21537 9.79619 2.74013C11.8996 2.2649 14.1003 2.48232 16.07 3.35999"
        stroke="#9BD28F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 4.5L12 14.51L9 11.51"
        stroke="#9BD28F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckIcon;
