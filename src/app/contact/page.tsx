import type { Metadata } from 'next';
import NostLogo from '@/components/layout/NostLogo';
import NavBar from '@/components/layout/NavBar';
import FooterWrapper from '@/components/layout/FooterWrapper';
import { getContactInfo } from '@/lib/strapi';
import { socialHandle } from '@/lib/utils';
import { SITE_NAME, PAGE_BG } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${SITE_NAME}. Contact us by phone, email or through our social media channels.`
};

const ADDRESS = 'Carrer del Pistó 1, 08026 Barcelona';

export default async function ContactPage() {
  let contact = null;

  try {
    contact = await getContactInfo();
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') console.error('[Strapi]', e);
  }

  const fields = contact
    ? [
        { label: 'T', value: contact.phone, href: undefined },
        { label: 'E', value: contact.email, href: `mailto:${contact.email}` },
        ...(contact.instagram
          ? [
              {
                label: 'IG',
                value: socialHandle(contact.instagram),
                href: contact.instagram
              }
            ]
          : []),
        { label: 'A', value: ADDRESS, href: undefined }
      ]
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <div
        className="fixed z-[65] left-9"
        style={{ top: 'calc(28px + env(safe-area-inset-top, 0px))' }}
      >
        <NostLogo />
      </div>
      <NavBar breadcrumb="Contact" pageBackground={PAGE_BG} />
      <main className="flex-1 pb-16 px-9 pt-[22vh] md:pl-[calc(50vw+10px)]">
        <div className="flex flex-col gap-[10vh] md:gap-[18vh]">
          {contact?.tagline && (
            <p className="text-[18px] md:text-[20px] lg:text-[25px] leading-[30px] font-light lg:max-w-[620px]">
              {contact.tagline}
            </p>
          )}
          {fields.length > 0 && (
            <div className="flex flex-col">
              {fields.map(({ label, value, href }) => (
                <div key={label} className="flex items-baseline">
                  <span className="text-base leading-[37px] w-[80px] md:w-[80px] lg:w-[110px] shrink-0">
                    {label}:
                  </span>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="text-[18px] md:text-[20px] lg:text-[25px] leading-[30px] font-light no-underline"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-[18px] md:text-[20px] lg:text-[25px] leading-[30px] font-light">
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
