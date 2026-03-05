'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useMenu } from './Providers';

const NAV_ITEMS = [
  { label: 'Projects', href: '/projects' },
  { label: 'The Studio', href: '/the-studio' },
  { label: 'Contact', href: '/contact' },
];

export default function MenuOverlay() {
  const { isOpen, close } = useMenu();
  const router = useRouter();

  const handleNav = (href: string) => {
    close();
    router.push(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0"
            style={{ zIndex: 70 }}
            onClick={close}
          />

          {/* Slide-in panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.25, 0, 0, 1] }}
            className="fixed top-0 right-0 bottom-0 w-[45vw] min-w-[320px] bg-[#13136B] flex flex-col"
            style={{ zIndex: 80, paddingLeft: 48, paddingRight: 36, paddingTop: 28, paddingBottom: 64 }}
          >
            {/* Top bar: MENU label + CLOSE button */}
            <div className="flex items-center justify-between">
              <span
                className="uppercase tracking-widest"
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: '12px',
                  color: 'white',
                }}
              >
                Menu
              </span>
              <button
                onClick={close}
                className="uppercase tracking-widest cursor-pointer hover:opacity-70 transition-opacity"
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: '12px',
                  color: 'white',
                }}
              >
                Close
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex flex-col" style={{ gap: 32, marginTop: '22vh' }}>
              {NAV_ITEMS.map((item) => {
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNav(item.href)}
                    className="text-left font-light cursor-pointer underline-offset-4 hover:underline hover:opacity-70 transition-opacity"
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: '40px',
                      lineHeight: '42px',
                      color: 'white',
                      textDecorationThickness: '1px',
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
