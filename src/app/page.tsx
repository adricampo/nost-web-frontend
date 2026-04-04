import Image from 'next/image';
import NostLogo from '@/components/layout/NostLogo';
import NavBar from '@/components/layout/NavBar';
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
      <main className="landing-hero" style={{ backgroundColor: '#F5F4F1' }}>
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

        {/* <div className="absolute inset-0 bg-black/5" /> */}

        <div
          className="absolute left-9 z-10"
          style={{ top: 'calc(28px + env(safe-area-inset-top, 0px))' }}
        >
          <NostLogo />
        </div>

        <NavBar />
      </main>

      {/* Invisible spacer: makes the body 1px scrollable so that when the MENU
          button is tapped, window.scrollTo(0,1) in Providers can collapse the
          iOS Safari browser toolbar. Has no visual effect — hero is position:fixed. */}
      <div
        style={{
          top: 'calc(-1 * env(safe-area-inset-top, 0px))',
          bottom: 'calc(-1 * env(safe-area-inset-bottom, 0px))',
          paddingLeft: 80,
          paddingRight: 36,
          backgroundColor: '#F5F4F1',
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 200px)'
        }}
        aria-hidden="true"
      />
    </>
  );
}
