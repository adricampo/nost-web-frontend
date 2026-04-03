'use client';

import { useState } from 'react';
import NavBar from '@/components/layout/NavBar';
import NostLogo from '@/components/layout/NostLogo';
import ProjectGallery from '@/components/projects/ProjectGallery';
import ProjectInfoPanel from '@/components/projects/ProjectInfoPanel';
import type { Project } from '@/lib/types';
import { NO_GALLERY_MESSAGE } from '@/lib/site';

interface ProjectNavCenterSlotProps {
  code: string;
  name: string;
}

function ProjectNavCenterSlot({ code, name }: ProjectNavCenterSlotProps) {
  return (
    <div className="flex items-baseline gap-2.5 justify-between md:justify-start md:max-w-[280px] lg:max-w-[460px]">
      <span className="font-stanley uppercase tracking-widest shrink-0 text-xs leading-3 w-20 lg:w-30 self-start">
        [{code}]
      </span>
      <span className="font-stanley font-light text-[14px] lg:text-[24px] leading-none">
        {name}
      </span>
    </div>
  );
}

export default function ProjectDetailClient({ project }: { project: Project }) {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <>
      <div className="fixed left-9 z-65" style={{ top: 'calc(28px + env(safe-area-inset-top, 0px))' }}>
        <NostLogo />
      </div>

      <NavBar
        breadcrumb={`Projects — ${project.category}`}
        centerSlot={
          <ProjectNavCenterSlot code={project.code} name={project.name} />
        }
        pageBackground="#F5F4F1"
        paddingBottom={28}
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
          <p className="text-navy-muted text-[17px]">{NO_GALLERY_MESSAGE}</p>
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
