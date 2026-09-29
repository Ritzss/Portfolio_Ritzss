/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/purity */
"use client";

import { useEffect, useRef, useState } from "react";

type Direction = "left" | "right";
type CharacterState = "idle" | "walk" | "confused" | "run";

interface Position {
  x: number;
  y: number;
}

interface AFKCharacterProps {
  timeout?: number;
}

const DEFAULT_TIMEOUT = 30_000;

const FRAME_DURATION = {
  idle: 500,
  walk: 130,
  confused: 350,
  run: 80,
};

export default function AFKCharacter({
  timeout = DEFAULT_TIMEOUT,
}: AFKCharacterProps) {
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState<Position>({
    x: 50,
    y: 60,
  });
  const [direction, setDirection] = useState<Direction>("right");
  const [state, setState] = useState<CharacterState>("idle");
  const [frame, setFrame] = useState(0);

  const activeRef = useRef(false);
  const positionRef = useRef(position);
  const targetRef = useRef<Position>(createTarget());
  const cursorRef = useRef<Position>({
    x: 50,
    y: 50,
  });
  const runToCursorRef = useRef(false);
  const directionRef = useRef<Direction>("right");
  const stateRef = useRef<CharacterState>("idle");

  const lastActivityRef = useRef(Date.now());
  const lastFrameTimeRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  const pauseUntilRef = useRef(0);
  const confusedUntilRef = useRef(0);
  const wakeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /*
   * ---------------------------------------------------------
   * ACTIVITY / AFK DETECTION
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const handleActivity = (event: Event) => {
      lastActivityRef.current = Date.now();

      if (event instanceof MouseEvent) {
        const cursorPosition = {
          x: (event.clientX / window.innerWidth) * 100,
          y: (event.clientY / window.innerHeight) * 100,
        };

        cursorRef.current = cursorPosition;

        if (activeRef.current) {
          targetRef.current = cursorPosition;
          runToCursorRef.current = true;

          stateRef.current = "run";
          setState("run");
          setFrame(0);
        }
      }

      if (event.type === "touchstart") {
        if (activeRef.current) {
          runToCursorRef.current = false;
          stateRef.current = "run";
          setState("run");
          setFrame(0);
        }
      }
    };

    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
    ] as const;

    events.forEach((event) => {
      window.addEventListener(event, handleActivity, {
        passive: true,
      });
    });

    const timer = window.setInterval(() => {
      if (
        !activeRef.current &&
        Date.now() - lastActivityRef.current >= timeout
      ) {
        activeRef.current = true;

        const startingPosition = {
          x: 10 + Math.random() * 80,
          y: 20 + Math.random() * 65,
        };

        positionRef.current = startingPosition;

        targetRef.current = createTarget();

        setPosition(startingPosition);
        setActive(true);

        stateRef.current = "walk";
        setState("walk");
      }
    }, 1000);

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });

      window.clearInterval(timer);

      if (wakeTimeoutRef.current) {
        clearTimeout(wakeTimeoutRef.current);
      }
    };
  }, [timeout]);

  /*
   * ---------------------------------------------------------
   * CHARACTER MOVEMENT + SPRITE ANIMATION
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (!active) {
      return;
    }

    const animate = (timestamp: number) => {
      if (!activeRef.current) {
        return;
      }

      const currentState = stateRef.current;

      const frameDuration = FRAME_DURATION[currentState];

      if (timestamp - lastFrameTimeRef.current >= frameDuration) {
        lastFrameTimeRef.current = timestamp;

        const maxFrames =
          currentState === "idle"
            ? 2
            : currentState === "walk"
              ? 4
              : currentState === "confused"
                ? 2
                : 4;

        setFrame((current) => (current + 1) % maxFrames);
      }

      /*
       * RUNNING BACK TO THE USER
       */

      if (currentState === "run") {
        const current = positionRef.current;
        const target = cursorRef.current;

        const dx = target.x - current.x;
        const dy = target.y - current.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 2.5) {
          const speed = 0.38;

          const nextPosition = {
            x: current.x + (dx / distance) * speed,
            y: current.y + (dy / distance) * speed,
          };

          positionRef.current = nextPosition;
          setPosition(nextPosition);

          if (Math.abs(dx) > 0.2) {
            const nextDirection = dx > 0 ? "right" : "left";

            if (nextDirection !== directionRef.current) {
              directionRef.current = nextDirection;
              setDirection(nextDirection);
            }
          }
        } else {
          runToCursorRef.current = false;

          stateRef.current = "confused";
          setState("confused");
          setFrame(0);

          confusedUntilRef.current = Date.now() + 900;
        }

        animationRef.current = requestAnimationFrame(animate);

        return;
      }

      /*
       * CONFUSED STATE
       */

      if (currentState === "confused") {
        if (Date.now() > confusedUntilRef.current) {
          stateRef.current = "walk";
          setState("walk");
          targetRef.current = createTarget();
          pauseUntilRef.current = Date.now();
        }

        animationRef.current = requestAnimationFrame(animate);

        return;
      }

      /*
       * PAUSE
       */

      if (Date.now() < pauseUntilRef.current) {
        animationRef.current = requestAnimationFrame(animate);

        return;
      }

      /*
       * WALK
       */

      const current = positionRef.current;
      const target = targetRef.current;

      const dx = target.x - current.x;
      const dy = target.y - current.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      /*
       * Reached destination
       */

      if (distance < 1.5) {
        const confused = Math.random() > 0.55;

        if (confused) {
          stateRef.current = "confused";
          setState("confused");
          setFrame(0);

          confusedUntilRef.current = Date.now() + 700 + Math.random() * 900;
        } else {
          stateRef.current = "idle";
          setState("idle");
          setFrame(0);

          pauseUntilRef.current = Date.now() + 500 + Math.random() * 1000;
        }

        targetRef.current = createTarget();

        animationRef.current = requestAnimationFrame(animate);

        return;
      }

      /*
       * Move toward target
       */

      const speed = 0.08;

      const nextPosition = {
        x: current.x + (dx / distance) * speed,
        y: current.y + (dy / distance) * speed,
      };

      positionRef.current = nextPosition;

      setPosition(nextPosition);

      /*
       * Turn character
       */

      if (Math.abs(dx) > 0.1) {
        const nextDirection = dx > 0 ? "right" : "left";

        if (nextDirection !== directionRef.current) {
          directionRef.current = nextDirection;

          setDirection(nextDirection);
        }
      }

      /*
       * Idle -> walk
       */

      if (stateRef.current === "idle") {
        stateRef.current = "walk";
        setState("walk");
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    lastFrameTimeRef.current = performance.now();

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [active]);

  if (!active) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-190 overflow-hidden">
      <div
        className="absolute"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="relative"
          style={{
            transform: direction === "left" ? "scaleX(-1)" : "scaleX(1)",
          }}
        >
          {state === "confused" && (
            <div
              className="absolute -right-1 -top-5 select-none font-mono text-[15px] font-bold leading-none text-orange-500"
              style={{
                transform: direction === "left" ? "scaleX(-1)" : "scaleX(1)",
              }}
            >
              ?
            </div>
          )}

          <PixelCharacter state={state} frame={frame} />
        </div>
      </div>

      <div className="fixed bottom-5 right-5 rounded-lg border border-white/10 bg-[#050505]/85 px-3 py-2 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" />

          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-zinc-500">
            {state === "confused" ? "LOST" : state === "run" ? "FOUND" : "AFK"}
          </span>
        </div>
      </div>
    </div>
  );
}

