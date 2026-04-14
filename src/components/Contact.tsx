"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";

type Tab = "message" | "meeting";

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<Tab>("message");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: "",
  });
  const [meetingState, setMeetingState] = useState({
    name: "",
    email: "",
    phone:"",
    date: "",
    time: "",
    topic: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormState({ name: "", email: "", phone: "", budget: "", message: "" });
  };

  const handleMeetingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setMeetingState({ name: "", email: "", phone: "", date: "", time: "", topic: "" });
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

          {/* ── Left: Content ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-12 h-px bg-orange-500" />
              <span className="font-heading text-sm font-semibold tracking-[0.2em] uppercase text-orange-500">
                Work With Us
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Got an Idea?
              <br />
              <span className="gradient-text">Let's Talk.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-400 font-body mb-10 leading-relaxed"
            >
              Whether you have a fully-formed brief or just a rough idea on a
              napkin — we want to hear it. Send us a message or book a meeting
              directly with our team. No sales pitch, just a real conversation.
            </motion.p>

            {/* Two ways to reach us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-5"
            >
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-heading text-sm text-gray-500">Drop us a line</div>
                  <a href="mailto:contact@4o4solutions.com" className="font-heading text-white hover:text-orange-500 transition-colors">
                    contact@4o4solutions.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2A19.77 19.77 0 013 5.18 2 2 0 015 3h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.91 10.91a16 16 0 007.17 7.17l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <div className="font-heading text-sm text-gray-500">Call us</div>
                  <a href="tel:+962791234567" className="font-heading text-white hover:text-orange-500 transition-colors">
                    +962 79 123 4567
                  </a>
                </div>
              </div>

              {/* Response time badge */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <div className="font-heading text-sm text-gray-500">Response time</div>
                  <span className="font-heading text-white">Within 24 hours — always.</span>
                </div>
              </div>

              {/* Meeting availability */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <div className="font-heading text-sm text-gray-500">Schedule a call</div>
                  <span className="font-heading text-white">Sun – Thu, 9 AM – 6 PM (AST)</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Right: Tabbed Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-white/10">

              {/* Tab switcher */}
              <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10 mb-8">
                <button
                  type="button"
                  onClick={() => { setActiveTab("message"); setSubmitted(false); }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-heading text-sm font-semibold transition-all duration-200"
                  style={{
                    backgroundColor: activeTab === "message" ? "#f97316" : "transparent",
                    color: activeTab === "message" ? "white" : "rgba(255,255,255,0.4)",
                  }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                  Send a Message
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab("meeting"); setSubmitted(false); }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-heading text-sm font-semibold transition-all duration-200"
                  style={{
                    backgroundColor: activeTab === "meeting" ? "#f97316" : "transparent",
                    color: activeTab === "meeting" ? "white" : "rgba(255,255,255,0.4)",
                  }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
                  </svg>
                  Book a Meeting
                </button>
              </div>

              {/* ── Message Form ── */}
              {activeTab === "message" && (
                <form onSubmit={handleMessageSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-heading text-sm text-gray-400 mb-2">Your Name</label>
                      <input
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-heading text-sm text-gray-400 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-heading text-sm text-gray-400 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="+962 79 123 4567"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-heading text-sm text-gray-400 mb-2">What is this message about?</label>
                    <select
                      value={formState.budget}
                      onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body focus:outline-none focus:border-orange-500 transition-colors"
                    >
                      <option value="" className="bg-gray-900">Select a topic</option>
                      <option value="new-project" className="bg-gray-900">Starting a new project</option>
                      <option value="existing-project" className="bg-gray-900">Helping with an existing project</option>
                      <option value="consultation" className="bg-gray-900">General consultation</option>
                      <option value="partnership" className="bg-gray-900">Partnership opportunity</option>
                      <option value="other" className="bg-gray-900">Something else</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-heading text-sm text-gray-400 mb-2">Project Details</label>
                    <textarea
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                      placeholder="Tell us about your project, goals, and timeline..."
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting || submitted}
                    className="w-full py-4 bg-orange-500 text-white font-heading font-semibold rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {submitted ? (
                      <>
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Message Sent!</span>
                      </>
                    ) : isSubmitting ? (
                      <>
                        <motion.svg className="w-5 h-5" viewBox="0 0 24 24" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </motion.svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-sm text-gray-500 font-body">
                    We'll get back to you within 24 hours.
                  </p>
                </form>
              )}

              {/* ── Meeting Form ── */}
              {activeTab === "meeting" && (
                <form onSubmit={handleMeetingSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-heading text-sm text-gray-400 mb-2">Your Name</label>
                      <input
                        type="text"
                        value={meetingState.name}
                        onChange={(e) => setMeetingState({ ...meetingState, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-heading text-sm text-gray-400 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={meetingState.email}
                        onChange={(e) => setMeetingState({ ...meetingState, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-heading text-sm text-gray-400 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={meetingState.phone}
                      onChange={(e) => setMeetingState({ ...meetingState, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="+962 79 123 4567"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-heading text-sm text-gray-400 mb-2">Preferred Date</label>
                      <input
                        type="date"
                        value={meetingState.date}
                        onChange={(e) => setMeetingState({ ...meetingState, date: e.target.value })}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body focus:outline-none focus:border-orange-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-heading text-sm text-gray-400 mb-2">Preferred Time (AST)</label>
                      <select
                        value={meetingState.time}
                        onChange={(e) => setMeetingState({ ...meetingState, time: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body focus:outline-none focus:border-orange-500 transition-colors"
                        required
                      >
                        <option value="" className="bg-gray-900">Pick a time</option>
                        <option value="09:00" className="bg-gray-900">9:00 AM</option>
                        <option value="10:00" className="bg-gray-900">10:00 AM</option>
                        <option value="11:00" className="bg-gray-900">11:00 AM</option>
                        <option value="12:00" className="bg-gray-900">12:00 PM</option>
                        <option value="13:00" className="bg-gray-900">1:00 PM</option>
                        <option value="14:00" className="bg-gray-900">2:00 PM</option>
                        <option value="15:00" className="bg-gray-900">3:00 PM</option>
                        <option value="16:00" className="bg-gray-900">4:00 PM</option>
                        <option value="17:00" className="bg-gray-900">5:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-heading text-sm text-gray-400 mb-2">What's the meeting about?</label>
                    <select
                      value={meetingState.topic}
                      onChange={(e) => setMeetingState({ ...meetingState, topic: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body focus:outline-none focus:border-orange-500 transition-colors"
                      required
                    >
                      <option value="" className="bg-gray-900">Select a topic</option>
                      <option value="new-project" className="bg-gray-900">Starting a new project</option>
                      <option value="existing-project" className="bg-gray-900">Continuing an existing project</option>
                      <option value="consultation" className="bg-gray-900">General consultation</option>
                      <option value="partnership" className="bg-gray-900">Partnership opportunity</option>
                      <option value="other" className="bg-gray-900">Something else</option>
                    </select>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting || submitted}
                    className="w-full py-4 bg-orange-500 text-white font-heading font-semibold rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {submitted ? (
                      <>
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Meeting Requested!</span>
                      </>
                    ) : isSubmitting ? (
                      <>
                        <motion.svg className="w-5 h-5" viewBox="0 0 24 24" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </motion.svg>
                        <span>Booking...</span>
                      </>
                    ) : (
                      <>
                        <span>Request Meeting</span>
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
                        </svg>
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-sm text-gray-500 font-body">
                    Available Sun – Thu, 9 AM – 6 PM (AST). We'll confirm within a few hours.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}