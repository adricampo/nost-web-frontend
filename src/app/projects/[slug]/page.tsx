import FooterWrapper from '@/components/layout/FooterWrapper';
import ProjectDetailClient from '@/components/projects/ProjectDetailClient';
import { getProject } from '@/lib/strapi';
import { notFound } from 'next/navigation';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let project;
  try {
    project = await getProject(slug);
  } catch (err) {
    console.error('[ProjectDetailPage] fetch error:', err);
    notFound();
  }

  if (!project) notFound();

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F4F1]">
      <ProjectDetailClient project={project} />
      <FooterWrapper />
    </div>
  );
}
