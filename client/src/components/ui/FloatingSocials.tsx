import React from "react";
import { motion } from "framer-motion";
import { GithubIcon, LinkedInIcon, InstagramIcon } from "./Icons";

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/chessbladex",
    icon: <GithubIcon className="w-4 h-4" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nirmalya-karmakar-a42086345",
    icon: <LinkedInIcon className="w-4 h-4" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/neel.raw",
    icon: <InstagramIcon className="w-4 h-4" />,
  },
];

export const FloatingSocials: React.FC = () => {
  return (
    <aside
      aria-label="Social Profiles"
      className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5 items-center select-none"
    >
      {SOCIAL_LINKS.map((link, idx) => (
        <motion.div
          key={link.label}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.1 * idx,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative group flex items-center"
        >
          {/* Tooltip to the left */}
          <span
            className="absolute right-full mr-3 px-2.5 py-1 text-[11px] font-mono rounded-md bg-neutral-900/90 border border-white/15 text-white/90 shadow-xl backdrop-blur-md opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap"
            role="tooltip"
          >
            {link.label}
          </span>

          {/* Individual Button */}
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-neutral-900/80 backdrop-blur-xl border border-white/10 text-neutral-300 hover:text-white hover:border-violet-500/50 hover:bg-neutral-800/90 hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(139,92,246,0.35)]"
          >
            {link.icon}
          </a>
        </motion.div>
      ))}
    </aside>
  );
};

export default FloatingSocials;
