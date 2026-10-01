import React from "react";
import { RectangleButtons } from "./ui/RectangleButtons";
import { Terminal, Zap } from "lucide-react";
import { GithubIcon } from "./ui/Icons";

interface HeroProps {
  onExplore?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[80vh] sm:min-h-[84vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-10 max-w-5xl mx-auto"
    >
      {/* Status Pill Badge */}
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-neutral-900/80 border border-violet-500/30 text-violet-300 text-xs font-mono mb-6 backdrop-blur-xl shadow-lg hover:border-violet-500/50 transition-all duration-300">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="tracking-wide">FULL-STACK & AI DEVELOPER</span>
        <span className="text-white/20">|</span>
        <span className="text-neutral-400">Available For Full Stack AI apps</span>
      </div>

      {/* Hero Title (clamp(3rem, 7vw, 6rem), Weight: 700, Tracking: -0.035em, Line-height: 1.05) */}
      <h1 className="hero-title text-white max-w-4xl mb-4 sm:mb-5">
        Nirmalya{" "}
        <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
          Karmakar
        </span>{" "}
      </h1>

      {/* Hero Subtitle */}
      <p className="body-text text-neutral-300 max-w-2xl text-base sm:text-lg mb-8 leading-relaxed">
        Engineering intelligent neural systems, edge computer vision pipelines, and tactile
        full stack AI software and Android applications with high performance and mathematical precision.
      </p>

      {/* Primary & Secondary Action CTAs (from Button2.md) */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-10 sm:mb-12">
        {/* Primary Hero CTA: bloom-outline-button (magnetic ink-bloom outline with dark-glass backing) */}
        <RectangleButtons
          variant="bloom-outline-button"
          onClick={() => {
            if (onExplore) {
              onExplore();
            } else {
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }
          }}
          icon={<Zap className="w-4 h-4 text-violet-300" />}
        >
          Explore Portfolio
        </RectangleButtons>

        {/* Secondary CTA: ember-keycap variant for tactile terminal/repo inspection */}
        <RectangleButtons
          variant="ember-keycap"
          href="https://github.com/chessbladex"
          target="_blank"
          icon={<GithubIcon className="w-4 h-4 text-amber-400" />}
        >
          Github
        </RectangleButtons>
      </div>

      {/* Quick Proof Metrics Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10 pt-6 sm:pt-8 border-t border-white/10 w-full max-w-3xl">
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
            99.9<span className="text-violet-400">%</span>
          </div>
          <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider mt-1">
            System Reliability
          </p>
        </div>

        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
            &lt; 15<span className="text-cyan-400">ms</span>
          </div>
          <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider mt-1">
            Edge Vision Latency
          </p>
        </div>

        <div className="col-span-2 sm:col-span-1 text-center">
          <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
            99.4<span className="text-emerald-400">%</span>
          </div>
          <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider mt-1">
            Neural Tamper Detection
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
