import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";
import {
  Trophy,
  Medal,
  BadgeCheck,
  ExternalLink,
  X,
  ShieldCheck,
  Brain,
  Cpu,
  Palette,
  TrendingUp,
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";

// ─── Extended data with bento layout metadata ─────────────────────────────────
const ACHIEVEMENT_META = [
  {
    // HERO card — spans 2 cols on lg
    size: "hero",
    Icon: Medal,
    iconBg: "from-amber-400 to-yellow-300",
    iconGlow: "rgba(251,191,36,0.45)",
    accentColor: "#fbbf24",
    glowColor: "rgba(251,191,36,0.25)",
    badge: { label: "🥇 Gold Medal", variant: "gold" },
    stat: { value: "3.75", label: "CGPA · Top 1%" },
    verifyLabel: "Transcript",
    verifyHref: "/transcript.jpeg",
    featured: true,
  },
  {
    // WIDE card — spans 2 cols on lg
    size: "wide",
    Icon: TrendingUp,
    iconBg: "from-[#ff6b2c] to-amber-500",
    iconGlow: "rgba(255,107,44,0.45)",
    accentColor: "#ff6b2c",
    glowColor: "rgba(255,107,44,0.2)",
    badge: { label: "Top 6.7% Nation", variant: "orange" },
    stat: { value: "93.3%", label: "NSCT Percentile" },
    verifyLabel: "NTA Verified",
    verifyHref:
      "https://www.hec.gov.pk/english/HECAnnouncements/Pages/NSCT-Result.aspx",
    featured: true,
  },
  {
    // STANDARD card
    size: "standard",
    Icon: Brain,
    iconBg: "from-violet-500 to-purple-600",
    iconGlow: "rgba(139,92,246,0.35)",
    accentColor: "#8b5cf6",
    glowColor: "rgba(139,92,246,0.15)",
    badge: { label: "IBM Certified", variant: "purple" },
    stat: null,
    verifyLabel: "View Certificate",
    verifyHref: "https://coursera.org",
    featured: false,
  },
  {
    // STANDARD card
    size: "standard",
    Icon: Cpu,
    iconBg: "from-cyan-500 to-blue-500",
    iconGlow: "rgba(6,182,212,0.35)",
    accentColor: "#06b6d4",
    glowColor: "rgba(6,182,212,0.15)",
    badge: { label: "AI Specialization", variant: "cyan" },
    stat: null,
    verifyLabel: "View Certificate",
    verifyHref: "https://coursera.org",
    featured: false,
  },
  {
    // STANDARD card
    size: "standard",
    Icon: Palette,
    iconBg: "from-pink-500 to-rose-500",
    iconGlow: "rgba(236,72,153,0.35)",
    accentColor: "#ec4899",
    glowColor: "rgba(236,72,153,0.15)",
    badge: { label: "Design Certified", variant: "pink" },
    stat: null,
    verifyLabel: "View Certificate",
    verifyHref: null,
    featured: false,
  },
];

const BADGE_STYLES = {
  gold: "bg-amber-400/15 border-amber-400/40 text-amber-300",
  orange: "bg-[#ff6b2c]/15 border-[#ff6b2c]/40 text-[#ff9a52]",
  purple: "bg-violet-500/15 border-violet-400/40 text-violet-300",
  cyan: "bg-cyan-500/15 border-cyan-400/40 text-cyan-300",
  pink: "bg-pink-500/15 border-pink-400/40 text-pink-300",
};

// ─── Aceternity spotlight hover wrapper ──────────────────────────────────────
function SpotlightCard({ children, accentColor, className = "" }) {
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
      {/* Animated border glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, ${accentColor}77, transparent 75%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1.5px",
        }}
      />
      {/* Ambient inner glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${accentColor}10, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────
function DetailModal({ item, meta, onClose }) {
  const { Icon, accentColor, iconBg, badge, verifyLabel, verifyHref } = meta;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-lg bg-[#0e0c0a]/95 border border-white/[0.1] backdrop-blur-2xl rounded-3xl p-7 sm:p-8 shadow-[0_0_80px_rgba(0,0,0,0.7)]"
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white transition-all"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${iconBg} flex items-center justify-center mb-5 shadow-[0_0_24px_${accentColor}66]`}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>

        {/* Badge */}
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border mb-3 ${BADGE_STYLES[badge.variant]}`}
        >
          {badge.label}
        </span>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
          {item.title}
        </h3>

        {/* Institution + year row */}
        <div className="flex items-center gap-3 mt-2 flex-wrap">
          <span
            className="text-sm font-semibold"
            style={{ color: accentColor }}
          >
            {item.institution}
          </span>
          <span className="text-xs font-mono text-slate-500 px-2 py-0.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
            {item.year}
          </span>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            {item.tag}
          </span>
        </div>

        {/* Separator */}
        <div
          className="my-5 h-px"
          style={{
            background: `linear-gradient(to right, ${accentColor}40, transparent)`,
          }}
        />

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>

        {/* Verify link */}
        <div className="mt-6 flex items-center gap-3">
          {verifyHref ? (
            <a
              href={verifyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-950 transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{
                background: `linear-gradient(135deg, ${accentColor}, #ff9a52)`,
                boxShadow: `0 0 20px ${accentColor}44`,
              }}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {verifyLabel}
            </a>
          ) : (
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-slate-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ff6b2c]" />
              Physical Certificate
            </div>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-sm text-slate-400 hover:text-white transition-all"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Hero card (full width on md, 2-col on lg) ───────────────────────────────
