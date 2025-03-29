"use client";

import ErrorPage from "@/components/ErrorPage/ErrorPage";

export default function GlobalError(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log("Global error", props?.error);
  return <ErrorPage handleReset={() => props?.reset()} />;
}
