import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Zap,
  BookOpen,
  Cpu,
  Calendar,
  MapPin,
  Award,
  CheckCircle2,
  Milestone,
  ArrowUpRight,
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";

// ─── Per-entry metadata: icon, colour accent, location ────────────────────────
const ENTRY_META = {
  "Education & Honor": {
    Icon: GraduationCap,
    accent: "#ff9a52",
    glowColor: "rgba(255,154,82,0.35)",
    location: "Mianwali, Pakistan",
    category: "Academia",
  },
  "Teaching & Academic": {
    Icon: BookOpen,
    accent: "#fbbf24",
    glowColor: "rgba(251,191,36,0.3)",
    location: "Mianwali, Pakistan",
    category: "Instruction",
  },
  "Industry Internship": {
    Icon: Briefcase,
    accent: "#ff6b2c",
    glowColor: "rgba(255,107,44,0.35)",
    location: "Remote / Hybrid",
    category: "Professional",
  },
  "AI & UI Engineering": {
    Icon: Cpu,
    accent: "#fb923c",
    glowColor: "rgba(251,146,60,0.35)",
    location: "Remote",
    category: "AI Engineering",
  },
  "Engineering Track": {
    Icon: Zap,
    accent: "#f97316",
    glowColor: "rgba(249,115,22,0.3)",
    location: "Islamabad / Remote",
    category: "Independent",
  },
};

