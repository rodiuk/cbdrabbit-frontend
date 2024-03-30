"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <SessionProvider>{children}</SessionProvider>;
}
