import React from "react";
import { GoogleTagManager } from "@next/third-parties/google";

export const Scripts = (): React.JSX.Element => {
  return (
    <div id="next_app_scripts">
      <GoogleTagManager gtmId="GTM-XXXXXX" />
    </div>
  );
};
