import React from "react";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";

export const Scripts = (): React.JSX.Element => {
  return (
    <div id="next_app_scripts">
      <GoogleTagManager gtmId="GTM-XXXXXX" />
      <Script
        id="hotjar"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:!!!!CODE!!!!,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
        }}
      />
    </div>
  );
};
