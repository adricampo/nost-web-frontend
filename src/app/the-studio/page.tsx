import Image from 'next/image';
import NostLogo from '@/components/layout/NostLogo';
import NavBar from '@/components/layout/NavBar';
import FooterWrapper from '@/components/layout/FooterWrapper';
import { getStudio, getStrapiImageUrl } from '@/lib/strapi';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Studio — Nost Interiors',
};

const BG = '#F5F4F1';
const font = { fontFamily: 'var(--font-cormorant), serif' };

const GRID_STYLE = {
  display: 'grid',
  gridTemplateColumns: 'calc(50% - 36px) 1fr',
  paddingLeft: 36,
  paddingRight: 36,
};

export default async function StudioPage() {
  let studio = null;

  try {
    studio = await getStudio();
  } catch {
    // Strapi not available
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: BG }}>
      {/* Logo above the navbar background */}
      <div className="fixed left-9 z-[65]" style={{ top: 28 }}>
        <NostLogo />
      </div>

      {/* NavBar with solid background — masks content on scroll */}
      <NavBar
        breadcrumb="The Studio"
        breadcrumbAlign="content-start"
        pageBackground={BG}
      />

      <main className="flex-1 pb-16" style={{ paddingTop: 120 }}>
        {studio ? (
          <>
            {/* ── Intro row A: image left · tagline right (vertically centred) ── */}
            <div style={GRID_STYLE}>
              {studio.introImage1 && (
                <div style={{ paddingRight: 80 }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                    <Image
                      src={getStrapiImageUrl(studio.introImage1.url)}
                      alt="Studio"
                      fill
                      sizes="40vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              <div className="flex items-center">
                {studio.tagline && (
                  <h1
                    className="text-[#13136B] text-[28px] leading-[36px] font-light"
                    style={font}
                  >
                    {studio.tagline}
                  </h1>
                )}
              </div>
            </div>

            {/* ── Intro row B: empty left · descriptions right ── */}
            <div style={{ ...GRID_STYLE, marginTop: 48, marginBottom: 144 }}>
              <div />
              <div className="flex flex-col gap-7">
                {studio.descriptionP1 && (
                  <p className="text-[#13136B] text-[15px] leading-[23px] font-light" style={font}>
                    {studio.descriptionP1}
                  </p>
                )}
                {studio.descriptionP2 && (
                  <p className="text-[#13136B] text-[15px] leading-[23px] font-light" style={font}>
                    {studio.descriptionP2}
                  </p>
                )}
              </div>
            </div>

            {/* ── Team: group photo left · members list right ── */}
            {(studio.introImage2 || studio.teamMembers?.length > 0) && (
              <div style={{ ...GRID_STYLE, marginBottom: 144 }}>
                {studio.introImage2 ? (
                  <div style={{ paddingRight: 80 }}>
                    <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                      <Image
                        src={getStrapiImageUrl(studio.introImage2.url)}
                        alt="Team"
                        fill
                        sizes="40vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ) : <div />}

                {studio.teamMembers?.length > 0 && (
                  <div className="flex flex-col gap-10" style={{ paddingTop: 'calc(26.67vw - 81px)' }}>
                    {studio.teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="grid"
                        style={{ gridTemplateColumns: '150px 1fr', gap: '2rem' }}
                      >
                        <span
                          className="text-[#13136B] text-[15px] leading-[23px] font-light"
                          style={font}
                        >
                          {member.name}
                        </span>
                        <p
                          className="text-[#13136B] text-[13px] leading-[20px] font-light whitespace-pre-line"
                          style={font}
                        >
                          {member.bio}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Workshop images: empty left · 2-col grid right ── */}
            {studio.workshopImages?.length > 0 && (
              <div style={{ ...GRID_STYLE, marginTop: 72, marginBottom: 72 }}>
                <div />
                <div className="grid grid-cols-2 gap-6">
                  {studio.workshopImages.map((img) => (
                    <div
                      key={img.id}
                      className="relative overflow-hidden"
                      style={{ aspectRatio: '2/3' }}
                    >
                      <Image
                        src={getStrapiImageUrl(img.url)}
                        alt="Workshop"
                        fill
                        sizes="25vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-64">
            <span
              className="text-[#9999BB] text-[17px] uppercase tracking-widest"
              style={font}
            >
              Content coming soon
            </span>
          </div>
        )}
      </main>

      <FooterWrapper />
    </div>
  );
}
