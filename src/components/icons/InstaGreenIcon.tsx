import React from "react";

import cn from "clsx";

interface Props {
  iconStyle?: string;
}

export function InstaGreenIcon({ iconStyle }: Props): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.16732 2.33325C4.49794 2.33325 2.33398 4.49721 2.33398 7.16659V18.8333C2.33398 21.5026 4.49794 23.6666 7.16732 23.6666H18.834C21.5034 23.6666 23.6673 21.5026 23.6673 18.8333V7.16659C23.6673 4.49721 21.5034 2.33325 18.834 2.33325H7.16732ZM0.333984 7.16659C0.333984 3.39264 3.39337 0.333252 7.16732 0.333252H18.834C22.6079 0.333252 25.6673 3.39264 25.6673 7.16659V18.8333C25.6673 22.6072 22.6079 25.6666 18.834 25.6666H7.16732C3.39337 25.6666 0.333984 22.6072 0.333984 18.8333V7.16659ZM18.4173 6.58325C18.4173 6.03036 18.8786 5.58325 19.4273 5.58325C19.9796 5.58325 20.4273 6.03097 20.4273 6.58325C20.4273 7.13615 19.966 7.58325 19.4173 7.58325C18.865 7.58325 18.4173 7.13554 18.4173 6.58325ZM13.589 9.32244C12.0418 9.09301 10.4791 9.90385 9.77593 11.3009C9.07273 12.698 9.35242 14.4362 10.4584 15.5422C11.5644 16.6481 13.3025 16.9278 14.6996 16.2246C16.0967 15.5214 16.9076 13.9588 16.6781 12.4116C16.4439 10.8321 15.1685 9.55665 13.589 9.32244ZM13.8823 7.34407C16.3234 7.70604 18.2945 9.67721 18.6565 12.1182C19.0111 14.5093 17.758 16.9243 15.5988 18.0111C13.4396 19.0979 10.7534 18.6656 9.04419 16.9564C7.33495 15.2471 6.9027 12.5609 7.98946 10.4018C9.07623 8.24261 11.4912 6.9895 13.8823 7.34407Z"
        fill="#5BAD48"
      />
    </svg>
  );
}
