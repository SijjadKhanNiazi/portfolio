import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  Globe,
  Flame,
  Layout,
  Boxes,
  Server,
  Bug,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  MessageSquare,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";

// Icon & Accent mapping for each service to elevate visual hierarchy
const serviceMeta = {
  "portfolio-web": {
    icon: Globe,
    glowColor: "rgba(255, 107, 44, 0.25)",
    tag: "Visual & SEO",
  },
  "landing-page": {
    icon: Flame,
    glowColor: "rgba(255, 120, 50, 0.25)",
    tag: "High Conversion",
  },
  "react-frontend": {
    icon: Layout,
    glowColor: "rgba(255, 154, 82, 0.25)",
    tag: "SPA & Next.js",
  },
  "mern-crud-app": {
    icon: Boxes,
    glowColor: "rgba(255, 107, 44, 0.3)",
    tag: "Full-Stack System",
  },
  "rest-api": {
    icon: Server,
    glowColor: "rgba(245, 158, 11, 0.25)",
    tag: "Caching & Auth",
  },
  "bug-fixing": {
    icon: Bug,
    glowColor: "rgba(239, 68, 68, 0.25)",
    tag: "Rapid Resolution",
  },
  maintenance: {
    icon: RefreshCw,
    glowColor: "rgba(249, 115, 22, 0.25)",
    tag: "Ongoing Health",
  },
  "ai-rag-poc": {
    icon: Sparkles,
    glowColor: "rgba(251, 146, 60, 0.3)",
    tag: "LLM & Vector Search",
  },
};

// Aceternity UI-Inspired Interactive Card Component
function AceternityServiceCard({ service, onDiscuss }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const meta = serviceMeta[service.id] || {
    icon: Sparkles,
    glowColor: "rgba(255, 107, 44, 0.25)",
    tag: "Engineering",
  };
  const IconComponent = meta.icon;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 35, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: "spring", stiffness: 90, damping: 16 },
        },
      }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      onMouseMove={handleMouseMove}
      className={`group relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 isolate overflow-hidden ${
        service.popular
          ? "bg-[#14100e]/90 border border-[#ff6b2c]/40 shadow-[0_0_35px_rgba(255,107,44,0.14)]"
          : "bg-[#12100f]/80 border border-white/10 hover:border-white/20"
      }`}
    >
      {/* 1. ACETERNITY HOVER SPOTLIGHT (Follows Mouse Cursor Dynamically) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              380px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 107, 44, 0.16),
              transparent 80%
            )
          `,
        }}
      />

      {/* 2. ACETERNITY BORDER ILLUMINATION ON MOUSE MOVE */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              260px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 154, 82, 0.5),
              transparent 80%
            )
          `,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Top Section: Icon, Tag & Badges */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3 mb-5">
          {/* Glowing Icon Container */}
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 text-white shadow-inner group-hover:border-[#ff6b2c]/50 group-hover:bg-[#ff6b2c]/10 group-hover:scale-105 transition-all duration-300">
            <IconComponent className="w-5 h-5 text-[#ff9a52] group-hover:text-white transition-colors" />
            <div className="absolute inset-0 rounded-2xl bg-[#ff6b2c]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2">
            {service.popular && (
              <span className="relative inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-slate-950 bg-gradient-to-r from-[#ff9a52] to-[#ff6b2c] shadow-[0_0_15px_rgba(255,107,44,0.5)]">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping"></span>
                Popular
              </span>
            )}
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/5 text-slate-400 group-hover:text-slate-300 transition-colors">
              {meta.tag}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-[#ff9a52] transition-colors leading-snug">
          {service.title}
        </h3>

        {/* Scope Note */}
        <p className="text-xs text-slate-400 mt-2 leading-relaxed min-h-[36px]">
          {service.scope}
        </p>

        {/* Starting Price Box */}
        <div className="mt-5 p-4 rounded-2xl bg-white/[0.025] border border-white/5 group-hover:border-[#ff6b2c]/20 transition-all">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Starting Rate</span>
            <span className="text-[10px] text-amber-500/80 font-mono">Indicative</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#ff9a52] mt-1 tracking-tight">
            {service.startingPrice}
          </div>
        </div>

        {/* Deliverables Checklist */}
        <div className="mt-5 space-y-2.5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
            What is included
          </div>
          {service.deliverables.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#ff6b2c] shrink-0 mt-0.5 group-hover:text-amber-400 transition-colors" />
              <span className="leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA with Aceternity Interactive Glow */}
      <div className="relative z-10 mt-7 pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={() => onDiscuss(service.title)}
          className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden group/btn ${
            service.popular
              ? "bg-gradient-to-r from-[#ff6b2c] via-[#ff9a52] to-[#ff6b2c] bg-[length:200%_auto] text-slate-950 shadow-[0_0_20px_rgba(255,107,44,0.35)] hover:bg-[position:right_center]"
              : "bg-white/[0.05] hover:bg-[#ff6b2c] text-white hover:text-black border border-white/10 hover:border-transparent hover:shadow-[0_0_25px_rgba(255,107,44,0.4)]"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Discuss on WhatsApp</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const { services } = portfolioData;

  const handleDiscussWhatsApp = (serviceTitle) => {
    const text = encodeURIComponent(
      `Hi Sijjad, I'd like to discuss the "${serviceTitle}" project with you.`
    );
    window.open(`https://wa.me/923144913624?text=${text}`, "_blank");
  };

  return (
    <section
      id="services"
      className="relative py-24 px-5 sm:px-8 lg:px-16 bg-[#090807] overflow-hidden border-t border-white/5 isolate"
    >
      {/* Background Lighting Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#ff6b2c]/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#9a3412]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Staggered Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#ff9a52] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SOLUTIONS & INDICATIVE PRICING</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mt-3 leading-tight">
            Services &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9a52] via-[#ff6b2c] to-amber-400">
              Indicative Pricing
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mt-3">
            Engineered deliverables tailored for startups, founders, and scaling teams.
            Transparent PKR starting estimates with reliable milestones.
          </p>
        </motion.div>

        {/* Staggered Animated Grid of Aceternity UI Cards */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {services.map((service) => (
            <AceternityServiceCard
              key={service.id}
              service={service}
              onDiscuss={handleDiscussWhatsApp}
            />
          ))}
        </motion.div>

        {/* Pricing Caveat Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 p-5 rounded-2xl bg-white/[0.02] border border-white/10 max-w-3xl mx-auto flex items-start gap-3.5 text-xs text-slate-400 backdrop-blur-md"
        >
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-200">Scope & Estimate Notice:</strong> Final quotes are determined by functional complexity, delivery schedule, and third-party integrations. Hosting subscriptions, paid cloud APIs, and domains are billed separately before milestone kickoff.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
