import type { Metadata } from 'next';
import NostLogo from '@/components/layout/NostLogo';
import NavBar from '@/components/layout/NavBar';
import FooterWrapper from '@/components/layout/FooterWrapper';
import { SITE_NAME, PAGE_BG, CONTACT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Legal Notice',
  description: `Legal notice and site ownership information for ${SITE_NAME}.`
};

const COMPANY_NAME = 'Nost Interiors, SL';
const COMPANY_TAX_ID = 'B21692264';
const COMPANY_ADDRESS = 'Carrer del Pistó 1, Bajos, 08026 Barcelona, Spain';

const SECTIONS: { heading: string; paragraphs: string[] }[] = [
  {
    heading: '1. Site owner',
    paragraphs: [
      `In compliance with Article 10 of Law 34/2002, of 11 July, on Information Society Services and Electronic Commerce (LSSI-CE), the following identification details are provided:`,
      `${COMPANY_NAME} — Tax ID (CIF): ${COMPANY_TAX_ID} — Registered address: ${COMPANY_ADDRESS} — Contact email: ${CONTACT_EMAIL}.`
    ]
  },
  {
    heading: '2. Purpose',
    paragraphs: [
      `This website provides information about ${SITE_NAME}, an interior design studio, including our projects, studio and contact details. It does not offer online purchase, hiring or contracting functionality.`
    ]
  },
  {
    heading: '3. Intellectual property',
    paragraphs: [
      `All content on this site — including images, photography, text, logos and layout — is the property of ${COMPANY_NAME} or is used under licence, and is protected by intellectual property law. Reproduction, distribution or public communication of this content, in whole or in part, requires prior written authorisation. To request permission to use any image, please contact ${CONTACT_EMAIL}.`
    ]
  },
  {
    heading: '4. Liability',
    paragraphs: [
      `${COMPANY_NAME} makes reasonable efforts to keep the information on this site accurate and up to date, but does not guarantee the absence of errors or interruptions in access. Use of this site is the sole responsibility of the visitor.`
    ]
  },
  {
    heading: '5. Applicable law',
    paragraphs: [
      `This legal notice is governed by Spanish law. Any dispute arising from the use of this site will be submitted to the courts of Barcelona, Spain, unless mandatory consumer law establishes otherwise.`
    ]
  }
];

export default function LegalNoticePage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <div
        className="fixed z-[65] left-9"
        style={{ top: 'calc(28px + env(safe-area-inset-top, 0px))' }}
      >
        <NostLogo />
      </div>
      <NavBar breadcrumb="Legal Notice" pageBackground={PAGE_BG} />
      <main
        className="flex-1 pb-24 px-9 md:pl-[calc(50vw+10px)]"
        style={{ paddingTop: 120 }}
      >
        <div className="flex flex-col gap-[8vh] lg:max-w-[620px]">
          {SECTIONS.map(({ heading, paragraphs }) => (
            <div key={heading} className="flex flex-col gap-4">
              <h2 className="font-apercu text-[18px] md:text-[20px] lg:text-[25px] leading-[30px]">
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
