import React from "react";

import cn from "clsx";

interface Props {
  iconStyle?: string;
}

export function PlusIcon({ iconStyle }: Props): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      fill="currentColor"
      viewBox="0 0 25 24"
      className={cn({ [iconStyle!]: iconStyle !== undefined })}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12.5 4a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6h-6a1 1 0 110-2h6V5a1 1 0 011-1z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
