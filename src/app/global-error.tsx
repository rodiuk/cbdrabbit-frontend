"use client";

import ErrorPage from "@/components/ErrorPage/ErrorPage";

export default function GlobalError(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorPage handleReset={() => props?.reset()} />;
}
