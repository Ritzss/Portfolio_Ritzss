/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  FiPause,
  FiPlay,
  FiSkipForward,
  FiVolume2,
  FiVolumeX,
} from "react-icons/fi";

const TRACKS = [
  { title: "Die For You", mood: "NEON AFTERDARK", src: "/music/fav.mp3" },
  { title: "Die For You", mood: "NEON AFTERDARK", src: "/music/fav.mp3" },
  { title: "Die For You", mood: "NEON AFTERDARK", src: "/music/fav.mp3" },
  { title: "Die For You", mood: "NEON AFTERDARK", src: "/music/fav.mp3" },
  { title: "Die For You", mood: "NEON AFTERDARK", src: "/music/fav.mp3" },
] as const;

type RadioContextValue = {
  track: (typeof TRACKS)[number];
  isPlaying: boolean;
  isMuted: boolean;
  unavailable: boolean;
  togglePlayback: () => void;
  toggleMute: () => void;
  nextTrack: () => void;
  analyser: AnalyserNode | null;
};

const RadioContext = createContext<RadioContextValue | null>(null);
const LAST_TRACK_KEY = "portfolio-radio:last-track";
const MUTED_KEY = "portfolio-radio:muted";

let sharedAudioContext: AudioContext | null = null;

const audioSources = new WeakMap<
  HTMLAudioElement,
  MediaElementAudioSourceNode
>();

const audioAnalysers = new WeakMap<HTMLAudioElement, AnalyserNode>();

function randomTrack(exclude: number) {
  const choices = TRACKS.map((_, index) => index).filter(
    (index) => index !== exclude,
  );
  return choices[Math.floor(Math.random() * choices.length)] ?? 0;
}

export function PortfolioRadioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playingRef = useRef(false);
  const resumeRef = useRef(false);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [ready, setReady] = useState(false);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const track = TRACKS[index] ?? TRACKS[0];

  const play = useCallback(async () => {
  const audio = audioRef.current;
  if (!audio) return;

  try {
    let context = audioContextRef.current;
    let source = audioSources.get(audio);
    let audioAnalyser = audioAnalysers.get(audio);

    if (!context) {
      context = sharedAudioContext ?? new AudioContext();
      sharedAudioContext = context;
      audioContextRef.current = context;
    }

    if (!source) {
      source = context.createMediaElementSource(audio);
      audioSources.set(audio, source);
    }

    if (!audioAnalyser) {
      audioAnalyser = context.createAnalyser();
      audioAnalyser.fftSize = 256;
      audioAnalyser.smoothingTimeConstant = 0.7;
      audioAnalysers.set(audio, audioAnalyser);

      source.connect(audioAnalyser);
      audioAnalyser.connect(context.destination);
    }

    setAnalyser(audioAnalyser);

    if (context.state !== "running") {
      await context.resume();
    }

    await audio.play();
    playingRef.current = true;
    setIsPlaying(true);
  } catch (error) {
    console.error("Portfolio Radio playback failed:", error);
    playingRef.current = false;
    setIsPlaying(false);
  }
}, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    playingRef.current = false;
    setIsPlaying(false);
  }, []);

  const nextTrack = useCallback(() => {
    resumeRef.current = playingRef.current;
    setIndex((current) => {
      const next = randomTrack(current);
      try {
        localStorage.setItem(LAST_TRACK_KEY, String(next));
      } catch {}
      return next;
    });
    setUnavailable(false);
  }, []);

  const togglePlayback = useCallback(() => {
    if (playingRef.current) pause();
    else void play();
  }, [pause, play]);

  const toggleMute = useCallback(() => {
    setIsMuted((current) => {
      const next = !current;
      try {
        localStorage.setItem(MUTED_KEY, next ? "1" : "0");
      } catch {}
      return next;
    });
  }, []);

  useEffect(() => {
    let previous = -1;

    try {
      previous = Number(localStorage.getItem(LAST_TRACK_KEY));
      const savedMute = localStorage.getItem(MUTED_KEY);
      if (savedMute !== null) setIsMuted(savedMute === "1");
    } catch {}

    const selected =
      Number.isInteger(previous) && previous >= 0 && previous < TRACKS.length
        ? randomTrack(previous)
        : Math.floor(Math.random() * TRACKS.length);

    setIndex(selected);
    try {
      localStorage.setItem(LAST_TRACK_KEY, String(selected));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !ready) return;

    audio.load();

    if (resumeRef.current) {
      resumeRef.current = false;
      void play();
    }
  }, [index, ready, play]);

  useEffect(() => {
    const onFirstInteraction = (event: Event) => {
      const target = event.target;
      if (target instanceof Element && target.closest("[data-radio-controls]"))
        return;

      if (!playingRef.current) void play();
    };

    window.addEventListener("pointerdown", onFirstInteraction, {
      once: true,
      capture: true,
    });
    window.addEventListener("keydown", onFirstInteraction, {
      once: true,
      capture: true,
    });
    window.addEventListener("touchstart", onFirstInteraction, {
      once: true,
      capture: true,
      passive: true,
    });

    return () => {
      window.removeEventListener("pointerdown", onFirstInteraction, true);
      window.removeEventListener("keydown", onFirstInteraction, true);
      window.removeEventListener("touchstart", onFirstInteraction, true);
    };
  }, [play]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const context = sharedAudioContext ?? new AudioContext();
    sharedAudioContext = context;

    let source = audioSources.get(audio);
    let audioAnalyser = audioAnalysers.get(audio);

    if (!source) {
      source = context.createMediaElementSource(audio);
      audioSources.set(audio, source);
    }

    if (!audioAnalyser) {
      audioAnalyser = context.createAnalyser();
      audioAnalyser.fftSize = 256;
      audioAnalyser.smoothingTimeConstant = 0.82;
      audioAnalysers.set(audio, audioAnalyser);

      source.connect(audioAnalyser);
      audioAnalyser.connect(context.destination);
    }

    audioContextRef.current = context;
    setAnalyser(audioAnalyser);

    return () => {
      setAnalyser(null);
      // Do not close the shared context or disconnect the source here.
      // React Strict Mode may immediately run this effect again.
    };
  }, []);

  return (
    <RadioContext.Provider
      value={{
        track,
        isPlaying,
        isMuted,
        unavailable,
        analyser,
        togglePlayback,
        toggleMute,
        nextTrack,
      }}
    >
      <audio
        ref={audioRef}
        src={track.src}
        preload="auto"
        onCanPlay={() => setUnavailable(false)}
        onError={() => {
          setUnavailable(true);
          playingRef.current = false;
          setIsPlaying(false);
        }}
        onEnded={nextTrack}
      />
      {children}
    </RadioContext.Provider>
  );
}

