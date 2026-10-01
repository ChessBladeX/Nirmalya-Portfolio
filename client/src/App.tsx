import React, { Suspense, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { PredictiveArcCanvas } from "./components/ui/PredictiveArcCanvas";
import { FloatingSocials } from "./components/ui/FloatingSocials";
import { CustomCursor } from "./components/CustomCursor";
import { Hero } from "./components/Hero";
import { GradientBlurNavbar } from "./components/ui/GradientBlurNavbar";
import { BrandTorchBanner } from "./components/ui/BrandTorchBanner";

// Register GSAP ScrollTrigger plugin as specified in Step 5
gsap.registerPlugin(ScrollTrigger);

// Lazy-load non-critical view components for optimal Initial Viewport & LCP
const TechStack = React.lazy(() => import("./components/TechStack"));
const Projects = React.lazy(() => import("./components/Projects"));
const Contact = React.lazy(() => import("./components/Contact"));

// Sleek loading skeleton for Suspense boundary
const SectionLoadingSkeleton: React.FC<{ label: string }> = ({ label }) => (
  <div className="py-24 px-4 max-w-7xl mx-auto flex flex-col items-center justify-center space-y-4 opacity-50">
    <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
    <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
      Streaming {label}...
    </span>
  </div>
);

export function App() {
  const [activeSection, setActiveSection] = useState("hero");

  // GSAP ScrollTrigger Animations & Viewport Intersection Tracking
  useEffect(() => {
    // Wait for DOM layout pass
    const ctx = gsap.context(() => {
      // 1. Entrance animation for sections
      const sections = document.querySelectorAll<HTMLElement>("section");
      sections.forEach((section) => {
        if (section.id === "hero") return; // Hero animates immediately

        gsap.fromTo(
          section,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "top 40%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // 2. Staggered reveals for cards within sections
      const cardContainers = document.querySelectorAll(".grid");
      cardContainers.forEach((container) => {
        const cards = container.querySelectorAll(".tech-card, .project-card");
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 30, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.08,
              ease: "power4.out",
              scrollTrigger: {
                trigger: container,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // 3. Track active section for Dock sync
      const navSectionIds = ["hero", "tech-stack", "projects", "contact"];
      navSectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          ScrollTrigger.create({
            trigger: el,
            start: "top 50%",
            end: "bottom 50%",
            onEnter: () => setActiveSection(id),
            onEnterBack: () => setActiveSection(id),
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const handleDockNavigate = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#06050b] text-[#f5f5f7] overflow-x-hidden selection:bg-violet-500/30">
      {/* Interactive System Layer: Custom macOS Cursor & Glow Aura */}
      <CustomCursor />

      {/* Step 2: Background Engine Integration (background.md)
          High-performance WebGL canvas fixed behind the UI with pointer-events-none z-0 */}
      <PredictiveArcCanvas
        mode="dark"
        speed={0.60}
        brightness={1.0}
      />

      {/* Subtle Noise / Grain Overlay for cinematic analog depth */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.035] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"
        aria-hidden="true"
      />

      {/* Navigation Header with Progressive Gradient Blur & Nav Buttons */}
      <GradientBlurNavbar
        activeSection={activeSection}
        onNavigate={handleDockNavigate}
      />

      {/* Main Viewport Content Layer */}
      <main className="relative z-10 pt-2 pb-12 sm:pb-16">
        {/* Hero Section (Eagerly Loaded) */}
        <Hero onExplore={() => handleDockNavigate("projects")} />

        {/* Lazy Loaded Sections with Suspense */}
        <Suspense fallback={<SectionLoadingSkeleton label="Tech Stack" />}>
          <TechStack />
        </Suspense>

        <Suspense fallback={<SectionLoadingSkeleton label="Projects Engine" />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionLoadingSkeleton label="Telemetry & Contact" />}>
          <Contact />
        </Suspense>

        {/* Big Outlined CHESSBLADEX Brand Logo with Glow Torch Cursor */}
        <BrandTorchBanner />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 px-6 text-center text-xs font-mono text-neutral-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Systems Architecture & Engineering. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Runtime: WebGL r128</span>
            <span>·</span>
            <span>Physics: Framer Motion</span>
            <span>·</span>
            <span>Scroll: GSAP 3</span>
          </p>
        </div>
      </footer>

      {/* Vertical Individual Social Buttons at bottom right (GitHub, LinkedIn, Instagram) */}
      <FloatingSocials />
    </div>
  );
}

export default App;
