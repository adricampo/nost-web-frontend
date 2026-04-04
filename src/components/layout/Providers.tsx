'use client';

import { createContext, useContext, useState } from 'react';
import MenuOverlay from './MenuOverlay';

interface MenuContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const MenuContext = createContext<MenuContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
});

export function useMenu() {
  return useContext(MenuContext);
}

// Called synchronously inside the MENU button click handler so iOS Safari
// treats it as a user-initiated scroll — this collapses the browser toolbar
// on non-scrollable pages (e.g. the fixed-layout landing page).
function collapseIOSSafariToolbar() {
  if (typeof window !== 'undefined' && window.scrollY === 0) {
    window.scrollTo(0, 1);
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const ctx: MenuContextType = {
    isOpen,
    open: () => { collapseIOSSafariToolbar(); setIsOpen(true); },
    close: () => setIsOpen(false),
    toggle: () => {
      if (!isOpen) collapseIOSSafariToolbar();
      setIsOpen((v) => !v);
    },
  };

  return (
    <MenuContext.Provider value={ctx}>
      {children}
      <MenuOverlay />
    </MenuContext.Provider>
  );
}
