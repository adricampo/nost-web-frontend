import Image from 'next/image';
import Link from 'next/link';
import { getStrapiImageUrl } from '@/lib/strapi';
import type { Project } from '@/lib/types';

interface Props {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: Props) {
  const imageUrl = project.coverImage
    ? getStrapiImageUrl(project.coverImage.url)
    : '/placeholder.jpg';

  const isLarge = index % 2 !== 0;

  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div
        className={`project-card-image relative overflow-hidden bg-navy/5 ${isLarge ? 'aspect-3/4' : 'aspect-[3/2] sm:aspect-3/4'}`}
      >
        <Image
          src={imageUrl}
          alt={project.name}
          fill
          sizes="(max-width: 640px) calc(100vw - 72px), (max-width: 1024px) calc(50vw - 46px), (max-width: 1280px) calc(33vw - 46px), calc(25vw - 46px)"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3 min-w-0">
        <span className="shrink-0 text-[11px] uppercase tracking-widest leading-4 self-start">
          [{project.code}]
        </span>
        <span className="text-right truncate text-[17px] leading-22px font-light">
          {project.name}
        </span>
      </div>
    </Link>
  );
}
