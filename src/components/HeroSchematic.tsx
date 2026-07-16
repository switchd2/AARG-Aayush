"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════════════
   HeroSchematic — Enhanced Interactive flight HUD for AARG hero section
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── Deterministic pseudo-random (avoids SSR hydration mismatch) ──────────
function srand(seed: number) {
  return ((Math.sin(seed * 127.1) * 43758.5453) % 1 + 1) % 1;
}

// ─── SVG wireframe paths — top-down fixed-wing UAV ────────────────────────
const WIREFRAME: { d: string; w: number; o: number; delay: number }[] = [
  // Fuselage outline
  {
    d: "M200,42 C214,58 218,90 218,200 C218,295 214,335 200,358 C186,335 182,295 182,200 C182,90 186,58 200,42Z",
    w: 1.3, o: 0.85, delay: 0,
  },
  // Left wing
  {
    d: "M182,148 L42,188 Q38,190 40,196 L50,198 L182,168",
    w: 1.3, o: 0.85, delay: 0.25,
  },
  // Right wing
  {
    d: "M218,148 L358,188 Q362,190 360,196 L350,198 L218,168",
    w: 1.3, o: 0.85, delay: 0.25,
  },
  // Left stabilizer
  {
    d: "M188,308 L118,338 Q114,340 116,346 L126,347 L192,320",
    w: 1, o: 0.7, delay: 0.5,
  },
  // Right stabilizer
  {
    d: "M212,308 L282,338 Q286,340 284,346 L274,347 L208,320",
    w: 1, o: 0.7, delay: 0.5,
  },
  // Wing spar (structural)
  { d: "M52,193 L348,193", w: 0.6, o: 0.3, delay: 0.45 },
  // Center line
  { d: "M200,52 L200,352", w: 0.5, o: 0.2, delay: 0.15 },
  // Nose ring
  { d: "M193,56 A7,7 0 1,1 207,56 A7,7 0 1,1 193,56", w: 0.8, o: 0.6, delay: 0.7 },
  // Wing ribs — left
  { d: "M155,153 L155,172", w: 0.5, o: 0.25, delay: 0.6 },
  { d: "M120,166 L120,185", w: 0.5, o: 0.25, delay: 0.65 },
  { d: "M85,178 L85,195", w: 0.5, o: 0.25, delay: 0.7 },
  // Wing ribs — right
  { d: "M245,153 L245,172", w: 0.5, o: 0.25, delay: 0.6 },
  { d: "M280,166 L280,185", w: 0.5, o: 0.25, delay: 0.65 },
  { d: "M315,178 L315,195", w: 0.5, o: 0.25, delay: 0.7 },
  // Motor / payload bay
  { d: "M192,192 L192,208 L208,208 L208,192 Z", w: 0.6, o: 0.4, delay: 0.8 },
  // Left aileron hinge
  { d: "M60,188 L140,163", w: 0.35, o: 0.18, delay: 0.78 },
  // Right aileron hinge
  { d: "M260,163 L340,188", w: 0.35, o: 0.18, delay: 0.78 },
  // Left elevator hinge
  { d: "M128,340 L180,314", w: 0.35, o: 0.18, delay: 0.88 },
  // Right elevator hinge
  { d: "M220,314 L272,340", w: 0.35, o: 0.18, delay: 0.88 },
];

// ─── Node markers at key structural points ────────────────────────────────
const NODES = [
  { cx: 200, cy: 56, r: 3.5, label: "NODE_001" },   // Nose
  { cx: 42, cy: 192, r: 2.5, label: "NODE_111" },   // L wingtip
  { cx: 358, cy: 192, r: 2.5, label: "NODE_112" },  // R wingtip
  { cx: 200, cy: 200, r: 5, label: "NODE_441" },    // CG
  { cx: 118, cy: 340, r: 2, label: "NODE_301" },    // L tail
  { cx: 282, cy: 340, r: 2, label: "NODE_302" },    // R tail
  { cx: 200, cy: 355, r: 2.5, label: "NODE_099" },  // Aft
];



