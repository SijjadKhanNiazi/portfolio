import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  /* ── Scroll awareness for clean subtle backdrop ──────────────────── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active section observer ──────────────────────────────────────── */
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveLink(`#${e.target.id}`);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
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
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#090807]/70 backdrop-blur-md border-b border-white/[0.08] py-3"
          : "bg-[#090807]/30 backdrop-blur-sm border-b border-white/[0.04] py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">

        {/* ── Brand Logo ─────────────────────────────────────────────── */}
        <a
          href="#home"
          onClick={() => goTo("#home")}
          className="flex items-center gap-2.5 shrink-0"
          aria-label="Muhammad Sijjad Khan Home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff9a52] to-[#ff6b2c] flex items-center justify-center text-slate-950 font-bold text-xs select-none shadow-sm">
            SK
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold tracking-[0.12em] uppercase text-white leading-tight">
              MUHAMMAD <span className="text-[#ff6b2c]">SIJJAD</span>
            </span>
            <span className="text-[10px] text-slate-400 font-normal leading-tight hidden sm:block">
              Full-Stack &amp; GenAI Engineer
            </span>
          </div>
        </a>

        {/* ── Desktop Pill Navigation ─────────────────────────────────── */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.07] backdrop-blur-md"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeLink === link.href;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(link.href);
                }}
                className={`px-3 py-1 rounded-full text-xs lg:text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? "text-white bg-white/[0.1] font-semibold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* ── Action Buttons ─────────────────────────────────────────── */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          {/* CV Button */}
          <a
            href="/cv.pdf"
            download="Muhammad_Sijjad_Khan_CV.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:text-white border border-white/[0.08] hover:border-white/20 bg-white/[0.02] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#ff9a52]" />
            <span>CV</span>
          </a>

          {/* Let's Talk Button */}
          <a
            href="https://wa.me/923144913624?text=Hi%20Sijjad%2C%20I%27d%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:text-white border border-white/[0.08] hover:border-white/20 bg-white/[0.02] transition-colors"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#ff6b2c]" />
          </a>

          {/* Hire Me CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              goTo("#contact");
            }}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#ff6b2c] to-[#ea580c] hover:opacity-90 text-white text-xs sm:text-sm font-semibold transition-opacity"
          >
            Hire Me
          </a>
        </div>

        {/* ── Mobile Menu Toggle ─────────────────────────────────────── */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden p-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-300 hover:text-white transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile Dropdown Menu ──────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.08] bg-[#090807]/95 backdrop-blur-xl px-4 py-4 space-y-2 mt-2">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeLink === link.href;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(link.href);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white/[0.08] text-[#ff9a52] font-semibold"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-2">
            <a
              href="/cv.pdf"
              download="Muhammad_Sijjad_Khan_CV.pdf"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium text-slate-200 border border-white/[0.08] bg-white/[0.02]"
            >
              <Download className="w-3.5 h-3.5 text-[#ff6b2c]" />
              Download CV
            </a>
            <a
              href="https://wa.me/923144913624?text=Hi%20Sijjad%2C%20I%27d%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium text-slate-200 border border-white/[0.08] bg-white/[0.02]"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#ff6b2c]" />
              WhatsApp Chat
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                goTo("#contact");
              }}
              className="flex items-center justify-center py-2 rounded-lg bg-gradient-to-r from-[#ff6b2c] to-[#ea580c] text-white text-xs font-semibold"
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
