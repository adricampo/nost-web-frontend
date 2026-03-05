import FooterWrapper from '@/components/layout/FooterWrapper';
import ProjectsPageClient from '@/components/projects/ProjectsPageClient';
import { getProjects } from '@/lib/strapi';
import type { Project } from '@/lib/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects — Nost Interiors',
};

export default async function ProjectsPage() {
  let projects: Project[] = [];

  try {
    projects = await getProjects();
  } catch {
    // Strapi not available
  }

  return (
    <ProjectsPageClient projects={projects}>
      <FooterWrapper />
    </ProjectsPageClient>
  );
}
