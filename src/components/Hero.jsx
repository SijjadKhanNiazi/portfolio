import { useState, useEffect, useRef } from "react";
import {
  motion,
  animate,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowUpRight,
  Download,
  MessageCircle,
  ChevronDown,
  Sparkles,
  Cpu,
  Award,
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const ROLES = [
  "Full-Stack Engineer",
  "GenAI Developer",
  "RAG Pipeline Builder",
  "React & Node Specialist",
];

const STATS = [
  { value: 3.75, decimals: 2, suffix: "", label: "CGPA / 4.00" },
  { value: 279, decimals: 0, suffix: "", label: "Requests per second" },
  { value: 93.3, decimals: 1, suffix: "%", label: "NSCT percentile" },
  { value: 2, decimals: 0, suffix: "", label: "Industry teams" },
];

const EASE = [0.22, 1, 0.36, 1];

// ─── Typewriter hook ─────────────────────────────────────────────────────────
function useTypewriter(words, speed = 70, pause = 1400) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let t;
    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    } else {
      t = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? 35 : speed,
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, wordIdx, words, pause, speed]);

  return text;
}

// ─── Count-up number ─────────────────────────────────────────────────────────
function CountUp({ to, decimals = 0, suffix = "", delay = 0.6 }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    const controls = animate(0, to, {
      duration: 1.8,
      delay,
      ease: "easeOut",
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [to, delay]);

  return (
    <>
      {val.toFixed(decimals)}
      {suffix}
    </>
  );
}

// ─── Floating glass card ─────────────────────────────────────────────────────
function FloatCard({
  icon: Icon,
  title,
  sub,
  className = "",
  duration = 5,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { duration: 0.6, delay: 0.9 + delay },
        scale: { duration: 0.6, delay: 0.9 + delay },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay },
      }}
      className={`absolute z-[5] flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-[#0c0a09]/80 border border-white/[0.1] backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.7)] ${className}`}
    >
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff9a52] to-[#ff6b2c] flex items-center justify-center shadow-[0_0_18px_rgba(255,107,44,0.5)]">
        <Icon className="w-4 h-4 text-slate-950" />
      </div>
      <div className="leading-tight">
        <div className="text-xs sm:text-sm font-bold text-white">{title}</div>
        <div className="text-[11px] text-slate-400">{sub}</div>
      </div>
    </motion.div>
  );
}

// ─── Tech chip around portrait ───────────────────────────────────────────────
function TechChip({ label, className = "", duration = 6, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, 8, 0] }}
      transition={{
        opacity: { duration: 0.6, delay: 1 + delay },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay },
      }}
      className={`absolute z-[30] px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.12] backdrop-blur-md text-xs font-mono text-slate-200 shadow-[0_0_20px_rgba(255,107,44,0.15)] ${className}`}
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ff6b2c] mr-1.5 align-middle" />
      {label}
    </motion.div>
  );
}

