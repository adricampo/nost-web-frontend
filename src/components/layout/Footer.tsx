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
      style={{
        display: 'grid',
        gridTemplateColumns: 'calc(50% - 36px) 1fr',
        alignItems: 'center',
        padding: '28px 36px',
        fontFamily: 'var(--font-cormorant), serif',
        fontSize: 12,
      }}
    >
      <button
        onClick={scrollToTop}
        style={{ color: '#13136B', cursor: 'pointer', letterSpacing: '0.04em', textAlign: 'left' }}
        className="hover:opacity-60 transition-opacity"
      >
        ↑ Back to top
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#13136B', letterSpacing: '0.04em' }}>©Nost</span>

        <div>
          {socials.map(({ label, href }, i) => (
            <span key={label} style={{ color: '#13136B' }}>
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#13136B' }}
                  className="hover:opacity-60 transition-opacity"
                >
                  {label}
                </a>
              ) : (
                <span style={{ color: '#13136B' }}>{label}</span>
              )}
              {i < socials.length - 1 && <span style={{ color: '#13136B' }}>, </span>}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
