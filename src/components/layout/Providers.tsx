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

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const ctx: MenuContextType = {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((v) => !v),
  };

  return (
    <MenuContext.Provider value={ctx}>
      {children}
      <MenuOverlay />
    </MenuContext.Provider>
  );
}
