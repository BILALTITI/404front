"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Renders `fallback` on the server and first client pass, then `children` after mount.
 * Avoids hydration mismatches when browser extensions mutate form controls (e.g. fdprocessedid)
 * or when interactive markup must only exist in the client DOM.
 */
export function MountGuard({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return fallback;
  return children;
}
