import type { Metadata } from 'next';
import NostLogo from '@/components/layout/NostLogo';
import NavBar from '@/components/layout/NavBar';
import FooterWrapper from '@/components/layout/FooterWrapper';
import { SITE_NAME, PAGE_BG, CONTACT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${SITE_NAME} handles personal data.`
};

const COMPANY_NAME = 'Nost Interiors, SL';
const COMPANY_TAX_ID = 'B21692264';
const COMPANY_ADDRESS = 'Carrer del Pistó 1, Bajos, 08026 Barcelona, Spain';

const SECTIONS: { heading: string; paragraphs: string[] }[] = [
  {
    heading: '1. Data controller',
    paragraphs: [
      `${COMPANY_NAME} — Tax ID (CIF): ${COMPANY_TAX_ID} — Registered address: ${COMPANY_ADDRESS} — Contact email: ${CONTACT_EMAIL}.`
    ]
  },
  {
    heading: '2. What data we process',
    paragraphs: [
      `This website does not include any contact form and does not collect, store or process personal data through automated means. The contact page only displays our email address and phone number as static links, so that visitors can reach out directly through their own email client.`,
      `If you choose to contact us by email, we will process the personal data you voluntarily provide in that message (such as your name, email address and the content of your enquiry), for the sole purpose of responding to it.`
    ]
  },
  {
    heading: '3. Legal basis',
    paragraphs: [
      `The processing described above is based on your consent, given by voluntarily initiating contact with us (Article 6.1.a GDPR), and on our legitimate interest in responding to enquiries addressed to us (Article 6.1.f GDPR).`
    ]
  },
  {
    heading: '4. Data retention',
    paragraphs: [
      `We keep the personal data included in your message only for as long as necessary to handle your enquiry, and afterwards for the period required to comply with applicable legal obligations.`
    ]
  },
  {
    heading: '5. Recipients',
    paragraphs: [
      `We do not sell, share or transfer your personal data to third parties, except where required by law.`
    ]
  },
  {
    heading: '6. Your rights',
    paragraphs: [
      `You may exercise your rights of access, rectification, erasure, objection, restriction and portability by writing to ${CONTACT_EMAIL}. You also have the right to lodge a complaint with the Spanish Data Protection Agency (Agencia Española de Protección de Datos, www.aepd.es) if you believe your data has not been processed correctly.`
    ]
  },
  {
    heading: '7. Cookies',
    paragraphs: [
      `This website does not use cookies, analytics tools or any other tracking technology. No personal data is collected through your browsing activity on this site.`
    ]
  }
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <div
        className="fixed z-[65] left-9"
        style={{ top: 'calc(28px + env(safe-area-inset-top, 0px))' }}
      >
        <NostLogo />
      </div>
      <NavBar breadcrumb="Privacy Policy" pageBackground={PAGE_BG} />
      <main className="flex-1 pb-24 px-9 pt-[22vh] md:pl-[calc(50vw+10px)]">
        <div className="flex flex-col gap-[8vh] lg:max-w-[620px]">
          {SECTIONS.map(({ heading, paragraphs }) => (
            <div key={heading} className="flex flex-col gap-4">
              <h2 className="text-[20px] md:text-[22px] lg:text-[26px] leading-[32px]">
                {heading}
              </h2>
              {paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-[18px] md:text-[20px] lg:text-[25px] leading-[30px] font-light"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </main>
      <FooterWrapper />
    </div>
  );
}
