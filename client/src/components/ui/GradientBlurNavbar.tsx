import React from "react";

/**
 * Truly seamless progressive gradient blur.
 * Uses cubic-eased mask distributions across progressive backdrop-filter tiers
 * with zero hard borders or abrupt cutoffs, allowing underlying text to melt
 * into the ambient dark space seamlessly.
 */
const PROGRESSIVE_BLUR_STEPS = [
  {
    blur: "blur(24px)",
    mask: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0) 70%)",
  },
  {
    blur: "blur(12px)",
    mask: "linear-gradient(to bottom, rgba(0,0,0,1) 10%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 85%)",
  },
  {
    blur: "blur(6px)",
    mask: "linear-gradient(to bottom, rgba(0,0,0,1) 20%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0) 95%)",
  },
  {
    blur: "blur(2px)",
    mask: "linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.1) 85%, rgba(0,0,0,0) 100%)",
  },
];

interface GradientBlurNavbarProps {
  activeSection?: string;
  onNavigate?: (id: string) => void;
}

export const GradientBlurNavbar: React.FC<GradientBlurNavbarProps> = ({
  activeSection,
  onNavigate,
}) => {
  const navItems = [
    { id: "tech-stack", label: "Tech Stack" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(id);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 select-none pointer-events-none">
      {/* Seamless Progressive Blur Container extending smoothly into the viewport */}
      <div className="absolute top-0 left-0 right-0 h-20 sm:h-24 pointer-events-none overflow-hidden">
        {/* Eased Ambient Dark Gradient Base (No harsh bands, cubic easing to 0 opacity) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5, 5, 8, 0.88) 0%, rgba(5, 5, 8, 0.65) 30%, rgba(5, 5, 8, 0.32) 60%, rgba(5, 5, 8, 0.08) 85%, rgba(5, 5, 8, 0) 100%)",
          }}
        />

        {/* Stepped Progressive Blur Layers with Eased Masks */}
        {PROGRESSIVE_BLUR_STEPS.map((step, idx) => (
          <div
            key={idx}
            className="absolute inset-0 pointer-events-none"
            style={{
              backdropFilter: step.blur,
              WebkitBackdropFilter: step.blur,
              maskImage: step.mask,
              WebkitMaskImage: step.mask,
            }}
          />
        ))}
      </div>

      {/* Nav Content Bar */}
      <div className="relative px-5 sm:px-8 py-3 flex items-center justify-between pointer-events-auto">
        {/* Logo / Brand */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "hero")}
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-white hover:text-violet-300 transition-colors"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-violet-500 shadow-[0_0_10px_#8b5cf6]" />
          <span className="font-mono text-base font-bold tracking-tighter">
            CHESSBLADEX<span className="text-violet-400">.</span>
          </span>
        </a>

        {/* Navigation Text Links: Tech Stack, Projects, Contact */}
        <nav aria-label="Main Navigation" className="flex items-center gap-5 sm:gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative py-1 text-xs sm:text-sm font-medium tracking-tight transition-all duration-200 ${isActive
                  ? "text-white font-semibold"
                  : "text-neutral-400 hover:text-white"
                  }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full shadow-[0_0_8px_#8b5cf6]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Status & Meta Badges */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SYS_ONLINE</span>
          </div>
          <a
            href="https://github.com/chessbladex"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          >
            v2.4.0
          </a>
        </div>
      </div>
    </header>
  );
};

export default GradientBlurNavbar;
