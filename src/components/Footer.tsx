"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Link from "next/link";

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true });

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Explore",
      links: [
        { label: "Work", href: "#work" },
        { label: "About", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Process", href: "#process" },
        { label: "Testimonials", href: "#testimonials" },
        { label: "Contact", href: "#contact" },
      ],
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-gray-950 border-t border-white/5 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 lg:py-20">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4"
            >
              <Link href="/#hero" className="inline-block mb-6">
                <span className="font-display text-3xl font-bold">
                  <span className="text-white">4</span>
                  <span className="text-orange-500">o</span>
                  <span className="text-white">4</span>
                  <span className="ml-2 font-heading text-lg font-medium text-gray-400">Solutions</span>
                </span>
              </Link>
              <p className="font-body text-gray-400 leading-relaxed mb-6 max-w-sm">
                Startup software development from Amman—custom web apps, mobile
                apps, and workflow automation for teams in Jordan and MENA.
              </p>
              <p className="font-heading text-sm text-gray-500">
                Amman, Jordan
              </p>
            </motion.div>

            {/* Links columns */}
            {footerLinks.map((column, columnIndex) => (
              <motion.div
                key={column.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * (columnIndex + 1) }}
                className="lg:col-span-3"
              >
                <h3 className="font-heading font-semibold text-white mb-4">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="font-body text-gray-400 hover:text-orange-500 transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="py-6 border-t border-white/5"
        >
          <div className="flex items-center justify-center">
            <p className="font-body text-sm text-gray-500">
              {currentYear} 4o4 Solutions. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
