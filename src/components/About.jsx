import { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Code2,
  Cpu,
  Sparkles,
  Server,
  Database,
  ArrowUpRight,
  Download,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  Compass,
  Zap,
  Flame,
  Layers,
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";

// ─── Aceternity-style Interactive Spotlight Card ─────────────────────────────
function SpotlightCard({ children, className = "", delay = 0 }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-3xl border border-white/[0.08] bg-[#0c0a09]/80 backdrop-blur-2xl p-6 sm:p-7 overflow-hidden transition-all duration-300 hover:border-[#ff6b2c]/40 hover:shadow-[0_0_35px_rgba(255,107,44,0.12)] ${className}`}
    >
      {/* Flashlight Spotlight Radial Follower */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 107, 44, 0.14), transparent 80%)`
            : "none",
        }}
      />

      {/* Subtle corner sheen */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#ff6b2c]/10 via-transparent to-transparent rounded-bl-full pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Internal Content */}
      <div className="relative z-10 flex flex-col h-full">{children}</div>
    </motion.div>
  );
}

export default function About() {
  const { personal, about } = portfolioData;

  return (
    <section
      id="about"
      className="relative py-24 sm:py-28 px-4 sm:px-8 lg:px-16 bg-[#090807] overflow-hidden border-t border-white/[0.06] isolate"
    >
      {/* ── Ambient Background Lighting ───────────────────────────────── */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#ff6b2c]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-amber-500/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Section Header ──────────────────────────────────────────── */}
        <div className="flex flex-col items-start gap-3 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#ff9a52] backdrop-blur-md"
          >
            <Compass className="w-3.5 h-3.5 text-[#ff6b2c]" />
            <span>ABOUT &amp; ARCHITECTURAL PHILOSOPHY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight"
          >
            Engineering with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9a52] via-[#ff6b2c] to-amber-400">
              Mathematical Rigor
            </span>{" "}
            &amp; Production Craft
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base leading-relaxed"
          >
            Gold Medalist Software Engineering graduate blending systematic computer
            science principles with high-throughput full-stack architectures and
            practical Retrieval-Augmented Generation (RAG) AI workflows.
          </motion.p>
        </div>

        {/* ── Metric Highlights Strip ─────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mt-12">
          {personal.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-4 sm:p-5 rounded-2xl bg-[#0c0a09]/80 border border-white/[0.07] backdrop-blur-md hover:border-[#ff6b2c]/40 hover:bg-[#120f0d] transition-all duration-300 group hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white group-hover:text-[#ff9a52] transition-colors">
                  {stat.value}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b2c] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5 font-mono">
                {stat.detail}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Aceternity Bento Grid ───────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mt-8">
          {/* ── BENTO CARD 1: Professional Background & Core Story (7 cols) ── */}
          <SpotlightCard className="lg:col-span-7 flex flex-col justify-between" delay={0.1}>
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-[#ff9a52]">
                  <Award className="w-3.5 h-3.5 text-[#ff6b2c]" />
                  <span>THE FOUNDATION &amp; JOURNEY</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  Ex-10Pearls &amp; Flyrank
                </span>
              </div>

              {/* Title & Narrative */}
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
                From Academic Gold Medalist to Production Engineer
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                {about.bio}
              </p>

              {/* Distinction Bullet Points */}
              <div className="space-y-2.5 pt-1 mb-5">
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#ff6b2c] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white font-medium">Gold Medalist &amp; Batch Top Performer:</strong>{" "}
                    BS Software Engineering, Univ. of Mianwali with a 3.75 / 4.00 CGPA.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#ff6b2c] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white font-medium">National Skill Competency Test (NSCT):</strong>{" "}
                    Achieved 93.3% percentile, placing in the top 6.7% nationwide.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#ff6b2c] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white font-medium">Industry Proven:</strong> Hands-on
                    experience developing client frontends and scalable GenAI tools at 10Pearls and Flyrank AI.
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Terminal Snippet */}
            <div className="rounded-xl border border-white/[0.07] bg-black/50 p-3.5 font-mono text-[11px] text-slate-300 backdrop-blur-md">
              <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-white/[0.06] text-slate-500 text-[10px]">
                <span className="w-2 h-2 rounded-full bg-red-500/80" />
                <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-slate-400">~/philosophy.ts</span>
              </div>
              <div className="space-y-1">
                <p>
                  <span className="text-[#ff9a52]">const</span> engineer = &#123;
                </p>
                <p className="pl-4">
                  mindset: <span className="text-emerald-400">"Production-first &amp; resilient"</span>,
                </p>
                <p className="pl-4">
                  throughputTarget: <span className="text-amber-300">"~279 req/s with Redis cache"</span>,
                </p>
                <p className="pl-4">
                  standard: <span className="text-emerald-400">"Zero compromise on scalability"</span>
                </p>
                <p>&#125;;</p>
              </div>
            </div>
          </SpotlightCard>

          {/* ── BENTO CARD 2: Core Engineering Philosophy (5 cols) ───────── */}
          <SpotlightCard className="lg:col-span-5 flex flex-col justify-between" delay={0.2}>
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-[#ff9a52]">
                  <Flame className="w-3.5 h-3.5 text-[#ff6b2c]" />
                  <span>CORE PILLARS</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Architectural DNA</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
                Architectures Built for Scale &amp; Performance
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
                Writing code is only half the battle. Crafting architectures that remain
                fault-tolerant under high concurrency, with low latency and clean modular
                boundaries, is the real craft.
              </p>

              {/* 3 Principles with Icons */}
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#ff6b2c]/10 border border-[#ff6b2c]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-4 h-4 text-[#ff6b2c]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Sub-Second Low Latency</h4>
                    <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                      Redis in-memory caching layers and index optimization to minimize database overhead.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Layers className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Clean Modular Boundaries</h4>
                    <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                      Separation of concerns between state, business logic, authentication, and presentation.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Practical AI Integration</h4>
                    <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                      Grounded LLM applications with LangChain, FastAPI, vector chunking, and semantic retrieval.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Pipeline Strip */}
            <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1 text-[#ff9a52]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Architecture
              </span>
              <span>Next.js ➔ Redis ➔ FastAPI ➔ Vector</span>
            </div>
          </SpotlightCard>

          {/* ── BENTO CARD 3: Full-Stack Web Focus (4 cols) ─────────────── */}
          <SpotlightCard className="lg:col-span-4" delay={0.3}>
            <div className="w-10 h-10 rounded-2xl bg-[#ff6b2c]/10 border border-[#ff6b2c]/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5 text-[#ff6b2c]" />
            </div>

            <div className="text-[10px] font-mono text-[#ff9a52] uppercase tracking-wider mb-1">
              Frontend &amp; Modern Frameworks
            </div>
            <h4 className="text-lg font-bold text-white mb-2">
              Full-Stack Web Engineering
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Designing clean, reactive user interfaces with Next.js App Router, SSR,
              Tailwind CSS, and smooth interaction states using Framer Motion.
            </p>

            <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-white/[0.06]">
              {["React", "Next.js 14", "Tailwind CSS", "Zustand", "TypeScript"].map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-slate-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </SpotlightCard>

          {/* ── BENTO CARD 4: High-Throughput APIs & Caching (4 cols) ────── */}
          <SpotlightCard className="lg:col-span-4" delay={0.35}>
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Server className="w-5 h-5 text-amber-400" />
            </div>

            <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider mb-1">
              Backend &amp; High Concurrency
            </div>
            <h4 className="text-lg font-bold text-white mb-2">
              REST APIs, Redis &amp; Caching
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Building secure REST endpoints in Node.js and FastAPI, pairing in-memory
              Redis caching to handle peak traffic with minimal database strain.
            </p>

            <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-white/[0.06]">
              {["Node.js", "Express", "FastAPI", "Redis", "PostgreSQL", "MongoDB"].map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-slate-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </SpotlightCard>

          {/* ── BENTO CARD 5: GenAI & RAG Pipelines (4 cols) ─────────────── */}
          <SpotlightCard className="lg:col-span-4" delay={0.4}>
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>

            <div className="text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1">
              Intelligent Workflows
            </div>
            <h4 className="text-lg font-bold text-white mb-2">
              Practical GenAI &amp; RAG
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Developing retrieval-augmented generation pipelines, context chunking,
              and vector embeddings with LangChain and vector databases for high accuracy.
            </p>

            <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-white/[0.06]">
              {["LangChain", "FastAPI", "Vector DBs", "Docker", "Nginx"].map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-slate-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </SpotlightCard>
        </div>

        {/* ── Bottom Quick Action Row ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-10 p-5 sm:p-6 rounded-2xl bg-[#0c0a09]/70 border border-white/[0.08] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div>
              <p className="text-xs sm:text-sm font-semibold text-white">
                Looking for a dependable Full-Stack or GenAI Engineer?
              </p>
              <p className="text-[11px] text-slate-400">
                Available for full-time software engineering roles and strategic contracts.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href="#contact"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff6b2c] to-[#ea580c] hover:from-[#ff7c43] hover:to-[#f97316] text-white text-xs font-semibold shadow-[0_0_20px_rgba(255,107,44,0.35)] transition-all active:scale-95"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="/cv.pdf"
              download="Muhammad_Sijjad_Khan_CV.pdf"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-slate-200 hover:text-white text-xs font-medium backdrop-blur-md transition-all active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-[#ff9a52]" />
              <span>Download CV</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
