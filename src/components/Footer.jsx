import { ArrowUp, Mail, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { portfolioData } from "../data/portfolioData";

export default function Footer() {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#070605] border-t border-white/5 py-12 px-5 sm:px-8 lg:px-16 text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand Info */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2 text-white font-bold tracking-wider">
            <div className="w-6 h-6 rounded bg-[#ff6b2c] flex items-center justify-center text-slate-950 font-black text-xs">
              SK
            </div>
            <span>
              MUHAMMAD <span className="text-[#ff6b2c]">SIJJAD</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Gold Medalist Software Engineer · Full-Stack & GenAI Solutions
          </p>
        </div>

        {/* Social Icons Bar */}
        <div className="flex items-center gap-3">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <LinkedinIcon className="w-4 h-4 text-[#ff9a52]" />
          </a>
          <a
            href={`mailto:${personal.email}`}
            aria-label="Send Email"
            className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href={personal.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Chat"
            className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-emerald-400 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
        </div>

        {/* Back to Top */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-400">
            © {new Date().getFullYear()} Muhammad Sijjad Khan. All rights reserved.
          </span>
          <button
            type="button"
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-[#ff6b2c] hover:text-black border border-white/10 text-slate-300 transition-all group"
            aria-label="Scroll back to top"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
