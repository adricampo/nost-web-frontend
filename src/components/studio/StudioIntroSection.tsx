import Image from 'next/image';
import { getStrapiImageUrl } from '@/lib/strapi';
import type { StrapiImage } from '@/lib/types';

interface Props {
  introImage1?: StrapiImage;
  tagline?: string;
}

export default function StudioIntroSection({ introImage1, tagline }: Props) {
  return (
    <div className="grid px-9 grid-cols-1 lg:grid-cols-[50%_1fr]">
      {introImage1 ? (
        <div className="lg:pr-20">
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: '3/4' }}
          >
            <Image
              src={getStrapiImageUrl(introImage1.url)}
              alt={introImage1.alternativeText || 'Studio interior'}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      ) : (
        <div className="hidden lg:block" />
      )}

      <div className="flex items-center mt-12 lg:mt-0">
        {tagline && (
          <h2 className="text-[32px] leading-[42px] font-light">{tagline}</h2>
        )}
      </div>
    </div>
  );
}