// ─── Data callouts with connecting lines ──────────────────────────────────
const CALLOUTS = [
  { key: "wingspan", x: 10, y: 108, label: "WINGSPAN", value: "2.4 M", lx1: 42, ly1: 178, lx2: 10, ly2: 116, anchor: "start" },
  { key: "airframe", x: 390, y: 108, label: "AIRFRAME", value: "COMPOSITE", lx1: 358, ly1: 178, lx2: 390, ly2: 116, anchor: "end" },
  { key: "payload", x: 10, y: 362, label: "MAX PAYLOAD", value: "5.0 KG", lx1: 118, ly1: 338, lx2: 10, ly2: 365, anchor: "start" },
  { key: "endurance", x: 390, y: 362, label: "ENDURANCE", value: "45 MIN", lx1: 282, ly1: 338, lx2: 390, ly2: 365, anchor: "end" },
];

// ─── Floating particles (deterministic positions) ─────────────────────────
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  cx: 30 + srand(i * 7.1 + 1.3) * 340,
  cy: 30 + srand(i * 11.7 + 2.9) * 340,
  r: 0.4 + srand(i * 17.3 + 3.7) * 1.2,
  dur: 5 + srand(i * 23.1 + 4.1) * 8,
  del: srand(i * 29.9 + 5.3) * 4,
  dx: (srand(i * 31.7 + 6.1) - 0.5) * 35,
  dy: (srand(i * 37.3 + 7.9) - 0.5) * 35,
}));

// ─── Cycling status messages ──────────────────────────────────────────────
const STATUS_MSGS = [
  "SCANNING AIRFRAME GEOMETRY...",
  "STRUCTURAL FEA ANALYSIS OK",
  "CFD SIMULATION NOMINAL",
  "AUTOPILOT FIRMWARE v4.2.1",
  "ALL SYSTEMS OPERATIONAL",
  "MISSION PARAMETERS LOADED",
  "COMMS LINK ESTABLISHED",
];

// Grid line positions for subtle background grid
const GRID = [80, 120, 160, 200, 240, 280, 320];

// ─── Component ────────────────────────────────────────────────────────────