function HeroCard({ item, meta, index, onClick }) {
  const { Icon, iconBg, accentColor, glowColor, badge, stat } = meta;

  return (
    <SpotlightCard
      accentColor={accentColor}
      className="col-span-1 md:col-span-2"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, delay: index * 0.1 }}
        onClick={onClick}
        className="relative z-20 bg-[#0e0c0a]/80 border border-white/[0.09] backdrop-blur-xl rounded-3xl p-7 sm:p-8 cursor-pointer hover:border-white/[0.16] transition-all duration-300 overflow-hidden h-full"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
      >
        {/* Large decorative bg icon */}
        <div
          className="absolute -right-8 -bottom-8 w-40 h-40 rounded-3xl opacity-[0.08] bg-gradient-to-br"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, transparent)`,
          }}
        />
        <div className="absolute -right-4 -bottom-4 opacity-[0.06]">
          <Icon className="w-36 h-36" style={{ color: accentColor }} />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Icon blob */}
          <div className="relative flex-shrink-0">
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${iconBg} flex items-center justify-center`}
              style={{ boxShadow: `0 0 30px ${glowColor}` }}
            >
              <Icon className="w-8 h-8 text-white" />
            </div>
            {/* Pulsing ring */}
            <motion.div
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
              className="absolute inset-0 rounded-2xl border-2"
              style={{ borderColor: accentColor }}
            />
          </div>

          <div className="flex-1 min-w-0">
            {/* Badge row */}
            <div className="flex items-center flex-wrap gap-2 mb-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border ${BADGE_STYLES[badge.variant]}`}
              >
                {badge.label}
              </span>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                {item.tag}
              </span>
            </div>

            <h3
              className="text-xl sm:text-2xl font-black text-white leading-tight transition-colors"
              style={{ "--hover-color": accentColor }}
            >
              {item.title}
            </h3>
            <p
              className="text-sm font-semibold mt-0.5"
              style={{ color: accentColor }}
            >
              {item.institution}
              <span className="text-slate-500 font-mono ml-2 text-xs">
                · {item.year}
              </span>
            </p>
            <p className="text-xs text-slate-400 leading-relaxed mt-2 max-w-lg">
              {item.desc}
            </p>
          </div>

          {/* Stat block */}
          {stat && (
            <div className="flex-shrink-0 text-center p-4 rounded-2xl bg-white/[0.04] border border-white/[0.07]">
              <div
                className="text-3xl font-black"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}, #ff9a52)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.value}
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1 whitespace-nowrap">
                {stat.label}
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA hint */}
        <div className="relative z-10 mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck
              className="w-3.5 h-3.5"
              style={{ color: accentColor }}
            />
            <span>Verified credential</span>
          </div>
          <div
            className="flex items-center gap-1 text-xs font-mono"
            style={{ color: accentColor }}
          >
            <span>View details</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </motion.div>
    </SpotlightCard>
  );
}

