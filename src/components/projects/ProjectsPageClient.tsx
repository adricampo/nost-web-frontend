'use client';

import NostLogo from '@/components/layout/NostLogo';
import NavBar from '@/components/layout/NavBar';
import ProjectCard from './ProjectCard';
import type { Project } from '@/lib/types';

const BG = '#F5F4F1';

interface Props {
  projects: Project[];
  children: React.ReactNode;
}

export default function ProjectsPageClient({ projects, children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <div className="fixed top-7 left-9 z-65">
        <NostLogo />
      </div>

      <NavBar breadcrumb="Projects" pageBackground={BG} />

      <main className="flex-1" style={{ paddingTop: 120, paddingBottom: 64, paddingLeft: 36, paddingRight: 36 }}>
        <div className="projects-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-14">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>

      {children}
    </div>
  );
}
