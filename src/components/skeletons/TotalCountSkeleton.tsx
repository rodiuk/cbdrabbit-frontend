import React from "react";

export const TotalCountSkeleton = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      background: "#f2f2f2",
      borderRadius: "12px",
    }}
  >
    <div
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background: "#e0e0e0",
      }}
    />

    <div
      style={{
        width: "24px",
        height: "32px",
        borderRadius: "4px",
        background: "#e0e0e0",
      }}
    />

    <div
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background: "#e0e0e0",
      }}
    />
  </div>
);
