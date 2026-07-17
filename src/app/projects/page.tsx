"use client";

import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { Cpu, ExternalLink, HardDrive, Layers, Compass } from "lucide-react";

export default function Projects() {
  const images = [
    {
      src: "/images/marut_top.png",
      alt: "Marut FCU 3D Top Components Placement Render",
      caption: "3D CAD render highlighting the top components placement, including the MCU, sensor array, and high-profile connectors of the Through-Hole (TH) PCB design.",
    },
    {
      src: "/images/marut_angle.png",
      alt: "Marut FCU Angled Perspective Layout Render",
      caption: "Angled perspective render showing the spatial layout and structural height clearance of the discrete capacitors, headers, and shield components.",
    },
    {
      src: "/images/marut_pcb.png",
      alt: "Marut TH Board Trace Routing Stack",
      caption: "First iteration of TH boards displaying trace routing geometry, ground planes, and bottom-side auxiliary components designed for ease of hand-soldering and community debugging.",
    },
  ];

  return (
    <div className="relative w-full flex flex-col min-h-screen bg-bg-base py-12 md:py-20 px-4 md:px-8">
      {/* HUD background grid textures */}
      <div className="absolute inset-0 hud-grid pointer-events-none opacity-30" />
      <div className="absolute inset-0 hud-grid-fine pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-16 md:gap-24">
        
        {/* Page Header */}
        <div className="border-b border-secondary-accent/15 pb-6">
          <span className="font-mono text-xs text-primary-accent tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary-accent" />
            PROJECT_MANIFEST // AUTON_FLIGHT_SYS
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-secondary-accent uppercase tracking-tight mt-2">
            Engineering Projects
          </h1>
          <p className="text-secondary-accent/60 font-mono text-[11px] mt-1">
            ACTIVE_R&amp;D // IN-HOUSE HARDWARE &amp; FIRMWARE
          </p>
        </div>

        {/* PROJECT SPOTLIGHT - MARUT */}
        <ScrollReveal>
          <div className="border border-primary-accent/35 bg-surface/30 p-6 md:p-10 relative flex flex-col gap-8">
            <div className="hud-corner hud-corner-tl !border-primary-accent" />
            <div className="hud-corner hud-corner-tr !border-primary-accent" />
            <div className="hud-corner hud-corner-bl !border-primary-accent" />
            <div className="hud-corner hud-corner-br !border-primary-accent" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Written Narrative */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-primary-accent tracking-widest uppercase font-semibold">
                    PROJECT_CODENAME: MARUT
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-mono text-[9px] text-green-500 uppercase tracking-widest">ACTIVE DEVELOPMENT</span>
                </div>
                
                <h2 className="font-display text-2xl md:text-3xl font-extrabold text-secondary-accent uppercase tracking-tight">
                  Marut Flight Control Unit
                </h2>

                <div className="font-sans text-sm md:text-base text-secondary-accent/80 space-y-4 leading-relaxed mt-2">
                  <p>
                    <strong>Marut FCU</strong> is a student-built, open-source flight control unit developed with the explicit goal of supporting quadcopter, fixed-wing, and VTOL platforms under one repository and one evolving firmware architecture.
                  </p>
                  <p>
                    The project is built around <strong>STM32F4</strong> targets, STM32CubeIDE, CMSIS-RTOS v2 on FreeRTOS, and a handwritten control and telemetry stack that remains readable enough for contributors to extend across avionics, firmware, and hardware domains.
                  </p>
                  <p>
                    What makes it distinctive is not only the tri-mode ambition, but the decision to keep the hardware, firmware structure, build artifacts, and engineering workflow visible in-repo rather than hiding them behind opaque tooling.
                  </p>
                  <p>
                    The repository already contains active integrated FCU targets, isolated mode-validation targets, and open PCB/composite scaffolding, while some fixed-wing and VTOL paths remain explicitly marked as pending hardware validation. It should be read as real embedded systems work under active development, not as a finished flight-certified stack.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href="https://marut-bay.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-bold border border-primary-accent bg-primary-accent px-5 py-3 hover:bg-primary-accent/90 text-white transition-all duration-300 flex items-center gap-2 hover:scale-[1.02] shadow-[0_0_15px_rgba(180,77,11,0.2)]"
                  >
                    <span>VISIT MARUT PORTAL</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Hardware Specifications Telemetry */}
              <div className="lg:col-span-5 w-full flex flex-col gap-4">
                <div className="border border-secondary-accent/15 bg-bg-base/80 p-6 font-mono text-xs relative flex flex-col gap-4">
                  <div className="hud-corner hud-corner-tl" />
                  <div className="hud-corner hud-corner-tr" />
                  <div className="hud-corner hud-corner-bl" />
                  <div className="hud-corner hud-corner-br" />

                  <div className="text-primary-accent font-bold border-b border-secondary-accent/15 pb-2 uppercase tracking-wider">
                    {"// FCU_TECHNICAL_SPECS"}
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center border-b border-secondary-accent/5 pb-2 text-secondary-accent/80">
                      <span className="flex items-center gap-2 text-[10px] text-secondary-accent/60 uppercase">
                        <Cpu className="w-3.5 h-3.5 text-primary-accent/70" /> Microcontroller
                      </span>
                      <span className="text-secondary-accent font-bold">STM32F4 Series</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-secondary-accent/5 pb-2 text-secondary-accent/80">
                      <span className="flex items-center gap-2 text-[10px] text-secondary-accent/60 uppercase">
                        <HardDrive className="w-3.5 h-3.5 text-primary-accent/70" /> RTOS kernel
                      </span>
                      <span className="text-secondary-accent font-bold">FreeRTOS / CMSIS v2</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-secondary-accent/5 pb-2 text-secondary-accent/80">
                      <span className="flex items-center gap-2 text-[10px] text-secondary-accent/60 uppercase">
                        <Layers className="w-3.5 h-3.5 text-primary-accent/70" /> IDE / Toolchain
                      </span>
                      <span className="text-secondary-accent font-bold">STM32CubeIDE</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-secondary-accent/5 pb-2 text-secondary-accent/80">
                      <span className="flex items-center gap-2 text-[10px] text-secondary-accent/60 uppercase">
                        <Compass className="w-3.5 h-3.5 text-primary-accent/70" /> Target Modes
                      </span>
                      <span className="text-primary-accent font-bold">Quad / Fixed-Wing / VTOL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* CAD & HARDWARE GALLERY */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-primary-accent font-bold uppercase tracking-widest">
              {"// DESIGN_SCHEMATIC_RENDERS"}
            </span>
            <div className="flex-1 hud-divider-h" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {images.map((img, i) => (
              <ScrollReveal key={i} delay={0.1 * i}>
                <div className="border border-secondary-accent/15 bg-surface/20 p-4 flex flex-col gap-4 relative group hover:border-primary-accent/40 transition-all duration-300">
                  <div className="hud-corner hud-corner-tl" />
                  <div className="hud-corner hud-corner-tr" />
                  <div className="hud-corner hud-corner-bl" />
                  <div className="hud-corner hud-corner-br" />

                  {/* Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40 border border-secondary-accent/10">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Caption */}
                  <div className="font-sans text-xs text-secondary-accent/70 leading-relaxed min-h-[4.5rem]">
                    {img.caption}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
