"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import Image from "next/image";

import { PROJECTS } from "../data/projects";

const projects = PROJECTS;

const INITIAL_VISIBLE = 6;
function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className="object-cover transition-transform duration-700 ease-out"
          style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-gray-950/20 to-transparent" />
        
        {/* Number overlay */}
        <div
          className="absolute top-4 right-4 font-display text-6xl font-bold leading-none opacity-20 select-none"
          style={{ color: project.accent }}
        >
          {project.number}
        </div>

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span
            className="px-3 py-1.5 rounded-full font-heading text-[10px] font-bold tracking-wider uppercase backdrop-blur-md"
            style={{
              backgroundColor: `${project.accent}22`,
              color: project.accent,
              border: `1px solid ${project.accent}44`,
            }}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="font-display text-2xl font-bold text-gray-950 mb-2 group-hover:text-orange-600 transition-colors">
          {project.title}
        </h3>

        {/* Subtitle */}
        <p className="font-heading text-xs font-semibold tracking-wider uppercase text-gray-400 mb-3">
          {project.subtitle}
        </p>

        {/* Description */}
        <p className="text-gray-600 font-body text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Result metric */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-8 rounded-full" style={{ backgroundColor: project.accent }} />
          <span className="font-heading text-xs font-semibold text-gray-500">
            {project.result}
          </span>
        </div>

        {/* Footer: Tags + Year */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex gap-1.5">
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-md bg-gray-50 font-heading text-[10px] text-gray-500"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="font-heading text-[10px] text-gray-400 tracking-wider">{project.year}</span>
        </div>
      </div>

      {/* Hover indicator */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ backgroundColor: project.accent }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.article>
  );
}

function FocusModal({
  project,
  onClose,
}: {
  project: (typeof projects)[0];
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-gray-950/80 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal content */}
      <motion.div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Hero image */}
        <div className="relative aspect-[21/9] overflow-hidden bg-gray-100">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-transparent" />
          
          {/* Floating number */}
          <div
            className="absolute bottom-8 right-8 font-display text-9xl font-bold leading-none opacity-10 select-none"
            style={{ color: project.accent }}
          >
            {project.number}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 sm:p-12">
          {/* Header */}
          <div className="flex items-start justify-between gap-6 mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="px-4 py-2 rounded-full font-heading text-xs font-bold tracking-wider uppercase"
                  style={{
                    backgroundColor: `${project.accent}15`,
                    color: project.accent,
                    border: `1px solid ${project.accent}30`,
                  }}
                >
                  {project.category}
                </span>
                <span className="font-heading text-xs text-gray-400 tracking-wider uppercase">
                  {project.year}
                </span>
              </div>
              
              <p className="font-heading text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: project.accent }}>
                {project.subtitle}
              </p>
              
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-950 mb-4">
                {project.title}
              </h2>
              
              <p className="text-gray-600 font-body text-lg leading-relaxed max-w-2xl">
                {project.description}
              </p>
            </div>
          </div>

          {/* Result highlight */}
          <div className="mb-8 p-6 rounded-2xl border-2 border-gray-100 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-12 rounded-full" style={{ backgroundColor: project.accent }} />
              <div>
                <div className="font-heading text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Key Result
                </div>
                <div className="font-display text-2xl font-bold" style={{ color: project.accent }}>
                  {project.result}
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full bg-gray-100 border border-gray-200 font-heading text-xs text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-heading font-bold text-white transition-transform hover:scale-105"
              style={{ backgroundColor: project.accent }}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                window.open(project.link, "_blank", "noopener,noreferrer");
                onClose();
              }}
            >
              <span>Visit live site</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          ) : (
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-heading font-bold text-white transition-transform hover:scale-105"
              style={{ backgroundColor: project.accent }}
              onClick={() => onClose()}
            >
              <span>Ask about this build</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [focusedProject, setFocusedProject] = useState<(typeof projects)[0] | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_VISIBLE);
  const hasMore = projects.length > INITIAL_VISIBLE;

  return (
    <section id="work" className="relative py-24 sm:py-32 bg-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,107,0,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header — unchanged */}
        <div className="mb-16">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-orange-500"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-heading text-xs font-bold tracking-[0.3em] uppercase text-orange-600">
              Web & mobile portfolio
            </span>
          </motion.div>

          <motion.h2
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-950 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Web & mobile apps
            <br />
            <span className="gradient-text" data-text="Built for real teams">
              built for real teams
            </span>
          </motion.h2>

          <motion.p
            className="text-gray-600 font-body text-lg max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A selection from <strong className="font-semibold text-gray-800">20+</strong> shipped
            builds—marketplaces, internal tools, mobile apps, and automation. Open a
            card for scope and stack; public links open in a new tab when available.
          </motion.p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.97 }}
                transition={{
                  duration: 0.4,
                  delay: index >= INITIAL_VISIBLE ? (index - INITIAL_VISIBLE) * 0.08 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => setFocusedProject(project)}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show more + CTA row */}
        <motion.div
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {hasMore && (
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-orange-500 text-white font-heading font-semibold hover:bg-orange-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-200"
            >
              <span>{showAll ? "Show less" : "View more"}</span>
              <motion.svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path d="M6 9l6 6 6-6" />
              </motion.svg>
            </button>
          )}

          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-gray-200 text-gray-700 font-heading font-semibold hover:border-orange-400 hover:text-orange-500 transition-all duration-300"
          >
            <span>Start your project</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Focus modal */}
      <AnimatePresence>
        {focusedProject && (
          <FocusModal project={focusedProject} onClose={() => setFocusedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
