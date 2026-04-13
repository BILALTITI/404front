"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormState({ name: "", email: "", company: "", budget: "", message: "" });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 lg:py-40 bg-gray-900 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 grid-pattern opacity-5" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-12 h-px bg-orange-500" />
              <span className="font-heading text-sm font-semibold tracking-[0.2em] uppercase text-orange-500">
                Get in Touch
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Let's Build
              <br />
              <span className="gradient-text">Something Great</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-400 font-body mb-10 leading-relaxed"
            >
              Ready to transform your digital presence? We'd love to hear about
              your project. Share your vision and let's explore how we can bring
              it to life together.
            </motion.p>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-orange-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-heading text-sm text-gray-500">
                    Email us
                  </div>
                  <a
                    href="mailto:hello@404solutions.com"
                    className="font-heading text-white hover:text-orange-500 transition-colors"
                  >
                    hello@404solutions.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-orange-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <div className="font-heading text-sm text-gray-500">
                    Call us
                  </div>
                  <a
                    href="tel:+1234567890"
                    className="font-heading text-white hover:text-orange-500 transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-orange-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div className="font-heading text-sm text-gray-500">
                    Visit us
                  </div>
                  <span className="font-heading text-white">
                    San Francisco, CA
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex gap-4 mt-10"
            >
              {["twitter", "linkedin", "instagram", "dribbble"].map(
                (social) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="font-heading text-xs uppercase">
                      {social.slice(0, 2)}
                    </span>
                  </motion.a>
                ),
              )}
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-white/10"
            >
              <div className="space-y-6">
                {/* Name and Email row */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-heading text-sm text-gray-400 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-heading text-sm text-gray-400 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                </div>

                {/* Company and Budget row */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-heading text-sm text-gray-400 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formState.company}
                      onChange={(e) =>
                        setFormState({ ...formState, company: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label className="block font-heading text-sm text-gray-400 mb-2">
                      Budget Range
                    </label>
                    <select
                      value={formState.budget}
                      onChange={(e) =>
                        setFormState({ ...formState, budget: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body focus:outline-none focus:border-orange-500 transition-colors"
                    >
                      <option value="" className="bg-gray-900">
                        Select budget
                      </option>
                      <option value="10k-25k" className="bg-gray-900">
                        $10K - $25K
                      </option>
                      <option value="25k-50k" className="bg-gray-900">
                        $25K - $50K
                      </option>
                      <option value="50k-100k" className="bg-gray-900">
                        $50K - $100K
                      </option>
                      <option value="100k+" className="bg-gray-900">
                        $100K+
                      </option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block font-heading text-sm text-gray-400 mb-2">
                    Project Details
                  </label>
                  <textarea
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    placeholder="Tell us about your project, goals, and timeline..."
                    required
                  />
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-orange-500 text-white font-heading font-semibold rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </motion.svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                    </>
                  )}
                </motion.button>

                <p className="text-center text-sm text-gray-500 font-body">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
