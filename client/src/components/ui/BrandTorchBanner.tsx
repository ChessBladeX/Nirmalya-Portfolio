import React, { useRef, useEffect } from "react";
import gsap from "gsap";

/**
 * Big CHESSBLADEX Outlined Typography Banner
 * - Resting state: Pure ghost-outlined bordered text
 * - Hover state: Text fills with solid luminous white and radiates an intense neon glow aura under the cursor torch
 * - Seamless: Floating circular torch beam with zero box clipping or rectangular borders
 */
export const BrandTorchBanner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowTextRef = useRef<HTMLDivElement>(null);
  const torchBeamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glowText = glowTextRef.current;
    const torchBeam = torchBeamRef.current;
    if (!container || !glowText || !torchBeam) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      currentX = targetX;
      currentY = targetY;

      gsap.to([glowText, torchBeam], {
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to([glowText, torchBeam], {
        opacity: 0,
        duration: 0.45,
        ease: "power2.out",
      });
    };

    // Smooth physics lerp loop
    const render = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;

      // Radial spotlight mask: smoothly reveals the solid white filled & glowing text under the cursor
      const mask = `radial-gradient(circle 280px at ${currentX}px ${currentY}px, black 0%, rgba(0,0,0,0.95) 30%, rgba(0,0,0,0.3) 65%, transparent 80%)`;
      glowText.style.maskImage = mask;
      glowText.style.webkitMaskImage = mask;

      // Move the seamless floating circular torch beam (centered on cursor)
      torchBeam.style.transform = `translate3d(${currentX - 260}px, ${currentY - 260}px, 0)`;

      animationFrameId = requestAnimationFrame(render);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="CHESSBLADEX Emblem"
      className="relative w-full select-none py-14 sm:py-20 flex items-center justify-center cursor-default group"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
      }}
    >
      {/* Seamless Floating Circular Torch Beam (Soft organic falloff, zero box clipping) */}
      <div
        ref={torchBeamRef}
        className="absolute top-0 left-0 w-[520px] h-[520px] rounded-full pointer-events-none opacity-0 z-0 blur-3xl transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.38) 0%, rgba(139, 92, 246, 0.22) 30%, rgba(99, 102, 241, 0.08) 50%, rgba(99, 102, 241, 0) 70%, transparent 100%)",
          willChange: "transform",
        }}
      />

      {/* 1. Base Layer: Ghost Outlined Bordered Text (Always Visible) */}
      <div className="relative z-10 w-full flex items-center justify-center px-4">
        <h2
          className="text-[11.5vw] sm:text-[13vw] lg:text-[14.5vw] font-black uppercase tracking-[-0.04em] leading-none pointer-events-none text-transparent text-center select-none"
          style={{
            WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.16)",
          }}
        >
          CHESSBLADEX
        </h2>
      </div>

      {/* 2. Glow Torch Lit Layer: Filled with solid white and radiant multi-tiered neon glow */}
      <div
        ref={glowTextRef}
        className="absolute inset-0 z-20 w-full flex items-center justify-center px-4 pointer-events-none opacity-0 transition-opacity duration-300"
      >
        <h2
          className="text-[11.5vw] sm:text-[13vw] lg:text-[14.5vw] font-black uppercase tracking-[-0.04em] leading-none pointer-events-none text-white text-center select-none"
          style={{
            filter:
              "drop-shadow(0 0 15px rgba(255, 255, 255, 1)) drop-shadow(0 0 35px rgba(192, 132, 252, 0.95)) drop-shadow(0 0 65px rgba(168, 85, 247, 0.8)) drop-shadow(0 0 100px rgba(139, 92, 246, 0.55))",
          }}
        >
          CHESSBLADEX
        </h2>
      </div>
    </section>
  );
};

export default BrandTorchBanner;
