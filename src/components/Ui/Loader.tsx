"use client";

import React, { useEffect } from "react";

interface LoaderProps {
  greenTheme?: boolean;
}

const Loader = ({ greenTheme }: LoaderProps): React.JSX.Element => {
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
      @keyframes l5 {
        0%  {
          box-shadow: 20px 0 ${greenTheme ? "#42623B" : "#bbb"}, -20px 0 ${
      greenTheme ? "#A6C48A" : "#bbb2"
    };
          background: ${greenTheme ? "#42623B" : "#bbb"};
        }
        33% {
          box-shadow: 20px 0 ${greenTheme ? "#A6C48A" : "#bbb"}, -20px 0 ${
      greenTheme ? "#C8E6A8" : "#bbb2"
    };
          background: ${greenTheme ? "#A6C48A" : "#bbb2"};
        }
        66% {
          box-shadow: 20px 0 ${greenTheme ? "#C8E6A8" : "#bbb2"}, -20px 0 ${
      greenTheme ? "#42623B" : "#bbb"
    };
          background: ${greenTheme ? "#C8E6A8" : "#bbb2"};
        }
        100% {
          box-shadow: 20px 0 ${greenTheme ? "#C8E6A8" : "#bbb2"}, -20px 0 ${
      greenTheme ? "#42623B" : "#bbb"
    };
          background: ${greenTheme ? "#42623B" : "#bbb"};
        }
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [greenTheme]);

  return <div style={loaderStyle}></div>;
};

const loaderStyle: React.CSSProperties = {
  width: "12px",
  aspectRatio: "1",
  borderRadius: "50%",
  animation: "l5 1s infinite linear alternate",
  position: "relative",
};

export default Loader;
