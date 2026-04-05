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
  toggle: () => {}
});

export function useMenu() {
  return useContext(MenuContext);
}

function collapseIOSSafariToolbar() {
  if (
    typeof window !== 'undefined' &&
    window.location.pathname === '/' &&
    window.scrollY === 0
  ) {
    window.scrollTo(0, 10);
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const ctx: MenuContextType = {
    isOpen,
    open: () => {
      collapseIOSSafariToolbar();
      setIsOpen(true);
    },
    close: () => setIsOpen(false),
    toggle: () => {
      if (!isOpen) collapseIOSSafariToolbar();
      setIsOpen((v) => !v);
    }
  };

  return (
    <MenuContext.Provider value={ctx}>
      {children}
      <MenuOverlay />
    </MenuContext.Provider>
  );
}
