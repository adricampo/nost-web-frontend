import type { Metadata } from 'next';
import NostLogo from '@/components/layout/NostLogo';
import NavBar from '@/components/layout/NavBar';
import FooterWrapper from '@/components/layout/FooterWrapper';
import { getContactInfo } from '@/lib/strapi';
import { socialHandle } from '@/lib/utils';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${SITE_NAME}. Contact us by phone, email or through our social media channels.`,
};

const BG = '#F5F4F1';

export default async function ContactPage() {
  let contact = null;

  try {
    contact = await getContactInfo();
  } catch {
    // Strapi not available
  }

  const fields = contact
    ? [
        { label: 'T', value: contact.phone, href: undefined },
        { label: 'E', value: contact.email, href: `mailto:${contact.email}` },
        ...(contact.instagram
          ? [{ label: 'IG', value: socialHandle(contact.instagram), href: contact.instagram }]
          : []),
        ...(contact.linkedin
          ? [{ label: 'LI', value: socialHandle(contact.linkedin), href: contact.linkedin }]
          : []),
        ...(contact.pinterest
          ? [{ label: 'PI', value: socialHandle(contact.pinterest), href: contact.pinterest }]
          : []),
      ]
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <div className="fixed z-[65] top-7 left-9">
        <NostLogo />
      </div>

      <NavBar breadcrumb="Contact" pageBackground={BG} />

      <main
        className="flex-1 pb-16"
        style={{ paddingLeft: '50vw', paddingRight: 36, paddingTop: '22vh' }}
      >
        <div className="flex flex-col gap-[18vh]">

          {contact?.tagline && (
            <p className="text-[25px] leading-[30px] font-light" style={{ maxWidth: 620 }}>
              {contact.tagline}
            </p>
          )}

          {fields.length > 0 && (
            <div className="flex flex-col">
              {fields.map(({ label, value, href }) => (
                <div key={label} className="flex items-baseline">
                  <span
                    className="text-base leading-[37px] w-[110px] shrink-0"
                  >
                    {label}:
                  </span>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="text-[25px] leading-[30px] font-light no-underline"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-[25px] leading-[30px] font-light">{value}</span>
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
