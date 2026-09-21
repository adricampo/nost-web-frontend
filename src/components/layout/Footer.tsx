'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SITE_NAME, FOOTER_BACK_TO_TOP } from '@/lib/site';

interface Social {
  label: string;
  href?: string;
}

interface FooterProps {
  socials?: Social[];
}

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Legal Notice', href: '/legal-notice' }
];

function LegalLinks() {
  return (
    <div>
      {LEGAL_LINKS.map(({ label, href }, i) => (
        <span key={href}>
          <Link href={href} className="hover:opacity-60 transition-opacity">
            {label}
          </Link>
          {i < LEGAL_LINKS.length - 1 && <span>, </span>}
        </span>
      ))}
    </div>
  );
}

function Socials({ socials }: { socials: Social[] }) {
  return (
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
  );
}

export default function Footer({ socials = [] }: FooterProps) {
  const [canScrollUp, setCanScrollUp] = useState(false);

  useEffect(() => {
    const checkScrollable = () => {
      setCanScrollUp(document.documentElement.scrollHeight > window.innerHeight + 1);
    };

    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    const observer = new ResizeObserver(checkScrollable);
    observer.observe(document.documentElement);

    return () => {
      window.removeEventListener('resize', checkScrollable);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToTop = (
    <button
      onClick={scrollToTop}
      className="hover:opacity-60 transition-opacity cursor-pointer tracking-[0.04em] text-left"
    >
      {FOOTER_BACK_TO_TOP}
    </button>
  );

  return (
    <footer className="font-apercu text-xs py-7 px-9 md:p-9">
      <div className="flex flex-col gap-4 md:hidden">
        <div className="grid grid-cols-[35%_1fr] items-center">
          {backToTop}
          <div className="flex justify-between items-center">
            <span className="tracking-[0.04em]">©{SITE_NAME}</span>
            <Socials socials={socials} />
          </div>
        </div>

        <div className="flex justify-end items-center">
          <LegalLinks />
        </div>
      </div>

      <div className="hidden md:flex md:flex-col md:gap-4">
        {canScrollUp && <div>{backToTop}</div>}

        <div className="grid grid-cols-[calc(50%+10px)_1fr] items-center">
          <LegalLinks />
          <div className="flex justify-between items-center">
            <span className="tracking-[0.04em]">©{SITE_NAME}</span>
            <Socials socials={socials} />
          </div>
        </div>
      </div>
    </footer>
  );
}
