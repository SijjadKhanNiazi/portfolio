import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Download,
  MessageCircle,
  ChevronDown,
  Sparkles,
  Terminal,
  Cpu,
  Award,
  ShieldCheck,
  Code2,
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";

// ─── Animated cycling capabilities & telemetry details ───────────────────────
const ANIMATED_DETAILS = [
  {
    tag: "AI & RAG ARCHITECT",
    title: "GenAI & Vector Workflows",
    desc: "LangChain · FastAPI · RAG Pipelines · Embeddings",
    stat: "Production Ready",
    icon: Sparkles,
  },
  {
    tag: "SYSTEM BENCHMARK",
    title: "~279 req/s Throughput",
    desc: "Dockerized APIs · Redis Caching · 100% Reliability",
    stat: "High Performance",
    icon: Cpu,
  },
  {
    tag: "ACADEMIC HONOUR",
    title: "Gold Medalist · 1st Rank",
    desc: "BS Software Engineering · CGPA 3.75 / 4.00",
    stat: "Batch Top Performer",
    icon: Award,
  },
  {
    tag: "CORE FULL-STACK",
    title: "MERN · PERN · Next.js 14",
    desc: "Clean component architecture & reactive frontends",
    stat: "Full Lifecycle",
    icon: Code2,
  },
  {
    tag: "INDUSTRY EXPERIENCE",
    title: "10Pearls & Flyrank",
    desc: "Hands-on software development & agile team delivery",
    stat: "Verified Track Record",
    icon: ShieldCheck,
  },
  {
    tag: "NATIONAL TALENT",
    title: "93.3% NSCT Percentile",
    desc: "Ranked among top 6.7% nationwide in CS skills",
    stat: "National Recognition",
    icon: Award,
  },
];

