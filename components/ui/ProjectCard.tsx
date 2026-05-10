import Tag from "./Tag";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  year: string;
  tags: string[];
  featured: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="group relative border-b border-white/10 py-10 transition-colors hover:bg-white/[0.02]">
      <div className="mx-auto max-w-5xl px-6 sm:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* Left */}
          <div className="flex-1">
            <div className="mb-3 flex items-center gap-3">
              <span className="font-mono text-xs text-white/25">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-xs uppercase tracking-widest text-white/30">
                {project.category}
              </span>
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/50">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-6">
            <span className="font-mono text-xs text-white/25">{project.year}</span>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/50 transition-all group-hover:border-white/60 group-hover:text-white">
              ↗
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
