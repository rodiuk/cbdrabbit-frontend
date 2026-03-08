"use client";

import Image from "next/image";
import React from "react";
import styles from "./Gallery.module.css";
import Close from "@/components/icons/Close";
import { IconButton } from "../IconButton/IconButton";
import { ArrowRightIcon } from "@/components/icons/ArrowRight";

type GalleryProps = {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
};

export default function Gallery({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}: GalleryProps): React.JSX.Element | null {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
  const touchStartX = React.useRef<number | null>(null);
  const touchEndX = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [initialIndex, isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentIndex, onClose]);

  const total = images.length;

  const goPrev = React.useCallback(
    (e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.stopPropagation();
      setCurrentIndex(prev => (prev - 1 + total) % total);
    },
    [total]
  );

  const goNext = React.useCallback(
    (e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.stopPropagation();
      setCurrentIndex(prev => (prev + 1) % total);
    },
    [total]
  );

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // if (event.target === event.currentTarget) {
    onClose();
    // }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = null;
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const delta = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (delta > minSwipeDistance) {
      goNext();
    } else if (delta < -minSwipeDistance) {
      goPrev();
    }
  };

  if (!isOpen || !images.length) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <IconButton
        handleClick={onClose}
        ariaLabel="Close gallery"
        className={styles.closeButton}
      >
        <Close iconStyle={styles.buttonIcon} />
      </IconButton>

      {total > 1 && (
        <>
          <IconButton
            handleClick={goPrev}
            ariaLabel="Previous image"
            className={`${styles.navButton} ${styles.navButtonLeft}`}
          >
            <ArrowRightIcon
              iconStyle={`${styles.buttonIcon} ${styles.navButtonIconLeft}`}
            />
          </IconButton>

          <IconButton
            handleClick={goNext}
            ariaLabel="Next image"
            className={`${styles.navButton} ${styles.navButtonRight}`}
          >
            <ArrowRightIcon iconStyle={styles.buttonIcon} />
          </IconButton>
        </>
      )}

      <div
        className={styles.stage}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.mainCard} onClick={e => e.stopPropagation()}>
          <Image
            src={currentImage}
            alt={`Gallery image ${currentIndex + 1}`}
            fill
            sizes="(max-width: 768px) 92vw, 60vw"
            className={styles.mainImage}
            priority
          />
        </div>
      </div>
    </div>
  );
}
