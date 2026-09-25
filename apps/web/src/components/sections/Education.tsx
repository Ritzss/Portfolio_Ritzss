import { certifications, education } from "@portfolio/content";
import MagicBento from "../ui/MagicBento";

export default function Education() {
  const educationCards = education.map((item, index) => ({
    color: "#11100F",

    label: `${String(index + 1).padStart(2, "0")} / ${item.startDate} — ${item.endDate}`,

    title: `${item.degree} · ${item.field}`,

    meta: item.institution,

    description: item.description?.join(" ") ?? "",

    variant: "education" as const,
  }));

  const certificationCards = certifications.map((item) => ({
    color: "#11100F",

    label: `TR / ${item.issueDate}`,

    title: item.name,

    meta: `${item.issuer} · Professional Course`,

    description: item.description?.join(" ") ?? "",

    credentialId: item.credentialId,

    skills: item.skills,

    variant: "training" as const,
  }));

  const cards = [...educationCards, ...certificationCards];

  return (
    <section
      id="education"
      className="relative overflow-hidden border-t border-white/10 bg-[#080808b0] px-6 py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-orange-500">
            06 / Education & Certifications
          </p>

          <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Where I built the foundation.
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-500 sm:text-base">
            From academic foundations to professional training, each step shaped
            how I approach software, technology, and problem-solving.
          </p>
        </div>

        <div className="mt-16 flex justify-center">
          <MagicBento
            cards={cards}
            textAutoHide={false}
            enableStars
            enableSpotlight
            enableBorderGlow
            enableTilt
            enableMagnetism
            clickEffect
            spotlightRadius={540}
            particleCount={12}
            glowColor="249, 115, 22"
            disableAnimations={false}
          />
        </div>
      </div>
    </section>
  );
}
