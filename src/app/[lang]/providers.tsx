"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "jotai";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <SessionProvider>
      <Provider>{children}</Provider>
    </SessionProvider>
  );
}
