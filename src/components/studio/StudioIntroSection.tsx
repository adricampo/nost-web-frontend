import Image from 'next/image';
import { getStrapiImageUrl } from '@/lib/strapi';
import type { StrapiImage } from '@/lib/types';

interface Props {
  introImage1?: StrapiImage;
  tagline?: string;
}

export default function StudioIntroSection({ introImage1, tagline }: Props) {
  return (
    <div className="grid px-9" style={{ gridTemplateColumns: '50% 1fr' }}>
      {introImage1 ? (
        <div style={{ paddingRight: 80 }}>
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: '3/4' }}
          >
            <Image
              src={getStrapiImageUrl(introImage1.url)}
              alt={introImage1.alternativeText || 'Studio interior'}
              fill
              sizes="40vw"
              className="object-cover"
            />
          </div>
        </div>
      ) : (
        <div />
      )}

      <div className="flex items-center">
        {tagline && (
          <h2 className="text-[34px] leading-[42px] font-light">{tagline}</h2>
        )}
      </div>
    </div>
  );
}
