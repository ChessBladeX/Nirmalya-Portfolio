import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import {
  Code2,
  Cpu,
  Layers,
  Server,
  Smartphone,
  Database,
  Flame,
  Globe,
  Palette,
  Terminal,
} from "lucide-react";

interface TechItem {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Mobile & Systems" | "Database";
  level: string;
  glowColor: string;
  borderColor: string;
  icon: React.ReactNode;
  description: string;
  experience: string;
  signatureRgba: string;
}

export const TECH_ITEMS: TechItem[] = [
  {
    id: "react",
    name: "React",
    category: "Frontend",
    level: "Core Architecture",
    glowColor: "rgba(97, 218, 251, 0.25)",
    signatureRgba: "rgba(97, 218, 251, 0.15)",
    borderColor: "rgba(97, 218, 251, 0.4)",
    icon: <Globe className="w-6 h-6 text-[#61DAFB]" />,
    description: "Concurrent rendering, custom hooks, Virtual DOM, SSR & hydration architecture.",
    experience: "Production Grade",
  },
  {
    id: "kotlin",
    name: "Kotlin",
    category: "Mobile & Systems",
    level: "Native Engine",
    glowColor: "rgba(127, 82, 255, 0.25)",
    signatureRgba: "rgba(127, 82, 255, 0.15)",
    borderColor: "rgba(127, 82, 255, 0.4)",
    icon: <Smartphone className="w-6 h-6 text-[#7F52FF]" />,
    description: "Coroutines, Jetpack Compose, type-safe multiplatform native engineering.",
    experience: "Advanced Systems",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Database",
    level: "Data Persistence",
    glowColor: "rgba(0, 237, 100, 0.25)",
    signatureRgba: "rgba(0, 237, 100, 0.15)",
    borderColor: "rgba(0, 237, 100, 0.4)",
    icon: <Database className="w-6 h-6 text-[#00ED64]" />,
    description: "Aggregation pipelines, replica sets, index optimization, sharded clustering.",
    experience: "High Throughput",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    level: "Design Systems",
    glowColor: "rgba(56, 189, 248, 0.25)",
    signatureRgba: "rgba(56, 189, 248, 0.15)",
    borderColor: "rgba(56, 189, 248, 0.4)",
    icon: <Palette className="w-6 h-6 text-[#38BDF8]" />,
    description: "Atomic utility design systems, CSS variables, glassmorphic themes.",
    experience: "Rapid UI/UX",
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    level: "Runtime & Streams",
    glowColor: "rgba(104, 160, 99, 0.25)",
    signatureRgba: "rgba(104, 160, 99, 0.15)",
    borderColor: "rgba(104, 160, 99, 0.4)",
    icon: <Server className="w-6 h-6 text-[#68A063]" />,
    description: "Event-driven asynchronous I/O, microservices, clustered background workers.",
    experience: "Scalable API",
  },
  {
    id: "express",
    name: "Express.js",
    category: "Backend",
    level: "RESTful Gateway",
    glowColor: "rgba(255, 255, 255, 0.25)",
    signatureRgba: "rgba(255, 255, 255, 0.15)",
    borderColor: "rgba(255, 255, 255, 0.35)",
    icon: <Terminal className="w-6 h-6 text-neutral-200" />,
    description: "Middleware chains, rate limiting, token authentication, secure routing.",
    experience: "Zero-Latency Endpoints",
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Frontend",
    level: "ESNext Engine",
    glowColor: "rgba(247, 223, 30, 0.25)",
    signatureRgba: "rgba(247, 223, 30, 0.15)",
    borderColor: "rgba(247, 223, 30, 0.4)",
    icon: <Code2 className="w-6 h-6 text-[#F7DF1E]" />,
    description: "Event loops, closures, memory profiling, Web Workers, Canvas 2D/WebGL.",
    experience: "Mastery Level",
  },
  {
    id: "android-studio",
    name: "Android Studio",
    category: "Mobile & Systems",
    level: "Mobile IDE & NDK",
    glowColor: "rgba(61, 220, 132, 0.25)",
    signatureRgba: "rgba(61, 220, 132, 0.15)",
    borderColor: "rgba(61, 220, 132, 0.4)",
    icon: <Cpu className="w-6 h-6 text-[#3DDC84]" />,
    description: "Gradle build automation, memory profiler, hardware acceleration, camera2 API.",
    experience: "Native Mobile Suite",
  },
  {
    id: "html5",
    name: "HTML5",
    category: "Frontend",
    level: "Semantic Foundation",
    glowColor: "rgba(227, 76, 38, 0.25)",
    signatureRgba: "rgba(227, 76, 38, 0.15)",
    borderColor: "rgba(227, 76, 38, 0.4)",
    icon: <Flame className="w-6 h-6 text-[#E34C26]" />,
    description: "Semantic structures, accessible ARIA roles, modern forms, Canvas & Media APIs.",
    experience: "Web Standard",
  },
  {
    id: "css3",
    name: "CSS3 / Modern CSS",
    category: "Frontend",
    level: "Layouts & Motion",
    glowColor: "rgba(38, 77, 228, 0.25)",
    signatureRgba: "rgba(38, 77, 228, 0.15)",
    borderColor: "rgba(38, 77, 228, 0.4)",
    icon: <Layers className="w-6 h-6 text-[#264DE4]" />,
    description: "CSS Grid, Subgrid, View Transitions, backdrop filters, 3D CSS transforms.",
    experience: "Pixel Precision",
  },
];


