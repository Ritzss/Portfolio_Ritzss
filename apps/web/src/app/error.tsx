"use client";

import { useEffect } from "react";
import OfflineFallback from "@/components/errors/OfflineFallback";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <OfflineFallback
      title="SYSTEM ERROR"
      message="Something went wrong while loading this page. Try again."
    />
  );
}
