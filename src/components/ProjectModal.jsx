import { useEffect } from "react";
import { X, ExternalLink, CheckCircle2, Layers, Cpu, Activity, Sparkles } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#12100f] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-orange-950/40 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Title */}
        <div className="space-y-1 pr-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff6b2c]/10 border border-[#ff6b2c]/20 text-xs font-mono text-[#ff9a52]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{project.category}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
            {project.title}
          </h2>
          <p className="text-sm font-medium text-amber-400 font-mono">
            {project.subtitle}
          </p>
        </div>

        {/* Reserved Screenshot Placeholder Banner */}
        <div className="mt-6 w-full h-48 sm:h-56 rounded-2xl border-2 border-dashed border-white/20 bg-white/[0.02] flex flex-col items-center justify-center text-center p-6 transition-all hover:border-[#ff6b2c]/50">
          <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-3 text-slate-400">
            <Layers className="w-6 h-6 text-[#ff6b2c]" />
          </div>
          <span className="text-sm font-semibold text-slate-200">
            Project Screenshot Placeholder
          </span>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            Reserved container for live application interface capture. Drop image into project assets to replace.
          </p>
        </div>

        {/* Summary */}
        <div className="mt-6">
          <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-2">
            Overview
          </h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Highlights */}
        <div className="mt-6">
          <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-3">
            Key Architectural Highlights
          </h3>
          <div className="space-y-2.5">
            {project.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#ff6b2c] shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features & Architecture if present */}
        {project.details && (
          <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
            <div className="text-xs font-mono text-[#ff9a52] flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>Architecture: {project.details.architecture}</span>
            </div>
            {project.details.testResults && (
              <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                <span>Benchmark: {project.details.testResults}</span>
              </div>
            )}
          </div>
        )}

        {/* Tech Stack Chips */}
        <div className="mt-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            Technologies & Libraries
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((item, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-xs font-medium text-slate-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Links Footer */}
        <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff6b2c] to-[#ff9a52] text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(255,107,44,0.4)] hover:scale-105 transition-all"
              >
                <span>Open Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-white font-semibold text-xs sm:text-sm transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Repository</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
