"use client";

import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Mail, Phone } from "lucide-react";

export default function Contact() {
  return (
    <div className="relative w-full flex flex-col min-h-screen bg-bg-base py-12 md:py-20 px-4 md:px-8">
      {/* HUD Background Overlays */}
      <div className="absolute inset-0 hud-grid pointer-events-none opacity-30" />
      <div className="absolute inset-0 hud-grid-fine pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-12 md:gap-16">
        
        {/* Page Header */}
        <div className="border-b border-secondary-accent/15 pb-6">
          <span className="font-mono text-xs text-primary-accent tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary-accent" />
            COMMS_CENTER // REACH_OUT
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-secondary-accent uppercase tracking-tight mt-2">
            Connect With AARG
          </h1>
          <p className="text-secondary-accent/60 font-mono text-[11px] mt-1 uppercase">
            OPERATIONAL_CHANNELS // INQUIRIES & PARTNERSHIPS
          </p>
        </div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <ScrollReveal>
            <div className="relative h-full flex flex-col justify-between border border-secondary-accent/15 bg-surface-mid/30 p-6 md:p-8 hover:border-primary-accent/40 transition-all duration-300 group">
              {/* HUD corner lines */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-secondary-accent/30 group-hover:border-primary-accent/60 transition-colors" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-secondary-accent/30 group-hover:border-primary-accent/60 transition-colors" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-secondary-accent/30 group-hover:border-primary-accent/60 transition-colors" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-secondary-accent/30 group-hover:border-primary-accent/60 transition-colors" />

              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono text-[9px] text-primary-accent uppercase tracking-widest font-semibold bg-primary-accent/10 px-2 py-0.5 border border-primary-accent/25">
                    Primary Contact
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-secondary-accent/40">
                      COMMS_CH // 01
                    </span>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>
                </div>
                
                <h2 className="font-display text-2xl font-bold text-secondary-accent uppercase tracking-tight group-hover:text-primary-accent transition-colors duration-300">
                  Mr. Aryan Basnet
                </h2>
                <div className="h-[1px] w-full bg-secondary-accent/10 my-4" />
              </div>

              <div className="font-mono text-xs flex flex-col gap-5 text-secondary-accent/70 mt-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] uppercase tracking-wider text-secondary-accent/40 font-bold">VOICE CHANNEL</span>
                  <a href="tel:8218397502" className="hover:text-primary-accent hover:underline flex items-center gap-2.5 text-secondary-accent transition-colors">
                    <Phone className="w-4 h-4 text-primary-accent shrink-0" />
                    <span className="font-medium">8218397502</span>
                  </a>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] uppercase tracking-wider text-secondary-accent/40 font-bold">EMAIL LINK</span>
                  <a href="mailto:aryanbasnet2005@gmail.com" className="hover:text-primary-accent hover:underline flex items-center gap-2.5 text-secondary-accent transition-colors">
                    <Mail className="w-4 h-4 text-primary-accent shrink-0" />
                    <span className="font-medium truncate">aryanbasnet2005@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="relative h-full flex flex-col justify-between border border-secondary-accent/15 bg-surface-mid/30 p-6 md:p-8 hover:border-primary-accent/40 transition-all duration-300 group">
              {/* HUD corner lines */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-secondary-accent/30 group-hover:border-primary-accent/60 transition-colors" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-secondary-accent/30 group-hover:border-primary-accent/60 transition-colors" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-secondary-accent/30 group-hover:border-primary-accent/60 transition-colors" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-secondary-accent/30 group-hover:border-primary-accent/60 transition-colors" />

              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono text-[9px] text-primary-accent uppercase tracking-widest font-semibold bg-primary-accent/10 px-2 py-0.5 border border-primary-accent/25">
                    Secondary Contact
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-secondary-accent/40">
                      COMMS_CH // 02
                    </span>
                    <span className="relative flex h-2 w-2">
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500/50"></span>
                    </span>
                  </div>
                </div>
                
                <h2 className="font-display text-2xl font-bold text-secondary-accent uppercase tracking-tight group-hover:text-primary-accent transition-colors duration-300">
                  Mr. Rahul Jadhav
                </h2>
                <div className="h-[1px] w-full bg-secondary-accent/10 my-4" />
              </div>

              <div className="font-mono text-xs flex flex-col gap-5 text-secondary-accent/70 mt-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] uppercase tracking-wider text-secondary-accent/40 font-bold">VOICE CHANNEL</span>
                  <div className="flex items-center gap-2.5 text-secondary-accent/30 select-none">
                    <Phone className="w-4 h-4 text-secondary-accent/20 shrink-0" />
                    <span className="font-medium italic">UNLISTED / EMAIL ONLY</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] uppercase tracking-wider text-secondary-accent/40 font-bold">EMAIL LINK</span>
                  <a href="mailto:rahul.jadhav@aissmsioit.org" className="hover:text-primary-accent hover:underline flex items-center gap-2.5 text-secondary-accent transition-colors">
                    <Mail className="w-4 h-4 text-primary-accent shrink-0" />
                    <span className="font-medium truncate">rahul.jadhav@aissmsioit.org</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </div>
  );
}