/*
 * ---------------------------------------------------------
 * PIXEL CHARACTER
 *
 * 48 × 48 sprite.
 *
 * The character is intentionally small.
 * ---------------------------------------------------------
 */

function PixelCharacter({
  state,
  frame,
}: {
  state: CharacterState;
  frame: number;
}) {
  const walkFrames = [
    <IdleFrame key="0" />,
    <WalkFrameOne key="1" />,
    <WalkFrameTwo key="2" />,
    <WalkFrameThree key="3" />,
  ];

  if (state === "walk") {
    return walkFrames[frame % walkFrames.length];
  }

  if (state === "run") {
    return (
      <div className="scale-110">
        {frame % 2 === 0 ? <RunFrameOne /> : <RunFrameTwo />}
      </div>
    );
  }

  if (state === "confused") {
    return frame % 2 === 0 ? <ConfusedFrameOne /> : <ConfusedFrameTwo />;
  }

  return frame % 2 === 0 ? <IdleFrame /> : <IdleFrameTwo />;
}

/*
 * ---------------------------------------------------------
 * SHARED CHARACTER PARTS
 * ---------------------------------------------------------
 */

function CharacterBase({ children }: { children?: React.ReactNode }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className="block"
    >
      {/* ground shadow */}
      <rect x="12" y="44" width="25" height="2" fill="#000000" opacity="0.45" />

      {children}
    </svg>
  );
}

