"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { MountGuard } from "./MountGuard";

type Tab = "message" | "meeting";

const API_BASE = "https://4o4soultions.premiumasp.net/";

type TimeOpt = { value: string; label: string };

export function Contact() {
  const t = useTranslations("contact");
  const times = t.raw("times") as TimeOpt[];
  const ph = t.raw("placeholders") as Record<string, string>;

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
    phone: "",
    date: "",
    time: "",
    topic: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  /** Set after mount so `min` matches client date and avoids SSR/client mismatch. */
  const [minDateStr, setMinDateStr] = useState("");

  useEffect(() => {
    setMinDateStr(new Date().toISOString().split("T")[0] ?? "");
  }, []);

  const postContact = async (body: Record<string, unknown>) => {
    const res = await fetch(`${API_BASE}api/ContactUs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      let detail = t("errorGeneric");
      try {
        const data = (await res.json()) as { detail?: string; title?: string };
        if (data.detail) detail = data.detail;
        else if (data.title) detail = data.title;
      } catch {
        /* use default */
      }
      throw new Error(detail);
    }
  };

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      await postContact({
        type: "message",
        name: formState.name.trim(),
        email: formState.email.trim(),
        phone: formState.phone.trim(),
        topic: formState.budget || null,
        message: formState.message.trim(),
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setFormState({ name: "", email: "", phone: "", budget: "", message: "" });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : t("errorFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMeetingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      await postContact({
        type: "meeting",
        name: meetingState.name.trim(),
        email: meetingState.email.trim(),
        phone: meetingState.phone.trim(),
        preferredDate: meetingState.date,
        preferredTime: meetingState.time,
        meetingTopic: meetingState.topic,
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setMeetingState({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        topic: "",
      });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : t("errorFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 lg:py-40 bg-gray-900 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 start-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 end-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 grid-pattern opacity-5" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-12 h-px bg-orange-500" />
              <span className="font-heading text-sm font-semibold tracking-[0.2em] uppercase text-orange-500">
                {t("eyebrow")}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {t("titleLine1")}
              <br />
              <span className="gradient-text">{t("titleGradient")}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-400 font-body mb-10 leading-relaxed"
            >
              {t("intro")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-5"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
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
                    {t("emailLabel")}
                  </div>
                  <a
                    href="mailto:contact@4o4solutions.com"
                    className="font-heading text-white hover:text-orange-500 transition-colors"
                  >
                    contact@4o4solutions.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-orange-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <div className="font-heading text-sm text-gray-500">
                    {t("responseLabel")}
                  </div>
                  <span className="font-heading text-white">
                    {t("responseValue")}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-orange-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <div className="font-heading text-sm text-gray-500">
                    {t("scheduleLabel")}
                  </div>
                  <span className="font-heading text-white">
                    {t("scheduleValue")}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-white/10">
              <MountGuard
                fallback={
                  <div
                    className="min-h-[28rem] rounded-2xl bg-white/[0.03] border border-white/5 animate-pulse"
                    aria-hidden
                  />
                }
              >
                <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10 mb-8">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("message");
                    setSubmitted(false);
                    setSubmitError(null);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-heading text-sm font-semibold transition-all duration-200"
                  style={{
                    backgroundColor:
                      activeTab === "message" ? "#f97316" : "transparent",
                    color:
                      activeTab === "message"
                        ? "white"
                        : "rgba(255,255,255,0.4)",
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                  {t("tabMessage")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("meeting");
                    setSubmitted(false);
                    setSubmitError(null);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-heading text-sm font-semibold transition-all duration-200"
                  style={{
                    backgroundColor:
                      activeTab === "meeting" ? "#f97316" : "transparent",
                    color:
                      activeTab === "meeting"
                        ? "white"
                        : "rgba(255,255,255,0.4)",
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
                  </svg>
                  {t("tabMeeting")}
                </button>
              </div>

              {activeTab === "message" && (
                <form onSubmit={handleMessageSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-heading text-sm text-gray-400 mb-2">
                        {t("name")}
                      </label>
                      <input
                        type="text"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder={ph.name}
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-heading text-sm text-gray-400 mb-2">
                        {t("email")}
                      </label>
                      <input
                        type="email"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder={ph.email}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-heading text-sm text-gray-400 mb-2">
                      {t("phone")}
                    </label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={(e) =>
                        setFormState({ ...formState, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder={ph.phone}
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-heading text-sm text-gray-400 mb-2">
                      {t("topicMessage")}
                    </label>
                    <select
                      value={formState.budget}
                      onChange={(e) =>
                        setFormState({ ...formState, budget: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body focus:outline-none focus:border-orange-500 transition-colors"
                    >
                      <option value="" className="bg-gray-900">
                        {t("selectTopic")}
                      </option>
                      <option value="new-project" className="bg-gray-900">
                        {t("topicNew")}
                      </option>
                      <option value="existing-project" className="bg-gray-900">
                        {t("topicExisting")}
                      </option>
                      <option value="consultation" className="bg-gray-900">
                        {t("topicConsult")}
                      </option>
                      <option value="partnership" className="bg-gray-900">
                        {t("topicPartner")}
                      </option>
                      <option value="other" className="bg-gray-900">
                        {t("topicOther")}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-heading text-sm text-gray-400 mb-2">
                      {t("projectDetails")}
                    </label>
                    <textarea
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                      placeholder={ph.message}
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
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path
                            d="M5 13l4 4L19 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{t("messageSent")}</span>
                      </>
                    ) : isSubmitting ? (
                      <>
                        <motion.svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
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
                        <span>{t("sending")}</span>
                      </>
                    ) : (
                      <>
                        <span>{t("sendMessage")}</span>
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

                  {submitError && (
                    <p
                      className="text-center text-sm text-red-400 font-body"
                      role="alert"
                    >
                      {submitError}
                    </p>
                  )}
                  <p className="text-center text-sm text-gray-500 font-body">
                    {t("footnoteMessage")}
                  </p>
                </form>
              )}

              {activeTab === "meeting" && (
                <form onSubmit={handleMeetingSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-heading text-sm text-gray-400 mb-2">
                        {t("name")}
                      </label>
                      <input
                        type="text"
                        value={meetingState.name}
                        onChange={(e) =>
                          setMeetingState({
                            ...meetingState,
                            name: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder={ph.name}
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-heading text-sm text-gray-400 mb-2">
                        {t("email")}
                      </label>
                      <input
                        type="email"
                        value={meetingState.email}
                        onChange={(e) =>
                          setMeetingState({
                            ...meetingState,
                            email: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder={ph.email}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-heading text-sm text-gray-400 mb-2">
                      {t("phone")}
                    </label>
                    <input
                      type="tel"
                      value={meetingState.phone}
                      onChange={(e) =>
                        setMeetingState({
                          ...meetingState,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder={ph.phone}
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-heading text-sm text-gray-400 mb-2">
                        {t("preferredDate")}
                      </label>
                      <input
                        type="date"
                        value={meetingState.date}
                        onChange={(e) =>
                          setMeetingState({
                            ...meetingState,
                            date: e.target.value,
                          })
                        }
                        min={minDateStr || undefined}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body focus:outline-none focus:border-orange-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-heading text-sm text-gray-400 mb-2">
                        {t("preferredTime")}
                      </label>
                      <select
                        value={meetingState.time}
                        onChange={(e) =>
                          setMeetingState({
                            ...meetingState,
                            time: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body focus:outline-none focus:border-orange-500 transition-colors"
                        required
                      >
                        <option value="" className="bg-gray-900">
                          {t("pickTime")}
                        </option>
                        {times.map((opt) => (
                          <option
                            key={opt.value}
                            value={opt.value}
                            className="bg-gray-900"
                          >
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-heading text-sm text-gray-400 mb-2">
                      {t("topicMeeting")}
                    </label>
                    <select
                      value={meetingState.topic}
                      onChange={(e) =>
                        setMeetingState({
                          ...meetingState,
                          topic: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body focus:outline-none focus:border-orange-500 transition-colors"
                      required
                    >
                      <option value="" className="bg-gray-900">
                        {t("selectTopic")}
                      </option>
                      <option value="new-project" className="bg-gray-900">
                        {t("topicNew")}
                      </option>
                      <option value="existing-project" className="bg-gray-900">
                        {t("topicExistingMeeting")}
                      </option>
                      <option value="consultation" className="bg-gray-900">
                        {t("topicConsult")}
                      </option>
                      <option value="partnership" className="bg-gray-900">
                        {t("topicPartner")}
                      </option>
                      <option value="other" className="bg-gray-900">
                        {t("topicOther")}
                      </option>
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
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path
                            d="M5 13l4 4L19 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{t("meetingRequested")}</span>
                      </>
                    ) : isSubmitting ? (
                      <>
                        <motion.svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
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
                        <span>{t("booking")}</span>
                      </>
                    ) : (
                      <>
                        <span>{t("requestMeeting")}</span>
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <path
                            d="M16 2v4M8 2v4M3 10h18"
                            strokeLinecap="round"
                          />
                        </svg>
                      </>
                    )}
                  </motion.button>

                  {submitError && (
                    <p
                      className="text-center text-sm text-red-400 font-body"
                      role="alert"
                    >
                      {submitError}
                    </p>
                  )}
                  <p className="text-center text-sm text-gray-500 font-body">
                    {t("footnoteMeeting")}
                  </p>
                </form>
              )}
              </MountGuard>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
