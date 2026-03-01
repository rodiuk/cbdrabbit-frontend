import React from "react";
import GiftIcon from "../icons/GigtIcon";

import Image from "next/image";
import styles from "./CartBanner.module.css";

import gift from "/public/img/cart-gift.png";
import InfoTooltipIcon from "../icons/InfoTooltipIcon";

interface Props {
  count: number;
  title: string;
}

export const GiftCandies = ({ count, title }: Props) => {
  const [tooltipOpen, setTooltipOpen] = React.useState(false);

  const hideTimerRef = React.useRef<number | null>(null);

  // Show tooltip and auto-hide after 1s (resets timer on every interaction)
  const triggerTooltip = React.useCallback(() => {
    setTooltipOpen(true);

    if (hideTimerRef.current != null) {
      window.clearTimeout(hideTimerRef.current);
    }

    hideTimerRef.current = window.setTimeout(() => {
      setTooltipOpen(false);
      hideTimerRef.current = null;
    }, 1000);
  }, []);

  React.useEffect(() => {
    return () => {
      if (hideTimerRef.current != null) {
        window.clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      className={styles.gc_container}
      onMouseEnter={triggerTooltip}
      onFocus={triggerTooltip}
      onClick={triggerTooltip}
      onTouchStart={triggerTooltip}
      role="button"
      tabIndex={0}
      aria-label="Бонусні цукерки"
    >
      {/* Tooltip */}
      <div
        className={`${styles.gc_tooltip} ${tooltipOpen ? styles.gc_tooltipOpen : ""}`}
        role="tooltip"
        aria-hidden={!tooltipOpen}
      >
        <InfoTooltipIcon />

        {title}
      </div>

      <span className={styles.gc_count}>+{count}</span>

      <Image
        src={gift}
        alt="gift icon"
        width={28}
        height={28}
        style={{ minWidth: "28px", minHeight: "28px" }}
      />

      <GiftIcon style={{ width: "26px", height: "26px" }} />
    </div>
  );
};
