"use client";

import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Services } from "../components/Services";
import { Projects } from "../components/Projects";
import { Testimonials } from "../components/Testimonials";
import { Process } from "../components/Process";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { CustomCursor } from "../components/CustomCursor";

export default function Home() {
  return (
    <main className="min-h-screen">
      <CustomCursor />
      <Navigation />
      <Hero />
      <Projects />
      <About />
      <Services />
      <Testimonials />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
