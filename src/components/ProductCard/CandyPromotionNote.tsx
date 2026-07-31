"use client";

import React from "react";
import { useCandyPromotion } from "@/hooks/useCandyPromotion";

import styles from "./ProductCard.module.css";

interface Props {
  label: string;
}

const CandyPromotionNote = ({ label }: Props): React.JSX.Element | null => {
  const { isActive } = useCandyPromotion();

  return isActive ? <p className={styles.promotion_note}>{label}</p> : null;
};

export default CandyPromotionNote;
