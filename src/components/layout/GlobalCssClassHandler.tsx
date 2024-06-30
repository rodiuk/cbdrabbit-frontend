"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

const classMap: Record<string, string> = {
  "/": "test1",
  "/signIn": "test2",
};

export const GlobalCssClassHandler = () => {
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    const html = document.documentElement;
    const className = classMap[pathname];

    html.className = "";

    if (className) {
      html.classList.add(className);
    }
  }, [pathname, router]);

  return <></>;
};
