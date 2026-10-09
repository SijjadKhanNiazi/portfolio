import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  AlertCircle,
  Star,
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";

// ─── Persona accent colours for each avatar ───────────────────────────────────
const AVATAR_GRADIENTS = [
  "from-[#ff6b2c] to-amber-500",
  "from-amber-500 to-yellow-400",
  "from-orange-600 to-[#ff9a52]",
  "from-[#ff9a52] to-orange-300",
  "from-red-500 to-[#ff6b2c]",
  "from-amber-600 to-orange-400",
];

const PROJECT_ICONS = {
  "CLICS Capstone Project": "🧠",
  "CLICS Project": "📊",
  "Elite Science Academy": "🏫",
  "AgriConnect Platform": "🌾",
  "StudentHub Platform": "🎓",
  "CryptoPulse Engine": "⚡",
};

// ─── Single card with Aceternity mouse-spotlight border ──────────────────────
function TestimonialCard({ testimonial, index, direction }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef(null);

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      if (!cardRef.current) return;
      const { left, top } = cardRef.current.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    },
    [mouseX, mouseY]
  );

  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const gradient = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];
  const projectIcon = PROJECT_ICONS[testimonial.project] || "💼";

  // ── Slide-in/out direction variants ─────────────────────────────────────
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.96,
      filter: "blur(6px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        x: { type: "spring", stiffness: 280, damping: 28 },
        opacity: { duration: 0.35 },
        scale: { duration: 0.35 },
        filter: { duration: 0.3 },
      },
    },
    exit: (dir) => ({
      x: dir < 0 ? 60 : -60,
      opacity: 0,
      scale: 0.96,
      filter: "blur(6px)",
      transition: {
        x: { type: "spring", stiffness: 280, damping: 28 },
        opacity: { duration: 0.25 },
        filter: { duration: 0.2 },
      },
    }),
  };

  return (
    <motion.div
      ref={cardRef}
      key={testimonial.id}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      onMouseMove={handleMouseMove}
      className="relative w-full rounded-3xl overflow-hidden isolate group"
    >
      {/* ── Aceternity: animated mouse-following border glow ────────────────── */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(255,107,44,0.55), transparent 75%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1.5px",
        }}
      />

      {/* ── Aceternity: inner spotlight radial ──────────────────────────────── */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, rgba(255,107,44,0.07), transparent 70%)`,
        }}
      />

      {/* ── Glassmorphism card surface ───────────────────────────────────────── */}
      <div className="relative z-20 bg-[#111009]/80 border border-white/[0.08] backdrop-blur-xl rounded-3xl p-7 sm:p-10 shadow-[0_0_60px_rgba(0,0,0,0.5)]">

        {/* Top row: decorative quote icon + project badge + stars */}
        <div className="flex items-start justify-between gap-4 mb-7">
          {/* Large decorative quote mark */}
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff6b2c]/20 to-amber-500/10 border border-[#ff6b2c]/25 flex items-center justify-center shadow-[0_0_20px_rgba(255,107,44,0.15)]">
              <Quote className="w-6 h-6 text-[#ff9a52] fill-[#ff9a52]/30" />
            </div>
            {/* Glow pulse */}
            <div className="absolute inset-0 rounded-2xl bg-[#ff6b2c]/10 blur-lg scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Right side: stars + project chip */}
          <div className="flex flex-col items-end gap-2">
            {/* Star rating */}
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            {/* Project chip */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-slate-300">
              <span>{projectIcon}</span>
              <span className="text-[#ff9a52]">{testimonial.project}</span>
            </div>
          </div>
        </div>

        {/* ── Blockquote – main review text ────────────────────────────────── */}
        <motion.blockquote
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-lg sm:text-xl lg:text-2xl font-light text-slate-100 leading-relaxed tracking-[-0.01em]"
        >
          <span className="text-[#ff9a52] font-semibold text-2xl leading-none mr-0.5">
            "
          </span>
          {testimonial.quote}
          <span className="text-[#ff9a52] font-semibold text-2xl leading-none ml-0.5">
            "
          </span>
        </motion.blockquote>

        {/* ── Author row ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="mt-8 pt-6 border-t border-white/[0.07] flex flex-wrap items-center justify-between gap-5"
        >
          {/* Avatar + name + role */}
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-slate-950 font-black text-sm shadow-[0_0_20px_rgba(255,107,44,0.25)] select-none`}
              >
                {initials}
              </div>
              {/* Online-ish indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#090807] border-2 border-[#090807] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base font-bold text-white tracking-tight">
                  {testimonial.name}
                </span>
                {/* Draft badge */}
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-[9px] font-mono font-bold uppercase tracking-widest text-amber-400">
                  {testimonial.badge}
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5 font-mono">
                {testimonial.role}
              </div>
            </div>
          </div>

          {/* Decorative accent line */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-500 font-mono">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#ff6b2c]/60" />
            <span className="text-[#ff6b2c]/70">sijjad.dev</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Progress bar auto-timer ─────────────────────────────────────────────────
function ProgressBar({ duration, running, onComplete }) {
  return (
    <div className="w-full h-0.5 bg-white/[0.06] rounded-full overflow-hidden">
      <motion.div
        key={`${running}`}
        className="h-full bg-gradient-to-r from-[#ff6b2c] to-amber-400 rounded-full origin-left"
        initial={{ scaleX: 0 }}
        animate={running ? { scaleX: 1 } : { scaleX: 0 }}
        transition={
          running
            ? { duration: duration / 1000, ease: "linear" }
            : { duration: 0 }
        }
        onAnimationComplete={() => running && onComplete()}
      />
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function Testimonials() {
  const { testimonials } = portfolioData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const INTERVAL = 7000;

  const goTo = useCallback(
    (idx, dir) => {
      setDirection(dir);
      setCurrentIndex(((idx % testimonials.length) + testimonials.length) % testimonials.length);
      setProgressKey((k) => k + 1);
    },
    [testimonials.length]
  );

  const goNext = useCallback(() => goTo(currentIndex + 1, 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1, -1), [currentIndex, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const current = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      className="relative py-24 px-5 sm:px-8 lg:px-16 bg-[#090807] overflow-hidden border-t border-white/5 isolate"
    >
      {/* ── Background atmosphere ─────────────────────────────────────────── */}
      <div className="absolute top-1/3 right-0 w-[480px] h-[480px] bg-[#ff6b2c]/8 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,107,44,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,44,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* ── Section header ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#ff9a52] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>COLLABORATION HIGHLIGHTS & FEEDBACK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mt-3 leading-tight">
            Project &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9a52] via-[#ff6b2c] to-amber-400">
              Peer Reviews
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mt-3 max-w-xl mx-auto">
            Collaborative observations across capstone engineering, institutional, and systems
            initiatives — each review is maintained as a confirmed draft.
          </p>
        </motion.div>

        {/* ── Carousel wrapper ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.15, duration: 0.55 }}
          className="mt-14"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Card with AnimatePresence for cross-fade + slide */}
          <div className="relative min-h-[320px] sm:min-h-[300px]">
            <AnimatePresence mode="wait" custom={direction}>
              <TestimonialCard
                key={current.id}
                testimonial={current}
                index={currentIndex}
                direction={direction}
              />
            </AnimatePresence>
          </div>

          {/* ── Controls bar ────────────────────────────────────────────────── */}
          <div className="mt-6 flex items-center justify-between gap-4">
            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goTo(idx, idx > currentIndex ? 1 : -1)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-400 ${
                    currentIndex === idx
                      ? "w-8 bg-gradient-to-r from-[#ff6b2c] to-amber-400 shadow-[0_0_8px_rgba(255,107,44,0.6)]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous testimonial"
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-[#ff6b2c]/20 border border-white/10 hover:border-[#ff6b2c]/50 text-slate-300 hover:text-[#ff9a52] transition-all duration-200 group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next testimonial"
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-[#ff6b2c]/20 border border-white/10 hover:border-[#ff6b2c]/50 text-slate-300 hover:text-[#ff9a52] transition-all duration-200 group"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* ── Auto-progress bar ────────────────────────────────────────────── */}
          <div className="mt-4">
            <ProgressBar
              key={progressKey}
              duration={INTERVAL}
              running={!isPaused}
              onComplete={goNext}
            />
          </div>

          {/* Pause hint */}
          <p className="text-center text-[10px] font-mono text-slate-500 mt-2">
            Hover to pause · ← → to navigate
          </p>
        </motion.div>

        {/* ── Side mini-cards (desktop only) ─────────────────────────────────── */}
        <div className="hidden lg:grid grid-cols-3 gap-4 mt-8">
          {testimonials
            .filter((_, i) => i !== currentIndex)
            .slice(0, 3)
            .map((t, i) => (
              <motion.button
                key={t.id}
                type="button"
                onClick={() => goTo(testimonials.indexOf(t), 1)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="group text-left p-4 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-[#ff6b2c]/40 hover:bg-white/[0.04] backdrop-blur-md transition-all duration-300"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div
                    className={`w-7 h-7 rounded-xl bg-gradient-to-br ${AVATAR_GRADIENTS[testimonials.indexOf(t) % AVATAR_GRADIENTS.length]} flex items-center justify-center text-slate-950 font-black text-[10px] select-none`}
                  >
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors truncate max-w-[120px]">
                      {t.name}
                    </div>
                    <div className="text-[10px] font-mono text-[#ff9a52]">
                      {t.project}
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  "{t.quote}"
                </p>
              </motion.button>
            ))}
        </div>

        {/* ── Compliance note ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex items-center justify-center gap-2 text-xs text-slate-500 text-center"
        >
          <AlertCircle className="w-3.5 h-3.5 text-amber-500/60 shrink-0" />
          <span>
            These summaries are maintained as review drafts with project collaborators and are
            pending final approval before public attribution.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
