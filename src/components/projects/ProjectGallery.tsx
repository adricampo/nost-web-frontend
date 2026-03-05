import Image from 'next/image';
import { getStrapiImageUrl } from '@/lib/strapi';
import type { GalleryBlock, GalleryImage } from '@/lib/types';

interface Props {
  blocks: GalleryBlock[];
}

const LAYOUT_CLASSES: Record<GalleryImage['layout'], string> = {
  small:  'col-span-3',
  medium: 'col-span-4',
  large:  'col-span-6',
  xl:     'col-span-12',
};

const ROW_SPANS: Record<GalleryImage['layout'], number> = {
  small:  4,
  medium: 5,
  large:  8,
  xl:     7,
};

// Each row unit = 1 column width: (100vw - 72px padding - 11×16px gaps) / 12
const GRID_AUTO_ROWS = 'calc((100vw - 72px - 176px) / 12)';

const SIZES: Record<GalleryImage['layout'], string> = {
  small:  '(max-width: 768px) 100vw, 25vw',
  medium: '(max-width: 768px) 100vw, 33vw',
  large:  '(max-width: 768px) 100vw, 50vw',
  xl:     '(max-width: 768px) 100vw, calc(100vw - 72px)',
};

const FONT = { fontFamily: 'var(--font-cormorant), serif' };

function alignStyle(align?: string): React.CSSProperties {
  if (align === 'center') return { marginLeft: 'auto', marginRight: 'auto' };
  if (align === 'right')  return { marginLeft: 'auto', marginRight: 0 };
  return {};
}

function GalleryGrid({ images }: { images: GalleryImage[] }) {
  return (
    <div className="grid grid-cols-12 gap-4" style={{ gridAutoRows: GRID_AUTO_ROWS }}>
      {images.map((item) => {
        const itemStyle: React.CSSProperties = {
          gridRow: item.rowStart
            ? `${item.rowStart} / span ${ROW_SPANS[item.layout]}`
            : `span ${ROW_SPANS[item.layout]}`,
          ...(item.colStart ? { gridColumnStart: item.colStart } : {}),
        };

        if (!item.image) {
          return (
            <div
              key={item.id}
              className={LAYOUT_CLASSES[item.layout]}
              style={itemStyle}
            />
          );
        }

        return (
          <div
            key={item.id}
            className={`${LAYOUT_CLASSES[item.layout]} relative overflow-hidden`}
            style={itemStyle}
          >
            <Image
              src={getStrapiImageUrl(item.image.url)}
              alt={item.image.alternativeText || ''}
              fill
              sizes={SIZES[item.layout]}
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}

export default function ProjectGallery({ blocks }: Props) {
  return (
    <div className="flex flex-col gap-20">
      {blocks.map((block) => (
        <div key={block.id} className="flex flex-col gap-8">
          <GalleryGrid images={block.images} />
          {block.blockText && (
            <p
              className="text-[#13136B] text-[17px] leading-[27px] font-light"
              style={{ ...FONT, maxWidth: '36rem', ...alignStyle(block.blockTextAlign) }}
            >
              {block.blockText}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
