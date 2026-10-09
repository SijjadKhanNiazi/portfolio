import { useState } from "react";
import {
  FolderGit2,
  ExternalLink,
  Info,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { portfolioData } from "../data/portfolioData";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const { projects } = portfolioData;
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filterTabs = [
    { id: "all", label: "All Projects" },
    { id: "featured", label: "Featured" },
    { id: "fullstack", label: "Full-Stack & Next.js" },
    { id: "ai", label: "AI & RAG" },
    { id: "backend", label: "Backend & Systems" },
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    if (filter === "featured") return p.featured;
    if (filter === "fullstack")
      return (
        p.category.includes("Full-Stack") ||
        p.category.includes("Next.js") ||
        p.category.includes("MERN")
      );
    if (filter === "ai")
      return p.category.includes("GenAI") || p.category.includes("AI");
    if (filter === "backend")
      return p.category.includes("Backend") || p.category.includes("DevOps");
    return true;
  });

  return (
    <section
      id="projects"
      className="relative py-20 px-5 sm:px-8 lg:px-16 bg-[#090807] overflow-hidden border-t border-white/5"
    >
      {/* Ambient Radial Spotlight */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#ff6b2c]/8 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#ff9a52]">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>SELECTED WORKS & ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mt-3">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9a52] to-[#ff6b2c]">
                Projects
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mt-2">
              Production web applications, high-concurrency microservices, and
              retrieval-augmented AI systems with verified deliverables.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  filter === tab.id
                    ? "bg-[#ff6b2c] text-black font-semibold shadow-[0_0_15px_rgba(255,107,44,0.35)]"
                    : "bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col justify-between p-5 sm:p-6 rounded-3xl bg-white/[0.025] border border-white/10 backdrop-blur-md hover:border-[#ff6b2c]/40 hover:bg-white/[0.04] transition-all group"
            >
              <div>
                {/* Project Image or Fallback Placeholder */}
                <div className="relative w-full h-44 rounded-2xl border border-white/10 bg-black/40 flex flex-col items-center justify-center overflow-hidden group-hover:border-[#ff6b2c]/40 transition-colors">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4 text-center">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-slate-400 mb-2 group-hover:scale-110 transition-transform">
                        <Layers className="w-5 h-5 text-[#ff6b2c]" />
                      </div>
                      <span className="text-xs font-semibold text-slate-300">
                        Project preview coming soon
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                        Reserved for live screenshot
                      </span>
                    </div>
                  )}

                  {/* Corner Category Tag */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#ff9a52] z-10">
                    {project.category}
                  </div>
                </div>

                {/* Project Title & Subtitle */}
                <div className="mt-5 space-y-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#ff9a52] transition-colors">
                    {project.title}
                  </h3>
                  <div className="text-xs font-mono text-slate-400">
                    {project.subtitle}
                  </div>
                </div>

                {/* Short Summary */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3 line-clamp-3">
                  {project.summary}
                </p>

                {/* Key Highlights (1-2 crisp items) */}
                <div className="mt-4 space-y-1.5">
                  {project.highlights.slice(0, 2).map((hl, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-400"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ff6b2c] shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-medium text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ff6b2c]/10 hover:bg-[#ff6b2c]/20 border border-[#ff6b2c]/30 text-xs font-semibold text-[#ff9a52] transition-colors"
                      title="Open Live Demonstration"
                    >
                      <span>Live</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                      title="View GitHub Repository"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                >
                  <Info className="w-3.5 h-3.5 text-[#ff6b2c]" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
