import React from "react";

import cn from "clsx";

interface Props {
  iconStyle: string;
}

export function ArrowRightFilterIcon({ iconStyle }: Props): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="57"
      height="80"
      fill="none"
      viewBox="0 0 57 80"
      className={cn({
        [iconStyle]: iconStyle !== undefined,
      })}
    >
      <g filter="url(#filter0_d_76_138)" opacity="0.2">
        <circle
          cx="36.5"
          cy="30"
          r="20"
          fill="#fff"
          fillOpacity="0.5"
          shapeRendering="crispEdges"
          transform="rotate(180 36.5 30)"
        ></circle>
      </g>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth="2"
        d="M35.072 37.143l5.728-5.729a2 2 0 000-2.828l-5.728-5.729"
        opacity="0.7"
      ></path>
      <defs>
        <filter
          id="filter0_d_76_138"
          width="80"
          height="80"
          x="0.5"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dx="4" dy="10"></feOffset>
          <feGaussianBlur stdDeviation="10"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0.223529 0 0 0 0 0.184314 0 0 0 0 0.352941 0 0 0 0.3 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_76_138"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_76_138"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}
