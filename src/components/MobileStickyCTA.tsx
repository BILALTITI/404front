"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Fixed bottom CTA bar, mobile only (hidden at md+). Slides out of view once
 * the #contact section is on screen so it never sits on top of the contact
 * form / footer. RTL-safe: it's a full-width centred button, no directional
 * layout.
 */
export function MobileStickyCTA() {
  const t = useTranslations("hero");
  const [atContact, setAtContact] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const io = new IntersectionObserver(
      ([entry]) => setAtContact(entry.isIntersecting),
      { rootMargin: "0px 0px -35% 0px" },
    );
    io.observe(contact);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={[
        "md:hidden fixed inset-x-0 bottom-0 z-40",
        "px-4 pt-3 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)]",
        "bg-gradient-to-t from-white via-white/95 to-transparent",
        "transition-transform duration-300 ease-out",
        atContact ? "translate-y-full" : "translate-y-0",
      ].join(" ")}
      aria-hidden={atContact}
    >
      <a
        href="#contact"
        tabIndex={atContact ? -1 : 0}
        className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-full bg-[#22B8DE] text-[#0C2740] font-heading font-bold shadow-lg shadow-[#22B8DE]/30 active:scale-[0.98] transition-transform"
      >
        {t("ctaContact")}
      </a>
    </div>
  );
}
