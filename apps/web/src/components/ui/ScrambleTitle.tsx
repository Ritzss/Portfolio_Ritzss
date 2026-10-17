/* eslint-disable prefer-const */
"use client";

import { useEffect, useState } from "react";

type ScrambleTitleProps = {
  from?: string;
  to?: string;
  duration?: number;
  delay?: number;
  className?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: number;
};

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

export default function ScrambleTitle({
  from = "PORTFOLIO",
  to = "Ritanshu Babuta",
  duration = 4000,
  delay = 1000,
  className = "",
  color = "#F97316",
  fontSize = "clamp(2.5rem, 12vw, 220px)",
}: ScrambleTitleProps) {
  const [text, setText] = useState(from);

  useEffect(() => {
    let frame = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const startAnimation = () => {
      const startTime = performance.now();
      const maxLength = Math.max(from.length, to.length);

      const animate = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const revealed = Math.floor(progress * maxLength);

        const nextText = Array.from({ length: maxLength }, (_, index) => {
          if (index < revealed) return to[index] ?? "";
          if (to[index] === " ") return " ";
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("");

        setText(nextText);

        if (progress < 1) {
          frame = requestAnimationFrame(animate);
        } else {
          setText(to);
        }
      };

      frame = requestAnimationFrame(animate);
    };

    timeout = setTimeout(startAnimation, delay);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, [from, to, duration, delay]);

  return (
  <div className={`relative inline-block max-w-full -rotate-3 ${className}`}>
    <div
      className="whitespace-nowrap font-semibold leading-none tracking-[-0.035em]"
      style={{
        color,
        fontSize,
      }}
      aria-label={to}
    >
      {text}
    </div>
  </div>
);
}