'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useMenu } from './Providers';
import { NAVY } from '@/lib/site';

const NAV_ITEMS = [
  { label: 'Projects', href: '/projects' },
  { label: 'The Studio', href: '/the-studio' },
  { label: 'Contact', href: '/contact' }
];

const PANEL_TRANSITION = { duration: 0.35, ease: [0.25, 0, 0, 1] } as const;
const LABEL_MENU = 'Menu';
const LABEL_CLOSE = 'Close';

export default function MenuOverlay() {
  const { isOpen, close } = useMenu();
  const router = useRouter();

  // When the menu opens: add .menu-open to <html> (CSS forces navy background
  // everywhere via globals.css) and update theme-color so iOS Safari's browser
  // chrome (status bar, toolbar) adopts the navy colour.
  useEffect(() => {
    const html = document.documentElement;
    // On the landing page: skip both html.menu-open and theme-color changes.
    // iOS auto-detects toolbar colour from the hero image. Any JS touch to
    // theme-color — even restoring the same value — locks iOS into that colour
    // and prevents it from reverting to auto-detection after close.
    // The overlay panel (z-80) already covers the full screen visually, so
    // neither body-background nor theme-color tricks are needed there.
    // On the landing page skip ALL DOM side-effects (class, overflow, theme-color).
    // Any JS touch to these — even restoring to the original value — causes iOS
    // Safari to lock the toolbar colour and prevents auto-detection from reverting.
    // The landing hero is position:fixed so there is nothing to scroll anyway.
    if (window.location.pathname === '/') return;

    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const originalThemeColor = themeColor?.content ?? '';

    if (isOpen) {
      html.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
      if (themeColor) themeColor.content = NAVY;
    } else {
      html.classList.remove('menu-open');
      document.body.style.overflow = '';
      if (themeColor) themeColor.content = originalThemeColor;
    }

    return () => {
      html.classList.remove('menu-open');
      document.body.style.overflow = '';
      if (themeColor) themeColor.content = originalThemeColor;
    };
  }, [isOpen]);

  const handleNav = (href: string) => {
    close();
    router.push(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70]"
            onClick={close}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={PANEL_TRANSITION}
            className="fixed right-0 z-80 bg-navy text-white flex flex-col w-full md:w-[50vw] md:min-w-80"
            style={{
              top: 'calc(-1 * env(safe-area-inset-top, 0px))',
              bottom: 'calc(-1 * env(safe-area-inset-bottom, 0px))',
              paddingLeft: 80,
              paddingRight: 36,
              paddingTop: 'calc(env(safe-area-inset-top, 0px) + 28px)',
              paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 64px)'
            }}
          >
            {/* Top bar: Menu label + Close button */}
            <div className="flex items-center justify-between font-apercu">
              <span className="uppercase tracking-widest text-xs leading-3 text-white">
                {LABEL_MENU}
              </span>
              <button
                onClick={close}
                className="uppercase tracking-widest text-xs leading-3 text-white cursor-pointer hover:opacity-70 transition-opacity p-0 m-0 border-0 bg-transparent appearance-none"
              >
                {LABEL_CLOSE}
              </button>
            </div>

            <nav
              className="flex flex-col"
              style={{ marginTop: '22vh', gap: 24 }}
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className="text-left font-light text-white cursor-pointer p-0 m-0 border-0 bg-transparent appearance-none w-fit underline-offset-4 decoration-[0.5px] hover:underline hover:opacity-70 transition-all"
                  style={{ fontSize: 36, lineHeight: 1.15 }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
