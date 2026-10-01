import React from "react";
import { User, Cpu, Shield, Zap, Terminal } from "lucide-react";
import { RectangleButtons } from "./ui/RectangleButtons";

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Bio & Core Philosophy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono uppercase tracking-wider">
            <User className="w-3.5 h-3.5" /> Engineering Philosophy
          </div>

          <h2 className="section-title text-white">
            Constructing Resilient Software at the Intersection of AI and Native Code
          </h2>

          <p className="body-text text-neutral-300 text-base leading-relaxed">
            I am a software architect and systems engineer dedicated to building software
            that executes with deterministic reliability and surgical speed. My work spans
            high-throughput distributed microservices, edge computer vision inference pipelines,
            cryptographic and forensic media verification, and native Kotlin Android development.
          </p>

          <p className="body-text text-neutral-400 text-base leading-relaxed">
            Whether fine-tuning WebGL shaders, optimizing multi-threaded SIMD routines, or
            architecting distributed WebSocket gateways, I believe visual aesthetics and deep
            runtime performance must be unified.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <RectangleButtons
              variant="bloom-outline-button"
              href="#contact"
              icon={<Zap className="w-4 h-4 text-violet-300" />}
            >
              Initiate Collaboration
            </RectangleButtons>

            <RectangleButtons
              variant="ember-keycap"
              href="https://github.com/chessbladex"
              target="_blank"
              icon={<Terminal className="w-4 h-4 text-amber-400" />}
            >
              View GitHub Profile
            </RectangleButtons>
          </div>
        </div>

        {/* Right Column: Architectural Highlights Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-neutral-900/60 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2 text-violet-300">
              <Cpu className="w-5 h-5" />
              <h4 className="card-header text-white font-medium">Algorithmic Rigor</h4>
            </div>
            <p className="body-text text-sm text-neutral-400">
              Zero tolerance for bloated abstraction layers. Deep profiling using flamegraphs,
              cache-locality reasoning, and asynchronous concurrency models.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/60 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2 text-cyan-300">
              <Shield className="w-5 h-5" />
              <h4 className="card-header text-white font-medium">Defense-in-Depth Security</h4>
            </div>
            <p className="body-text text-sm text-neutral-400">
              Hardened API gateways, cryptographic integrity checks, rate-limiting shields,
              and strict data isolation principles across every pipeline.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/60 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2 text-emerald-300">
              <Zap className="w-5 h-5" />
              <h4 className="card-header text-white font-medium">Tactile Micro-Interactions</h4>
            </div>
            <p className="body-text text-sm text-neutral-400">
              Fluid 60+ FPS spring dynamics, magnetic cursor navigation, luminous shaders, and
              tactile feedback tailored for modern power users.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
