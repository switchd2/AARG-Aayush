import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Mail, Phone } from "lucide-react";

const footerDots = Array.from({ length: 72 }, (_, index) => {
  const seed = index * 41 + 12;
  const rand = (n: number) => Math.abs(Math.sin(n) * 10000 % 1);
  const left = 4 + Math.floor(rand(seed) * 92);
  const top = 6 + Math.floor(rand(seed + 7) * 74);
  const size = 0.9 + rand(seed + 3) * 1.4;
  const delay = `${-(rand(seed + 11) * 7).toFixed(2)}s`;
  const duration = `${2.4 + rand(seed + 13) * 2.4}s`;
  return {
    left: `${Math.min(left, 96)}%`,
    top: `${Math.min(top, 90)}%`,
    size,
    delay,
    duration,
  };
});

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Projects", href: "/projects" },
    { name: "Achievements", href: "/achievements" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-bg-base py-12 md:py-16 font-mono text-[11px] relative z-10 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-t from-bg-base via-bg-base/70 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {footerDots.map((dot, index) => (
          <span
            key={index}
            className="scroll-dot"
            style={{
              left: dot.left,
              top: dot.top,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              animationDelay: dot.delay,
              animationDuration: dot.duration,
            }}
          />
        ))}
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left justify-items-center md:justify-items-stretch">
        {/* Brand Description */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <Link
            href="/"
            className="font-display font-bold text-lg tracking-wider text-secondary-accent flex items-center gap-2 focus-hud"
          >
            <img
              src="/logo.png"
              alt="AARG Logo"
              className="w-8 h-8 object-contain rounded-full"
            />
            {siteConfig.name}
          </Link>
          <p className="text-secondary-accent/70 leading-relaxed font-sans max-w-sm">
            {siteConfig.description}
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <h4 className="text-primary-accent font-bold uppercase tracking-widest text-[10px]">
            {"QUICK_LINKS"}
          </h4>
          <nav className="grid grid-cols-2 gap-2 text-secondary-accent/80 font-medium text-left">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-primary-accent transition-colors duration-200 focus-hud py-1"
              >
                {"//"} {link.name}
              </Link>
            ))}
            <Link
              href="/join"
              className="text-primary-accent hover:underline font-bold py-1 focus-hud"
            >
              {"// Join Us"}
            </Link>
          </nav>
        </div>

        {/* Contact Block */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <h4 className="text-primary-accent font-bold uppercase tracking-widest text-[10px]">
            {"CONTACT_TELEMETRY"}
          </h4>
          <div className="flex flex-col gap-3 text-secondary-accent/80 items-center md:items-start">
            <div className="flex items-center gap-2 leading-relaxed mt-1">
              <Mail className="w-4 h-4 text-primary-accent shrink-0" />
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-primary-accent hover:underline focus-hud font-mono"
              >
                {siteConfig.email}
              </a>
            </div>
            <div className="flex items-center gap-2 leading-relaxed">
              <Phone className="w-4 h-4 text-primary-accent shrink-0" />
              <a
                href={`tel:${siteConfig.phone}`}
                className="hover:text-primary-accent hover:underline focus-hud font-mono"
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 border-t border-secondary-accent/10 mt-12 pt-6 text-secondary-accent/50 text-center">
        © {new Date().getFullYear()} {siteConfig.name}. Student Engineering Team.
      </div>
    </footer>
  );
}