/*
 * ---------------------------------------------------------
 * IDLE
 * ---------------------------------------------------------
 */

function IdleFrame() {
  return (
    <CharacterBase>
      <Hair />
      <Face />
      <Hoodie />
      <Arms idle />
      <Legs />
    </CharacterBase>
  );
}

function IdleFrameTwo() {
  return (
    <CharacterBase>
      <Hair />
      <Face />
      <Hoodie />
      <Arms idle />
      <Legs />
      <rect x="20" y="42" width="3" height="1" fill="#ffffff" />
    </CharacterBase>
  );
}

/*
 * ---------------------------------------------------------
 * WALKING
 * ---------------------------------------------------------
 */

function WalkFrameOne() {
  return (
    <CharacterBase>
      <Hair />
      <Face />
      <Hoodie />
      <Arms left />
      <Legs left />
    </CharacterBase>
  );
}

function WalkFrameTwo() {
  return (
    <CharacterBase>
      <Hair />
      <Face />
      <Hoodie />
      <Arms idle />
      <Legs />
    </CharacterBase>
  );
}

function WalkFrameThree() {
  return (
    <CharacterBase>
      <Hair />
      <Face />
      <Hoodie />
      <Arms right />
      <Legs right />
    </CharacterBase>
  );
}

/*
 * ---------------------------------------------------------
 * RUNNING
 * ---------------------------------------------------------
 */

function RunFrameOne() {
  return (
    <CharacterBase>
      <Hair />
      <Face />
      <Hoodie />
      <Arms runLeft />
      <RunningLegs left />
    </CharacterBase>
  );
}

function RunFrameTwo() {
  return (
    <CharacterBase>
      <Hair />
      <Face />
      <Hoodie />
      <Arms runRight />
      <RunningLegs right />
    </CharacterBase>
  );
}

/*
 * ---------------------------------------------------------
 * CONFUSED
 * ---------------------------------------------------------
 */

function ConfusedFrameOne() {
  return (
    <CharacterBase>
      <Hair tilted />
      <Face confused />
      <Hoodie />
      <Arms confused />
      <Legs />
    </CharacterBase>
  );
}

function ConfusedFrameTwo() {
  return (
    <CharacterBase>
      <Hair tilted />
      <Face confused />
      <Hoodie />
      <Arms confusedTwo />
      <Legs />
    </CharacterBase>
  );
}

/*
 * ---------------------------------------------------------
 * HAIR
 * ---------------------------------------------------------
 */

function Hair({ tilted = false }: { tilted?: boolean }) {
  return (
    <>
      <rect x="15" y="4" width="18" height="2" fill="#101010" />
      <rect x="13" y="6" width="22" height="3" fill="#151515" />
      <rect x="11" y="9" width="25" height="9" fill="#171717" />
      <rect x="10" y="12" width="4" height="6" fill="#171717" />
      <rect x="34" y="10" width="5" height="8" fill="#171717" />

      <rect x="16" y="6" width="5" height="2" fill="#333333" />
      <rect x="22" y="5" width="4" height="2" fill="#292929" />
      <rect x="28" y="6" width="5" height="2" fill="#303030" />

      <rect x="13" y="9" width="4" height="4" fill="#242424" />
      <rect x="18" y="8" width="4" height="5" fill="#202020" />
      <rect x="24" y="8" width="5" height="5" fill="#202020" />
      <rect x="30" y="9" width="5" height="5" fill="#222222" />

      {tilted && (
        <>
          <rect x="11" y="13" width="3" height="5" fill="#303030" />
          <rect x="32" y="7" width="4" height="4" fill="#353535" />
        </>
      )}
    </>
  );
}

/*
 * ---------------------------------------------------------
 * FACE
 * ---------------------------------------------------------
 */

