"use client";

import WebThreads from "./WebThreads";

export default function SiteBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
     <WebThreads
    colors={["#e66e00","#fe4b00"]}
    coreColor="#FFFFFF"        
    threadCount={10}            
    spread={0.2}
    lightMode={false}
    speed={0.15}
    frequency={5}
    taper={0.15}
    position={0.5}
    pinch={0.5}
    nodes={1}
    angle={0}
    glow={0.012}
    falloff={0.7}
    thickness={1.1}
    brightness={0.6}
    opacity={1}
    depth={0}
    pulses={0.9}
    mirror
    shimmer={false}
    fade={0}
    grain={0.05}
    intro
    mouseInteraction
    mouseStrength={0.5}
    pulseOnClick
    paused={false}
/>
    </div>
  );
}