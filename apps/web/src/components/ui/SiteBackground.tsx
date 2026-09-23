"use client";

import WebThreads from "./WebThreads";

export default function SiteBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <WebThreads
        color1="#fe4b00"
        color2="#e66e00"
        color3="#FFFFFF"
        speed={0.12}
        threadCount={6}
        frequency={5}
        spread={0.18}
        taper={1}
        position={0.5}
        fanMode="center"
        glow={0.02}
        falloff={0.6}
        thickness={1.1}
        brightness={0.45}
        opacity={0.65}
        mirror
        shimmer={false}
        grain
        grainIntensity={0.035}
        mouseInteraction
        mouseStrength={0.2}
      />
    </div>
  );
}