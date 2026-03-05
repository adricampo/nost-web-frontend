'use client';

import { useState } from 'react';
import ProjectCard from './ProjectCard';
import CategoryFilter from './CategoryFilter';
import type { Project } from '@/lib/types';

type Category = 'ALL' | 'RESIDENTIAL' | 'CORPORATE' | 'HOSPITALITY';

interface Props {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: Props) {
  const [active, setActive] = useState<Category>('ALL');

  const filtered =
    active === 'ALL' ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="mb-10">
        <CategoryFilter active={active} onChange={setActive} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
        {filtered.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            tall={i % 3 === 1}
          />
        ))}
      </div>
    </div>
  );
}
