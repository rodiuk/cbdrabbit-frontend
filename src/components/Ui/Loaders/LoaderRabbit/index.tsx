import React from "react";

import style from "./s.module.css";
import cn from "clsx";

interface Props {
  loaderStyle?: string;
}

export const LoaderRabbit = ({ loaderStyle }: Props): React.JSX.Element => {
  return (
    <div
      className={cn(style.loader, {
        [loaderStyle!]: !!loaderStyle,
      })}
    >
      <div className={style.rabbit}></div>
      <div className={style.rabbit}></div>
      <div className={style.rabbit}></div>
    </div>
  );
};
