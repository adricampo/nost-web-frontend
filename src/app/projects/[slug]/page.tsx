import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FooterWrapper from '@/components/layout/FooterWrapper';
import ProjectDetailClient from '@/components/projects/ProjectDetailClient';
import { getProject, getProjects, getStrapiImageUrl } from '@/lib/strapi';
import { SITE_NAME } from '@/lib/site';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const projects = await getProjects();
    return projects.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await getProject(slug);
    const description =
      project.description ||
      `${project.name} — ${project.category.toLowerCase()} interior design project by ${SITE_NAME}.`;

    return {
      title: project.name,
      description,
      openGraph: {
        title: project.name,
        description,
        ...(project.coverImage && {
          images: [{ url: getStrapiImageUrl(project.coverImage.url) }],
        }),
      },
    };
  } catch {
    return { title: 'Project' };
  }
}

export default async function ProjectDetailPage({ params }: Params) {
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
    <div className="min-h-screen flex flex-col bg-bg">
      <ProjectDetailClient project={project} />
      <FooterWrapper />
    </div>
  );
}
