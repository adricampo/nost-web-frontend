import type { Metadata } from 'next';
import NostLogo from '@/components/layout/NostLogo';
import NavBar from '@/components/layout/NavBar';
import FooterWrapper from '@/components/layout/FooterWrapper';
import StudioIntroSection from '@/components/studio/StudioIntroSection';
import StudioDescriptionSection from '@/components/studio/StudioDescriptionSection';
import StudioTeamSection from '@/components/studio/StudioTeamSection';
import StudioWorkshopSection from '@/components/studio/StudioWorkshopSection';
import { getStudio } from '@/lib/strapi';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'The Studio',
  description: `Learn about ${SITE_NAME}, our team, philosophy and creative process behind our Barcelona interior design studio.`,
};

const BG = '#F5F4F1';

export default async function StudioPage() {
  let studio = null;

  try {
    studio = await getStudio();
  } catch {
    // Strapi not available
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <div className="fixed left-9 top-7 z-65">
        <NostLogo />
      </div>

      <NavBar breadcrumb="The Studio" pageBackground={BG} />

      <main className="flex-1 pb-24" style={{ paddingTop: 120 }}>
        {studio ? (
          <>
            <StudioIntroSection
              introImage1={studio.introImage1}
              tagline={studio.tagline}
            />
            <StudioDescriptionSection
              descriptionP1={studio.descriptionP1}
              descriptionP2={studio.descriptionP2}
            />
            {(studio.introImage2 || studio.teamMembers?.length > 0) && (
              <StudioTeamSection
                introImage2={studio.introImage2}
                teamMembers={studio.teamMembers ?? []}
              />
            )}
            {studio.workshopImages?.length > 0 && (
              <StudioWorkshopSection images={studio.workshopImages} />
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-64">
            <span className="text-navy-muted text-[17px] uppercase tracking-widest">
              Content coming soon
            </span>
          </div>
        )}
      </main>

      <FooterWrapper />
    </div>
  );
}
