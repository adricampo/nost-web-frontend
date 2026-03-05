import Image from 'next/image';
import NostLogo from '@/components/layout/NostLogo';
import NavBar from '@/components/layout/NavBar';
import { getLanding, getStrapiImageUrl } from '@/lib/strapi';

export default async function LandingPage() {
  let heroImageUrl = '';

  try {
    const landing = await getLanding();
    if (landing.heroImages && landing.heroImages.length > 0) {
      heroImageUrl = getStrapiImageUrl(landing.heroImages[0].url);
    }
  } catch {
    // Strapi not available — no hero image
  }

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#13136B]">
      {/* Hero fullscreen */}
      {heroImageUrl && (
        <Image
          src={heroImageUrl}
          alt="Nost Interiors"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )}

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-black/5" />

      {/* Logo top-left */}
      <div className="absolute top-7 left-9 z-10">
        <NostLogo />
      </div>

      {/* Menu top-right (no breadcrumb on landing) */}
      <NavBar />
    </main>
  );
}
