'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useMenu } from './Providers';

interface NavBarProps {
  breadcrumb?: string;
  centerSlot?: React.ReactNode;
  showInfoButton?: boolean;
  onInfoClick?: () => void;
  pageBackground?: string;
  paddingBottom?: number;
}

const TRANSITION = { duration: 0.22, ease: [0.25, 0, 0, 1] } as const;
const LABEL_MENU = 'Menu';
const LABEL_CLOSE = 'Close';
const LABEL_MORE_INFO = '[+] Info';
const BTN_BASE =
  'p-0 m-0 border-0 bg-transparent appearance-none uppercase tracking-widest cursor-pointer leading-3 text-xs';

export default function NavBar({
  breadcrumb,
  centerSlot,
  showInfoButton,
  onInfoClick,
  pageBackground,
  paddingBottom
}: NavBarProps) {
  const { toggle, isOpen } = useMenu();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[60] grid grid-cols-[50%_1fr] items-stretch pointer-events-none font-apercu"
      style={{
        padding: pageBackground
          ? `28px 36px ${paddingBottom ?? 65}px`
          : '28px 36px 0',
        background: pageBackground ?? 'transparent'
      }}
    >
      <div />

      <div className="pointer-events-auto flex justify-between items-start h-full">
        <div className="flex items-start">
          {centerSlot ??
            (breadcrumb ? (
              <span className="pointer-events-none uppercase tracking-widest leading-3 text-xs">
                {breadcrumb}
              </span>
            ) : null)}
        </div>

        <div
          className={`flex ${
            showInfoButton
              ? 'flex-col justify-between h-full'
              : 'flex-row gap-6 items-end'
          }`}
        >
          <div className="relative w-[52px] h-3">
            <AnimatePresence mode="wait">
              {!isOpen ? (
                <motion.button
                  key="menu"
                  exit={{ x: 24, opacity: 0 }}
                  transition={TRANSITION}
                  onClick={toggle}
                  className={`${BTN_BASE} absolute right-0 top-0`}
                >
                  {LABEL_MENU}
                </motion.button>
              ) : (
                <motion.button
                  key="close"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={TRANSITION}
                  onClick={toggle}
                  className={`${BTN_BASE} absolute right-0 top-0 text-white`}
                >
                  {LABEL_CLOSE}
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {showInfoButton && (
            <button
              onClick={onInfoClick}
              className={`${BTN_BASE} hover:opacity-70 transition-opacity`}
            >
              {LABEL_MORE_INFO}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
