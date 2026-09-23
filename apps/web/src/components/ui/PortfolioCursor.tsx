/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import TargetCursor from "./TargetCursor";

export default function PortfolioCursor() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <TargetCursor
      spinDuration={2}
      hideDefaultCursor
      parallaxOn
      hoverDuration={0.2}
      cursorColor="#f5f5f5"
      cursorColorOnTarget="#f97316"
    />
  );
}