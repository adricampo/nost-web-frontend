import Image from 'next/image';
import NostLogo from '@/components/layout/NostLogo';
import NavBar from '@/components/layout/NavBar';
import SafariScrollFix from '@/components/layout/SafariScrollFix';
import { getLanding, getStrapiImageUrl } from '@/lib/strapi';
import { SITE_NAME, SITE_TAGLINE } from '@/lib/site';

export default async function LandingPage() {
  let heroImageUrl = '';

  try {
    const landing = await getLanding();
    if (landing.heroImages && landing.heroImages.length > 0) {
      heroImageUrl = getStrapiImageUrl(landing.heroImages[0].url);
    }
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') console.error('[Strapi]', e);
  }

  return (
    <>
      <main className="landing-hero">
        {heroImageUrl && (
          <Image
            src={heroImageUrl}
            alt={`${SITE_NAME} — ${SITE_TAGLINE}`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}

        <div className="absolute inset-0 bg-black/5" />

        <div className="absolute left-9 z-10" style={{ top: 'calc(28px + env(safe-area-inset-top, 0px))' }}>
          <NostLogo />
        </div>

        <NavBar />
      </main>

      {/* Invisible spacer: gives the body 1px of scrollable height so iOS Safari
          can collapse its browser toolbar. Has no visual effect since the hero is
          position: fixed and covers everything. */}
      <div style={{ height: 'calc(100vh + 2px)' }} aria-hidden="true" />
      <SafariScrollFix />
    </>
  );
}
