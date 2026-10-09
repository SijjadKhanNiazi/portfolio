import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Layout,
  Server,
  Database,
  ShieldCheck,
  Sparkles,
  Zap,
  Layers,
  Terminal,
  CheckCircle2,
  Box,
  KeyRound,
  GitBranch,
  Wrench,
  Flame,
  ArrowUpRight,
} from "lucide-react";

// ─── Categorized Tech Stack Data ─────────────────────────────────────────────
const SKILL_CATEGORIES = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    tagline: "Reactive Architectures & High-Performance UIs",
    icon: Layout,
    accentGradient: "from-[#ff6b2c] via-amber-400 to-[#ea580c]",
    badgeTheme: "text-[#ff9a52] bg-[#ff6b2c]/10 border-[#ff6b2c]/25",
    skills: [
      { name: "JavaScript (ES6+)", tag: "Language", highlight: true, note: "Async/Await, Closures, DOM" },
      { name: "React.js", tag: "Library", highlight: true, note: "Custom Hooks, Concurrency" },
      { name: "Next.js", tag: "Framework", highlight: true, note: "App Router, SSR, Server Actions" },
      { name: "Tailwind CSS", tag: "Styling", highlight: false, note: "Utility Systems, Modern Themes" },
      { name: "GSAP", tag: "Animation", highlight: false, note: "Timelines & ScrollTrigger" },
      { name: "Zustand", tag: "State", highlight: false, note: "Atomic State Management" },
      { name: "TanStack Query", tag: "Data Fetching", highlight: false, note: "Cache Invalidation & Hydration" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Cloud",
    tagline: "High-Throughput APIs, GenAI & Microservices",
    icon: Server,
    accentGradient: "from-amber-400 via-[#ff6b2c] to-amber-600",
    badgeTheme: "text-amber-400 bg-amber-500/10 border-amber-500/25",
    skills: [
      { name: "Node.js", tag: "Runtime", highlight: true, note: "Event-Driven Non-Blocking I/O" },
      { name: "Express.js", tag: "Server", highlight: false, note: "Routing, Middleware Pipelines" },
      { name: "FastAPI", tag: "Framework", highlight: true, note: "High-Speed Async Python" },
      { name: "Python", tag: "Language", highlight: true, note: "Data Handling & Automation" },
      { name: "RESTful APIs", tag: "Architecture", highlight: false, note: "Contract Design & Auth" },
      { name: "LangChain", tag: "GenAI", highlight: true, note: "Chains, Agents & Memory" },
      { name: "RAG Pipelines", tag: "Vector AI", highlight: true, note: "Chunking, Vector Search" },
      { name: "AWS", tag: "Cloud", highlight: false, note: "EC2, S3, Core Infrastructure" },
      { name: "Docker", tag: "DevOps", highlight: true, note: "Containers & Docker Compose" },
    ],
  },
  {
    id: "databases",
    title: "Databases & Caching",
    tagline: "Relational, NoSQL & Sub-Millisecond Layers",
    icon: Database,
    accentGradient: "from-[#ff6b2c] via-rose-500 to-amber-500",
    badgeTheme: "text-rose-400 bg-rose-500/10 border-rose-500/25",
    skills: [
      { name: "Redis", tag: "In-Memory", highlight: true, note: "Sub-ms Cache & Pub/Sub" },
      { name: "PostgreSQL", tag: "Relational", highlight: true, note: "Complex Queries & Indexes" },
      { name: "MongoDB", tag: "Document", highlight: false, note: "Mongoose & Aggregation" },
      { name: "MySQL", tag: "Relational", highlight: false, note: "ACID Compliance & Normalization" },
    ],
  },
  {
    id: "security",
    title: "Security & Tooling",
    tagline: "Identity, Defense, Testing & Version Control",
    icon: ShieldCheck,
    accentGradient: "from-emerald-400 via-[#ff6b2c] to-teal-500",
    badgeTheme: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
    skills: [
      { name: "OAuth2", tag: "Identity", highlight: true, note: "Authorization Handshakes" },
      { name: "Helmet.js", tag: "Security", highlight: false, note: "HTTP Header Fortification" },
      { name: "Clerk", tag: "Auth", highlight: false, note: "Modern Authentication SDK" },
      { name: "Git", tag: "VCS", highlight: false, note: "Feature Branches & Rebasing" },
      { name: "GitHub", tag: "Collaboration", highlight: false, note: "Actions & Code Review" },
      { name: "Postman", tag: "Testing", highlight: false, note: "Endpoint Verification" },
      { name: "Figma", tag: "Design", highlight: false, note: "UI Wireframing & Specs" },
    ],
  },
];

