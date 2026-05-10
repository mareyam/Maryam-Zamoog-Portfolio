import Image from "next/image";
import { projects } from "@/lib/data";

export default function Work() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="work">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {featured.map((project) => (
          <article key={project.id} className="group relative cursor-pointer overflow-hidden">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
            </div>
            {/* Title — bottom-left, white text over image */}
            <div className="absolute bottom-5 left-5">
              <h3 className="text-xl font-semibold text-white drop-shadow-md">{project.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
