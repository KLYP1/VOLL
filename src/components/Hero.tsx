import React from 'react';
import { Shield, Sparkles, Award, Compass, Settings } from 'lucide-react';

interface HeroProps {
  onQuoteClick: () => void;
  onSpecsClick: () => void;
}

export default function Hero({ onQuoteClick, onSpecsClick }: HeroProps) {
  return (
    <section
      id="hero-section"
      className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-voll-black via-voll-blue/10 to-voll-black px-4 md:px-8 py-16"
    >
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 z-0">
        {/* Soft fog radial gradient */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-voll-blue/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[250px] bg-voll-gold/5 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Side: Premium Marketing Copy & Trust Indicators */}
        <div className="lg:col-span-7 flex flex-col space-y-8 text-left">
          
          <div className="inline-flex items-center gap-2 bg-voll-blue/30 border border-voll-gold/40 px-4 py-1.5 rounded-full w-max">
            <Sparkles className="w-4 h-4 text-voll-gold animate-pulse" />
            <span className="text-[10px] md:text-xs font-mono font-bold tracking-widest text-voll-gold uppercase">
              Tecnología SCR de Pureza Certificada
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight leading-none text-white">
              EL FUTURO DEL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-voll-silver">
                RENDIMIENTO DIÉSEL
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-300 max-w-xl font-sans font-light leading-relaxed">
              Urea Automotriz de máxima pureza formulada en el Perú para optimizar sistemas SCR, reducir el impacto ambiental y proteger motores diésel de alta potencia y trabajo pesado.
              <span className="block mt-2 text-voll-silver font-medium text-sm">
                Solución de ingeniería certificada bajo la norma ISO 22241 que previene la cristalización y extiende la vida útil del catalizador.
              </span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onQuoteClick}
              className="px-8 py-4 bg-voll-gold hover:bg-voll-gold/90 text-voll-black font-bold rounded-xl shadow-lg hover:shadow-voll-gold/20 hover:shadow-2xl transition-all duration-300 transform hover:translate-y-[-2px] uppercase text-xs tracking-wider cursor-pointer"
            >
              Solicitar Cotización
            </button>
            <button
              onClick={onSpecsClick}
              className="px-8 py-4 bg-transparent hover:bg-white/5 text-white font-bold rounded-xl border border-white/25 hover:border-voll-gold/50 transition-all duration-300 uppercase text-xs tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <Settings className="w-4 h-4 text-voll-gold" />
              Especificaciones Técnicas
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 border-t border-white/10">
            <p className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-4">
              Estándares de Fabricación e Integración OEM
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { title: "ISO 22241", desc: "Pureza Química Estándar" },
                { title: "AUS32", desc: "Concentración 32.5%" },
                { title: "SCR COMPATIBLE", desc: "Protección de Catalizador" },
                { title: "FLEET READY", desc: "Optimizado para Flotas" },
                { title: "OEM COMPLIANT", desc: "Aprobación de Fabricantes" },
              ].map((ind, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-3 text-center hover:border-voll-blue/50 transition-colors duration-200">
                  <div className="text-sm font-display font-bold text-white tracking-wide">{ind.title}</div>
                  <div className="text-[9px] font-sans text-slate-400 mt-1 uppercase leading-none">{ind.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Interactive Cinematic Truck & Floating Product Visualizer */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center min-h-[400px] lg:min-h-[500px]">
          
          {/* Futuristic Truck & Packaging Concept Art in layered high-end SVG */}
          <div className="relative w-full h-[380px] md:h-[450px] flex items-center justify-center">
            
            {/* The Cinematic Night Highway and Truck Headlights glowing effect */}
            <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full select-none" fill="none">
              <defs>
                <radialGradient id="sky-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#171A8D" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#050505" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="road-lines" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#F7B51D" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#171A8D" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="truck-metal" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#050505" />
                  <stop offset="50%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#050505" />
                </linearGradient>
              </defs>

              {/* Sky Background Circle */}
              <circle cx="200" cy="200" r="180" fill="url(#sky-glow)" />

              {/* Perspective Road lines */}
              <path d="M40 380 L180 200 L220 200 L360 380" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <path d="M200 200 L200 380" fill="none" stroke="url(#road-lines)" strokeWidth="2" strokeDasharray="10, 10" />

              {/* Truck Headlight Beam glow (Left & Right) */}
              <polygon points="120,240 20,380 180,380" fill="rgba(247, 181, 29, 0.15)" filter="blur(10px)" />
              <polygon points="280,240 220,380 380,380" fill="rgba(247, 181, 29, 0.15)" filter="blur(10px)" />

              {/* Futuristic European Truck Cab (Scania style) */}
              <g transform="translate(100, 100)">
                {/* Cab Base */}
                <rect x="20" y="40" width="160" height="110" rx="12" fill="url(#truck-metal)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                {/* Windshield */}
                <rect x="28" y="48" width="144" height="40" rx="6" fill="#020617" stroke="rgba(255,255,255,0.2)" />
                {/* Sun visor */}
                <rect x="24" y="44" width="152" height="6" fill="#111827" />
                {/* Side Mirrors */}
                <path d="M12,50 L20,53 M188,50 L180,53" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                <rect x="8" y="52" width="6" height="22" rx="2" fill="#111827" />
                <rect x="186" y="52" width="6" height="22" rx="2" fill="#111827" />
                {/* Front Grill */}
                <rect x="40" y="98" width="120" height="38" rx="4" fill="#0f172a" />
                <line x1="50" y1="104" x2="150" y2="104" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                <line x1="50" y1="110" x2="150" y2="110" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                <line x1="50" y1="116" x2="150" y2="116" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                <line x1="50" y1="122" x2="150" y2="122" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                
                {/* Headlights */}
                <rect x="24" y="132" width="24" height="10" rx="2" fill="#f8fafc" />
                <circle cx="30" cy="137" r="3" fill="#fef08a" />
                <rect x="152" y="132" width="24" height="10" rx="2" fill="#f8fafc" />
                <circle cx="170" cy="137" r="3" fill="#fef08a" />

                {/* VOLL Badge on Front Grill */}
                <rect x="85" y="112" width="30" height="10" rx="2" fill="#171A8D" stroke="#F7B51D" strokeWidth="0.5" />
                <text x="90" y="120" fill="#FFFFFF" fontSize="6px" fontFamily="sans-serif" fontWeight="bold">VOLL</text>
              </g>

              {/* Subtle Ambient Fog Overlay */}
              <circle cx="200" cy="240" r="100" fill="rgba(23, 26, 141, 0.1)" filter="blur(15px)" />
            </svg>

            {/* FLOATING PRODUCT: VOLL 20L Premium Canister floating with subtle motion */}
            <div className="absolute top-1/4 right-4 md:right-8 w-48 md:w-56 aspect-[3/4] rounded-2xl glass-panel p-4 border border-voll-gold/30 hover:border-voll-gold animate-float shadow-[0_0_50px_rgba(23,26,141,0.5)] z-20 transition-all duration-300">
              
              {/* Product Glow Backing */}
              <div className="absolute inset-0 bg-gradient-to-tr from-voll-blue/20 to-voll-gold/5 rounded-2xl pointer-events-none" />
              
              {/* Floating Canister Vector Representation */}
              <div className="w-full h-[60%] flex items-center justify-center mt-2">
                <svg viewBox="0 0 100 120" className="w-24 h-28 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
                  <defs>
                    <linearGradient id="canister-body" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="25%" stopColor="#f1f5f9" />
                      <stop offset="50%" stopColor="#cbd5e1" />
                      <stop offset="100%" stopColor="#94a3b8" />
                    </linearGradient>
                    <linearGradient id="canister-blue-strip" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#171A8D" />
                      <stop offset="100%" stopColor="#0a0c4d" />
                    </linearGradient>
                  </defs>
                  {/* Cap (Gold) */}
                  <rect x="42" y="5" width="16" height="8" rx="2" fill="#F7B51D" stroke="#d99411" strokeWidth="0.5" />
                  {/* Handle (White/Silver) */}
                  <path d="M35,13 L35,5 C35,2 65,2 65,5 L65,13 Z" fill="none" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
                  
                  {/* Main Container Body */}
                  <path d="M15,25 L85,25 C90,25 92,28 92,33 L92,110 C92,115 88,118 83,118 L17,118 C12,118 8,115 8,110 L8,33 C8,28 10,25 15,25 Z" fill="url(#canister-body)" />
                  
                  {/* Premium Brand Vertical Inset Panel */}
                  <path d="M12,40 L88,40 L88,95 L12,95 Z" fill="url(#canister-blue-strip)" />
                  
                  {/* Inset Text */}
                  <text x="50" y="62" fill="#FFFFFF" textAnchor="middle" fontSize="11px" fontWeight="bold" fontFamily="sans-serif">VOLL</text>
                  <text x="50" y="72" fill="#F7B51D" textAnchor="middle" fontSize="4.5px" letterSpacing="0.5px" fontFamily="sans-serif" fontWeight="bold">UREA AUTOMOTRIZ</text>
                  <text x="50" y="85" fill="#FFFFFF" textAnchor="middle" fontSize="7px" fontFamily="sans-serif">ISO 22241</text>
                  
                  {/* 20L badge */}
                  <rect x="70" y="102" width="16" height="10" rx="1.5" fill="#F7B51D" />
                  <text x="78" y="109" fill="#050505" textAnchor="middle" fontSize="6px" fontWeight="bold" fontFamily="sans-serif">20L</text>
                </svg>
              </div>

              {/* Product Name & Quick Stats */}
              <div className="mt-4 text-center border-t border-white/10 pt-3">
                <div className="text-xs font-display font-bold text-white tracking-wide uppercase">VOLL UltraPura 20L</div>
                <div className="text-[10px] text-voll-gold font-mono font-medium mt-1 uppercase">Sistemas SCR Euro IV, V, VI</div>
                
                <div className="flex justify-around items-center mt-3 text-[9px] font-mono text-slate-400">
                  <div className="text-center">
                    <span className="block text-white font-bold">32.5%</span>
                    <span>UREA PURA</span>
                  </div>
                  <div className="w-[1px] h-4 bg-white/10" />
                  <div className="text-center">
                    <span className="block text-white font-bold">&lt;0.2%</span>
                    <span>BIURET máx</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Interactive Badge indicating German/European Standards */}
            <div className="absolute bottom-6 left-6 bg-slate-900/90 border border-white/15 p-3 rounded-xl flex items-center gap-3 backdrop-blur shadow-lg hover:border-voll-gold transition-colors duration-300">
              <Award className="w-5 h-5 text-voll-gold shrink-0 animate-pulse" />
              <div>
                <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Tecnología de Fabricación</p>
                <p className="text-xs font-semibold text-white">Estándar DIN 70070 / Alemania</p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Scrolling Chevron decoration */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
        <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">Explorar Sistema</span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-voll-gold to-transparent animate-pulse" />
      </div>
    </section>
  );
}
