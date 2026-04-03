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

  const menuButton = (
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
  );

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[60] pointer-events-none font-apercu"
      style={{ background: pageBackground ?? 'transparent' }}
    >
      {/* Desktop layout — 50vw split grid */}
      <div
        className="hidden md:grid md:grid-cols-[50%_1fr] items-stretch"
        style={{
          padding: pageBackground
            ? `calc(28px + env(safe-area-inset-top, 0px)) 36px ${paddingBottom ?? 65}px`
            : `calc(28px + env(safe-area-inset-top, 0px)) 36px 0`
        }}
      >
        <div />
        {showInfoButton ? (
          /* Project detail: 2-row layout — breadcrumb|MENU top, centerSlot|INFO bottom */
          <div className="pointer-events-auto flex flex-col gap-3 min-h-[52px] justify-between">
            <div className="flex justify-between items-start">
              {breadcrumb && (
                <span className="pointer-events-none uppercase tracking-widest leading-3 text-xs">
                  {breadcrumb}
                </span>
              )}
              {menuButton}
            </div>
            <div className="flex justify-between items-end">
              {centerSlot}
              <button
                onClick={onInfoClick}
                className={`${BTN_BASE} whitespace-nowrap hover:opacity-70 transition-opacity`}
              >
                {LABEL_MORE_INFO}
              </button>
            </div>
          </div>
        ) : (
          /* Standard layout — breadcrumb or centerSlot left, MENU right */
          <div className="pointer-events-auto flex justify-between items-start h-full">
            <div className="flex items-start">
              {centerSlot ??
                (breadcrumb ? (
                  <span className="pointer-events-none uppercase tracking-widest leading-3 text-xs">
                    {breadcrumb}
                  </span>
                ) : null)}
            </div>
            <div className="flex flex-row gap-6 items-end">{menuButton}</div>
          </div>
        )}
      </div>

      {/* Mobile layout */}
      <div
        className="md:hidden flex flex-col pointer-events-auto"
        style={{
          padding: pageBackground
            ? `calc(28px + env(safe-area-inset-top, 0px)) 36px ${paddingBottom ?? 20}px`
            : `calc(28px + env(safe-area-inset-top, 0px)) 36px 0`
        }}
      >
        {showInfoButton ? (
          /* Project detail: MENU + INFO top-right, breadcrumb + centerSlot below */
          <>
            <div className="flex justify-end items-center gap-5">
              <button
                onClick={onInfoClick}
                className={`${BTN_BASE} hover:opacity-70 transition-opacity`}
              >
                {LABEL_MORE_INFO}
              </button>
              {menuButton}
            </div>
            {breadcrumb && (
              <span className="mt-7 block uppercase tracking-widest leading-3 text-xs text-right">
                {breadcrumb}
              </span>
            )}
            {centerSlot && <div className="mt-4">{centerSlot}</div>}
          </>
        ) : centerSlot ? (
          /* Pages with centerSlot but no info button */
          <>
            <div className="flex justify-end">{menuButton}</div>
            <div className="mt-8">{centerSlot}</div>
          </>
        ) : (
          /* Simple pages: MENU top-right, breadcrumb below right-aligned */
          <div className="flex flex-col items-end gap-7">
            {menuButton}
            {breadcrumb && (
              <span className="uppercase tracking-widest leading-3 text-xs text-right">
                {breadcrumb}
              </span>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