function Face({ confused = false }: { confused?: boolean }) {
  return (
    <>
      <rect x="15" y="15" width="20" height="10" fill="#e7ad87" />

      <rect x="14" y="17" width="3" height="5" fill="#d99b78" />
      <rect x="33" y="16" width="4" height="6" fill="#d99b78" />

      {/* fringe */}
      <rect x="16" y="13" width="6" height="4" fill="#171717" />
      <rect x="22" y="12" width="6" height="5" fill="#171717" />
      <rect x="28" y="13" width="6" height="4" fill="#171717" />

      {/* eyes */}
      <rect x="19" y="18" width="3" height="2" fill="#0b0b0b" />
      <rect x="28" y="18" width="3" height="2" fill="#0b0b0b" />

      {/* eye highlights */}
      <rect x="20" y="18" width="1" height="1" fill="#ffffff" />
      <rect x="29" y="18" width="1" height="1" fill="#ffffff" />

      {/* nose */}
      <rect x="24" y="20" width="2" height="1" fill="#bd765f" />

      {/* mouth */}
      {confused ? (
        <>
          <rect x="23" y="22" width="2" height="1" fill="#71352e" />
          <rect x="26" y="22" width="2" height="1" fill="#71352e" />
        </>
      ) : (
        <rect x="24" y="22" width="4" height="1" fill="#71352e" />
      )}
    </>
  );
}

/*
 * ---------------------------------------------------------
 * HOODIE
 * ---------------------------------------------------------
 */

function Hoodie() {
  return (
    <>
      {/* neck */}
      <rect x="22" y="24" width="7" height="4" fill="#d49a79" />

      {/* dark hoodie silhouette */}
      <rect x="15" y="27" width="20" height="13" fill="#c94e09" />

      {/* main orange fabric */}
      <rect x="18" y="27" width="15" height="12" fill="#f97316" />

      {/* highlight */}
      <rect x="20" y="28" width="6" height="9" fill="#ff812d" />

      {/* left sleeve */}
      <rect x="13" y="29" width="6" height="9" fill="#dc5b0b" />
      <rect x="11" y="31" width="4" height="6" fill="#c94e09" />

      {/* right sleeve */}
      <rect x="31" y="29" width="6" height="9" fill="#dc5b0b" />
      <rect x="35" y="31" width="4" height="6" fill="#c94e09" />

      {/* zipper */}
      <rect x="26" y="28" width="2" height="10" fill="#9e3908" />

      {/* zipper highlight */}
      <rect x="26" y="29" width="1" height="8" fill="#ffad63" />

      {/* hoodie pocket */}
      <rect x="21" y="34" width="9" height="3" fill="#c94e09" />
      <rect x="22" y="34" width="7" height="1" fill="#e86614" />

      {/* backpack */}
      <rect x="33" y="27" width="5" height="11" fill="#42190d" />
      <rect x="35" y="29" width="3" height="7" fill="#612410" />
      <rect x="36" y="30" width="1" height="4" fill="#8a3211" />

      {/* hoodie strings */}
      <rect x="22" y="28" width="1" height="5" fill="#f5d1ad" />
      <rect x="30" y="28" width="1" height="5" fill="#f5d1ad" />

      <rect x="21" y="32" width="3" height="1" fill="#f5d1ad" />
      <rect x="29" y="32" width="3" height="1" fill="#f5d1ad" />
    </>
  );
}

/*
 * ---------------------------------------------------------
 * ARMS
 * ---------------------------------------------------------
 */

