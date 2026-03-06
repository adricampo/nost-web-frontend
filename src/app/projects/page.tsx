import FooterWrapper from '@/components/layout/FooterWrapper';
import ProjectsPageClient from '@/components/projects/ProjectsPageClient';
import { getProjects } from '@/lib/strapi';
import type { Project } from '@/lib/types';
import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Projects',
  description: `Explore the ${SITE_NAME} portfolio of residential, corporate and hospitality interior design projects.`,
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
