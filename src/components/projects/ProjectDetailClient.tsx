'use client';

import { useState } from 'react';
import NavBar from '@/components/layout/NavBar';
import NostLogo from '@/components/layout/NostLogo';
import ProjectGallery from '@/components/projects/ProjectGallery';
import ProjectInfoPanel from '@/components/projects/ProjectInfoPanel';
import type { Project } from '@/lib/types';

const FONT = { fontFamily: 'var(--font-cormorant), serif' };

export default function ProjectDetailClient({ project }: { project: Project }) {
  const [infoOpen, setInfoOpen] = useState(false);

  const centerSlot = (
    <div className="flex flex-col" style={{ gap: 2 }}>
      <span
        className="uppercase tracking-widest"
        style={{ ...FONT, fontSize: 12, lineHeight: '12px', color: '#13136B' }}
      >
        Projects — {project.category}
      </span>
      <div className="flex items-baseline" style={{ gap: 10 }}>
        <span
          className="uppercase tracking-widest shrink-0"
          style={{ ...FONT, fontSize: 12, lineHeight: '12px', color: '#13136B' }}
        >
          [{project.code}]
        </span>
        <span
          className="font-light"
          style={{ ...FONT, fontSize: 24, lineHeight: '28px', color: '#13136B' }}
        >
          {project.name}
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* Logo fijo arriba izquierda — igual que /projects */}
      <div className="fixed z-[65]" style={{ top: 28, left: 36 }}>
        <NostLogo />
      </div>

      <NavBar
        centerSlot={centerSlot}
        pageBackground="#F5F4F1"
        showInfoButton
        onInfoClick={() => setInfoOpen(true)}
      />

      <main className="flex-1 pb-16" style={{ paddingTop: 160, paddingLeft: 36, paddingRight: 36 }}>
        {project.galleryBlocks && project.galleryBlocks.length > 0 ? (
          <ProjectGallery blocks={project.galleryBlocks} />
        ) : (
          <p
            className="text-[#9999BB] text-[17px]"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            No gallery images yet.
          </p>
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
