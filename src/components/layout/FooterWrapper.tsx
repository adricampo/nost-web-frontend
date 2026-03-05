import Footer from './Footer';
import { getContactInfo } from '@/lib/strapi';

export default async function FooterWrapper() {
  const socials = [
    { label: 'Instagram', href: undefined as string | undefined },
    { label: 'Linkedin', href: undefined as string | undefined },
    { label: 'Pinterest', href: undefined as string | undefined },
  ];

  try {
    const contact = await getContactInfo();
    if (contact.instagram) socials[0].href = contact.instagram;
    if (contact.linkedin) socials[1].href = contact.linkedin;
    if (contact.pinterest) socials[2].href = contact.pinterest;
  } catch {
    // Strapi not available
  }

  return <Footer socials={socials} />;
}
