import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, MessageSquare, Download } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",     href: "#home" },
  { label: "About",    href: "#about" },
  { label: "Skills",   href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Journey",  href: "#journey" },
  { label: "Contact",  href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [activeLink, setActiveLink]     = useState("#home");

  /* ── scroll-awareness ─────────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── active section tracker ───────────────────────────────────────── */
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveLink(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (href) => {
    setMobileOpen(false);
    setActiveLink(href);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "py-2.5 bg-[#090807]/60 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_40px_rgba(0,0,0,0.5)]"
            : "py-4 bg-transparent border-b border-transparent"
        }`}
      >
        {/* Glassmorphism inner glow line */}
        {scrolled && (
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff6b2c]/40 to-transparent pointer-events-none" />
        )}

        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">

          {/* ── Brand ─────────────────────────────────────────────────── */}
          <a
            href="#home"
            onClick={() => goTo("#home")}
            className="group flex items-center gap-2.5 shrink-0"
            aria-label="Go to top"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff9a52] to-[#ff6b2c] flex items-center justify-center text-slate-950 font-extrabold text-xs shadow-[0_0_18px_rgba(255,107,44,0.45)] group-hover:scale-105 transition-transform select-none">
              SK
              {/* Ripple */}
              <motion.div
                animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
                className="absolute inset-0 rounded-xl border border-[#ff6b2c]"
              />
            </div>
            <span className="hidden sm:block text-sm font-bold tracking-[0.18em] uppercase text-white">
              MUHAMMAD <span className="text-[#ff6b2c]">SIJJAD</span>
            </span>
          </a>

          {/* ── Desktop pill nav ───────────────────────────────────────── */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-0.5 px-2 py-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeLink === link.href;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); goTo(link.href); }}
                  className={`relative px-3.5 py-1.5 rounded-xl text-xs lg:text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {/* Active pill highlight */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-white/[0.1] border border-white/[0.12]"
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* ── Desktop actions ────────────────────────────────────────── */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Download CV */}
            <a
              href="/cv.pdf"
              download="Muhammad_Sijjad_Khan_CV.pdf"
              className="group relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl overflow-hidden text-xs lg:text-sm font-medium text-[#ff9a52] border border-[#ff6b2c]/35 bg-[#ff6b2c]/[0.07] hover:bg-[#ff6b2c]/[0.14] hover:border-[#ff6b2c]/60 hover:scale-[1.03] hover:shadow-[0_0_18px_rgba(255,107,44,0.3)] transition-all duration-300 backdrop-blur-sm"
              aria-label="Download CV"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
              <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              <span>CV</span>
            </a>

            {/* Let's Talk */}
            <a
              href="https://wa.me/923144913624?text=Hi%20Sijjad%2C%20I%27d%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-white/[0.2] text-xs lg:text-sm font-medium text-slate-200 hover:text-white transition-all duration-200 backdrop-blur-sm"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#ff6b2c]" />
            </a>

            {/* Get in Touch — primary CTA */}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); goTo("#contact"); }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff6b2c] to-[#ff9a52] text-slate-950 text-xs lg:text-sm font-bold hover:shadow-[0_0_22px_rgba(255,107,44,0.55)] hover:scale-[1.03] transition-all duration-200"
            >
              Hire Me
            </a>
          </div>

          {/* ── Mobile hamburger ───────────────────────────────────────── */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-slate-300 hover:text-white hover:bg-white/[0.1] transition-all"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="block"
                >
                  <X className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="block"
                >
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* ── Mobile slide-down menu ──────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 top-[72px] z-50 rounded-2xl bg-[#0d0b09]/90 border border-white/[0.1] backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden"
          >
            {/* Top accent line */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#ff6b2c]/50 to-transparent" />

            <div className="p-4 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => {
                const isActive = activeLink === link.href;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); goTo(link.href); }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                      isActive
                        ? "bg-[#ff6b2c]/15 border border-[#ff6b2c]/30 text-[#ff9a52]"
                        : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b2c]" />
                    )}
                  </motion.a>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="px-4 pb-5 pt-1 flex flex-col gap-2.5 border-t border-white/[0.06] mt-1">
              <a
                href="/cv.pdf"
                download="Muhammad_Sijjad_Khan_CV.pdf"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#ff6b2c]/[0.1] border border-[#ff6b2c]/30 text-[#ff9a52] font-semibold text-sm hover:bg-[#ff6b2c]/[0.2] transition-all"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
              <a
                href="https://wa.me/923144913624?text=Hi%20Sijjad%2C%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white font-medium text-sm hover:bg-white/[0.1] transition-all"
              >
                <MessageSquare className="w-4 h-4 text-[#ff6b2c]" />
                WhatsApp Chat
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); goTo("#contact"); }}
                className="flex items-center justify-center py-3 rounded-xl bg-gradient-to-r from-[#ff6b2c] to-[#ff9a52] text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(255,107,44,0.4)] hover:scale-[1.01] transition-all"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop tap-to-close */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 md:hidden bg-black/30 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>
    </>
  );
}
