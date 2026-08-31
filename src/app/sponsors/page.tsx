"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import PageBackground from "@/components/PageBackground";
import HudCard from "@/components/HudCard";
import { sponsorsData } from "@/content/sponsors";
import { siteConfig } from "@/content/site";
import { 
  Award, 
  Cpu, 
  Users, 
  Briefcase,
  ArrowRight,
  Mail
} from "lucide-react";

export default function Sponsors() {
  const { featuredSponsor, whySponsor, fundingItems, benefitsItems } = sponsorsData;

  const iconMap: Record<string, React.ReactNode> = {
    Award: <Award className="w-5 h-5 text-primary-accent" />,
    Users: <Users className="w-5 h-5 text-primary-accent" />,
    Cpu: <Cpu className="w-5 h-5 text-primary-accent" />,
    Briefcase: <Briefcase className="w-5 h-5 text-primary-accent" />,
  };

  return (
    <div className="relative w-full flex flex-col min-h-screen py-12 md:py-20 px-4 md:px-8 overflow-hidden">
      <PageBackground />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-14 md:gap-20">
        
        {/* Page Header */}
        <div className="border-b border-secondary-accent/15 pb-6 text-center md:text-left">
          <span className="font-mono text-xs text-primary-accent tracking-widest uppercase flex items-center justify-center md:justify-start gap-2">
            <span className="w-1.5 h-1.5 bg-primary-accent" />
            PARTNERSHIPS
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-secondary-accent uppercase tracking-tight mt-2">
            Sponsors &amp; Technical Partners
          </h1>
          <p className="text-secondary-accent/60 font-mono text-[11px] mt-1">
            {"ADVANCING AUTONOMOUS AERIAL ROBOTICS THROUGH INDUSTRY COLLABORATION"}
          </p>
        </div>

        {/* FEATURED SPONSOR: YARI ROBOTICS */}
        <ScrollReveal delay={0.05}>
          <div className="bg-surface-mid/30 border border-secondary-accent/15 rounded-lg p-6 md:p-8 relative">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
              
              {/* Logo Card */}
              <div className="bg-white rounded-md p-4 flex items-center justify-center border border-white/20 shrink-0 w-full sm:w-[220px] h-[110px] shadow-sm">
                <div className="relative w-full h-full">
                  <Image
                    src={featuredSponsor.logo}
                    alt={featuredSponsor.name}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Sponsor Details */}
              <div className="flex-1 flex flex-col gap-3 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="font-mono text-[9px] bg-primary-accent/15 text-primary-accent px-2 py-0.5 rounded border border-primary-accent/30 font-semibold uppercase tracking-wider">
                    {featuredSponsor.tier}
                  </span>
                  <span className="font-mono text-[9px] bg-white/5 text-secondary-accent/70 px-2 py-0.5 rounded uppercase tracking-wider">
                    {featuredSponsor.role}
                  </span>
                </div>

                <h2 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
                  {featuredSponsor.name}
                </h2>

                <p className="font-sans text-sm text-secondary-accent/80 leading-relaxed max-w-3xl">
                  {featuredSponsor.summary}
                </p>

                {/* Hardware Provided Tags */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
                  {featuredSponsor.hardwareProvided.map((hw, idx) => (
                    <div
                      key={idx}
                      className="font-mono text-[10px] bg-surface-high/60 border border-white/10 text-secondary-accent/90 px-2.5 py-1 rounded-sm flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 bg-primary-accent rounded-full" />
                      <span>{hw.name}</span>
                      <span className="text-secondary-accent/40 text-[9px]">({hw.category})</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

        {/* Why Sponsor Us? */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <h2 className="font-mono text-[10px] font-bold text-secondary-accent uppercase tracking-widest">
              {"// WHY PARTNER WITH AARG"}
            </h2>
            <div className="flex-1 hud-divider-h" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {whySponsor.map((item, idx) => (
              <ScrollReveal key={item.title} delay={0.06 * idx}>
                <HudCard 
                  title={item.title}
                  eyebrow={`VALUE 0${idx + 1}`}
                  hoverGlow={true}
                  className="h-full bg-surface-mid/20 hover:bg-surface-mid/40 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary-accent/10 border border-primary-accent/20 rounded-md shrink-0">
                      {iconMap[item.iconName]}
                    </div>
                    <p className="font-sans text-sm text-secondary-accent/75 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </HudCard>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Funding & Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Funding Section */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col gap-5 p-6 bg-surface-mid/10 border border-white/5 rounded-md relative h-full">
              <span className="font-mono text-[9px] text-primary-accent uppercase tracking-wider font-bold">
                {"// RESOURCE ALLOCATION"}
              </span>
              <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight">
                Your Support Enables
              </h3>
              <div className="hud-divider-h" />
              <ul className="space-y-3">
                {fundingItems.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-primary-accent rotate-45 shrink-0" />
                    <span className="font-sans text-sm text-secondary-accent/85">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Benefits Section */}
          <ScrollReveal delay={0.15}>
            <div className="flex flex-col gap-5 p-6 bg-surface-mid/10 border border-white/5 rounded-md relative h-full">
              <span className="font-mono text-[9px] text-primary-accent uppercase tracking-wider font-bold">
                {"// PARTNERSHIP RETURN"}
              </span>
              <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight">
                Partner Benefits
              </h3>
              <div className="hud-divider-h" />
              <ul className="space-y-3">
                {benefitsItems.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-primary-accent rotate-45 shrink-0" />
                    <span className="font-sans text-sm text-secondary-accent/85">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* BECOME A SPONSOR CTA */}
        <ScrollReveal delay={0.2}>
          <div className="border border-secondary-accent/15 bg-surface-mid/20 rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-1.5 text-center md:text-left max-w-xl">
              <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight">
                Partner With Our Engineering Team
              </h3>
              <p className="font-sans text-xs md:text-sm text-secondary-accent/75 leading-relaxed">
                Connect with our team to discuss hardware sponsorships, technical collaboration, or competition support.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={`mailto:${siteConfig.email}?subject=AARG%20Sponsorship%20Inquiry`}
                className="font-sans text-xs font-semibold border border-primary-accent bg-primary-accent text-white px-5 py-2.5 hover:bg-primary-accent/90 transition-colors rounded-md inline-flex items-center justify-center gap-2 shadow-sm"
              >
                <Mail className="w-3.5 h-3.5" /> Partner With Us
              </a>
              <Link
                href="/contact"
                className="font-sans text-xs font-medium border border-secondary-accent/30 text-secondary-accent bg-transparent px-5 py-2.5 hover:border-primary-accent hover:text-primary-accent transition-colors rounded-md inline-flex items-center justify-center gap-2"
              >
                Contact Team <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
