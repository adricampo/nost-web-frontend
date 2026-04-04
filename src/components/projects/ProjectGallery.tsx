import { Fragment } from 'react';
import Image from 'next/image';
import { getStrapiImageUrl } from '@/lib/strapi';
import type { GalleryBlock, GalleryImage } from '@/lib/types';

interface Props {
  blocks: GalleryBlock[];
}

const LAYOUT_CLASSES: Record<GalleryImage['layout'], string> = {
  small: 'col-span-3',
  medium: 'col-span-4',
  large: 'col-span-6',
  xl: 'col-span-12'
};

const ROW_SPANS: Record<GalleryImage['layout'], number> = {
  small: 4,
  medium: 5,
  large: 8,
  xl: 7
};

const SIZES: Record<GalleryImage['layout'], string> = {
  small: '(max-width: 768px) 100vw, 25vw',
  medium: '(max-width: 768px) 100vw, 33vw',
  large: '(max-width: 768px) 100vw, 50vw',
  xl: '(max-width: 768px) 100vw, calc(100vw - 72px)'
};

const GRID_AUTO_ROWS = 'calc((100vw - 72px - 176px) / 12)';

function blockTextAlignStyle(align?: string): React.CSSProperties {
  if (align === 'center') return { marginLeft: 'auto', marginRight: 'auto' };
  if (align === 'right') return { marginLeft: 0, marginRight: 0 };
  return {};
}

function GalleryGrid({ images }: { images: GalleryImage[] }) {
  return (
    <div
      className="flex flex-col gap-4 sm:grid sm:grid-cols-12 sm:gap-4"
      style={{ gridAutoRows: GRID_AUTO_ROWS }}
    >
      {images.map((item) => {
        const gridRowStyle: React.CSSProperties = {
          gridRow: item.rowStart
            ? `${item.rowStart} / span ${ROW_SPANS[item.layout]}`
            : `span ${ROW_SPANS[item.layout]}`,
          ...(item.colStart ? { gridColumnStart: item.colStart } : {})
        };

        // Spacers: only needed for desktop grid positioning, hidden on mobile
        if (!item.image) {
          return (
            <div
              key={item.id}
              className={`${LAYOUT_CLASSES[item.layout]} hidden sm:block`}
              style={gridRowStyle}
            />
          );
        }

        const imageUrl = getStrapiImageUrl(item.image.url);
        const imageAlt = item.image.alternativeText || '';

        return (
          <Fragment key={item.id}>
            {/* Mobile (<640px): natural image sizing, full width, no cropping */}
            <div className="sm:hidden w-full">
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={item.image.width}
                height={item.image.height}
                className="w-full h-auto"
                sizes="100vw"
              />
            </div>

            {/* sm+: fill image inside grid cell, mosaic layout preserved */}
            <div
              className={`hidden sm:block ${LAYOUT_CLASSES[item.layout]} relative overflow-hidden`}
              style={gridRowStyle}
            >
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes={SIZES[item.layout]}
                className="object-cover"
              />
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

export default function ProjectGallery({ blocks }: Props) {
  return (
    <div className="flex flex-col gap-9">
      {blocks.map((block) => (
        <div key={block.id} className="flex flex-col gap-9">
          <GalleryGrid images={block.images} />
          {block.blockText && (
            <p
              className="text-[14px] lg:text-[17px] leading-5.5 font-light"
              style={{
                maxWidth: '44rem',
                ...blockTextAlignStyle(block.blockTextAlign)
              }}
            >
              {block.blockText}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
