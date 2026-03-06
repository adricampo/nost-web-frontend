import Footer from './Footer';
import { getContactInfo } from '@/lib/strapi';

export default async function FooterWrapper() {
  let contact = null;

  try {
    contact = await getContactInfo();
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') console.error('[Strapi]', e);
  }

  const socials = [
    { label: 'Instagram', href: contact?.instagram },
    { label: 'Linkedin', href: contact?.linkedin },
    { label: 'Pinterest', href: contact?.pinterest },
  ];

  return <Footer socials={socials} />;
}
