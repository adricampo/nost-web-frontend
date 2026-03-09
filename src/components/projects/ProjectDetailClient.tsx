'use client';

import { useState } from 'react';
import NavBar from '@/components/layout/NavBar';
import NostLogo from '@/components/layout/NostLogo';
import ProjectGallery from '@/components/projects/ProjectGallery';
import ProjectInfoPanel from '@/components/projects/ProjectInfoPanel';
import type { Project } from '@/lib/types';
import { NO_GALLERY_MESSAGE } from '@/lib/site';

interface ProjectNavCenterSlotProps {
  category: Project['category'];
  code: string;
  name: string;
}

function ProjectNavCenterSlot({
  category,
  code,
  name
}: ProjectNavCenterSlotProps) {
  return (
    <div className="flex flex-col gap-3 md:max-w-[280px] lg:max-w-[350px]">
      <span className="uppercase tracking-widest text-xs leading-3 text-right md:text-left">
        Projects — {category}
      </span>
      <div className="flex items-baseline gap-2.5 justify-between md:justify-start">
        <span className="uppercase tracking-widest shrink-0 text-xs leading-3 w-20 lg:w-30">
          [{code}]
        </span>
        <span className="font-light text-[14px] lg:text-[18px] lg:text-[24px] leading-7">
          {name}
        </span>
      </div>
    </div>
  );
}

export default function ProjectDetailClient({ project }: { project: Project }) {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <>
      <div className="fixed top-7 left-9 z-65">
        <NostLogo />
      </div>

      <NavBar
        centerSlot={
          <ProjectNavCenterSlot
            category={project.category}
            code={project.code}
            name={project.name}
          />
        }
        pageBackground="#F5F4F1"
        paddingBottom={20}
        showInfoButton
        onInfoClick={() => setInfoOpen(true)}
      />

      <main
        className="flex-1"
        style={{
          paddingTop: 160,
          paddingBottom: 64,
          paddingLeft: 36,
          paddingRight: 36
        }}
      >
        {project.galleryBlocks && project.galleryBlocks.length > 0 ? (
          <ProjectGallery blocks={project.galleryBlocks} />
        ) : (
          <p className="text-navy-muted text-[17px]">No gallery images yet.</p>
        )}
      </main>

      <ProjectInfoPanel
        project={project}
        isOpen={infoOpen}
        onClose={() => setInfoOpen(false)}
      />
    </>
  );
}
