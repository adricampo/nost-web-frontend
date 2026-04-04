'use client';

import { useEffect } from 'react';

// iOS Safari shows a full opaque browser toolbar on non-scrollable pages,
// which sits above the CSS viewport and cannot be covered by CSS alone.
// Making the body 1px scrollable and immediately setting scrollY > 0
// signals to iOS Safari that the page is "scrolled", collapsing the
// toolbar to minimal mode so overlays appear full-screen.
export default function SafariScrollFix() {
  useEffect(() => {
    window.scrollTo(0, 1);
  }, []);

  return null;
}