export default function Hero() {
  const { heroServiceCards, heroChips } = portfolioData;
  const heroRef = useRef(null);
  const role = useTypewriter(ROLES);

  const [mousePos, setMousePos] = useState({ x: 60, y: 40 });

  // ── 3D tilt for portrait ───────────────────────────────────────────────────
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 120,
    damping: 18,
  });

  // ── Scroll parallax ────────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yPortrait = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const yWatermark = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const opacityWatermark = useTransform(scrollYProgress, [0, 0.7], [0.3, 0.04]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setMousePos({ x: px * 100, y: py * 100 });
    mx.set(px - 0.5);
    my.set(py - 0.5);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen pt-16 sm:pt-20 flex flex-col justify-between overflow-hidden bg-[#090807] isolate"
    >
      {/* ── Background: spotlight + glows ─────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] transition-[background] duration-500"
        style={{
          background: `
            radial-gradient(circle 520px at ${mousePos.x}% ${mousePos.y}%, rgba(255,107,44,0.12), transparent 70%),
            radial-gradient(ellipse 800px 600px at 75% 40%, rgba(255,107,44,0.14), transparent 60%),
            radial-gradient(ellipse 600px 500px at 10% 90%, rgba(154,52,18,0.12), transparent 60%),
            #090807
          `,
        }}
      />

      {/* ── Background: tech grid ─────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-[2] opacity-[0.7]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 60% 40%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 60% 40%, black 20%, transparent 75%)",
        }}
      />

      {/* ── Giant background name watermark (behind portrait) ─────────── */}
      <motion.div
        style={{ y: yWatermark, opacity: opacityWatermark }}
        className="absolute inset-x-0 top-[8%] sm:top-[14%] lg:top-[18%] flex items-center justify-center pointer-events-none select-none overflow-hidden z-[3] px-2"
        aria-hidden="true"
      >
        <span className="text-[14vw] sm:text-[13vw] lg:text-[12vw] font-black tracking-[0.04em] sm:tracking-[0.08em] uppercase whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-b from-white/[0.08] via-white/[0.25] to-transparent leading-none">
          SIJJAD KHAN
        </span>
      </motion.div>

      {/* ── Bottom vignette ───────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-[4]"
        style={{
          background:
            "linear-gradient(to top, #090807 0%, #090807 5%, rgba(9,8,7,0.5) 25%, transparent 55%)",
        }}
      />

      {/* ── Main content ──────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 grid lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-4 items-center py-6 lg:py-10">
          {/* ── LEFT: Text ──────────────────────────────────────────── */}
          <motion.div
            style={{ y: yText, opacity: fadeOut }}
            className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono text-emerald-400"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for new projects
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="mt-5 text-sm sm:text-base font-mono uppercase tracking-[0.2em] text-[#ff9a52]"
            >
              Muhammad Sijjad Khan
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="mt-3 text-4xl sm:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight"
            >
              I build scalable systems &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffb17a] via-[#ff6b2c] to-[#ea580c]">
                intelligent AI apps.
              </span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-5 h-8 flex items-center gap-2 text-base sm:text-lg font-mono text-slate-300"
            >
              <span className="text-[#ff6b2c]">&gt;</span>
              <span>{role}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
                className="inline-block w-[2px] h-5 bg-[#ff6b2c]"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
              className="mt-3 max-w-xl text-sm sm:text-base text-slate-400 leading-relaxed"
            >
              High-throughput APIs, reactive web interfaces and production RAG
              pipelines, built with MERN, Next.js, LangChain and Docker.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
              className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff6b2c] to-[#ea580c] text-white text-sm font-semibold shadow-[0_0_30px_rgba(255,107,44,0.45)] hover:shadow-[0_0_45px_rgba(255,107,44,0.7)] hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
              >
                View Projects
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/923144913624?text=Hi%20Sijjad%2C%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] hover:border-[#ff6b2c]/50 text-slate-100 text-sm font-medium backdrop-blur-md transition-all duration-200 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-[#ff9a52]" />
                Let&apos;s Talk
              </a>
              <a
                href="/cv.pdf"
                download="Muhammad_Sijjad_Khan_CV.pdf"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[#ff9a52] hover:text-[#ffb17a] text-sm font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
              className="mt-9 w-full max-w-xl grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.08]"
            >
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="bg-[#0c0a09]/90 backdrop-blur-md px-3 py-3 text-center lg:text-left"
                >
                  <div className="text-xl sm:text-2xl font-black text-white tabular-nums">
                    <CountUp
                      to={s.value}
                      decimals={s.decimals}
                      suffix={s.suffix}
                      delay={0.8 + i * 0.1}
                    />
                  </div>
                  <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Portrait stage ───────────────────────────────── */}
          <motion.div
            style={{ y: yPortrait, perspective: 1000 }}
            className="order-1 lg:order-2 relative flex items-end justify-center h-[360px] sm:h-[480px] lg:h-[620px]"
          >
            {/* Glow blob */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[300px] sm:w-[440px] lg:w-[540px] h-[300px] sm:h-[440px] lg:h-[540px] rounded-full bg-gradient-to-b from-[#ff6b2c]/40 via-[#c2410c]/20 to-transparent blur-[80px] sm:blur-[110px] pointer-events-none" />

            {/* Orbit ring 1 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="absolute top-6 left-1/2 -translate-x-1/2 w-[270px] sm:w-[400px] lg:w-[500px] h-[270px] sm:h-[400px] lg:h-[500px] rounded-full border border-[#ff6b2c]/30 pointer-events-none"
            >
              <span className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-[#ff6b2c] shadow-[0_0_18px_#ff6b2c]" />
            </motion.div>

            {/* Orbit ring 2 (dashed, reverse) */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[470px] lg:w-[580px] h-[320px] sm:h-[470px] lg:h-[580px] rounded-full border border-dashed border-white/[0.1] pointer-events-none"
            >
              <span className="absolute bottom-6 right-6 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_14px_#fbbf24]" />
            </motion.div>

            {/* Tilting portrait */}
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative z-[10] h-full flex items-end justify-center pointer-events-none select-none"
            >
              <img
                src="/hero.png"
                alt="Portrait of Muhammad Sijjad Khan"
                className="h-full w-auto max-w-[92vw] lg:max-w-none object-contain object-bottom drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 82%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 82%, transparent 100%)",
                }}
                loading="eager"
                draggable={false}
              />
            </motion.div>

            {/* Floating cards */}
            <FloatCard
              icon={Cpu}
              title="~279 req/s"
              sub="Dockerized APIs + Redis"
              className="top-[22%] left-0 lg:-left-4"
              duration={5.5}
            />
            <FloatCard
              icon={Award}
              title="Gold Medalist"
              sub="Software Engineer"
              className="bottom-[35%] -right-1 sm:right-0 lg:-right-4"
              duration={6.5}
              delay={0.6}
            />
            <FloatCard
              icon={Sparkles}
              title="GenAI + RAG"
              sub="LangChain · FastAPI"
              className="hidden sm:flex top-[8%] right-2 lg:right-4"
              duration={7}
              delay={1.1}
            />

            {/* Tech chips */}
            <TechChip
              label="Next.js"
              className="hidden md:block bottom-[34%] left-0 lg:-left-8"
              duration={6}
            />
            <TechChip
              label="Redis"
              className="hidden md:block top-[44%] right-0 lg:-right-8"
              duration={7}
              delay={0.5}
            />
            <TechChip
              label="Docker"
              className="hidden md:block bottom-[8%] left-[12%]"
              duration={5}
              delay={1}
            />

            {/* Scroll indicator */}
            <motion.button
              type="button"
              style={{ opacity: fadeOut }}
              onClick={() =>
                (
                  document.getElementById("about") ||
                  document.getElementById("projects")
                )?.scrollIntoView({ behavior: "smooth" })
              }
              className="hidden lg:flex absolute -bottom-1 left-1/2 -translate-x-1/2 z-[40] flex-col items-center gap-1 group"
              aria-label="Scroll to explore"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-slate-500 group-hover:text-[#ff9a52] transition-colors">
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-[#ff6b2c] transition-colors" />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom: service strip + ticker ───────────────────────────── */}
      <div className="relative z-20 px-3 sm:px-6 lg:px-14 pb-4 pt-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 border-t border-white/[0.06] pt-4 max-w-7xl mx-auto w-full">
          {heroServiceCards.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.06, duration: 0.4 }}
              className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.07] backdrop-blur-md hover:border-[#ff6b2c]/50 hover:bg-white/[0.04] hover:-translate-y-0.5 transition-all group cursor-default"
            >
              <div className="text-[#ff6b2c] mb-0.5 font-mono text-[11px] font-bold">
                {service.number}
              </div>
              <div className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors leading-snug">
                {service.title}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                {service.desc}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="w-full overflow-hidden mt-3 pt-3 border-t border-white/[0.05]">
          <div className="flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="animate-ticker flex items-center gap-2 sm:gap-3 py-0.5">
              {heroChips.concat(heroChips).map((chip, idx) => (
                <div
                  key={`${chip}-${idx}`}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.07] text-xs font-medium text-slate-400 whitespace-nowrap hover:border-[#ff6b2c]/40 hover:text-slate-200 transition-colors"
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
    </section>
  );
}
