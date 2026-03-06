import Image from 'next/image';
import { getStrapiImageUrl } from '@/lib/strapi';
import type { StrapiImage } from '@/lib/types';

interface Props {
  images: StrapiImage[];
}

export default function StudioWorkshopSection({ images }: Props) {
  return (
    <div
      className="grid px-9 mt-[72px] mb-[72px]"
      style={{ gridTemplateColumns: '50% 1fr' }}
    >
      <div />
      <div className="grid grid-cols-2 gap-6">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative overflow-hidden"
            style={{ aspectRatio: '2/3' }}
          >
            <Image
              src={getStrapiImageUrl(img.url)}
              alt={img.alternativeText || 'Workshop'}
              fill
              sizes="25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
