"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true });

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Services",
      links: ["Web Development", "Mobile Apps", "UI/UX Design", "Brand Strategy", "Digital Marketing"],
    },
    {
      title: "Company",
      links: ["About Us", "Our Work", "Careers", "Blog", "Contact"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
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
              <a href="#" className="inline-block mb-6">
                <span className="font-display text-3xl font-bold">
                  <span className="text-white">4</span>
                  <span className="text-orange-500">O</span>
                  <span className="text-white">4</span>
                  <span className="ml-2 font-heading text-lg font-medium text-gray-400">Solutions</span>
                </span>
              </a>
              <p className="font-body text-gray-400 leading-relaxed mb-6 max-w-sm">
                We're a forward-thinking digital agency crafting exceptional
                websites, apps, and smart business solutions.
              </p>
              <div className="flex gap-3">
                {["Tw", "Li", "In", "Dr"].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:bg-orange-500 hover:text-white transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <span className="font-heading text-xs">{social}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Links columns */}
            {footerLinks.map((column, columnIndex) => (
              <motion.div
                key={column.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * (columnIndex + 1) }}
                className="lg:col-span-2"
              >
                <h3 className="font-heading font-semibold text-white mb-4">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="font-body text-gray-400 hover:text-orange-500 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Newsletter column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <h3 className="font-heading font-semibold text-white mb-4">
                Stay Updated
              </h3>
              <p className="font-body text-sm text-gray-400 mb-4">
                Subscribe for insights and updates.
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="py-6 border-t border-white/5"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-body text-sm text-gray-500">
              {currentYear} 4O4 Solutions. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="font-body text-sm text-gray-500 hover:text-orange-500 transition-colors">
                Privacy
              </a>
              <a href="#" className="font-body text-sm text-gray-500 hover:text-orange-500 transition-colors">
                Terms
              </a>
              <a href="#" className="font-body text-sm text-gray-500 hover:text-orange-500 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
