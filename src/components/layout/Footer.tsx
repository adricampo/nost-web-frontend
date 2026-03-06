'use client';

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
      className="grid items-center font-apercu"
      style={{
        gridTemplateColumns: '50% 1fr',
        fontSize: 12,
        padding: '36px'
      }}
    >
      <button
        onClick={scrollToTop}
        className="hover:opacity-60 transition-opacity cursor-pointer tracking-[0.04em] text-left"
      >
        ↑ Back to top
      </button>

      <div className="flex justify-between items-center">
        <span className="tracking-[0.04em]">©Nost</span>

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
