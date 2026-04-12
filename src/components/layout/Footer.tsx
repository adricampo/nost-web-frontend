'use client';

import { SITE_NAME, FOOTER_BACK_TO_TOP } from '@/lib/site';

interface Social {
  label: string;
  href?: string;
}

interface FooterProps {
  socials?: Social[];
}

export default function Footer({ socials = [] }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="grid grid-cols-[35%_1fr] md:grid-cols-[calc(50%+10px)_1fr] items-center font-apercu text-xs py-7 px-9 md:p-9"
    >
      <button
        onClick={scrollToTop}
        className="hover:opacity-60 transition-opacity cursor-pointer tracking-[0.04em] text-left"
      >
        {FOOTER_BACK_TO_TOP}
      </button>

      <div className="flex justify-between items-center">
        <span className="tracking-[0.04em]">©{SITE_NAME}</span>

        <div>
          {socials.map(({ label, href }, i) => (
            <span key={label}>
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity"
                >
                  {label}
                </a>
              ) : (
                <span>{label}</span>
              )}
              {i < socials.length - 1 && <span>, </span>}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