// Dual Marquee Rows
const TICKER_ROW_1 = [
  "React.js",
  "Next.js 14",
  "FastAPI",
  "LangChain RAG",
  "Redis Cache",
  "PostgreSQL",
  "Docker",
  "Node.js",
  "Tailwind CSS",
  "MongoDB",
];

const TICKER_ROW_2 = [
  "Python",
  "Express.js",
  "OAuth2",
  "Zustand",
  "TanStack Query",
  "AWS",
  "REST APIs",
  "Clerk Auth",
  "Git & GitHub",
  "Helmet.js",
];

// ─── Aceternity Dynamic Spotlight Bento Card ─────────────────────────────────
function TechCategoryCard({ category, index }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const IconComponent = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-3xl border border-white/[0.08] bg-[#0c0a09]/85 backdrop-blur-2xl p-6 sm:p-7 overflow-hidden transition-all duration-300 hover:border-[#ff6b2c]/40 hover:shadow-[0_0_35px_rgba(255,107,44,0.12)] flex flex-col justify-between"
    >
      {/* Aceternity Spotlight Gradient */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 107, 44, 0.14), transparent 80%)`
            : "none",
        }}
      />

      {/* Subtle top accent gradient */}
      <div className={`h-[1.5px] bg-gradient-to-r ${category.accentGradient} mb-5 opacity-60 group-hover:opacity-100 transition-opacity`} />

      <div className="relative z-10">
        {/* Card Header */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#ff9a52] group-hover:scale-110 group-hover:border-[#ff6b2c]/40 transition-all duration-300">
              <IconComponent className="w-5 h-5 text-[#ff6b2c]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-100 transition-colors">
                {category.title}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {category.tagline}
              </p>
            </div>
          </div>

          <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${category.badgeTheme}`}>
            {category.skills.length} Stack Tools
          </span>
        </div>

        {/* Skill Badges Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5">
          {category.skills.map((skill, sIdx) => (
            <motion.div
              key={skill.name}
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className={`p-3 rounded-xl border transition-all duration-200 cursor-default flex flex-col justify-between ${
                skill.highlight
                  ? "bg-white/[0.04] border-white/[0.1] hover:border-[#ff6b2c]/60 hover:bg-[#ff6b2c]/[0.06] hover:shadow-[0_0_15px_rgba(255,107,44,0.18)]"
                  : "bg-white/[0.02] border-white/[0.06] hover:border-white/20 hover:bg-white/[0.05]"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      skill.highlight ? "bg-[#ff6b2c]" : "bg-slate-500"
                    }`}
                  />
                  {skill.name}
                </span>

                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                    skill.highlight
                      ? "bg-[#ff6b2c]/15 text-[#ff9a52] border border-[#ff6b2c]/25"
                      : "bg-white/[0.04] text-slate-400"
                  }`}
                >
                  {skill.tag}
                </span>
              </div>

              <p className="text-[10px] text-slate-400 line-clamp-1 font-mono">
                {skill.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Card Footer Status */}
      <div className="relative z-10 mt-6 pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-500">
        <span className="flex items-center gap-1 text-slate-400">
          <CheckCircle2 className="w-3 h-3 text-[#ff6b2c]" />
          Production &amp; Benchmark Validated
        </span>
        <span className="text-[#ff9a52]">Ready for Scale</span>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState("all");

  const filterTabs = [
    { id: "all", label: "Full Ecosystem", icon: Cpu },
    { id: "frontend", label: "Frontend", icon: Layout },
    { id: "backend", label: "Backend & Cloud", icon: Server },
    { id: "databases", label: "Databases & Cache", icon: Database },
    { id: "security", label: "Security & Tools", icon: ShieldCheck },
  ];

  const displayedCategories =
    activeTab === "all"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === activeTab);

  return (
    <section
      id="skills"
      className="relative py-24 sm:py-28 bg-[#090807] overflow-hidden border-t border-white/[0.06] isolate"
    >
      {/* ── Ambient Radial Glows ───────────────────────────────────────── */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#ff6b2c]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-40 w-96 h-96 bg-amber-500/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        {/* ── Section Header ──────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#ff9a52] backdrop-blur-md mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#ff6b2c]" />
            <span>PRODUCTION-READY CAPABILITIES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight"
          >
            Skills &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9a52] via-[#ff6b2c] to-amber-400">
              Modern Tech Stack
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base leading-relaxed mt-2"
          >
            An engineered stack spanning reactive client applications, high-concurrency
            backend APIs, in-memory caching layers, and grounded GenAI pipelines.
          </motion.p>
        </div>
      </div>

      {/* ── Dual Smooth Infinite Marquee Stream ────────────────────────── */}
      <div className="w-full mt-12 space-y-3 overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        {/* Row 1: Leftward Ticker */}
        <div className="animate-ticker flex items-center gap-3">
          {TICKER_ROW_1.concat(TICKER_ROW_1, TICKER_ROW_1).map((tech, idx) => (
            <div
              key={`r1-${idx}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.07] text-xs sm:text-sm font-medium text-slate-200 whitespace-nowrap hover:border-[#ff6b2c]/50 hover:text-white transition-all backdrop-blur-sm shadow-sm"
              aria-hidden={idx >= TICKER_ROW_1.length ? "true" : undefined}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b2c]" />
              <span>{tech}</span>
            </div>
          ))}
        </div>

        {/* Row 2: Rightward Ticker */}
        <div className="animate-ticker-reverse flex items-center gap-3">
          {TICKER_ROW_2.concat(TICKER_ROW_2, TICKER_ROW_2).map((tech, idx) => (
            <div
              key={`r2-${idx}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.07] text-xs sm:text-sm font-medium text-slate-200 whitespace-nowrap hover:border-amber-400/50 hover:text-white transition-all backdrop-blur-sm shadow-sm"
              aria-hidden={idx >= TICKER_ROW_2.length ? "true" : undefined}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Interactive Categorized Bento Grid ─────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 mt-16 relative z-10">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filterTabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-[#ff6b2c] to-[#ea580c] text-white font-semibold shadow-[0_0_20px_rgba(255,107,44,0.4)] scale-105"
                    : "bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]"
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Bento Grid Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className={`grid gap-6 ${
              displayedCategories.length === 1
                ? "grid-cols-1 max-w-3xl mx-auto"
                : "grid-cols-1 lg:grid-cols-2"
            }`}
          >
            {displayedCategories.map((category, idx) => (
              <TechCategoryCard
                key={category.id}
                category={category}
                index={idx}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Architectural Telemetry Strip ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 p-5 sm:p-6 rounded-2xl bg-[#0c0a09]/80 border border-white/[0.08] backdrop-blur-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#ff6b2c]/10 border border-[#ff6b2c]/20 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-[#ff6b2c]" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">~279 req/s Throughput</div>
              <div className="text-[11px] text-slate-400 font-mono">Tested with Redis &amp; APIs</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Grounded RAG Pipelines</div>
              <div className="text-[11px] text-slate-400 font-mono">LangChain &amp; Vector Embeddings</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Security-First Auth</div>
              <div className="text-[11px] text-slate-400 font-mono">OAuth2, Clerk &amp; Helmet.js</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
              <Box className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Production Containerized</div>
              <div className="text-[11px] text-slate-400 font-mono">Docker Compose &amp; Nginx</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
