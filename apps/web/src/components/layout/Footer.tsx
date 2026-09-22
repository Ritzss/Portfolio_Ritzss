import { profile } from "@portfolio/content";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>

        <p>
          Built with Next.js, React & TypeScript.
        </p>
      </div>
    </footer>
  );
}