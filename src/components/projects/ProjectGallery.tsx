import { Fragment } from 'react';
import Image from 'next/image';
import { getStrapiImageUrl } from '@/lib/strapi';
import type { GalleryBlock, GalleryImage } from '@/lib/types';

interface Props {
  blocks: GalleryBlock[];
}

const LAYOUT_CLASSES: Record<GalleryImage['layout'], string> = {
  small: 'col-span-6',
  medium: 'col-span-8',
  large: 'col-span-12',
  xl: 'col-span-24'
};

const COL_SPANS: Record<GalleryImage['layout'], number> = {
  small: 6,
  medium: 8,
  large: 12,
  xl: 24
};

const ROW_SPANS: Record<GalleryImage['layout'], number> = {
  small: 8,
  medium: 10,
  large: 16,
  xl: 14
};

const GRID_AUTO_ROWS = 'calc((100vw - 72px - 176px) / 24 - 8px)';

const SIZES: Record<GalleryImage['layout'], string> = {
  small: '(max-width: 768px) 100vw, 25vw',
  medium: '(max-width: 768px) 100vw, 33vw',
  large: '(max-width: 768px) 100vw, 50vw',
  xl: '(max-width: 768px) 100vw, calc(100vw - 72px)'
};

function computeRowStarts(images: GalleryImage[]): Map<number, number> {
  const result = new Map<number, number>();
  let currentRow = 1;
  let i = 0;

  while (i < images.length) {
    const group: GalleryImage[] = [];
    let maxColEnd = 0;
    let maxSpan = 0;
    let j = i;

    while (j < images.length) {
      const cur = images[j];
      const cols = COL_SPANS[cur.layout];
      const colStart = cur.colStart ?? maxColEnd + 1;
      const colEnd = colStart + cols - 1;

      if (colEnd > 12) break;

      group.push(cur);
      maxColEnd = Math.max(maxColEnd, colEnd);
      maxSpan = Math.max(maxSpan, ROW_SPANS[cur.layout]);
      j++;

      if (maxColEnd >= 12) break;
    }

    if (group.length === 0) break;

    for (const g of group) {
      const offset = (maxSpan - ROW_SPANS[g.layout]) / 2;
      result.set(g.id, currentRow + offset);
    }

    currentRow += maxSpan;
    i = j;
  }

  return result;
}

function blockTextAlignStyle(align?: string): React.CSSProperties {
  if (align === 'center') return { marginLeft: 'auto', marginRight: 'auto' };
  if (align === 'right') return { marginLeft: 0, marginRight: 0 };
  return {};
}

function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const rowStarts = computeRowStarts(images);

  return (
    <div
      className="flex flex-col gap-4 sm:grid sm:grid-cols-[repeat(24,minmax(0,1fr))] sm:gap-4"
      style={{ gridAutoRows: GRID_AUTO_ROWS }}
    >
      {images.map((item) => {
        const rowStart = rowStarts.get(item.id) ?? item.rowStart;
        const gridRowStyle: React.CSSProperties = {
          gridRow: rowStart
            ? `${rowStart} / span ${ROW_SPANS[item.layout]}`
            : `span ${ROW_SPANS[item.layout]}`,
          ...(item.colStart ? { gridColumnStart: item.colStart } : {})
        };

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
