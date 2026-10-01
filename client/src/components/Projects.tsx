import React, { useRef } from "react";
import gsap from "gsap";
import { RectangleButtons } from "./ui/RectangleButtons";
import { GithubIcon } from "./ui/Icons";
import {
  Sparkles,
  Shield,
  Eye,
  Activity,
  Navigation,
  ArrowUpRight,
} from "lucide-react";

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  features: string[];
  stack: string[];
  metrics: { label: string; value: string };
  icon: React.ReactNode;
  gradient: string;
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
}

export const PROJECTS: ProjectData[] = [
  {
    id: "eagleeye",
    title: "EagleEye Productions",
    subtitle: "Real-time Multi-stream Vision & Anomaly Detection",
    category: "Computer Vision & Edge AI",
    description:
      "Industrial edge vision pipeline processing distributed RTSP video streams. Delivers sub-15ms multi-class object localization, facial recognition, and event anomaly classification.",
    features: [
      "Hardware-accelerated CUDA and TensorRT inference pipeline",
      "Automated intruder and anomaly detection alerts",
      "Multi-camera synchronous dashboard with instant telemetry",
    ],
    stack: ["Python", "OpenCV", "Node.js", "Express", "MongoDB", "WebSockets"],
    metrics: { label: "Inference Latency", value: "< 14ms Latency" },
    icon: <Eye className="w-6 h-6 text-cyan-400" />,
    gradient: "from-cyan-950/40 via-blue-900/20 to-neutral-900/60",
    githubUrl: "https://github.com/ChessBladeX/EagleEyeProductions",
    featured: false,
  },
  {
    id: "photofraus",
    title: "Photofraus AI",
    subtitle: "Deepfake Detection & Image Tampering Forensics",
    category: "Forensics & Neural Networks",
    description:
      "Forensic neural analysis suite detecting generative AI manipulation, copy-move forgery, splicing, and compression artifact anomalies with pixel-level attribution masks.",
    features: [
      "Frequency-domain DCT artifact analysis",
      "Attention-guided tamper localization heatmap",
      "Detailed forensic PDF report export with cryptographic hashes",
    ],
    stack: ["React", "Kotlin / Android", "FastAPI", "PyTorch", "Tailwind CSS"],
    metrics: { label: "Tamper Accuracy", value: "99.4% ROC-AUC" },
    icon: <Shield className="w-6 h-6 text-emerald-400" />,
    gradient: "from-emerald-950/40 via-teal-900/20 to-neutral-900/60",
    githubUrl: "https://github.com/ChessBladeX/Photofraus-AI",
    featured: false,
  },
  {
    id: "drfriend",
    title: "Dr. Friend AI",
    subtitle: "Clinical Symptom Assistant & Medical Triage Engine",
    category: "Healthcare & LLM Systems",
    description:
      "Conversational health assistant providing preliminary triage, differential diagnosis recommendations, drug interaction checks, and emergency routing with clinical accuracy safeguards.",
    features: [
      "RAG architecture grounding medical ontologies (SNOMED-CT)",
      "Strict HIPAA-compliant privacy and ephemeral caching",
      "Multilingual clinical voice and transcription pipeline",
    ],
    stack: ["React", "Express", "Node.js", "MongoDB", "Tailwind CSS"],
    metrics: { label: "Diagnostic F1", value: "0.96 Precision" },
    icon: <Activity className="w-6 h-6 text-rose-400" />,
    gradient: "from-rose-950/40 via-pink-900/20 to-neutral-900/60",
    githubUrl: "https://github.com/ChessBladeX/Dr-Friend-AI",
    featured: false,
  },
  {
    id: "idr-nav",
    title: "IDR Navigation",
    subtitle: "Autonomous Indoor & GPS-Denied Wayfinding",
    category: "Robotics & Spatial Computing",
    description:
      "Native mobile navigation suite fusing accelerometer, gyroscope, Wi-Fi fingerprinting, and visual odometry for continuous orientation in subterranean and shielded facilities.",
    features: [
      "Dead-reckoning Kalman Filter sensor fusion",
      "Offline floorplan vector rasterization & graph routing",
      "Kotlin Coroutines native low-power background service",
    ],
    stack: ["Android Studio", "Kotlin", "Jetpack Compose", "Spatial SQLite"],
    metrics: { label: "Drift Error", value: "< 0.8m / 100m" },
    icon: <Navigation className="w-6 h-6 text-amber-400" />,
    gradient: "from-amber-950/40 via-orange-900/20 to-neutral-900/60",
    githubUrl: "https://github.com/ChessBladeX/IDR-Navigation",
    featured: false,
  },
];

const ProjectCard: React.FC<{ project: ProjectData }> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const dx = (x - centerX) / centerX;
    const dy = (y - centerY) / centerY;

    gsap.to(card, {
      rotateX: -dy * 8,
      rotateY: dx * 8,
      transformPerspective: 1200,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
      className={`project-card group relative p-7 sm:p-8 rounded-3xl bg-neutral-900/70 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl ${
        project.featured ? "lg:col-span-2" : "col-span-1"
      }`}
    >
      {/* Background ambient gradient glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 group-hover:opacity-85 transition-opacity duration-500 pointer-events-none`}
      />

      {/* Top Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
              {project.icon}
            </div>
            <div>
              <span className="code-badge text-xs text-violet-300 uppercase tracking-wider">
                {project.category}
              </span>
              <h3 className="card-header text-white font-semibold flex items-center gap-2">
                {project.title}
                {project.featured && (
                  <span className="px-2 py-0.5 text-[10px] uppercase font-mono font-medium rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                    Flagship
                  </span>
                )}
              </h3>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-mono text-neutral-400 block">
              {project.metrics.label}
            </span>
            <span className="text-sm font-semibold font-mono text-violet-300">
              {project.metrics.value}
            </span>
          </div>
        </div>

        <p className="text-sm text-neutral-300 font-medium mb-3">
          {project.subtitle}
        </p>
        <p className="body-text text-sm text-neutral-400 mb-6">
          {project.description}
        </p>

        {/* Feature Highlights */}
        <div className="space-y-2 mb-6">
          {project.features.map((feat, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Stack & CTAs */}
      <div className="relative z-10 pt-6 border-t border-white/10 space-y-5">
        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="code-badge px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-neutral-300 text-[11px]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTAs using authored RectangleButtons */}
        <div className="flex items-center gap-3 pt-2">
          {project.liveUrl && (
            <RectangleButtons
              variant="bloom-outline-button"
              href={project.liveUrl}
              target="_blank"
              icon={<ArrowUpRight className="w-4 h-4" />}
            >
              Live Demo
            </RectangleButtons>
          )}

          <RectangleButtons
            variant="ember-keycap"
            href={project.githubUrl}
            target="_blank"
            icon={<GithubIcon className="w-4 h-4" />}
          >
            Inspect Source
          </RectangleButtons>
        </div>
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative py-14 sm:py-18 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Featured Architecture & Deployments
        </div>
        <h2 className="section-title text-white">
          Engineered Systems & Intelligence
        </h2>
        <p className="body-text text-neutral-400">
          A showcase of high-performance software systems spanning distributed neural inference,
          edge computer vision, deepfake forensics, and native mobile engines.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {PROJECTS.map((proj) => (
          <ProjectCard key={proj.id} project={proj} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
