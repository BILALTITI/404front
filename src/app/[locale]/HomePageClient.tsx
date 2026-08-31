"use client";

import { MotionConfig } from "motion/react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Process } from "@/components/Process";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";

export function HomePageClient() {
  return (
    // reducedMotion="user" → visitors with prefers-reduced-motion get clean
    // opacity fades with no transform/blur movement, site-wide.
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen">
        <CustomCursor />
        <Navigation />
        <Hero />
        <Projects />
        <About />
        <Services />
        <Testimonials />
        <FAQ />
        <Process />
        <Contact />
        <Footer />
        <MobileStickyCTA />
      </main>
    </MotionConfig>
  );
}