export const TechStack: React.FC = () => {
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);

  // GSAP Infinite Ribbon Marquee
  useEffect(() => {
    const el1 = marqueeRef1.current;
    const el2 = marqueeRef2.current;
    if (!el1 || !el2) return;

    // Row 1: Leftward continuous scroll
    const anim1 = gsap.to(el1, {
      xPercent: -50,
      ease: "none",
      duration: 35,
      repeat: -1,
    });

    // Row 2: Rightward continuous scroll
    const anim2 = gsap.fromTo(
      el2,
      { xPercent: -50 },
      {
        xPercent: 0,
        ease: "none",
        duration: 40,
        repeat: -1,
      }
    );

    return () => {
      anim1.kill();
      anim2.kill();
    };
  }, []);

  // Quadrupled tech list for seamless full-screen infinite ribbon across all viewport widths
  const marqueeList1 = [...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS];
  const marqueeList2 = [
    ...TECH_ITEMS.slice().reverse(),
    ...TECH_ITEMS.slice().reverse(),
    ...TECH_ITEMS.slice().reverse(),
    ...TECH_ITEMS.slice().reverse(),
  ];

  return (
    <section id="tech-stack" className="relative py-12 sm:py-16 w-full overflow-hidden">
      {/* Header (Constrained) */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 px-4 sm:px-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5" /> Core Competencies & Toolkit
        </div>
        <h2 className="section-title text-white">
          Full-Spectrum Engineering Engine
        </h2>
        <p className="body-text text-neutral-400">
          Hand-crafted across native mobile architectures, high-concurrency microservices,
          and immersive modern web interfaces with precision physics.
        </p>
      </div>

      {/* Infinite Ribbon Marquee: Full Screen Horizontal Edge-to-Edge */}
      <div
        className="relative w-full overflow-hidden py-3 select-none"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}
      >
        {/* Row 1: Leftward continuous scroll */}
        <div
          className="flex gap-4 mb-4 select-none"
          ref={marqueeRef1}
          style={{ width: "max-content" }}
        >
          {marqueeList1.map((item, idx) => (
            <div
              key={`row1-${item.id}-${idx}`}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-violet-500/50 backdrop-blur-md transition-all duration-300 whitespace-nowrap text-sm text-neutral-300 hover:text-white"
            >
              {item.icon}
              <span className="font-medium text-white">{item.name}</span>
              <span className="text-xs text-neutral-500 font-mono">[{item.category}]</span>
            </div>
          ))}
        </div>

        {/* Row 2: Rightward continuous scroll */}
        <div
          className="flex gap-4 select-none"
          ref={marqueeRef2}
          style={{ width: "max-content" }}
        >
          {marqueeList2.map((item, idx) => (
            <div
              key={`row2-${item.id}-${idx}`}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-indigo-500/50 backdrop-blur-md transition-all duration-300 whitespace-nowrap text-sm text-neutral-300 hover:text-white"
            >
              {item.icon}
              <span className="font-medium text-white">{item.name}</span>
              <span className="text-xs text-neutral-500 font-mono">[{item.category}]</span>
            </div>
          ))}
        </div>
      </div>

      {/* Full-width marquee ribbon only */}
    </section>
  );
};

export default TechStack;
