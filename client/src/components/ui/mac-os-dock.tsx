import React, {
  useState,
  useRef,
  useContext,
  createContext,
  useEffect,
} from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Home,
  User,
  Briefcase,
  Cpu,
  Mail,
  Sun,
  Moon,
} from "lucide-react";
import {
  GithubIcon,
  LinkedInIcon,
  XIcon,
  InstagramIcon,
} from "./Icons";

// Shared mouse position context
const MouseContext = createContext<{ x: number; y: number }>({ x: 0, y: 0 });

interface DockItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

const Tooltip: React.FC<{ content: string; children: React.ReactNode }> = ({
  content,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.95 }}
          animate={{ opacity: 1, y: -4, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.95 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="absolute bottom-full mb-3 px-2.5 py-1 text-[11px] font-medium text-white/90 bg-neutral-900/90 border border-white/15 rounded-md shadow-2xl backdrop-blur-md whitespace-nowrap pointer-events-none z-50"
        >
          {content}
        </motion.div>
      )}
      {children}
    </div>
  );
};

const DockIcon: React.FC<DockItemProps> = ({
  icon,
  label,
  href,
  onClick,
  active,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouse = useContext(MouseContext);
  const distance = useMotionValue(Infinity);

  useEffect(() => {
    if (!ref.current || mouse.x === 0) {
      distance.set(Infinity);
      return;
    }
    const iconRect = ref.current.getBoundingClientRect();
    const containerRect = ref.current.parentElement?.getBoundingClientRect();
    if (!containerRect) return;

    const iconCenterX = iconRect.left + iconRect.width / 2;
    const mouseXAbsolute = containerRect.left + mouse.x;
    distance.set(Math.abs(mouseXAbsolute - iconCenterX));
  }, [mouse, distance]);

  // Dynamic distance-scaling continuous physics from dock2.md
  const widthTransform = useTransform(distance, [0, 110], [58, 44]);
  const springWidth = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 180,
    damping: 14,
  });

  const content = (
    <motion.div
      ref={ref}
      style={{ width: springWidth, height: springWidth }}
      whileTap={{ scale: 0.9 }}
      className={`relative aspect-square rounded-2xl flex items-center justify-center transition-colors cursor-pointer select-none ${
        active
          ? "bg-violet-600/35 text-white border border-violet-500/50 shadow-[0_0_15px_rgba(139,92,246,0.4)]"
          : "bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white border border-white/10"
      }`}
    >
      <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
      {active && (
        <span className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-violet-400" />
      )}
    </motion.div>
  );

  return (
    <Tooltip content={label}>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (onClick) {
              e.preventDefault();
              onClick();
            }
          }}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-2xl"
          aria-label={label}
        >
          {content}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-2xl"
          aria-label={label}
        >
          {content}
        </button>
      )}
    </Tooltip>
  );
};

const DockSeparator = () => (
  <div className="w-px h-6 bg-white/15 mx-1 self-center" aria-hidden="true" />
);

export interface MacOSDockProps {
  onNavigate?: (sectionId: string) => void;
  activeSection?: string;
}

export const MacOSDock: React.FC<MacOSDockProps> = ({
  onNavigate,
  activeSection = "hero",
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(true);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, currentTarget } = e;
    const { left } = currentTarget.getBoundingClientRect();
    setMousePos({ x: clientX - left, y: 0 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("light", isDark);
  };

  const scrollTo = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navItems = [
    { id: "hero", label: "Home", icon: <Home className="w-5 h-5" /> },
    { id: "tech-stack", label: "Tech Stack", icon: <Cpu className="w-5 h-5" /> },
    { id: "projects", label: "Projects", icon: <Briefcase className="w-5 h-5" /> },
    { id: "contact", label: "Contact", icon: <Mail className="w-5 h-5" /> },
  ];

  const socialLinks = [
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
      label: "X / Twitter",
      href: "https://x.com",
      icon: <XIcon className="w-4 h-4" />,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/neel.raw",
      icon: <InstagramIcon className="w-4 h-4" />,
    },
  ];

  return (
    <MouseContext.Provider value={mousePos}>
      <nav
        aria-label="Dock Navigation"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex items-center gap-1.5 px-3 py-2 bg-neutral-900/75 dark:bg-neutral-950/80 backdrop-blur-2xl border border-white/12 rounded-3xl shadow-[0_24px_48px_-12px_rgba(0,0,0,0.65)] hover:border-white/20 transition-all duration-300"
        >
          {/* Main Navigation Items */}
          {navItems.map((item) => (
            <DockIcon
              key={item.id}
              label={item.label}
              icon={item.icon}
              active={activeSection === item.id}
              onClick={() => scrollTo(item.id)}
            />
          ))}

          <DockSeparator />

          {/* Social Links */}
          {socialLinks.map((item) => (
            <DockIcon
              key={item.label}
              label={item.label}
              icon={item.icon}
              href={item.href}
            />
          ))}

          <DockSeparator />

          {/* Theme Toggle Button */}
          <DockIcon
            label={isDark ? "Light Mode" : "Dark Mode"}
            icon={
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 0 : 180 }}
                transition={{ duration: 0.4 }}
              >
                {isDark ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-violet-300" />}
              </motion.div>
            }
            onClick={toggleTheme}
          />
        </motion.div>
      </nav>
    </MouseContext.Provider>
  );
};

export default MacOSDock;
