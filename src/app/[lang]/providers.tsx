"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { createStore, Provider } from "jotai";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [store] = React.useState(() => createStore());
  return (
    <Provider store={store}>
      <SessionProvider>{children}</SessionProvider>
    </Provider>
  );
}
