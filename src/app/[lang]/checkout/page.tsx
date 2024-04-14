"use client";

import React from "react";
import useMedia from "@/hooks/useMedia";
import Tablet from "./Tablet";

import cn from "clsx";
import styles from "./page.module.css";

import NoTablet from "./NoTablet";

export default function Checkout() {
  const isTablet = useMedia(769);

  return (
    <main className={cn("container", styles.main)}>
      <div className={styles.checoutPage}>
        <div className={styles.checkoutBlocks}>
          {isTablet ? <Tablet /> : <NoTablet />}
        </div>
      </div>
    </main>
  );
}