export function PortfolioRadioPlayer() {
  const radio = useContext(RadioContext);
  if (!radio)
    throw new Error(
      "PortfolioRadioPlayer must be inside PortfolioRadioProvider",
    );

  const {
    track,
    isPlaying,
    isMuted,
    unavailable,
    togglePlayback,
    toggleMute,
    nextTrack,
  } = radio;

  return (
    <div
      data-radio-controls
      className="relative isolate mx-auto mt-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-orange-500/20 bg-[#090909] text-white shadow-[0_0_80px_rgba(249,115,22,0.10)]"
    >
      {/* Ambient visualizer background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(249,115,22,0.22),transparent_65%)]" />
        <div className="radio-ambient-glow absolute inset-x-0 bottom-0 h-2/3 opacity-80" />
        <div className="radio-background-wave absolute inset-x-0 bottom-8 flex h-32 items-end justify-center gap-[3px] px-3 sm:gap-1">
          {Array.from({ length: 64 }, (_, i) => {
            const height =
              8 +
              Math.abs(Math.sin(i * 0.43)) * 35 +
              Math.abs(Math.sin(i * 0.17 + 1)) * 45;

            return (
              <span
                key={i}
                className="radio-background-bar"
                style={{
                  height: `${height}%`,
                  opacity: 0.25 + (height / 100) * 0.7,
                  animationDelay: `${(i % 11) * -0.13}s`,
                  animationDuration: `${0.7 + (i % 7) * 0.16}s`,
                }}
              />
            );
          })}
        </div>
        <div className="radio-particles absolute inset-x-0 bottom-0 h-1/2" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/35 to-[#080808]/75" />
      </div>

      {/* Track information */}
      <div className="relative flex min-h-52 flex-col justify-between p-5 sm:min-h-60 sm:p-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${isPlaying ? "animate-pulse bg-orange-400" : "bg-zinc-600"}`}
            />
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-orange-400">
              Portfolio Radio
            </span>
          </div>
          <span className="font-mono text-[9px] tracking-widest text-white/40">
            LIVE SOUNDTRACK
          </span>
        </div>

        <div className="relative mt-10">
          <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {track.title}
          </p>
          <p className="mt-2 font-mono text-[10px] tracking-[0.25em] text-orange-300/80">
            {unavailable ? "AUDIO FILE UNAVAILABLE" : track.mood}
          </p>
        </div>

        {/* Minimal controls */}
        <div className="relative mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={isPlaying ? "Pause soundtrack" : "Play soundtrack"}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-500 text-black transition hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
          >
            {isPlaying ? <FiPause size={17} /> : <FiPlay size={17} />}
          </button>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-white/90">
              {isPlaying ? "Now playing" : "Your soundtrack"}
            </p>
            <p className="mt-1 truncate text-[10px] text-white/45">
              {unavailable
                ? "Check the audio file path"
                : "An atmosphere of your own"}
            </p>
          </div>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute soundtrack" : "Mute soundtrack"}
            aria-pressed={isMuted}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-orange-400/50 hover:text-orange-300"
          >
            {isMuted ? <FiVolumeX size={17} /> : <FiVolume2 size={17} />}
          </button>

          <button
            type="button"
            onClick={nextTrack}
            aria-label="Skip to next track"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-orange-400/50 hover:text-orange-300"
          >
            <FiSkipForward size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function usePortfolioRadio() {
  const context = useContext(RadioContext);

  if (!context) {
    throw new Error(
      "usePortfolioRadio must be used within PortfolioRadioProvider",
    );
  }

  return context;
}

export function usePortfolioRadioAnalyser() {
  return useContext(RadioContext)?.analyser ?? null;
}
