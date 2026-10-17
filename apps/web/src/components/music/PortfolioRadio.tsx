"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";
import { FiPause, FiPlay, FiRadio, FiSkipForward, FiVolume2, FiVolumeX } from "react-icons/fi";

const TRACKS = [
  { title: "Track 01", mood: "DEEP SPACE", src: "/music/REPLACE_WITH_TRACK_01.mp3" },
  { title: "Track 02", mood: "NIGHT DRIVE", src: "/music/REPLACE_WITH_TRACK_02.mp3" },
  { title: "Track 03", mood: "SOFT SIGNAL", src: "/music/REPLACE_WITH_TRACK_03.mp3" },
  { title: "Track 04", mood: "DIGITAL DUSK", src: "/music/REPLACE_WITH_TRACK_04.mp3" },
  { title: "Track 05", mood: "LAST LIGHT", src: "/music/REPLACE_WITH_TRACK_05.mp3" },
] as const;

const LAST_TRACK_KEY = "portfolio-radio:last-track";
const MUTED_KEY = "portfolio-radio:muted";

type Track = (typeof TRACKS)[number];

type RadioContextValue = {
  track: Track;
  isPlaying: boolean;
  isMuted: boolean;
  audioUnavailable: boolean;
  togglePlayback: () => void;
  toggleMute: () => void;
  nextTrack: () => void;
};

const RadioContext = createContext<RadioContextValue | null>(null);

function randomTrack(exclude: number): number {
  const candidates = TRACKS.map((_, index) => index).filter((index) => index !== exclude);
  return candidates[Math.floor(Math.random() * candidates.length)] ?? 0;
}

export function PortfolioRadioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const startedRef = useRef(false);
  const playingRef = useRef(false);
  const resumeAfterChangeRef = useRef(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioUnavailable, setAudioUnavailable] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const track = TRACKS[trackIndex] ?? TRACKS[0];

  const startPlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      startedRef.current = true;
      playingRef.current = true;
      setIsPlaying(true);
    } catch {
      playingRef.current = false;
      setIsPlaying(false);
    }
  }, []);

  const pausePlayback = useCallback(() => {
    audioRef.current?.pause();
    playingRef.current = false;
    setIsPlaying(false);
  }, []);

  const nextTrack = useCallback(() => {
    resumeAfterChangeRef.current = playingRef.current;
    setTrackIndex((current) => {
      const next = randomTrack(current);
      try {
        window.localStorage.setItem(LAST_TRACK_KEY, String(next));
      } catch {
        // Storage can be unavailable in private browsing; playback still works.
      }
      return next;
    });
    setAudioUnavailable(false);
  }, []);

  const togglePlayback = useCallback(() => {
    if (playingRef.current) {
      pausePlayback();
      return;
    }
    void startPlayback();
  }, [pausePlayback, startPlayback]);

  const toggleMute = useCallback(() => {
    setIsMuted((current) => {
      const next = !current;
      try {
        window.localStorage.setItem(MUTED_KEY, next ? "1" : "0");
      } catch {
        // Keep the in-memory preference if storage is unavailable.
      }
      return next;
    });
  }, []);

  useEffect(() => {
    let previous = -1;
    try {
      previous = Number(window.localStorage.getItem(LAST_TRACK_KEY));
      const savedMute = window.localStorage.getItem(MUTED_KEY);
      if (savedMute !== null) setIsMuted(savedMute === "1");
    } catch {
      // Random selection works without storage.
    }

    const selected = Number.isInteger(previous) && previous >= 0 && previous < TRACKS.length
      ? randomTrack(previous)
      : Math.floor(Math.random() * TRACKS.length);

    setTrackIndex(selected);
    try {
      window.localStorage.setItem(LAST_TRACK_KEY, String(selected));
    } catch {
      // Storage is optional.
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !initialized) return;

    audio.load();
    if (resumeAfterChangeRef.current) {
      resumeAfterChangeRef.current = false;
      void startPlayback();
    }
  }, [trackIndex, initialized, startPlayback]);

  useEffect(() => {
    function removeListeners() {
      window.removeEventListener("pointerdown", handleFirstInteraction, true);
      window.removeEventListener("keydown", handleFirstInteraction, true);
      window.removeEventListener("touchstart", handleFirstInteraction, true);
      window.removeEventListener("wheel", handleFirstInteraction, true);
    }

    function handleFirstInteraction(event: Event) {
      if (startedRef.current) {
        removeListeners();
        return;
      }

      const target = event.target;
      if (target instanceof Element && target.closest("[data-portfolio-radio-control]")) return;

      void startPlayback().then(() => {
        if (playingRef.current) removeListeners();
      });
    }

    window.addEventListener("pointerdown", handleFirstInteraction, true);
    window.addEventListener("keydown", handleFirstInteraction, true);
    window.addEventListener("touchstart", handleFirstInteraction, { capture: true, passive: true });
    window.addEventListener("wheel", handleFirstInteraction, { capture: true, passive: true });

    return removeListeners;
  }, [startPlayback]);

  const value = useMemo<RadioContextValue>(() => ({
    track,
    isPlaying,
    isMuted,
    audioUnavailable,
    togglePlayback,
    toggleMute,
    nextTrack,
  }), [track, isPlaying, isMuted, audioUnavailable, togglePlayback, toggleMute, nextTrack]);

  return (
    <RadioContext.Provider value={value}>
      <audio
        ref={audioRef}
        src={track.src}
        preload="none"
        onCanPlay={() => setAudioUnavailable(false)}
        onError={() => {
          setAudioUnavailable(true);
          playingRef.current = false;
          setIsPlaying(false);
        }}
        onEnded={() => nextTrack()}
      />
      {children}
    </RadioContext.Provider>
  );
}

