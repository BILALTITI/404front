"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Fixed bottom CTA bar, mobile only (hidden at md+). Stays hidden while the
 * hero (#hero) is on screen — the hero already has its own CTAs — and slides
 * away again once #contact is reached, so it only shows for the scroll
 * between them. RTL-safe: a full-width centred button, no directional layout.
 */
export function MobileStickyCTA() {
  const t = useTranslations("hero");
  const [atHero, setAtHero] = useState(true);
  const [atContact, setAtContact] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const hero = document.getElementById("hero");
    if (hero) {
      const io = new IntersectionObserver(
        ([entry]) => setAtHero(entry.isIntersecting),
        { rootMargin: "0px 0px -20% 0px" },
      );
      io.observe(hero);
      observers.push(io);
    }

    const contact = document.getElementById("contact");
    if (contact) {
      const io = new IntersectionObserver(
        ([entry]) => setAtContact(entry.isIntersecting),
        { rootMargin: "0px 0px -35% 0px" },
      );
      io.observe(contact);
      observers.push(io);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const hidden = atHero || atContact;

  return (
    <div
      className={[
        "md:hidden fixed inset-x-0 bottom-0 z-40",
        "px-4 pt-3 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)]",
        "bg-gradient-to-t from-white via-white/95 to-transparent",
        "transition-transform duration-300 ease-out",
        hidden ? "translate-y-full" : "translate-y-0",
      ].join(" ")}
      aria-hidden={hidden}
    >
      <a
        href="#contact"
        tabIndex={hidden ? -1 : 0}
        className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-full bg-[#22B8DE] text-[#0C2740] font-heading font-bold shadow-lg shadow-[#22B8DE]/30 active:scale-[0.98] transition-transform"
      >
        {t("ctaContact")}
      </a>
    </div>
  );
}
