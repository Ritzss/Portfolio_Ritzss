import { profile } from "@portfolio/content";
import Link from "next/link";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiHtml5,
  SiCss,
} from "react-icons/si";

const floatingItems = [
  {
    icon: SiReact,
    label: "React",
    className: "left-[7%] top-[38%] -rotate-12 text-[#61DAFB]",
  },
  {
    icon: SiNextdotjs,
    label: "Next.js",
    className: "left-[29%] top-[17%] rotate-12 text-white",
  },
  {
    icon: SiTypescript,
    label: "TypeScript",
    className: "right-[24%] top-[18%] -rotate-6 text-[#3178C6]",
  },
  {
    icon: SiJavascript,
    label: "JavaScript",
    className: "right-[7%] top-[43%] rotate-12 text-[#F7DF1E]",
  },
  {
    icon: SiNodedotjs,
    label: "Node.js",
    className: "left-[5%] bottom-[24%] rotate-6 text-[#68A063]",
  },
  {
    icon: SiMongodb,
    label: "MongoDB",
    className: "right-[7%] bottom-[23%] -rotate-12 text-[#47A248]",
  },
  {
    icon: SiExpress,
    label: "Express",
    className: "left-[22%] bottom-[16%] rotate-12 text-zinc-300",
  },
  {
    icon: SiTailwindcss,
    label: "Tailwind CSS",
    className: "right-[25%] bottom-[15%] -rotate-6 text-[#38BDF8]",
  },
  {
    icon: SiGit,
    label: "Git",
    className: "left-[15%] top-[23%] rotate-12 text-[#F05032]",
  },
  {
    icon: SiGithub,
    label: "GitHub",
    className: "right-[17%] top-[26%] -rotate-12 text-zinc-200",
  },
  {
    icon: SiHtml5,
    label: "HTML5",
    className: "left-[11%] bottom-[37%] -rotate-6 text-[#E34F26]",
  },
  {
    icon: SiCss,
    label: "CSS3",
    className: "right-[12%] bottom-[38%] rotate-6 text-[#1572B6]",
  },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden px-6"
    >
      {/* Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: `
            radial-gradient(
              circle at 20% 20%,
              rgba(255,255,255,0.08),
              transparent 25%
            ),
            radial-gradient(
              circle at 80% 70%,
              rgba(194,65,12,0.08),
              transparent 30%
            ),
            repeating-linear-gradient(
              115deg,
              transparent 0px,
              transparent 3px,
              rgba(255,255,255,0.025) 4px,
              transparent 5px
            )
          `,
        }}
      />

      {/* Ambient orange glow */}
      <div
        aria-hidden="true"
        className=" pointer-events-none absolute left-1/2 top-1/2 h-137.5 w-225 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C2410C]/10 blur-[140px]"
      />

      {/* Floating skill icons */}
      {floatingItems.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            aria-hidden="true"
            title={item.label}
            className={` absolute hidden sm:block ${item.className} transition-all duration-500 hover:scale-125 hover:rotate-0`}
          >
            <div className=" flex h-12 w-12 items-center justify-center rounded-xl border border-white/8 bg-white/2.5 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-500 hover:border-[#F97316]/40 hover:bg-[#C2410C]/10">
              <Icon className="text-2xl" />
            </div>
          </div>
        );
      })}

      {/* Left annotation */}
      <div className="absolute left-[7%] top-[27%] z-10 hidden max-w-47.5 md:block">
        <div className="mb-4 h-px w-16 bg-[#F97316]" />

        <p className="font-mono text-xs leading-6 text-zinc-500">
          Full Stack Developer
          <br />
          Problem Solver
          <br />
          Lifelong Learner
        </p>

        <svg
          aria-hidden="true"
          className="absolute -left-12 top-16 h-24 w-24 text-zinc-700"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path
            d="M75 15C40 20 20 45 35 75"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <path d="M30 65L35 78L47 70" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Right annotation */}
      <div className="absolute right-[6%] top-[27%] z-10 hidden max-w-55 text-right lg:block">
        <p className="font-serif text-sm italic leading-6 text-zinc-500">
          Turning ideas
          <br />
          into real products
        </p>

        <div className="ml-auto mt-3 h-px w-12 bg-[#F97316]" />
      </div>

      {/* Main content */}
      <div className="relative z-20 mx-auto flex min-h-[calc(100vh-90px)] max-w-350 items-center justify-center">
        <div className="relative w-full text-center">
          {/* Role */}
          <p className="mb-5 text-[10px] uppercase tracking-[0.5em] text-zinc-600 sm:text-xs">
            {profile.role}
          </p>

          {/* Main title */}
          <h1 className=" select-none text-[18vw] font-black uppercase leading-[0.72] tracking-[-0.075em] text-[#F5F0E8] sm:text-[17vw] md:text-[15vw] lg:text-[14vw]">
            PORTFOLIO
          </h1>

          {/* Name */}
          <div className=" relative z-20 mt-[-1vw] -rotate-3 font-['Brush_Script_MT','Segoe_Script','cursive'] text-[13vw] leading-none tracking-[-0.04em] text-[#F97316] drop-shadow-[0_10px_30px_rgba(194,65,12,0.2)] sm:text-[11vw] md:text-[9vw] lg:text-[8vw]">
            Ritanshu Babuta
            <div className="mx-auto mt-1 h-0.75 w-[58%] -rotate-2 rounded-full bg-[#F97316] sm:h-1" />
          </div>

          {/* Description */}
          <div className="relative z-30 mt-8">
            <p className="mx-auto max-w-xl text-sm leading-7 text-zinc-500 sm:text-base">
              {profile.tagline}. Building digital experiences, e-commerce
              platforms, and business systems that actually have to work.
            </p>
          </div>

          {/* Tech stack */}
          <div className="relative z-30 mt-6 flex flex-wrap justify-center gap-2">
            {profile.stack.map((technology) => (
              <span
                key={technology}
                className="cursor-target rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-zinc-500 backdrop-blur-sm transition-all duration-300 hover:border-orange-500/40 hover:bg-orange-500/5 hover:text-orange-300"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom left */}
      <div className="absolute bottom-[12%] left-[6%] z-10 hidden md:block">
        <p className="font-mono text-xs leading-6 text-zinc-600">
          Design
          <br />
          Develop
          <br />
          Deploy
          <br />
          Repeat
        </p>
      </div>

      {/* Bottom right */}
      <div className="absolute bottom-[12%] right-[6%] z-10 hidden md:block">
        <p className="font-mono text-xs leading-6 text-zinc-600">
          Web Apps
          <br />
          E-commerce
          <br />
          Business Systems
          <br />
          And more...
        </p>
      </div>

      {/* Scroll indicator */}
      <Link
        href="#about"
        aria-label="Scroll to About section"
        className=" absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-3 text-zinc-600 transition-colors hover:text-orange-400"
      >
        <div
          className="cursor-target flex h-11 w-11 items-center justify-center rounded-full border border-white/10"
        >
          <span className="text-lg text-[#F97316]">↓</span>
        </div>

        <span className=" text-[9px] uppercase tracking-[0.4em]">
          Scroll Down
        </span>
      </Link>

      {/* Decorative orange edges */}
      <div className="absolute bottom-0 left-0 h-px w-24 bg-linear-to-r from-[#F97316] to-transparent" />
      <div className="absolute right-0 top-0 h-px w-24 bg-linear-to-l from-[#F97316] to-transparent" />
    </section>
  );
}