export function PortfolioRadioPlayer() {
  const radio = useContext(RadioContext);
  if (!radio) throw new Error("PortfolioRadioPlayer must be rendered inside PortfolioRadioProvider");

  const { track, isPlaying, isMuted, audioUnavailable, togglePlayback, toggleMute, nextTrack } = radio;

  return (
    <div data-portfolio-radio-control className="radio-player relative mx-auto mt-10 w-full max-w-md overflow-hidden rounded-2xl border border-orange-500/20 bg-[#090909]/80 px-4 py-4 text-left shadow-[0_0_70px_rgba(249,115,22,0.08)] backdrop-blur-xl sm:mt-12">
      <div aria-hidden="true" className="radio-player-glow pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="relative flex items-center gap-3">
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-orange-500/25 bg-orange-500/10 text-orange-400">
          <FiRadio size={19} aria-hidden="true" />
          <span aria-hidden="true" className={"radio-status-dot absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-[#090909] " + (isPlaying ? "bg-orange-400" : "bg-zinc-600")} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-orange-400">Portfolio Radio</p>
            <span className="h-px flex-1 bg-orange-500/20" />
            <span className="font-mono text-[9px] text-zinc-600">05 TRACKS</span>
          </div>
          <p className="mt-1 truncate text-sm font-medium text-zinc-100">{track.title}</p>
          <p className="mt-0.5 truncate font-mono text-[9px] tracking-[0.16em] text-zinc-500">{audioUnavailable ? "ADD AUDIO FILES TO /PUBLIC/MUSIC" : track.mood}</p>
        </div>

        <div aria-hidden="true" className={"radio-equalizer flex h-8 items-center gap-0.5 " + (isPlaying ? "is-playing" : "")}>
          {[0, 1, 2, 3, 4].map((bar) => <span key={bar} className="radio-equalizer-bar" style={{ "--bar-index": bar } as CSSProperties} />)}
        </div>
      </div>

      <div className="relative mt-4 flex items-center gap-2 border-t border-white/[0.06] pt-3">
        <button type="button" onClick={togglePlayback} aria-label={isPlaying ? "Pause soundtrack" : "Play soundtrack"} className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-black transition-colors hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400">
          {isPlaying ? <FiPause size={15} aria-hidden="true" /> : <FiPlay size={15} aria-hidden="true" />}
        </button>
        <span className="flex-1 font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-500">{isPlaying ? "Soundscape active" : "Awaiting interaction"}</span>
        <button type="button" onClick={toggleMute} aria-label={isMuted ? "Unmute soundtrack" : "Mute soundtrack"} aria-pressed={isMuted} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:border-orange-500/40 hover:text-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400">
          {isMuted ? <FiVolumeX size={15} aria-hidden="true" /> : <FiVolume2 size={15} aria-hidden="true" />}
        </button>
        <button type="button" onClick={nextTrack} aria-label="Play next random track" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:border-orange-500/40 hover:text-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400">
          <FiSkipForward size={15} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
