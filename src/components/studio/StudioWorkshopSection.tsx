import Image from 'next/image';
import { getStrapiImageUrl } from '@/lib/strapi';
import type { StrapiImage } from '@/lib/types';

interface Props {
  images: StrapiImage[];
}

export default function StudioWorkshopSection({ images }: Props) {
  return (
    <div className="grid px-9 grid-cols-1 lg:grid-cols-[50%_1fr]">
      <div className="hidden lg:block" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