// ─── Standard card ────────────────────────────────────────────────────────────
function StandardCard({ item, meta, index, onClick }) {
  const { Icon, iconBg, accentColor, glowColor, badge } = meta;

  return (
    <SpotlightCard accentColor={accentColor} className="col-span-1">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        onClick={onClick}
        className="relative z-20 bg-[#0e0c0a]/80 border border-white/[0.09] backdrop-blur-xl rounded-3xl p-6 cursor-pointer hover:border-white/[0.16] transition-all duration-300 overflow-hidden h-full flex flex-col"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
      >
        {/* Decorative corner gradient */}
        <div
          className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-[0.07]"
          style={{
            background: `radial-gradient(circle at top right, ${accentColor}, transparent)`,
          }}
        />

        {/* Top row: icon + badge */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div
            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${iconBg} flex items-center justify-center flex-shrink-0`}
            style={{ boxShadow: `0 0 20px ${glowColor}` }}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>

          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest border flex-shrink-0 ${BADGE_STYLES[badge.variant]}`}
          >
            {badge.label}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div
            className="text-[10px] font-mono uppercase tracking-widest mb-1.5"
            style={{ color: accentColor }}
          >
            {item.tag}
          </div>
          <h3 className="text-base font-black text-white leading-snug group-hover:text-[#ff9a52] transition-colors">
            {item.title}
          </h3>
          <p
            className="text-xs font-semibold mt-1"
            style={{ color: accentColor }}
          >
            {item.institution}
          </p>
          <p className="text-xs text-slate-400 leading-relaxed mt-3">
            {item.desc}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-500">
            {item.year}
          </span>
          <div
            className="flex items-center gap-1 text-[10px] font-mono transition-opacity opacity-60 group-hover:opacity-100"
            style={{ color: accentColor }}
          >
            <span>Details</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </div>
        </div>
      </motion.div>
    </SpotlightCard>
  );
}

// ─── Main Achievements component ──────────────────────────────────────────────
export default function Achievements() {
  const { achievements } = portfolioData;
  const [activeModal, setActiveModal] = useState(null);

  const enriched = achievements.map((item, i) => ({
    item,
    meta: ACHIEVEMENT_META[i] || ACHIEVEMENT_META[4],
  }));

  const heroCards = enriched.filter((e) => e.meta.size === "hero");
  const wideCards = enriched.filter((e) => e.meta.size === "wide");
  const standardCards = enriched.filter((e) => e.meta.size === "standard");

  return (
    <section
      id="achievements"
      className="relative py-24 px-5 sm:px-8 lg:px-16 bg-[#090807] overflow-hidden border-t border-white/5 isolate"
    >
      {/* ── Atmosphere ──────────────────────────────────────────────────────── */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#ff6b2c]/6 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-600/5 rounded-full blur-[130px] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,154,82,0.8) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* ── Section header ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#ff9a52] backdrop-blur-md">
            <Trophy className="w-3.5 h-3.5" />
            <span>HONORS & CREDENTIALS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mt-3 leading-tight">
            Achievements &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9a52] via-[#ff6b2c] to-amber-400">
              Certifications
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mt-3 max-w-xl mx-auto">
            Verified academic excellence, national rankings, and specialised AI
            &amp; design credentials — each one earned and documented.
          </p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 inline-flex items-center gap-6 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-md"
          >
            {[
              { val: "2", label: "Major Awards" },
              { val: "3", label: "Certifications" },
              { val: "93.3%", label: "National Percentile" },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff9a52] to-amber-400">
                  {val}
                </div>
                <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Bento grid ─────────────────────────────────────────────────────── */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
          {/* Hero cards — span 2 cols */}
          {heroCards.map(({ item, meta }, i) => (
            <HeroCard
              key={item.title}
              item={item}
              meta={meta}
              index={i}
              onClick={() => setActiveModal({ item, meta })}
            />
          ))}

          {/* Standard cards — 1 col each */}
          {standardCards.slice(0, 1).map(({ item, meta }, i) => (
            <StandardCard
              key={item.title}
              item={item}
              meta={meta}
              index={i + 1}
              onClick={() => setActiveModal({ item, meta })}
            />
          ))}

          {/* Wide card (NSCT) — span 2 cols */}
          {wideCards.map(({ item, meta }, i) => (
            <HeroCard
              key={item.title}
              item={item}
              meta={meta}
              index={i + 2}
              onClick={() => setActiveModal({ item, meta })}
            />
          ))}

          {/* Remaining standard cards */}
          {standardCards.slice(1).map(({ item, meta }, i) => (
            <StandardCard
              key={item.title}
              item={item}
              meta={meta}
              index={i + 3}
              onClick={() => setActiveModal({ item, meta })}
            />
          ))}
        </div>

        {/* ── Credential note ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex items-center justify-center gap-2 text-xs text-slate-500 text-center"
        >
          <BadgeCheck className="w-3.5 h-3.5 text-[#ff6b2c] shrink-0" />
          <span>
            All credentials are verified and maintained in the official
            institutional or platform records. Click any card to view full
            details.
          </span>
        </motion.div>
      </div>

      {/* ── Detail Modal ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeModal && (
          <DetailModal
            item={activeModal.item}
            meta={activeModal.meta}
            onClose={() => setActiveModal(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
