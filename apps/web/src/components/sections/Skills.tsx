import { skills } from "@portfolio/content";

const categories = [
  "Frontend",
  "Backend",
  "Database",
  "Tools",
] as const;

export default function Skills() {
  return (
    <section
      id="skills"
      className="border-t border-white/10 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#cd0000]">
          Skills
        </p>

        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Technologies I work with.
        </h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {categories.map((category) => {
            const categorySkills = skills.filter(
              (skill) => skill.category === category
            );

            return (
              <div key={category}>
                <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
                  {category}
                </h3>

                <div className="mt-4 flex flex-wrap gap-3">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill.name}
                      className="rounded-xl border border-white/10 bg-white/3 px-4 py-3 text-sm text-zinc-300 transition-colors hover:border-white/20 hover:bg-white/6 hover:text-white"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}