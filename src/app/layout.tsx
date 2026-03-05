import type { Metadata } from 'next';
import { Cormorant_Garamond } from 'next/font/google';
import Providers from '@/components/layout/Providers';
import './globals.css';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Nost Interiors — Barcelona Interior Design Studio',
  description: 'Barcelona-based interior design studio specialising in residential, corporate and hospitality projects.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
