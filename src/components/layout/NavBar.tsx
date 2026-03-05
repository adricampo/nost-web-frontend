'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useMenu } from './Providers';

interface NavBarProps {
  breadcrumb?: string;
  centerSlot?: React.ReactNode;
  projectCode?: string;
  projectTitle?: string;
  showInfoButton?: boolean;
  onInfoClick?: () => void;
  pageBackground?: string;
}

export default function NavBar({
  breadcrumb,
  centerSlot,
  projectCode,
  projectTitle,
  showInfoButton,
  onInfoClick,
  pageBackground,
}: NavBarProps) {
  const { toggle, isOpen } = useMenu();

  return (
    <nav
      className="fixed top-0 left-0 right-0 pointer-events-none"
      style={{
        zIndex: 60,
        display: 'grid',
        gridTemplateColumns: '1fr max-content 1fr',
        alignItems: 'start',
        padding: pageBackground ? '28px 36px 74px' : '28px 36px 0',
        background: pageBackground ?? 'transparent',
      }}
    >
      {/* Left: project info (only when projectTitle exists) */}
      <div className="pointer-events-auto" style={{ display: 'flex', alignItems: 'flex-start' }}>
        {projectTitle && (
          <div className="flex flex-col gap-1">
            {breadcrumb && (
              <span
                className="text-[#9999BB] uppercase tracking-widest text-[12px]"
                style={{ fontFamily: 'var(--font-cormorant), serif', lineHeight: '12px' }}
              >
                {breadcrumb}
              </span>
            )}
            <div className="flex items-baseline gap-3">
              {projectCode && (
                <span
                  className="text-[#9999BB] text-[12px] uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-cormorant), serif' }}
                >
                  [{projectCode}]
                </span>
              )}
              <span
                className="text-[#13136B] text-[34px] leading-9 font-light"
                style={{ fontFamily: 'var(--font-cormorant), serif' }}
              >
                {projectTitle}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Center: slot or section breadcrumb */}
      <div className="pointer-events-auto" style={{ display: 'flex', alignItems: 'flex-start' }}>
        {centerSlot ?? ((breadcrumb && !projectTitle) ? (
          <span
            className="pointer-events-none uppercase tracking-widest text-[12px]"
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              lineHeight: '12px',
              color: '#13136B',
            }}
          >
            {breadcrumb}
          </span>
        ) : null)}
      </div>

      {/* Right: MENU / CLOSE */}
      <div
        className="pointer-events-auto"
        style={{
          display: 'flex',
          flexDirection: showInfoButton ? 'column' : 'row',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          gap: showInfoButton ? 10 : 24,
        }}
      >
        {/* MENU / CLOSE */}
        <div style={{ position: 'relative', width: '52px', height: '12px' }}>
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.button
                key="menu"
                exit={{ x: 24, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.25, 0, 0, 1] }}
                onClick={toggle}
                className="uppercase tracking-widest cursor-pointer"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  padding: 0,
                  margin: 0,
                  border: 'none',
                  background: 'none',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  lineHeight: '12px',
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: '12px',
                  color: '#13136B',
                }}
              >
                Menu
              </motion.button>
            ) : (
              <motion.button
                key="close"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.25, 0, 0, 1] }}
                onClick={toggle}
                className="uppercase tracking-widest cursor-pointer"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  padding: 0,
                  margin: 0,
                  border: 'none',
                  background: 'none',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  lineHeight: '12px',
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: '12px',
                  color: 'white',
                }}
              >
                Close
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* [+] INFO — debajo de MENU cuando showInfoButton */}
        {showInfoButton && (
          <button
            onClick={onInfoClick}
            className="uppercase tracking-widest hover:opacity-70 transition-opacity cursor-pointer"
            style={{
              padding: 0,
              margin: 0,
              border: 'none',
              background: 'none',
              appearance: 'none',
              WebkitAppearance: 'none',
              lineHeight: '12px',
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: '12px',
              color: '#13136B',
            }}
          >
            [+] Info
          </button>
        )}
      </div>
    </nav>
  );
}
