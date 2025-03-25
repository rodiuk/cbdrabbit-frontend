"use client";

import ErrorPage from "@/components/ErrorPage/ErrorPage";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <ErrorPage />
        {/* <button onClick={() => reset()}>Try again</button> */}
      </body>
    </html>
  );
}