function AnimatedRightCard({ current, idx, setIdx }) {
  const IconComponent = current.icon;

  return (
    <div className="w-full flex flex-col gap-2.5">
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0c0a09]/85 backdrop-blur-2xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group hover:border-[#ff6b2c]/40 transition-colors duration-300">
        {/* Accent top gradient bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/70 to-[#ff6b2c] mb-3 sm:mb-3.5" />

        {/* Header with Telemetry live pulse and counter */}
        <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[9px] sm:text-[10px] font-mono text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b2c] animate-pulse" />
            LIVE TELEMETRY
          </div>
          <div className="text-[10px] font-mono text-slate-500">
            <span className="text-[#ff9a52] font-semibold">0{idx + 1}</span> / 0{ANIMATED_DETAILS.length}
          </div>
        </div>

        {/* Cycling Animated Content */}
        <div className="min-h-[76px] sm:min-h-[82px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-1"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-[0.2em] text-[#ff9a52]">
                  <IconComponent className="w-3 h-3 text-[#ff6b2c]" />
                  {current.tag}
                </span>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  {current.stat}
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-white leading-tight">
                {current.title}
              </p>
              <p className="text-[11px] text-slate-400 leading-snug">
                {current.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Cycling Progress Indicator Dots */}
        <div className="flex items-center gap-1.5 pt-2.5 sm:pt-3 mt-2.5 sm:mt-3 border-t border-white/[0.06]">
          {ANIMATED_DETAILS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === idx
                  ? "w-6 sm:w-7 bg-gradient-to-r from-[#ff6b2c] to-amber-400 shadow-[0_0_10px_rgba(255,107,44,0.6)]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
          <span className="text-[9px] font-mono text-slate-500 ml-auto flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
            Auto-Sync
          </span>
        </div>
      </div>

      {/* Bottom Live Status Pill */}
      <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#0c0a09]/75 border border-white/[0.07] backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <span className="text-[10px] font-mono text-slate-300">Fast Response: &lt; 24h</span>
        </div>
        <span className="text-[9px] font-mono text-slate-500">Remote / Global</span>
      </div>
    </div>
  );
}

function DeveloperHUDCard() {
  return (
    <div className="w-full relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0c0a09]/85 backdrop-blur-2xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group hover:border-[#ff6b2c]/40 transition-colors duration-300">
      {/* Glowing accent border line */}
      <div className="h-px bg-gradient-to-r from-[#ff6b2c] via-amber-400/70 to-transparent mb-3 sm:mb-3.5" />

      {/* Top meta badges */}
      <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[10px] font-mono text-emerald-400">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          AVAILABLE FOR HIRE
        </div>
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/20 text-[9px] font-mono text-amber-300">
          <Award className="w-3 h-3 text-amber-400" />
          CGPA 3.75
        </div>
      </div>

      {/* Title & Tagline */}
      <div className="space-y-1 mb-3 sm:mb-4">
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#ff9a52] uppercase tracking-[0.16em]">
          <Terminal className="w-3 h-3 text-[#ff6b2c]" />
          Full-Stack &amp; GenAI Architect
        </div>
        <h2 className="text-base sm:text-lg font-black text-white leading-snug">
          Building Scalable Systems &amp;{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9a52] to-[#ff6b2c]">
            Intelligent AI Apps
          </span>
        </h2>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          High-throughput APIs, reactive web interfaces, and production RAG pipelines designed to scale.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-1 mb-3">
        <a
          href="#projects"
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#ff6b2c] to-[#ea580c] hover:from-[#ff7c43] hover:to-[#f97316] text-white text-xs font-semibold shadow-[0_0_20px_rgba(255,107,44,0.35)] hover:shadow-[0_0_25px_rgba(255,107,44,0.55)] transition-all duration-200 active:scale-95"
        >
          <span>Explore Work</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>

        <a
          href="https://wa.me/923144913624?text=Hi%20Sijjad%2C%20I%27d%20like%20to%20discuss%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp Message"
          className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-white/20 text-slate-200 hover:text-white text-xs font-medium backdrop-blur-md transition-all duration-200 active:scale-95"
        >
          <MessageCircle className="w-3.5 h-3.5 text-[#ff9a52]" />
          <span>Talk</span>
        </a>

        <a
          href="/cv.pdf"
          download="Muhammad_Sijjad_Khan_CV.pdf"
          aria-label="Download CV"
          className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-[#ff6b2c]/40 text-[#ff9a52] hover:text-[#ffb17a] text-xs font-medium backdrop-blur-md transition-all duration-200 active:scale-95"
        >
          <Download className="w-3.5 h-3.5" />
          <span>CV</span>
        </a>
      </div>

      {/* Tech Stack pills */}
      <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/[0.06]">
        {["Next.js", "LangChain", "Redis", "Docker"].map((stack) => (
          <span
            key={stack}
            className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-[9px] font-mono text-slate-400"
          >
            {stack}
          </span>
        ))}
        <span className="text-[9px] font-mono text-[#ff6b2c]/80 ml-auto">
          10Pearls &amp; Flyrank
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  const { heroServiceCards, heroChips } = portfolioData;
  const heroRef = useRef(null);

  const [mousePos, setMousePos] = useState({ x: 50, y: 45 });
  const [telemetryIdx, setTelemetryIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTelemetryIdx((i) => (i + 1) % ANIMATED_DETAILS.length), 2800);
    return () => clearInterval(t);
  }, []);

  const currentTelemetry = ANIMATED_DETAILS[telemetryIdx];

  // ── Scroll-linked parallax transforms ─────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const yPortrait = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const scalePortrait = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const yWatermark = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const opacityWatermark = useTransform(scrollYProgress, [0, 0.7], [0.3, 0.04]);
  const cardsY = useTransform(scrollYProgress, [0, 0.6], [0, -30]);
  const cardsOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top)  / rect.height) * 100,
    });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[calc(100vh-64px)] flex flex-col justify-between overflow-hidden bg-[#090807] isolate"
    >
      {/* ── 1. Mouse-reactive cinematic lighting ────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none transition-[background] duration-700 z-[1]"
        style={{
          background: `
            radial-gradient(circle 640px at ${mousePos.x}% ${mousePos.y}%, rgba(255,107,44,0.07), transparent 70%),
            radial-gradient(ellipse 700px 500px at 60% 40%, rgba(255,107,44,0.14), transparent 60%),
            radial-gradient(ellipse 600px 600px at 80% 75%, rgba(154,52,18,0.10), transparent 55%),
            #090807
          `,
        }}
      />

      {/* ── 2. Full-section bottom-up black gradient vignette ───────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: "linear-gradient(to top, #090807 0%, #090807 6%, rgba(9,8,7,0.55) 28%, transparent 60%)",
        }}
      />
      {/* Side vignettes */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#090807] to-transparent pointer-events-none z-[2]" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#090807] to-transparent pointer-events-none z-[2]" />

      {/* ── 3. Giant background name watermark with scroll parallax ─────── */}
      <motion.div
        style={{ y: yWatermark, opacity: opacityWatermark }}
        className="absolute inset-x-0 top-[6%] sm:top-[12%] lg:top-[15%] flex items-center justify-center pointer-events-none select-none overflow-hidden z-[3] px-2"
        aria-hidden="true"
      >
        <span className="text-[17vw] sm:text-[14vw] lg:text-[13vw] font-black tracking-[0.08em] sm:tracking-[0.12em] uppercase whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-b from-white/[0.08] via-white/[0.30] to-transparent leading-none">
          SIJJAD KHAN
        </span>
      </motion.div>

      {/* ── 4. Main content flex area ───────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-between">

        {/* ── Top Visual Stage: Portrait is BIG, commanding, and unobstructed ── */}
        <div className="relative w-full h-[52vh] sm:h-[60vh] lg:h-[76vh] min-h-[390px] sm:min-h-[480px] lg:min-h-[560px] flex items-end justify-center">

          {/* Portrait — anchored bottom-center, scales big and proud */}
          <motion.div
            style={{ y: yPortrait, scale: scalePortrait }}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-full max-w-full flex items-end justify-center z-[10] pointer-events-none select-none"
          >
            {/* Warm backlight blob behind portrait */}
            <div className="absolute top-2 sm:top-8 left-1/2 -translate-x-1/2 w-[280px] sm:w-[440px] lg:w-[560px] h-[280px] sm:h-[440px] lg:h-[560px] bg-gradient-to-b from-[#ff6b2c]/35 via-[#c2410c]/18 to-transparent rounded-full blur-[70px] sm:blur-[100px] pointer-events-none z-[4]" />
            {/* Spotlight ring */}
            <div className="absolute top-6 sm:top-12 left-1/2 -translate-x-1/2 w-[240px] sm:w-[380px] lg:w-[480px] h-[240px] sm:h-[380px] lg:h-[480px] rounded-full border border-[#ff6b2c]/25 shadow-[0_0_50px_rgba(255,107,44,0.15)] pointer-events-none z-[4]" />

            {/* The Big Prominent Hero Image */}
            <img
              src="/hero.png"
              alt="Portrait of Muhammad Sijjad Khan"
              className="relative z-[10] h-full w-auto max-w-[94vw] sm:max-w-[85vw] lg:max-w-none object-contain object-bottom drop-shadow-[0_25px_50px_rgba(0,0,0,0.98)] select-none scale-105 sm:scale-100"
              loading="eager"
              draggable={false}
            />
          </motion.div>

          {/* ── DESKTOP ONLY: Left-bottom redesigned developer HUD card ── */}
          <motion.div
            style={{ y: cardsY, opacity: cardsOpacity }}
            initial={{ opacity: 0, x: -25, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block absolute bottom-8 left-8 xl:left-14 z-[20] w-[320px] xl:w-[340px] max-w-[340px]"
          >
            <DeveloperHUDCard />
          </motion.div>

          {/* ── DESKTOP ONLY: Right-bottom animated telemetry details panel ── */}
          <motion.div
            style={{ y: cardsY, opacity: cardsOpacity }}
            initial={{ opacity: 0, x: 25, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex absolute bottom-8 right-8 xl:right-14 z-[20] w-[320px] xl:w-[340px] max-w-[340px] flex-col gap-2.5"
          >
            <AnimatedRightCard
              current={currentTelemetry}
              idx={telemetryIdx}
              setIdx={setTelemetryIdx}
            />
          </motion.div>

          {/* ── Center-bottom animated scroll indicator ─────────────────── */}
          <motion.div
            style={{ opacity: cardsOpacity }}
            className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-[25] hidden sm:flex flex-col items-center gap-1 cursor-pointer group select-none"
            onClick={() => {
              const el = document.getElementById("about") || document.getElementById("projects");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-slate-500 group-hover:text-[#ff9a52] transition-colors duration-200">
              Scroll to explore
            </span>
            <div className="w-5 h-8 rounded-full border border-white/20 group-hover:border-[#ff6b2c]/60 flex items-start justify-center p-1 backdrop-blur-sm transition-colors duration-200">
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-[#ff6b2c] shadow-[0_0_8px_#ff6b2c]"
              />
            </div>
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#ff6b2c] transition-colors duration-200" />
            </motion.div>
          </motion.div>
        </div>

        {/* ── MOBILE & TABLET ONLY: Stacked Cards Container below Portrait ── */}
        <div className="lg:hidden w-full max-w-md mx-auto px-4 sm:px-6 flex flex-col gap-3.5 mt-3 sm:mt-5 z-[20] relative">
          <DeveloperHUDCard />
          <AnimatedRightCard
            current={currentTelemetry}
            idx={telemetryIdx}
            setIdx={setTelemetryIdx}
          />
        </div>

        {/* ── 5. Bottom service badge strip ───────────────────────────── */}
        <div className="relative z-20 px-3 sm:px-6 lg:px-14 pb-4 pt-4 sm:pt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 border-t border-white/[0.06] pt-4 max-w-7xl mx-auto w-full">
            {heroServiceCards.map((service, i) => (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                className="p-2 sm:p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.07] backdrop-blur-md hover:border-[#ff6b2c]/50 hover:bg-white/[0.04] transition-all group cursor-default"
              >
                <div className="text-[#ff6b2c] mb-0.5 font-mono text-[9px] sm:text-[10px] font-bold">{service.number}</div>
                <div className="text-[10px] sm:text-[11px] font-semibold text-slate-200 group-hover:text-white transition-colors leading-snug">
                  {service.title}
                </div>
                <div className="text-[8px] sm:text-[9px] text-slate-500 mt-0.5 line-clamp-1">{service.desc}</div>
              </motion.div>
            ))}
          </div>

          {/* ── Scrolling chip ticker ─────────────────────────────────── */}
          <div className="w-full overflow-hidden mt-3 pt-3 border-t border-white/[0.05]">
            <div className="flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="animate-ticker flex items-center gap-2 sm:gap-3 py-0.5">
                {heroChips.concat(heroChips).map((chip, idx) => (
                  <div
                    key={`${chip}-${idx}`}
                    className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.07] text-[9px] sm:text-[10px] font-medium text-slate-400 whitespace-nowrap hover:border-[#ff6b2c]/40 hover:text-slate-200 transition-colors"
                    aria-hidden={idx >= heroChips.length ? "true" : undefined}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#ff6b2c] flex-shrink-0" />
                    <span>{chip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
