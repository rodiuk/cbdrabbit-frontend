import React from "react";

export const CurrentPriceSkeleton = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "4px",
      width: "55px",
      // background: "#f2f2f2",
      borderRadius: "12px",

      fontSize: "24px",
      fontWeight: "400",
      lineHeight: "36px",
      color: "rgb(66, 98, 59)",
    }}
  >
    $$<span style={{ fontWeight: 600 }}>₴</span>
  </div>
);
