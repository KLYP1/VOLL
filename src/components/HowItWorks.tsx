import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Info, Thermometer, Zap, Shield, AlertTriangle } from 'lucide-react';

interface SCRStep {
  id: number;
  title: string;
  chemicalName: string;
  description: string;
  details: string;
}

export default function HowItWorks() {
  const [engineLoad, setEngineLoad] = useState<number>(60);
  const [exhaustTemp, setExhaustTemp] = useState<number>(320);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [particleTick, setParticleTick] = useState<number>(0);

  // Particle flow animation loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setParticleTick((prev) => (prev + 1) % 100);
    }, 120);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const steps: SCRStep[] = [
    {
      id: 1,
      title: "Salida de Gases NOx",
      chemicalName: "NO + NO₂",
      description: "El motor diésel genera gases calientes con altas concentraciones de Óxidos de Nitrógeno nocivos (NOx).",
      details: "A mayor carga de motor (actualmente " + engineLoad + "%), aumenta la concentración de NOx y la presión del flujo de escape. Se requiere una dosificación de precisión proporcional."
    },
    {
      id: 2,
      title: "Inyección de AdBlue VOLL",
      chemicalName: "AUS32 (32.5%)",
      description: "La unidad de control de dosificación (DCU) inyecta VOLL UltraPure atomizado en la corriente de gases.",
      details: "La pureza de VOLL garantiza que la boquilla de inyección no sufra obstrucciones ni cristalización prematura, un problema común con fluidos de baja calidad que carecen de estabilización molecular."
    },
    {
      id: 3,
      title: "Termólisis e Hidrólisis",
      chemicalName: "NH₃ (Amoníaco)",
      description: "El calor del escape (actualmente " + exhaustTemp + "°C) descompone el AdBlue en Amoníaco (NH₃) y CO₂.",
      details: "Si la temperatura es menor de 200°C, existe alto riesgo de cristalización. VOLL está formulado para iniciar la hidrólisis de forma limpia y homogénea evitando depósitos sólidos de ácido cianúrico."
    },
    {
      id: 4,
      title: "Reacción en Catalizador SCR",
      chemicalName: "Matriz Cerámica Extruida",
      description: "Los gases de escape y el amoníaco ingresan a la estructura alveolar recubierta de metales activos.",
      details: "El amoníaco se adhiere a la superficie del catalizador y reacciona de forma selectiva con las moléculas de NOx, reduciéndolas de forma inmediata."
    },
    {
      id: 5,
      title: "Emisión de Aire Limpio",
      chemicalName: "N₂ + H₂O",
      description: "Los contaminantes nocivos se transforman completamente en Nitrógeno gaseoso libre y vapor de agua limpia.",
      details: "Eficiencia de reducción de gases contaminantes superior al 98%, garantizando el cumplimiento estricto de las normativas ambientales Euro V, Euro VI y Tier IV Final."
    }
  ];

  // Helper to determine crystallization risk
  const getCrystallizationRisk = () => {
    if (exhaustTemp < 190) return { level: "Crítico", color: "text-red-500", text: "Alto riesgo de cristalización de urea. Depósitos sólidos obstruyen el inyector." };
    if (exhaustTemp < 230) return { level: "Moderado", color: "text-yellow-500", text: "Rendimiento óptimo solo con formulaciones ultra puras como VOLL." };
    return { level: "Inexistente", color: "text-green-400", text: "Proceso de hidrólisis estable y termodinámicamente eficiente." };
  };

  const risk = getCrystallizationRisk();

  return (
    <section id="scr-works" className="py-24 bg-voll-graphite relative overflow-hidden px-4 md:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4 text-left">
          <p className="text-xs font-mono tracking-widest text-voll-gold uppercase">Simulación Termodinámica</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Física & Química del Sistema SCR
          </h2>
          <p className="text-slate-400 font-sans font-light max-w-2xl text-sm leading-relaxed">
            Evite hablar únicamente de "Urea Automotriz". Conozca el proceso aeroespacial de reducción catalítica selectiva. Ingrese parámetros de motor para observar la conversión química en tiempo real.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Diagram (SVG + Flow Particles) */}
          <div className="lg:col-span-8 flex flex-col space-y-6">
            
            <div className="relative w-full aspect-[16/9] bg-voll-black/80 rounded-2xl border border-white/10 p-6 flex flex-col justify-between overflow-hidden shadow-[inset_0_0_40px_rgba(23,26,141,0.2)]">
              
              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

              {/* Status Header inside the Canvas */}
              <div className="flex items-center justify-between z-10 font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                  <span>SCR ACTIVE SIMULATOR v2.4</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>Carga: <strong className="text-white">{engineLoad}%</strong></span>
                  <span>Temp: <strong className="text-white">{exhaustTemp}°C</strong></span>
                </div>
              </div>

              {/* Main SVG Schematic representing Engine & SCR pipe */}
              <div className="relative w-full h-[65%] flex items-center justify-center z-10">
                <svg viewBox="0 0 800 300" className="w-full h-full">
                  <defs>
                    <linearGradient id="pipe-grad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="50%" stopColor="#334155" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#1e293b" />
                    </linearGradient>
                    <linearGradient id="catalyst-mesh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#475569" />
                      <stop offset="50%" stopColor="#94a3b8" />
                      <stop offset="100%" stopColor="#475569" />
                    </linearGradient>
                    <filter id="glow-blue">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Connection from Engine (Left) */}
                  <rect x="20" y="100" width="120" height="100" rx="4" fill="url(#pipe-grad)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                  <text x="80" y="155" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="monospace" textAnchor="middle">MOTOR DIESEL</text>

                  {/* Main Exhaust Tube */}
                  <path d="M140 120 L400 120 L430 100 L580 100 L580 200 L430 200 L400 180 L140 180 Z" fill="url(#pipe-grad)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                  
                  {/* VOLL Injector Nozzle (Top Middle) */}
                  <path d="M340 70 L360 70 L350 125 Z" fill="#F7B51D" stroke="#ffffff" strokeWidth="1" />
                  <rect x="330" y="55" width="40" height="15" rx="3" fill="#171A8D" stroke="#F7B51D" strokeWidth="1" />
                  <text x="350" y="65" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">INJECTOR VOLL</text>
                  
                  {/* SCR Catalyst Honeycomb Block (Inside Right Chamber) */}
                  <rect x="450" y="110" width="100" height="80" fill="url(#catalyst-mesh)" stroke="#334155" strokeWidth="2" strokeDasharray="3,3" />
                  <text x="500" y="155" fill="#000000" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">CATALIZADOR SCR</text>

                  {/* Exhaust Pipe Exit */}
                  <rect x="580" y="125" width="160" height="50" rx="3" fill="url(#pipe-grad)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <text x="660" y="155" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="monospace" textAnchor="middle">AIRE LIMPIO N₂ + H₂O</text>

                  {/* STEP MARKERS WITH GLOW (Active Highlighted) */}
                  {[
                    { id: 1, cx: 80, cy: 150, text: "1" },
                    { id: 2, cx: 350, cy: 100, text: "2" },
                    { id: 3, cx: 390, cy: 150, text: "3" },
                    { id: 4, cx: 500, cy: 150, text: "4" },
                    { id: 5, cx: 680, cy: 150, text: "5" }
                  ].map((marker) => (
                    <circle
                      key={marker.id}
                      cx={marker.cx}
                      cy={marker.cy}
                      r="16"
                      fill={activeStep === marker.id ? "#171A8D" : "#111111"}
                      stroke={activeStep === marker.id ? "#F7B51D" : "rgba(255,255,255,0.3)"}
                      strokeWidth="2"
                      className="cursor-pointer transition-all duration-300 hover:scale-110"
                      onClick={() => setActiveStep(marker.id)}
                    />
                  ))}
                  {[
                    { id: 1, cx: 80, cy: 154, text: "1" },
                    { id: 2, cx: 350, cy: 104, text: "2" },
                    { id: 3, cx: 390, cy: 154, text: "3" },
                    { id: 4, cx: 500, cy: 154, text: "4" },
                    { id: 5, cx: 680, cy: 154, text: "5" }
                  ].map((marker) => (
                    <text
                      key={marker.id}
                      x={marker.cx}
                      y={marker.cy}
                      fill={activeStep === marker.id ? "#F7B51D" : "#ffffff"}
                      fontSize="10"
                      fontFamily="monospace"
                      fontWeight="bold"
                      textAnchor="middle"
                      className="cursor-pointer pointer-events-none"
                    >
                      {marker.text}
                    </text>
                  ))}

                  {/* Dynamic Particle Stream Animations */}
                  {isPlaying && (
                    <>
                      {/* Step 1: NOx particles (Orange) moving from engine to nozzle */}
                      {Array.from({ length: Math.floor(engineLoad / 10) }).map((_, i) => {
                        const px = 140 + ((particleTick + i * 15) % 60) * 3.5;
                        const py = 135 + Math.sin(particleTick + i) * 12;
                        return (
                          <circle key={`nox-${i}`} cx={px} cy={py} r="3" fill="#F7B51D" opacity="0.8" />
                        );
                      })}

                      {/* Step 2 & 3: VOLL atomized spray (Blue/Gold) under the nozzle */}
                      {Array.from({ length: 8 }).map((_, i) => {
                        const px = 335 + i * 4 + Math.sin(particleTick + i) * 3;
                        const py = 125 + ((particleTick + i * 12) % 30) * 1.5;
                        return (
                          <circle key={`spray-${i}`} cx={px} cy={py} r="2.5" fill="#171A8D" filter="url(#glow-blue)" />
                        );
                      })}

                      {/* Step 4: Ammonia NH3 and reacting particles inside mixing tube and catalyst */}
                      {Array.from({ length: 12 }).map((_, i) => {
                        const px = 390 + ((particleTick + i * 8) % 150) * 1.1;
                        const py = 130 + Math.cos(particleTick * 0.5 + i) * 18;
                        return (
                          <circle key={`mix-${i}`} cx={px} cy={py} r="2" fill="#38bdf8" />
                        );
                      })}

                      {/* Step 5: Pure harmless gases (White circles and soft fog waves) */}
                      {Array.from({ length: 10 }).map((_, i) => {
                        const px = 580 + ((particleTick + i * 12) % 140) * 1.1;
                        const py = 140 + Math.sin(particleTick * 0.3 + i) * 10;
                        return (
                          <circle key={`clean-${i}`} cx={px} cy={py} r="3.5" fill="#ffffff" opacity="0.6" />
                        );
                      })}
                    </>
                  )}
                </svg>
              </div>

              {/* Simulation Controls & Instructions */}
              <div className="flex flex-wrap items-center justify-between border-t border-white/5 pt-4 gap-4 z-10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white border border-white/10 flex items-center gap-1.5 text-[11px] font-mono cursor-pointer"
                  >
                    <Play className="w-3 h-3 text-voll-gold" />
                    {isPlaying ? "PAUSAR" : "INICIAR"}
                  </button>
                  <button
                    onClick={() => {
                      setEngineLoad(60);
                      setExhaustTemp(320);
                      setActiveStep(1);
                    }}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white border border-white/10 text-[11px] font-mono cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-voll-gold" /> NOx Contaminante</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-voll-blue" /> VOLL AdBlue</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-400" /> Amoníaco (NH₃)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-white" /> Nitrógeno & Vapor</span>
                </div>
              </div>

            </div>

            {/* Sliders Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-voll-gold" /> Carga del Motor Diésel
                  </span>
                  <span className="text-white font-bold">{engineLoad}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={engineLoad}
                  onChange={(e) => setEngineLoad(Number(e.target.value))}
                  className="w-full accent-voll-gold bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-[10px] text-slate-500 font-sans">
                  A mayor carga, aumenta la cantidad de inyecciones requeridas. VOLL asegura estabilidad de flujo constante.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5 text-red-400" /> Temp. de Gases de Escape
                  </span>
                  <span className={`font-bold ${exhaustTemp < 190 ? 'text-red-400' : 'text-white'}`}>{exhaustTemp}°C</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="450"
                  value={exhaustTemp}
                  onChange={(e) => setExhaustTemp(Number(e.target.value))}
                  className="w-full accent-voll-blue bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-sans">
                  <AlertTriangle className={`w-3.5 h-3.5 shrink-0 ${risk.color}`} />
                  <span className="leading-tight">Riesgo de Cristalización: <strong className={risk.color}>{risk.level}</strong></span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Interactive Details Pane */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="glass-panel border border-white/10 rounded-2xl p-6 space-y-6">
              
              <div className="flex items-center gap-2 border-b border-white/15 pb-4">
                <Info className="w-5 h-5 text-voll-gold" />
                <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider">Etapas de Reacción</h3>
              </div>

              {/* Step list items */}
              <div className="space-y-4">
                {steps.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setActiveStep(st.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex items-start gap-3 cursor-pointer ${
                      activeStep === st.id
                        ? 'bg-voll-blue/20 border-voll-gold/60 shadow-lg'
                        : 'bg-white/5 border-transparent hover:bg-white/10'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center shrink-0 border ${
                      activeStep === st.id
                        ? 'bg-voll-gold text-voll-black border-voll-gold'
                        : 'bg-white/5 text-slate-400 border-white/10'
                    }`}>
                      0{st.id}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-display font-bold text-white uppercase">{st.title}</span>
                        <span className="text-[9px] font-mono text-voll-gold font-semibold uppercase">{st.chemicalName}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-sans leading-relaxed">{st.description}</p>
                    </div>
                  </button>
                ))}
              </div>

            </div>

            {/* Live Step Deep-Dive */}
            <div className="bg-gradient-to-br from-voll-blue/15 to-voll-gold/5 border border-voll-gold/20 rounded-2xl p-6 space-y-3">
              <span className="text-[9px] font-mono text-voll-gold uppercase tracking-widest font-bold">Zoom Técnico: Etapa {activeStep}</span>
              <h4 className="text-sm font-display font-bold text-white uppercase tracking-wide">
                {steps[activeStep - 1].title} ({steps[activeStep - 1].chemicalName})
              </h4>
              <p className="text-xs text-slate-300 font-sans font-light leading-relaxed">
                {steps[activeStep - 1].details}
              </p>
              <div className="pt-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-voll-gold shrink-0" />
                <span className="text-[10px] font-mono text-slate-400 uppercase">Fórmula de Estabilidad VOLL Homologada</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
