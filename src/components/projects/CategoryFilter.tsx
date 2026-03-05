'use client';

const CATEGORIES = ['ALL', 'RESIDENTIAL', 'CORPORATE', 'HOSPITALITY'] as const;
type Category = (typeof CATEGORIES)[number];

interface Props {
  active: Category;
  onChange: (cat: Category) => void;
}

export default function CategoryFilter({ active, onChange }: Props) {
  return (
    <div className="flex gap-8">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`text-[12px] uppercase tracking-widest transition-opacity cursor-pointer ${
            active === cat
              ? 'text-[#13136B] opacity-100'
              : 'text-[#9999BB] hover:text-[#13136B] hover:opacity-80'
          }`}
          style={{ fontFamily: 'var(--font-cormorant), serif' }}
        >
          {active === cat ? <span className="underline underline-offset-4">{cat}</span> : cat}
        </button>
      ))}
    </div>
  );
}