function Arms({
  idle = false,
  left = false,
  right = false,
  runLeft = false,
  runRight = false,
  confused = false,
  confusedTwo = false,
}: {
  idle?: boolean;
  left?: boolean;
  right?: boolean;
  runLeft?: boolean;
  runRight?: boolean;
  confused?: boolean;
  confusedTwo?: boolean;
}) {
  if (runLeft) {
    return (
      <>
        <rect x="11" y="27" width="5" height="3" fill="#f97316" />

        <rect x="8" y="26" width="5" height="3" fill="#e8b18e" />

        <rect x="34" y="33" width="5" height="3" fill="#f97316" />

        <rect x="38" y="35" width="3" height="3" fill="#e8b18e" />
      </>
    );
  }

  if (runRight) {
    return (
      <>
        <rect x="10" y="34" width="5" height="3" fill="#f97316" />

        <rect x="7" y="36" width="5" height="3" fill="#e8b18e" />

        <rect x="34" y="27" width="5" height="3" fill="#f97316" />

        <rect x="38" y="25" width="4" height="3" fill="#e8b18e" />
      </>
    );
  }

  if (confused || confusedTwo) {
    return (
      <>
        <rect x="10" y="28" width="6" height="3" fill="#f97316" />

        <rect x="8" y="25" width="4" height="4" fill="#e8b18e" />

        <rect x="33" y="28" width="6" height="3" fill="#f97316" />

        <rect x="38" y="25" width="4" height="4" fill="#e8b18e" />
      </>
    );
  }

  if (left) {
    return (
      <>
        <rect x="11" y="30" width="5" height="3" fill="#f97316" />

        <rect x="9" y="34" width="4" height="5" fill="#e8b18e" />

        <rect x="34" y="29" width="5" height="3" fill="#f97316" />

        <rect x="37" y="32" width="4" height="5" fill="#e8b18e" />
      </>
    );
  }

  if (right) {
    return (
      <>
        <rect x="10" y="29" width="5" height="3" fill="#f97316" />

        <rect x="7" y="31" width="4" height="5" fill="#e8b18e" />

        <rect x="34" y="31" width="5" height="3" fill="#f97316" />

        <rect x="38" y="35" width="4" height="5" fill="#e8b18e" />
      </>
    );
  }

  if (idle) {
    return (
      <>
        <rect x="11" y="30" width="5" height="9" fill="#e8b18e" />

        <rect x="34" y="30" width="5" height="9" fill="#e8b18e" />

        <rect x="13" y="29" width="4" height="7" fill="#f97316" />

        <rect x="33" y="29" width="4" height="7" fill="#f97316" />
      </>
    );
  }

  return null;
}

/*
 * ---------------------------------------------------------
 * LEGS
 * ---------------------------------------------------------
 */

function Legs({
  left = false,
  right = false,
}: {
  left?: boolean;
  right?: boolean;
}) {
  if (left) {
    return (
      <>
        <rect x="18" y="38" width="6" height="7" fill="#242424" />
        <rect x="28" y="38" width="6" height="5" fill="#242424" />

        <rect x="17" y="42" width="7" height="3" fill="#303030" />
        <rect x="28" y="41" width="7" height="3" fill="#303030" />

        <rect x="14" y="44" width="11" height="3" fill="#eeeeee" />
        <rect x="27" y="42" width="10" height="3" fill="#eeeeee" />

        <rect x="16" y="44" width="4" height="1" fill="#f97316" />
        <rect x="29" y="42" width="4" height="1" fill="#f97316" />
      </>
    );
  }

  if (right) {
    return (
      <>
        <rect x="17" y="38" width="6" height="5" fill="#242424" />
        <rect x="27" y="38" width="6" height="7" fill="#242424" />

        <rect x="16" y="40" width="7" height="3" fill="#303030" />
        <rect x="27" y="42" width="7" height="3" fill="#303030" />

        <rect x="15" y="41" width="10" height="3" fill="#eeeeee" />
        <rect x="27" y="44" width="11" height="3" fill="#eeeeee" />

        <rect x="17" y="41" width="4" height="1" fill="#f97316" />
        <rect x="29" y="44" width="4" height="1" fill="#f97316" />
      </>
    );
  }

  return (
    <>
      <rect x="18" y="38" width="6" height="7" fill="#242424" />
      <rect x="27" y="38" width="6" height="7" fill="#242424" />

      <rect x="19" y="39" width="4" height="5" fill="#303030" />
      <rect x="28" y="39" width="4" height="5" fill="#303030" />

      <rect x="15" y="44" width="11" height="3" fill="#eeeeee" />
      <rect x="26" y="44" width="11" height="3" fill="#eeeeee" />

      <rect x="17" y="44" width="4" height="1" fill="#f97316" />
      <rect x="28" y="44" width="4" height="1" fill="#f97316" />
    </>
  );
}

function RunningLegs({
  left = false,
  right = false,
}: {
  left?: boolean;
  right?: boolean;
}) {
  return <Legs left={left} right={right} />;
}

/*
 * ---------------------------------------------------------
 * TARGET
 * ---------------------------------------------------------
 */

function createTarget(): Position {
  return {
    x: 8 + Math.random() * 84,
    y: 18 + Math.random() * 65,
  };
}
