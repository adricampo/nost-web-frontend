import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Providers from '@/components/layout/Providers';
import { SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION } from '@/lib/site';
import './globals.css';

const stanley = localFont({
  src: [
    { path: './fonts/Stanley-Regular.woff2' },
    { path: './fonts/Stanley-Regular.woff' }
  ],
  variable: '--font-stanley',
  display: 'swap'
});

const apercu = localFont({
  src: [
    { path: './fonts/Apercu-Regular.woff2' },
    { path: './fonts/Apercu-Regular.woff' }
  ],
  variable: '--font-apercu',
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s — ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${stanley.variable} ${apercu.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
