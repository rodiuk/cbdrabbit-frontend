import React from "react";
import { CartIcon } from "../icons/Cart";

export const CartCounterSkeleton = () => {
  return (
    <div
      style={{
        display: "flex",
        padding: "12px",
        borderRadius: " 24px",
        background: "rgba(255, 255, 255, 0.4)",
        position: "relative",
      }}
    >
      <CartIcon />
    </div>
  );
};
