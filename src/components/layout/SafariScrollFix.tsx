'use client';

import { useEffect } from 'react';

export default function SafariScrollFix() {
  useEffect(() => {
    window.scrollTo(0, 1);
  }, []);

  return null;
}
