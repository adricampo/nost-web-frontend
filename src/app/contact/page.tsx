import NostLogo from '@/components/layout/NostLogo';
import NavBar from '@/components/layout/NavBar';
import FooterWrapper from '@/components/layout/FooterWrapper';
import { getContactInfo } from '@/lib/strapi';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Nost Interiors',
};

export default async function ContactPage() {
  let contact = null;

  try {
    contact = await getContactInfo();
  } catch {
    // Strapi not available
  }

  function socialHandle(url: string): string {
    try {
      const path = new URL(url).pathname.replace(/\//g, '').replace(/^@/, '');
      return `@${path}`;
    } catch {
      return url;
    }
  }

  const fields = contact
    ? [
        { label: 'T', value: contact.phone, href: undefined },
        { label: 'E', value: contact.email, href: `mailto:${contact.email}` },
        ...(contact.instagram ? [{ label: 'IG', value: socialHandle(contact.instagram), href: contact.instagram }] : []),
        ...(contact.linkedin ? [{ label: 'LI', value: socialHandle(contact.linkedin), href: contact.linkedin }] : []),
        ...(contact.pinterest ? [{ label: 'PI', value: socialHandle(contact.pinterest), href: contact.pinterest }] : []),
      ]
    : [];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F5F4F1' }}>
      {/* Logo */}
      <div className="fixed z-[65]" style={{ top: 28, left: 36 }}>
        <NostLogo />
      </div>
      <NavBar breadcrumb="Contact" breadcrumbAlign="content-start" pageBackground="#F5F4F1" />

      {/* Main: content in right half */}
      <main style={{ flex: 1, paddingLeft: 'calc(50% - 36px)', paddingRight: 36, paddingTop: '22vh', paddingBottom: 64 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18vh' }}>

          {/* Tagline */}
          {contact?.tagline && (
            <p
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: 25,
                lineHeight: '30px',
                fontWeight: 300,
                color: '#13136B',
                maxWidth: 620,
              }}
            >
              {contact.tagline}
            </p>
          )}

          {/* Contact fields */}
          {fields.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {fields.map(({ label, value, href }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'baseline' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: 16,
                      lineHeight: '37px',
                      color: '#9999BB',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      width: 110,
                      flexShrink: 0,
                    }}
                  >
                    {label}:
                  </span>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'var(--font-cormorant), serif',
                        fontSize: 25,
                        lineHeight: '30px',
                        fontWeight: 300,
                        color: '#13136B',
                        textDecoration: 'none',
                      }}
                    >
                      {value}
                    </a>
                  ) : (
                    <span
                      style={{
                        fontFamily: 'var(--font-cormorant), serif',
                        fontSize: 25,
                        lineHeight: '30px',
                        fontWeight: 300,
                        color: '#13136B',
                      }}
                    >
                      {value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      <FooterWrapper />
    </div>
  );
}
