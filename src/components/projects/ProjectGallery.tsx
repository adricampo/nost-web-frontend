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

/*
 * ROW_SPANS are doubled vs. the original values (small: 4→8, medium: 5→10,
 * large: 8→16, xl: 7→14). GRID_AUTO_ROWS is halved accordingly so images
 * render at exactly the same visual height as before.
 *
 * The doubling ensures that every span difference between any two layout types
 * is always even, so Math.floor(diff / 2) == diff / 2 exactly — the centering
 * offset is always a perfect integer with zero rounding error.
 *
 *  large(16) + small(8)  → diff=8  → offset=4 → 4 rows above, 4 rows below ✓
 *  large(16) + medium(10)→ diff=6  → offset=3 → 3 rows above, 3 rows below ✓
 *  xl(14)    + small(8)  → diff=6  → offset=3 → 3 rows above, 3 rows below ✓
 *  xl(14)    + medium(10)→ diff=4  → offset=2 → 2 rows above, 2 rows below ✓
 */
const ROW_SPANS: Record<GalleryImage['layout'], number> = {
  small: 8,
  medium: 10,
  large: 16,
  xl: 14
};

// Each row unit = available/24 − 8px.
// The −8px compensates for the extra gap rows introduced by doubling the row spans:
// doubling spans from S to 2S adds (S−1) extra 16px gaps → −8px per row unit keeps
// total image heights identical to the original /12 grid.
const GRID_AUTO_ROWS = 'calc((100vw - 72px - 176px) / 24 - 8px)';

const SIZES: Record<GalleryImage['layout'], string> = {
  small: '(max-width: 768px) 100vw, 25vw',
  medium: '(max-width: 768px) 100vw, 33vw',
  large: '(max-width: 768px) 100vw, 50vw',
  xl: '(max-width: 768px) 100vw, calc(100vw - 72px)'
};

/*
 * Compute explicit rowStart values so shorter images are vertically centred
 * within each visual row. Groups consecutive items by column usage, finds the
 * tallest span in each group, then offsets shorter items by (maxSpan−span)/2.
 * Always overrides CMS rowStart values so centering is consistent.
 */
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