export default function HeroSchematic() {
  const shouldReduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [statusIdx, setStatusIdx] = useState(0);

  // Enhanced States
  const [activeMode, setActiveMode] = useState<"wireframe" | "stress" | "diagnostics">("wireframe");
  const [activeNode, setActiveNode] = useState<number>(3); // Default to CG (index 3)
  const [isCycling, setIsCycling] = useState<boolean>(true);
  const [hoveredCallout, setHoveredCallout] = useState<string | null>(null);
  const [throttle, setThrottle] = useState<number>(45); // default 45% throttle
  useEffect(() => {
    setMounted(true);
  }, []);

  // Cycle status messages
  useEffect(() => {
    if (shouldReduce) return;
    const id = setInterval(
      () => setStatusIdx((p) => (p + 1) % STATUS_MSGS.length),
      3500
    );
    return () => clearInterval(id);
  }, [shouldReduce]);

  // Auto cycle active nodes when user is not hovering/clicking
  useEffect(() => {
    if (!isCycling) return;
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % NODES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isCycling]);

  // ── SSR placeholder ─────────────────────────────────────────────────────
  if (!mounted) {
    return (
      <div
        className="w-full flex items-center justify-center border border-secondary-accent/15 bg-bg-base/80"
        style={{ aspectRatio: "1" }}
      >
        <span className="font-mono text-[9px] text-secondary-accent/20 uppercase tracking-[0.2em]">
          LOADING SCHEMATIC...
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full mx-auto select-none flex flex-col gap-3 group/schematic" style={{ maxWidth: 520 }}>
      
      {/* ════════ VIEW MODE CONTROLS ════════ */}
      <div className="flex border border-secondary-accent/15 bg-surface/80 backdrop-blur-md p-1 font-mono text-[9px] justify-between items-center relative">
        <div className="hud-corner hud-corner-tl" />
        <div className="hud-corner hud-corner-tr" />
        <div className="hud-corner hud-corner-bl" />
        <div className="hud-corner hud-corner-br" />
        
        <span className="pl-2 font-mono text-[8px] text-primary-accent font-bold tracking-[0.1em] uppercase">
          [ FLIGHT_DIAGNOSTICS ]
        </span>
        
        <div className="flex gap-1.5 z-10">
          {[
            { id: "wireframe", label: "WFR_01", desc: "Wireframe View" },
            { id: "stress", label: "STR_02", desc: "Stress Heatmap" },
            { id: "diagnostics", label: "DIA_03", desc: "Digital Stream" },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id as any)}
              className={`px-2 py-1 border transition-all duration-200 uppercase cursor-pointer text-[8px] ${
                activeMode === mode.id
                  ? "bg-primary-accent border-primary-accent text-white font-bold shadow-[0_0_8px_rgba(180,77,11,0.35)]"
                  : "border-secondary-accent/10 hover:border-primary-accent/40 text-secondary-accent/50 hover:text-secondary-accent"
              }`}
              title={mode.desc}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* ════════ MAIN HUD PLOT AREA ════════ */}
      <div className="relative border border-secondary-accent/15 bg-bg-base/70 backdrop-blur-sm overflow-hidden p-2">
        <div className="hud-corner hud-corner-tl" />
        <div className="hud-corner hud-corner-tr" />
        <div className="hud-corner hud-corner-bl" />
        <div className="hud-corner hud-corner-br" />

        {/* Ambient radial glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-500"
          style={{
            background:
              activeMode === "stress"
                ? "radial-gradient(circle at 50% 48%, rgba(239,68,68,0.06) 0%, rgba(180,77,11,0.03) 40%, transparent 75%)"
                : activeMode === "diagnostics"
                ? "radial-gradient(circle at 50% 48%, rgba(34,197,94,0.06) 0%, transparent 65%)"
                : "radial-gradient(circle at 50% 48%, rgba(180,77,11,0.08) 0%, transparent 65%)",
          }}
        />

        <svg
          viewBox="0 0 400 400"
          className="w-full h-auto"
          style={{
            filter:
              activeMode === "stress"
                ? "drop-shadow(0 0 10px rgba(239,68,68,0.05))"
                : activeMode === "diagnostics"
                ? "drop-shadow(0 0 10px rgba(34,197,94,0.05))"
                : "drop-shadow(0 0 10px rgba(180,77,11,0.1))"
          }}
        >
          <defs>
            {/* Soft line glows */}
            <filter id="hs-glow">
              <feGaussianBlur stdDeviation="1.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            <filter id="hs-glow-s">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Vertical sweep gradients */}
            <linearGradient id="hs-sweep" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b44d0b" stopOpacity="0" />
              <stop offset="38%" stopColor="#b44d0b" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#b44d0b" stopOpacity="0.18" />
              <stop offset="62%" stopColor="#b44d0b" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#b44d0b" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="hs-sweep-diag" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
              <stop offset="38%" stopColor="#22c55e" stopOpacity="0.04" />
              <stop offset="50%" stopColor="#22c55e" stopOpacity="0.22" />
              <stop offset="62%" stopColor="#22c55e" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>

            {/* Center radial glow */}
            <radialGradient id="hs-center">
              <stop offset="0%" stopColor="#b44d0b" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#b44d0b" stopOpacity="0" />
            </radialGradient>

            {/* Stress Map Gradients (Root to Tip) */}
            <linearGradient id="hs-stress-left" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" /> {/* High structural stress at wing root */}
              <stop offset="35%" stopColor="#f97316" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#eab308" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" /> {/* Low stress at wingtip */}
            </linearGradient>

            <linearGradient id="hs-stress-right" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#f97316" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#eab308" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
            </linearGradient>

            <linearGradient id="hs-stress-fuse" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="45%" stopColor="#f97316" stopOpacity="0.6" />
              <stop offset="85%" stopColor="#ef4444" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* ════════ BACKGROUND GRID LAYER ════════ */}
          <circle cx="200" cy="200" r="190" fill="url(#hs-center)" />

          {/* Subtle Grid Lines */}
          {GRID.map((v) => (
            <React.Fragment key={v}>
              <line
                x1={v} y1="15" x2={v} y2="385"
                stroke={activeMode === "diagnostics" ? "#22c55e" : "#b44d0b"}
                strokeWidth="0.3" opacity={activeMode === "diagnostics" ? "0.04" : "0.05"}
              />
              <line
                x1="15" y1={v} x2="385" y2={v}
                stroke={activeMode === "diagnostics" ? "#22c55e" : "#b44d0b"}
                strokeWidth="0.3" opacity={activeMode === "diagnostics" ? "0.04" : "0.05"}
              />
            </React.Fragment>
          ))}

          {/* ════════ DIAGNOSTIC BINARY OVERLAY ════════ */}
          {activeMode === "diagnostics" && (
            <g fill="#22c55e" opacity="0.35" fontSize="5.5" fontFamily="ui-monospace, monospace" letterSpacing="0.8">
              <text x="35" y="60">SYS_CHECK // RUNNING</text>
              <text x="35" y="70">GNSS_RTK: COORD_LOCK</text>
              <text x="35" y="80">PITCH: +1.4°</text>
              <text x="35" y="90">ESC_COMM: 115200bps</text>
              
              <text x="290" y="60" textAnchor="start">HD_CAM // 1080P_60</text>
              <text x="290" y="70" textAnchor="start">TELEM_RSSI: 99%</text>
              <text x="290" y="80" textAnchor="start">ROLL: -0.8°</text>
              <text x="290" y="90" textAnchor="start">MEM_USED: 24.1KB</text>
            </g>
          )}

          {/* ════════ SCAN RINGS ════════ */}

          {/* Outer rotating ring with tick marks */}
          <motion.g
            animate={shouldReduce ? {} : { rotate: 360 }}
            transition={{ duration: 40 * (1.2 - throttle / 100), repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "200px 200px" }}
          >
            <circle
              cx="200" cy="200" r="180"
              fill="none"
              stroke={activeMode === "diagnostics" ? "#22c55e" : activeMode === "stress" ? "#ef4444" : "#b44d0b"}
              strokeWidth="0.7"
              strokeDasharray="8 14 3 18"
              opacity={activeMode === "diagnostics" ? "0.3" : "0.2"}
            />
            {/* 30° tick marks */}
            {Array.from({ length: 12 }, (_, i) => {
              const a = (i * 30 * Math.PI) / 180;
              const cos = Math.cos(a);
              const sin = Math.sin(a);
              return (
                <line
                  key={i}
                  x1={200 + 175 * cos} y1={200 + 175 * sin}
                  x2={200 + 180 * cos} y2={200 + 180 * sin}
                  stroke={activeMode === "diagnostics" ? "#22c55e" : "#b44d0b"}
                  strokeWidth={i % 3 === 0 ? 1.2 : 0.6}
                  opacity={i % 3 === 0 ? 0.4 : 0.2}
                />
              );
            })}
          </motion.g>

          {/* Inner counter-rotating ring */}
          <motion.circle
            cx="200" cy="200" r="168"
            fill="none"
            stroke={activeMode === "diagnostics" ? "#22c55e" : "#b44d0b"}
            strokeWidth="0.4"
            strokeDasharray="2 22 6 28"
            opacity="0.1"
            animate={shouldReduce ? {} : { rotate: -360 }}
            transition={{ duration: 55 * (1.2 - throttle / 100), repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "200px 200px" }}
          />

          {/* Faint inner reference circle */}
          <circle
            cx="200" cy="200" r="155"
            fill="none"
            stroke={activeMode === "diagnostics" ? "#22c55e" : "#b44d0b"}
            strokeWidth="0.3"
            opacity="0.06"
          />

          {/* ════════ SWEEP LINE ════════ */}
          <motion.rect
            x="15" width="370" height="55"
            fill={activeMode === "diagnostics" ? "url(#hs-sweep-diag)" : "url(#hs-sweep)"}
            animate={shouldReduce ? {} : { y: [15, 335, 15] }}
            transition={{ duration: (activeMode === "diagnostics" ? 2.5 : 5.5) * (1.2 - throttle / 100), repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ════════ FLOATING PARTICLES ════════ */}
          {PARTICLES.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.cx} cy={p.cy} r={p.r}
              fill={activeMode === "diagnostics" ? "#22c55e" : activeMode === "stress" ? "#ef4444" : "#b44d0b"}
              opacity={0.12}
              animate={
                shouldReduce
                  ? {}
                  : {
                      cx: [p.cx, p.cx + p.dx, p.cx],
                      cy: [p.cy, p.cy + p.dy, p.cy],
                      opacity: [0.08, 0.28, 0.08],
                    }
              }
              transition={{
                duration: p.dur * (1.25 - throttle / 100),
                delay: p.del,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* ════════ STRESS HEATMAP GRADIENT OVERLAY ════════ */}
          {activeMode === "stress" && (
            <g filter="url(#hs-glow-s)">
              {/* Left Wing Glow */}
              <path
                d="M182,148 L42,188 Q38,190 40,196 L50,198 L182,168"
                fill="none" stroke="url(#hs-stress-left)" strokeWidth="6" strokeLinecap="round" opacity="0.8"
              />
              {/* Right Wing Glow */}
              <path
                d="M218,148 L358,188 Q362,190 360,196 L350,198 L218,168"
                fill="none" stroke="url(#hs-stress-right)" strokeWidth="6" strokeLinecap="round" opacity="0.8"
              />
              {/* Left Stabilizer Glow */}
              <path
                d="M188,308 L118,338 Q114,340 116,346 L126,347 L192,320"
                fill="none" stroke="url(#hs-stress-left)" strokeWidth="4.5" opacity="0.8"
              />
              {/* Right Stabilizer Glow */}
              <path
                d="M212,308 L282,338 Q286,340 284,346 L274,347 L208,320"
                fill="none" stroke="url(#hs-stress-right)" strokeWidth="4.5" opacity="0.8"
              />
              {/* Fuselage Glow */}
              <path
                d="M200,42 C214,58 218,90 218,200 C218,295 214,335 200,358 C186,335 182,295 182,200 C182,90 186,58 200,42Z"
                fill="none" stroke="url(#hs-stress-fuse)" strokeWidth="4" opacity="0.75"
              />
            </g>
          )}

          {/* ════════ DRONE WIREFRAME ════════ */}
          <g filter="url(#hs-glow)">
            {WIREFRAME.map((path, i) => (
              <motion.path
                key={i}
                d={path.d}
                fill="none"
                stroke={
                  activeMode === "diagnostics"
                    ? "#22c55e"
                    : activeMode === "stress"
                    ? "#ef4444"
                    : "#b44d0b"
                }
                strokeWidth={path.w}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: activeMode === "stress" ? 0.3 : path.o }}
                transition={{
                  pathLength: {
                    duration: 1.6,
                    delay: path.delay,
                    ease: "easeInOut",
                  },
                  opacity: { duration: 0.4, delay: path.delay },
                }}
              />
            ))}
          </g>

          {/* ════════ INTERACTIVE CALLOUT OVERLAY GRAPHICS ════════ */}
          
          {/* 1. Wingspan Dimension Line */}
          {hoveredCallout === "wingspan" && (
            <g className="transition-all duration-300">
              <line x1="42" y1="192" x2="358" y2="192" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3 3" />
              <polygon points="42,192 52,188 52,196" fill="#ef4444" />
              <polygon points="358,192 348,188 348,196" fill="#ef4444" />
              <line x1="42" y1="175" x2="42" y2="210" stroke="#ef4444" strokeWidth="0.6" opacity="0.5" />
              <line x1="358" y1="175" x2="358" y2="210" stroke="#ef4444" strokeWidth="0.6" opacity="0.5" />
              
              <rect x="165" y="181" width="70" height="22" fill="#0a0b0d" stroke="#ef4444" strokeWidth="1" />
              <text x="200" y="195" textAnchor="middle" fill="#d1cabf" fontSize="7.5" fontFamily="ui-monospace, monospace" fontWeight="bold">
                2.4 METERS
              </text>
            </g>
          )}

          {/* 2. Airframe Spar Highlights */}
          {hoveredCallout === "airframe" && (
            <g filter="url(#hs-glow-s)">
              <line x1="52" y1="193" x2="348" y2="193" stroke="#eab308" strokeWidth="2.5" opacity="0.9" />
              <line x1="200" y1="52" x2="200" y2="352" stroke="#eab308" strokeWidth="2.5" opacity="0.9" />
              
              <text x="200" y="132" textAnchor="middle" fill="#eab308" fontSize="8" fontFamily="ui-monospace, monospace" fontWeight="bold">
                CARBON-SPAR CORE
              </text>
            </g>
          )}

          {/* 3. Max Payload Cuboid */}
          {hoveredCallout === "payload" && (
            <g>
              <rect x="175" y="175" width="50" height="50" fill="rgba(180,77,11,0.25)" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="175" y1="175" x2="165" y2="165" stroke="#ef4444" strokeWidth="0.8" />
              <line x1="225" y1="175" x2="215" y2="165" stroke="#ef4444" strokeWidth="0.8" />
              <line x1="225" y1="225" x2="215" y2="215" stroke="#ef4444" strokeWidth="0.8" />
              <line x1="175" y1="225" x2="165" y2="215" stroke="#ef4444" strokeWidth="0.8" />
              <rect x="165" y="165" width="50" height="50" fill="none" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />
              
              <text x="200" y="160" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="ui-monospace, monospace" fontWeight="bold">
                PAYLOAD COMPARTMENT
              </text>
            </g>
          )}

          {/* 4. Endurance Battery Charge flow */}
          {hoveredCallout === "endurance" && (
            <g>
              <path
                d="M200,42 C214,58 218,90 218,200 C218,295 214,335 200,358 C186,335 182,295 182,200 C182,90 186,58 200,42Z"
                fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.75"
              />
              <path
                d="M200,330 L200,60"
                fill="none" stroke="#22c55e" strokeWidth="4"
                strokeDasharray="10 15"
                opacity="0.8"
              >
                <animate attributeName="stroke-dashoffset" values="50;0" dur="1.2s" repeatCount="indefinite" />
              </path>
              <text x="200" y="315" textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="ui-monospace, monospace" fontWeight="bold">
                6S LIPO // 22.8V
              </text>
            </g>
          )}

          {/* ════════ NODE MARKERS & INTERACTIVE TARGET ════════ */}
          
          {/* Radial targets and connecting crosshairs for Selected Node */}
          <g>
            {NODES.map((n, i) => {
              const isActive = activeNode === i;
              if (!isActive) return null;
              return (
                <g key={`target-${i}`} filter="url(#hs-glow-s)">
                  {/* Concentric targets */}
                  <circle cx={n.cx} cy={n.cy} r="13" fill="none" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="3 2" className="animate-spin" style={{ transformOrigin: `${n.cx}px ${n.cy}px` }} />
                  <circle cx={n.cx} cy={n.cy} r="8" fill="none" stroke="#ef4444" strokeWidth="0.5" opacity="0.6" />
                  
                  {/* Dynamic horizontal alignment vector line */}
                  <line x1={n.cx - 22} y1={n.cy} x2={n.cx + 22} y2={n.cy} stroke="#ef4444" strokeWidth="0.4" opacity="0.8" />
                  {/* Dynamic vertical alignment vector line */}
                  <line x1={n.cx} y1={n.cy - 22} x2={n.cx} y2={n.cy + 22} stroke="#ef4444" strokeWidth="0.4" opacity="0.8" />

                  {/* Tiny text identifier next to node */}
                  <text x={n.cx + 16} y={n.cy + 3} fill="#ef4444" fontSize="5.5" fontFamily="ui-monospace, monospace" fontWeight="bold">
                    {n.label} [LOCK]
                  </text>
                </g>
              );
            })}
          </g>

          <g filter="url(#hs-glow-s)">
            {NODES.map((n, i) => {
              const isActive = activeNode === i;
              return (
                <React.Fragment key={i}>
                  {/* Solid node dot */}
                  <circle
                    cx={n.cx} cy={n.cy} r={n.r}
                    fill={isActive ? "#ef4444" : activeMode === "diagnostics" ? "#22c55e" : "#b44d0b"}
                    className="transition-colors duration-300"
                  />
                  {/* Expanding pulse ring */}
                  <motion.circle
                    cx={n.cx} cy={n.cy} r={n.r}
                    fill="none"
                    stroke={isActive ? "#ef4444" : activeMode === "diagnostics" ? "#22c55e" : "#b44d0b"}
                    strokeWidth="0.5"
                    style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
                    animate={
                      shouldReduce
                        ? {}
                        : { scale: isActive ? [1, 5] : [1, 4], opacity: isActive ? [0.65, 0] : [0.45, 0] }
                    }
                    transition={{
                      duration: isActive ? 1.8 : 2.4,
                      delay: 1.8 + i * 0.25,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                </React.Fragment>
              );
            })}
          </g>

          {/* ════════ ROTATING CROSSHAIR AT CG ════════ */}
          <motion.g
            style={{ transformOrigin: "200px 200px" }}
            animate={shouldReduce ? {} : { rotate: 360 }}
            transition={{ duration: 25 * (1.2 - throttle / 100), repeat: Infinity, ease: "linear" }}
          >
            <line x1="200" y1="188" x2="200" y2="180" stroke="#b44d0b" strokeWidth="0.5" opacity="0.25" />
            <line x1="200" y1="212" x2="200" y2="220" stroke="#b44d0b" strokeWidth="0.5" opacity="0.25" />
            <line x1="188" y1="200" x2="180" y2="200" stroke="#b44d0b" strokeWidth="0.5" opacity="0.25" />
            <line x1="212" y1="200" x2="220" y2="200" stroke="#b44d0b" strokeWidth="0.5" opacity="0.25" />
          </motion.g>

          {/* ════════ CALLOUT LABELS ════════ */}
          {CALLOUTS.map((c, i) => {
            const isHovered = hoveredCallout === c.key;
            return (
              <motion.g
                key={i}
                onMouseEnter={() => setHoveredCallout(c.key)}
                onMouseLeave={() => setHoveredCallout(null)}
                className="cursor-pointer select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.6 + i * 0.35 }}
              >
                {/* Dashed connecting line from node to label */}
                <line
                  x1={c.lx1} y1={c.ly1} x2={c.lx2} y2={c.ly2}
                  stroke={isHovered ? "#ef4444" : activeMode === "diagnostics" ? "#22c55e" : "#b44d0b"}
                  strokeWidth={isHovered ? "0.8" : "0.4"}
                  strokeDasharray="2 3"
                  opacity={isHovered ? "0.8" : "0.25"}
                  className="transition-all duration-200"
                />
                {/* Small endpoint dot */}
                <circle
                  cx={c.lx2} cy={c.ly2} r="1.5"
                  fill={isHovered ? "#ef4444" : activeMode === "diagnostics" ? "#22c55e" : "#b44d0b"}
                  opacity="0.5"
                />
                {/* Label text */}
                <text
                  x={c.x} y={c.y}
                  textAnchor={c.anchor as "start" | "middle" | "end"}
                  fill={isHovered ? "#ef4444" : activeMode === "diagnostics" ? "#22c55e" : "#b44d0b"}
                  opacity={isHovered ? "0.9" : "0.45"}
                  fontSize="6.5"
                  fontFamily="ui-monospace, monospace"
                  letterSpacing="0.8"
                  fontWeight={isHovered ? "bold" : "normal"}
                  className="transition-colors duration-200"
                >
                  {c.label}
                </text>
                {/* Value text */}
                <text
                  x={c.x} y={c.y + 12}
                  textAnchor={c.anchor as "start" | "middle" | "end"}
                  fill={isHovered ? "#ef4444" : "#d1cabf"}
                  opacity={isHovered ? "1" : "0.75"}
                  fontSize="10"
                  fontFamily="ui-monospace, monospace"
                  fontWeight="bold"
                  className="transition-colors duration-200"
                >
                  {c.value}
                </text>
              </motion.g>
            );
          })}

          {/* ════════ INVISIBLE HIT AREAS FOR SENSOR NODES ════════ */}
          {NODES.map((n, i) => (
            <circle
              key={`hitbox-${i}`}
              cx={n.cx}
              cy={n.cy}
              r="18"
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => {
                setActiveNode(i);
                setIsCycling(false);
              }}
              onMouseLeave={() => {
                setIsCycling(true);
              }}
              onClick={() => {
                setActiveNode(i);
                setIsCycling(false);
              }}
            />
          ))}

          {/* ════════ CORNER BRACKETS ════════ */}
          <path d="M20,42 L20,20 L42,20" fill="none" stroke={activeMode === "diagnostics" ? "#22c55e" : "#b44d0b"} strokeWidth="1.2" opacity="0.35" />
          <path d="M380,42 L380,20 L358,20" fill="none" stroke={activeMode === "diagnostics" ? "#22c55e" : "#b44d0b"} strokeWidth="1.2" opacity="0.35" />
          <path d="M20,358 L20,380 L42,380" fill="none" stroke={activeMode === "diagnostics" ? "#22c55e" : "#b44d0b"} strokeWidth="1.2" opacity="0.35" />
          <path d="M380,358 L380,380 L358,380" fill="none" stroke={activeMode === "diagnostics" ? "#22c55e" : "#b44d0b"} strokeWidth="1.2" opacity="0.35" />

          {/* ════════ BOTTOM CYCLING STATUS TEXT ════════ */}
          <AnimatePresence mode="wait">
            <motion.text
              key={statusIdx}
              x="200" y="396"
              textAnchor="middle"
              fill={activeMode === "diagnostics" ? "#22c55e" : "#b44d0b"}
              fontSize="6.5"
              fontFamily="ui-monospace, monospace"
              letterSpacing="1.2"
              initial={{ opacity: 0, y: 400 }}
              animate={{ opacity: 0.5, y: 396 }}
              exit={{ opacity: 0, y: 392 }}
              transition={{ duration: 0.3 }}
            >
              {STATUS_MSGS[statusIdx]}
            </motion.text>
          </AnimatePresence>

          {/* ════════ HEADER LABEL ════════ */}
          <text
            x="200" y="12"
            textAnchor="middle"
            fill={activeMode === "diagnostics" ? "#22c55e" : "#b44d0b"}
            opacity="0.35"
            fontSize="6" fontFamily="ui-monospace, monospace"
            letterSpacing="2"
          >
            /// AIRFRAME_SCHEMATIC_01
          </text>
        </svg>

        {/* Bottom-right HTML label */}
        <div className={`absolute bottom-2 right-3 font-mono text-[7px] tracking-[0.15em] uppercase transition-colors duration-300 ${
          activeMode === "diagnostics" ? "text-green-500/40" : "text-primary-accent/35"
        }`}>
          {activeMode === "diagnostics" ? "DIAGNOSTICS_VIEW // CYCLING" : "BLUEPRINT_VIEW // LIVE"}
        </div>
      </div>
    </div>
  );
}