// ─── Aceternity-style mouse spotlight border for cards ───────────────────────
function SpotlightCard({ children, className = "", accentColor = "#ff6b2c" }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef(null);

  function handleMouseMove({ clientX, clientY }) {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative isolate ${className}`}
    >
      {/* Gradient border on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, ${accentColor}88, transparent 75%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1.5px",
        }}
      />
      {/* Inner ambient glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, ${accentColor}0f, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}

// ─── Animated tracing beam that fills as you scroll ──────────────────────────
function TracingBeam({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Glow dot moves along the beam
  const dotY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const dotOpacity = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  return (
    <>
      {/* Static dim track */}
      <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-white/[0.06]" />

      {/* Lit section of beam — fills with scroll */}
      <motion.div
        className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 w-px origin-top"
        style={{
          scaleY,
          height: "100%",
          background:
            "linear-gradient(to bottom, transparent, #ff9a52 18%, #ff6b2c 60%, transparent)",
          boxShadow: "0 0 8px 2px rgba(255,107,44,0.55)",
        }}
      />

      {/* Glowing travelling dot */}
      <motion.div
        className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full pointer-events-none z-30"
        style={{
          top: dotY,
          opacity: dotOpacity,
          background: "radial-gradient(circle, #fff 0%, #ff9a52 45%, #ff6b2c 100%)",
          boxShadow: "0 0 12px 4px rgba(255,107,44,0.7), 0 0 24px 8px rgba(255,107,44,0.3)",
        }}
      />
    </>
  );
}

// ─── Single timeline entry ────────────────────────────────────────────────────
function TimelineEntry({ item, index }) {
  const meta = ENTRY_META[item.type] || ENTRY_META["Industry Internship"];
  const { Icon, accent, glowColor } = meta;
  const isRight = index % 2 !== 0; // alternates left / right on desktop

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: isRight ? 40 : -40,
      y: 20,
      scale: 0.97,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 18,
        delay: 0.08,
      },
    },
  };

  return (
    <div className="relative flex items-start gap-0 md:gap-0">
      {/* ── Mobile left-rail dot ──────────────────────────────────────────── */}
      <div className="flex-shrink-0 flex flex-col items-center md:hidden mr-5 mt-1.5">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="w-10 h-10 rounded-2xl flex items-center justify-center border-2 z-20 relative"
          style={{
            background: `${accent}18`,
            borderColor: `${accent}60`,
            boxShadow: `0 0 18px ${glowColor}`,
          }}
        >
          <Icon className="w-4 h-4" style={{ color: accent }} />
        </motion.div>
      </div>

      {/* ── Desktop alternating layout ────────────────────────────────────── */}
      <div
        className={`hidden md:grid w-full grid-cols-[1fr_72px_1fr] items-start`}
      >
        {/* Left slot */}
        <div className={`${!isRight ? "pr-6 flex justify-end" : ""}`}>
          {!isRight && (
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="w-full max-w-lg"
            >
              <EntryCard item={item} meta={meta} />
            </motion.div>
          )}
        </div>

        {/* Center node */}
        <div className="flex justify-center pt-2">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.05 }}
            className="w-12 h-12 rounded-2xl flex items-center justify-center border-2 z-20 relative flex-shrink-0"
            style={{
              background: `${accent}15`,
              borderColor: `${accent}55`,
              boxShadow: `0 0 22px ${glowColor}`,
            }}
          >
            <Icon className="w-5 h-5" style={{ color: accent }} />

            {/* Ripple ring */}
            <motion.div
              animate={{ scale: [1, 1.7], opacity: [0.4, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
              className="absolute inset-0 rounded-2xl border"
              style={{ borderColor: accent }}
            />
          </motion.div>
        </div>

        {/* Right slot */}
        <div className={`${isRight ? "pl-6" : ""}`}>
          {isRight && (
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="w-full max-w-lg"
            >
              <EntryCard item={item} meta={meta} />
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Mobile card (below the dot) ───────────────────────────────────── */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="flex-1 md:hidden"
      >
        <EntryCard item={item} meta={meta} index={index} />
      </motion.div>
    </div>
  );
}

// ─── The glassmorphism card itself ────────────────────────────────────────────
function EntryCard({ item, meta }) {
  const { accent, location, category } = meta;
  const [expanded, setExpanded] = useState(false);

  return (
    <SpotlightCard accentColor={accent} className="w-full">
      <div
        className="relative z-20 bg-[#0e0c0a]/85 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-5 sm:p-6 shadow-[0_4px_40px_rgba(0,0,0,0.45)] transition-all duration-300 group-hover:border-white/[0.14]"
      >
        {/* ── Card header ──────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="space-y-0.5">
            {/* Category chip */}
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-widest mb-2"
              style={{
                background: `${accent}15`,
                border: `1px solid ${accent}35`,
                color: accent,
              }}
            >
              {category}
            </div>

            {/* Role */}
            <h3 className="text-base sm:text-lg font-black text-white leading-tight group-hover:text-[#ff9a52] transition-colors">
              {item.role}
            </h3>

            {/* Org + location */}
            <div className="flex items-center flex-wrap gap-x-3 gap-y-0.5 mt-1">
              <span className="text-sm font-semibold" style={{ color: accent }}>
                {item.organization}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                <MapPin className="w-3 h-3" />
                {location}
              </span>
            </div>
          </div>

          {/* Period badge */}
          <div className="flex-shrink-0 text-right">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold"
              style={{
                background: `${accent}10`,
                border: `1px solid ${accent}30`,
                color: `${accent}`,
              }}
            >
              <Calendar className="w-3 h-3" />
              <span>{item.period}</span>
            </div>
            {/* Badge pill */}
            <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] text-slate-300 font-mono">
              <Award className="w-2.5 h-2.5 text-amber-400" />
              {item.badge}
            </div>
          </div>
        </div>

        {/* ── Separator ─────────────────────────────────────────────────── */}
        <div
          className="my-4 h-px"
          style={{
            background: `linear-gradient(to right, ${accent}30, transparent)`,
          }}
        />

        {/* ── Highlights ─────────────────────────────────────────────────── */}
        <motion.ul
          className="space-y-2"
          initial={false}
        >
          {item.highlights
            .slice(0, expanded ? undefined : 2)
            .map((bullet, bIdx) => (
              <motion.li
                key={bIdx}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: bIdx * 0.06 + 0.1 }}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed"
              >
                <CheckCircle2
                  className="w-3.5 h-3.5 shrink-0 mt-0.5 transition-colors"
                  style={{ color: accent }}
                />
                <span>{bullet}</span>
              </motion.li>
            ))}
        </motion.ul>

        {/* Expand / collapse if >2 bullets */}
        {item.highlights.length > 2 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-3 flex items-center gap-1.5 text-[11px] font-mono transition-colors hover:opacity-80"
            style={{ color: accent }}
          >
            <motion.span
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="inline-block"
            >
              <ArrowUpRight className="w-3 h-3" />
            </motion.span>
            {expanded
              ? "Show less"
              : `+${item.highlights.length - 2} more details`}
          </button>
        )}
      </div>
    </SpotlightCard>
  );
}

// ─── Main exported section ────────────────────────────────────────────────────
export default function JourneyTimeline() {
  const { journey } = portfolioData;
  const containerRef = useRef(null);

  return (
    <section
      id="journey"
      className="relative py-24 px-5 sm:px-8 lg:px-16 bg-[#090807] overflow-hidden border-t border-white/5 isolate"
    >
      {/* ── Ambient background ─────────────────────────────────────────────── */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#ff6b2c]/6 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-600/5 rounded-full blur-[140px] pointer-events-none" />
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,154,82,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-5xl mx-auto">
        {/* ── Section header ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#ff9a52] backdrop-blur-md">
            <Milestone className="w-3.5 h-3.5" />
            <span>ACADEMIC & PROFESSIONAL PATHWAY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mt-3 leading-tight">
            Career &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9a52] via-[#ff6b2c] to-amber-400">
              Learning Journey
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mt-3 max-w-xl mx-auto">
            A verified trajectory from Gold Medalist graduate to full-stack & AI
            engineering roles — each milestone anchored in real deliverables.
          </p>

          {/* Stats strip */}
          <div className="mt-6 inline-flex items-center gap-6 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-md">
            {[
              { val: "4", label: "Roles / Positions" },
              { val: "7+", label: "Projects Delivered" },
              { val: "3.75", label: "CGPA · Gold Medal" },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff9a52] to-amber-400">
                  {val}
                </div>
                <div className="text-[10px] font-mono text-slate-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Timeline container with tracing beam ─────────────────────────── */}
        <div ref={containerRef} className="relative mt-16 md:mt-20">
          {/* Tracing beam — desktop: center rail; mobile: left rail */}
          <TracingBeam containerRef={containerRef} />

          {/* Entries */}
          <div className="relative z-10 space-y-10 md:space-y-14 pl-14 md:pl-0">
            {journey.map((item, idx) => (
              <TimelineEntry key={idx} item={item} index={idx} />
            ))}
          </div>

          {/* Bottom terminal node */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.2 }}
            className="relative z-20 flex justify-center md:justify-center mt-10 ml-6 md:ml-0"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff9a52] to-[#ff6b2c] flex items-center justify-center shadow-[0_0_28px_rgba(255,107,44,0.6)]">
                <Zap className="w-4 h-4 text-slate-950" />
              </div>
              <div className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-[#ff9a52] backdrop-blur-md">
                Story continues…
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
