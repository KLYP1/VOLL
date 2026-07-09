import React, { useState } from 'react';
import { Package, ShieldCheck, ChevronRight, Award, Compass, HelpCircle } from 'lucide-react';

interface ProductFormat {
  id: string;
  name: string;
  volume: string;
  type: string;
  tagline: string;
  description: string;
  specifications: {
    weight: string;
    dimensions: string;
    packagingMaterial: string;
    dispenserType: string;
    palletQty: string;
    bestFor: string;
  };
  keyAdvantage: string;
}

export default function ProductPresentation() {
  const [activeFormat, setActiveFormat] = useState<string>("canister-20l");

  const formats: ProductFormat[] = [
    {
      id: "canister-10l",
      name: "Bidón de 10 Litros",
      volume: "10 Litros",
      type: "Envase Ergonómico Ligero",
      tagline: "El equilibrio óptimo entre maniobrabilidad y volumen para trayectos individuales.",
      description: "Diseñado para conductores independientes, furgonetas y vehículos diésel ligeros. Cuenta con una boquilla vertedora integrada y flexible libre de goteo para un reabastecimiento directo y limpio en carretera.",
      specifications: {
        weight: "10.9 kg (Lleno)",
        dimensions: "230 x 195 x 310 mm",
        packagingMaterial: "Polietileno de Alta Densidad (HDPE) con barrera UV",
        dispenserType: "Boquilla telescópica flexible auto-purgante",
        palletQty: "72 unidades por palet",
        bestFor: "Vehículos comerciales livianos, furgonetas y soporte de emergencia."
      },
      keyAdvantage: "Pico vertedor libre de contaminación por suciedad o polvo."
    },
    {
      id: "canister-20l",
      name: "Bidón de 20 Litros",
      volume: "20 Litros",
      type: "Formato Estándar Profesional",
      tagline: "El volumen de servicio estándar para choferes de larga distancia.",
      description: "Envase ergonómico industrial con asa de agarre doble y canal de vertido balanceado. Optimizado químicamente con resinas HDPE vírgenes que aseguran cero lixiviación de aditivos plásticos hacia la solución de urea.",
      specifications: {
        weight: "21.8 kg (Lleno)",
        dimensions: "285 x 245 x 380 mm",
        packagingMaterial: "HDPE Ultra-Virgen libre de plastificantes",
        dispenserType: "Manguera vertedora premium integrada",
        palletQty: "40 unidades por palet",
        bestFor: "Camiones de media y larga distancia, flotas de distribución."
      },
      keyAdvantage: "Asas balanceadas para un reabastecimiento cómodo de 20 litros."
    },
    {
      id: "drum-200l",
      name: "Tambor de 200 Litros",
      volume: "200 Litros",
      type: "Tambor Industrial Sellado",
      tagline: "Suministro mediano ideal para talleres de flota y maquinaria agrícola.",
      description: "Tambor cilíndrico de alta resistencia equipado con doble tapón de seguridad Tri-Sure y sellos herméticos inviolables. Compatible con sistemas de bombeo manuales y neumáticos de circuito cerrado.",
      specifications: {
        weight: "215 kg (Lleno)",
        dimensions: "Ø 580 mm x Altura 890 mm",
        packagingMaterial: "Tambor de HDPE extruido por soplado",
        dispenserType: "Conectores rápidos de succión seca CDS",
        palletQty: "4 unidades por palet",
        bestFor: "Talleres mecánicos, cooperativas agrícolas y bases logísticas pequeñas."
      },
      keyAdvantage: "Conexión hermética que evita el contacto del AdBlue con el aire ambiente."
    },
    {
      id: "ibc-1000l",
      name: "Contenedor IBC de 1000 Litros",
      volume: "1000 Litros",
      type: "Contenedor Industrial de Gran Volumen",
      tagline: "La solución de almacenamiento definitiva para patios de carga y bases mineras.",
      description: "Contenedor cúbico montado sobre palet de acero galvanizado con jaula de protección estructural. Equipado con válvula de drenaje inferior y acople rápido de succión superior para estaciones de servicio privadas.",
      specifications: {
        weight: "1,090 kg (Lleno)",
        dimensions: "1200 x 1000 x 1160 mm",
        packagingMaterial: "Contenedor de HDPE con rejilla perimetral de acero",
        dispenserType: "Adaptador SEC superior con manguera de succión seca",
        palletQty: "1 unidad",
        bestFor: "Bases de flotas logísticas, faenas mineras y centros de distribución."
      },
      keyAdvantage: "Máximo volumen de almacenamiento con mínima huella de espacio físico."
    },
    {
      id: "bulk-tanker",
      name: "Abastecimiento a Granel (Cisterna)",
      volume: "Cisterna Granel",
      type: "Abastecimiento de Alto Rendimiento",
      tagline: "Suministro directo para tanques fijos y estaciones de despacho comerciales.",
      description: "Distribución directa mediante flota de camiones cisterna dedicados exclusivamente al transporte de AdBlue AUS32. Equipados con sistemas de medición electrónica aprobados por metrología legal.",
      specifications: {
        weight: "Hasta 24,000 Litros de carga",
        dimensions: "Cisterna articulada articulada standard",
        packagingMaterial: "Cisterna de acero inoxidable 316L con pulido sanitario",
        dispenserType: "Conexiones de acople seco Todo-en-Uno Tod-D-Con",
        palletQty: "Entrega directa a granel",
        bestFor: "Consumidores masivos, mega-flotas de transporte terrestre e hidroeléctricas."
      },
      keyAdvantage: "Máxima economía de escala con el menor costo de empaque."
    }
  ];

  const currentProduct = formats.find(f => f.id === activeFormat) || formats[1];

  // Helper render of high-fidelity stylized SVGs for product mockups
  const renderProductSVG = (id: string) => {
    switch (id) {
      case "canister-10l":
        return (
          <svg viewBox="0 0 160 200" className="w-48 h-60 drop-shadow-[0_20px_40px_rgba(23,26,141,0.4)]">
            <defs>
              <linearGradient id="body-10l" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor="#f8fafc" />
                <stop offset="60%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
            </defs>
            <rect x="68" y="10" width="24" height="12" rx="3" fill="#F7B51D" stroke="#d99411" strokeWidth="1" />
            <path d="M55,22 L55,10 C55,4 105,4 105,10 L105,22 Z" fill="none" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />
            <path d="M25,40 L135,40 C142,40 146,45 146,52 L146,180 C146,188 140,192 132,192 L28,192 C20,192 14,188 14,180 L14,52 C14,45 18,40 25,40 Z" fill="url(#body-10l)" />
            {/* Branding label */}
            <rect x="22" y="65" width="116" height="85" fill="#171A8D" rx="2" />
            <text x="80" y="98" fill="#ffffff" fontSize="18" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">VOLL</text>
            <text x="80" y="112" fill="#F7B51D" fontSize="7" letterSpacing="2" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">PROFESIONALES</text>
            <text x="80" y="132" fill="#ffffff" fontSize="9" fontFamily="sans-serif" textAnchor="middle">ISO 22241 / AUS32</text>
            {/* Volume indicator */}
            <rect x="105" y="162" width="25" height="15" rx="3" fill="#F7B51D" />
            <text x="117.5" y="172.5" fill="#050505" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">10L</text>
            {/* Transparent level strip */}
            <rect x="20" y="46" width="4" height="140" fill="rgba(0,0,0,0.15)" rx="1" />
            <rect x="20" y="90" width="4" height="96" fill="#38bdf8" rx="1" />
          </svg>
        );
      case "canister-20l":
        return (
          <svg viewBox="0 0 160 200" className="w-52 h-64 drop-shadow-[0_25px_50px_rgba(23,26,141,0.5)] animate-float">
            <defs>
              <linearGradient id="body-20l" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor="#f1f5f9" />
                <stop offset="60%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
            </defs>
            <rect x="66" y="8" width="28" height="14" rx="3" fill="#F7B51D" stroke="#d99411" strokeWidth="1" />
            {/* Two balanced handles */}
            <path d="M45,22 L45,8 C45,2 75,2 75,8 L75,22 Z" fill="none" stroke="#cbd5e1" strokeWidth="6" />
            <path d="M85,22 L85,8 C85,2 115,2 115,8 L115,22 Z" fill="none" stroke="#cbd5e1" strokeWidth="6" />
            <path d="M20,35 L140,35 C148,35 152,40 152,48 L152,185 C152,192 146,196 138,196 L22,196 C14,196 8,192 8,185 L8,48 C8,40 12,35 20,35 Z" fill="url(#body-20l)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            {/* Premium label */}
            <rect x="16" y="60" width="128" height="95" fill="#171A8D" rx="4" />
            <text x="80" y="100" fill="#ffffff" fontSize="24" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">VOLL</text>
            <text x="80" y="116" fill="#F7B51D" fontSize="7" letterSpacing="1.5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">PROFESIONALES DE LA UREA</text>
            <text x="80" y="138" fill="#ffffff" fontSize="10" fontFamily="sans-serif" textAnchor="middle" opacity="0.9">FÓRMULA ULTRA PURA • ISO 22241</text>
            {/* Volume */}
            <rect x="110" y="168" width="28" height="16" rx="3" fill="#F7B51D" />
            <text x="124" y="179" fill="#050505" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">20L</text>
            {/* Transparent level strip */}
            <rect x="14" y="42" width="5" height="145" fill="rgba(0,0,0,0.15)" rx="1.5" />
            <rect x="14" y="90" width="5" height="97" fill="#38bdf8" rx="1.5" />
          </svg>
        );
      case "drum-200l":
        return (
          <svg viewBox="0 0 160 200" className="w-52 h-64 drop-shadow-[0_20px_45px_rgba(23,26,141,0.45)]">
            <defs>
              <linearGradient id="drum-metal-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="35%" stopColor="#475569" />
                <stop offset="70%" stopColor="#334155" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            {/* Drum base */}
            <path d="M25,25 L135,25 C138,25 140,28 140,32 L140,188 C140,192 138,195 135,195 L25,195 C22,195 20,192 20,188 L20,32 C20,28 22,25 25,25 Z" fill="url(#drum-metal-grad)" />
            {/* Drum ridges */}
            <rect x="18" y="55" width="124" height="8" fill="#111827" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            <rect x="18" y="105" width="124" height="8" fill="#111827" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            <rect x="18" y="155" width="124" height="8" fill="#111827" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            {/* Bung caps */}
            <rect x="40" y="20" width="12" height="6" fill="#94a3b8" />
            <rect x="100" y="20" width="16" height="6" fill="#F7B51D" />
            {/* High-end branding label */}
            <rect x="25" y="72" width="110" height="25" fill="#171A8D" />
            <text x="80" y="90" fill="#ffffff" fontSize="14" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">VOLL</text>
            <rect x="25" y="122" width="110" height="25" fill="#111111" stroke="#F7B51D" strokeWidth="0.5" />
            <text x="80" y="138" fill="#F7B51D" fontSize="7" letterSpacing="1" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">200 LITROS • SCR PROTECTION</text>
          </svg>
        );
      case "ibc-1000l":
        return (
          <svg viewBox="0 0 160 200" className="w-56 h-64 drop-shadow-[0_25px_50px_rgba(23,26,141,0.4)]">
            <defs>
              <linearGradient id="ibc-body" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#f8fafc" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            {/* Pallet bottom */}
            <rect x="10" y="172" width="140" height="16" rx="3" fill="#475569" />
            <rect x="20" y="188" width="20" height="10" fill="#1e293b" />
            <rect x="70" y="188" width="20" height="10" fill="#1e293b" />
            <rect x="120" y="188" width="20" height="10" fill="#1e293b" />
            {/* IBC Plastic Bottle */}
            <rect x="18" y="30" width="124" height="142" rx="10" fill="url(#ibc-body)" />
            {/* Steel Cage Grid Lines overlay */}
            <g stroke="#64748b" strokeWidth="1.5" opacity="0.7">
              {/* Vertical bars */}
              <line x1="26" y1="30" x2="26" y2="172" />
              <line x1="46" y1="30" x2="46" y2="172" />
              <line x1="66" y1="30" x2="66" y2="172" />
              <line x1="86" y1="30" x2="86" y2="172" />
              <line x1="106" y1="30" x2="106" y2="172" />
              <line x1="126" y1="30" x2="126" y2="172" />
              <line x1="134" y1="30" x2="134" y2="172" />
              {/* Horizontal bars */}
              <line x1="18" y1="50" x2="142" y2="50" />
              <line x1="18" y1="75" x2="142" y2="75" />
              <line x1="18" y1="100" x2="142" y2="100" />
              <line x1="18" y1="125" x2="142" y2="125" />
              <line x1="18" y1="150" x2="142" y2="150" />
            </g>
            {/* High-end branding plaque on cage */}
            <rect x="36" y="65" width="88" height="50" fill="#171A8D" rx="3" stroke="#F7B51D" strokeWidth="1" />
            <text x="80" y="92" fill="#ffffff" fontSize="16" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">VOLL</text>
            <text x="80" y="104" fill="#F7B51D" fontSize="6" letterSpacing="1" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">1000 LITROS • ISO 22241</text>
            {/* Valve faucet bottom */}
            <rect x="72" y="166" width="16" height="10" rx="1.5" fill="#F7B51D" />
          </svg>
        );
      case "bulk-tanker":
        return (
          <svg viewBox="0 0 180 200" className="w-56 h-64 drop-shadow-[0_20px_45px_rgba(23,26,141,0.4)]">
            <defs>
              <linearGradient id="tanker-chrome" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="35%" stopColor="#f1f5f9" />
                <stop offset="70%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
            </defs>
            {/* Tanker wheels & chassis */}
            <rect x="20" y="145" width="140" height="12" fill="#1e293b" />
            <circle cx="45" cy="162" r="12" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="70" cy="162" r="12" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="120" cy="162" r="12" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="145" cy="162" r="12" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
            {/* Tanker Main Elliptical Tank Body */}
            <path d="M15,60 C15,35 165,35 165,60 L165,130 C165,145 15,145 15,130 Z" fill="url(#tanker-chrome)" />
            {/* Metal structural straps */}
            <rect x="35" y="42" width="4" height="103" fill="#1e293b" />
            <rect x="90" y="42" width="4" height="103" fill="#1e293b" />
            <rect x="145" y="42" width="4" height="103" fill="#1e293b" />
            {/* Deluxe Corporate Logo graphic on the tanker */}
            <rect x="45" y="65" width="90" height="48" fill="#171A8D" rx="4" />
            <text x="90" y="93" fill="#ffffff" fontSize="17" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">VOLL</text>
            <text x="90" y="104" fill="#F7B51D" fontSize="6" letterSpacing="2" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">PROFESIONALES</text>
            {/* Level indicator node */}
            <circle cx="90" cy="125" r="4" fill="#F7B51D" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="products" className="py-24 bg-voll-graphite relative overflow-hidden px-4 md:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Apple-like presentation header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <p className="text-xs font-mono tracking-widest text-voll-gold uppercase">La Gama Completa de Suministro</p>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Diseño de Packaging Industrial
          </h2>
          <p className="text-slate-400 font-sans font-light text-sm">
            Diseñados bajo estrictos estándares ergonómicos y barreras UV de protección química molecular. Conozca nuestra selección completa de formatos para flotas de todo tamaño.
          </p>
        </div>

        {/* Tab Controls (Apple-style pill tags) */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-4xl mx-auto bg-voll-black/40 p-2 rounded-2xl border border-white/5">
          {formats.map((f) => (
            <button
              id={`tab-btn-${f.id}`}
              key={f.id}
              onClick={() => setActiveFormat(f.id)}
              className={`px-5 py-3 rounded-xl text-xs font-bold transition-all duration-300 uppercase tracking-wider cursor-pointer ${
                activeFormat === f.id
                  ? 'bg-voll-blue text-white shadow-lg border border-voll-gold/40'
                  : 'text-slate-400 hover:text-white bg-transparent hover:bg-white/5'
              }`}
            >
              {f.volume}
            </button>
          ))}
        </div>

        {/* Apple-level launch display grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Beautiful Floating Container Render */}
          <div className="lg:col-span-5 flex items-center justify-center min-h-[350px] bg-voll-black/50 rounded-3xl border border-white/10 p-10 relative overflow-hidden group">
            {/* Cinematic light backing */}
            <div className="absolute inset-0 bg-gradient-to-tr from-voll-blue/10 via-transparent to-voll-gold/5 opacity-60" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-voll-blue/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-voll-blue/30 transition-colors duration-500" />
            
            {/* The SVG Artwork */}
            {renderProductSVG(currentProduct.id)}
          </div>

          {/* Right: Ultimate Minimal Specs Dashboard */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-3">
              <span className="text-xs font-mono text-voll-gold uppercase tracking-wider font-semibold">{currentProduct.type}</span>
              <h3 className="text-2xl md:text-4xl font-display font-extrabold text-white tracking-tight">{currentProduct.name}</h3>
              <p className="text-slate-400 font-sans font-light text-sm md:text-base leading-relaxed">
                {currentProduct.tagline}
              </p>
              <p className="text-slate-300 font-sans font-light text-xs md:text-sm leading-relaxed pt-2">
                {currentProduct.description}
              </p>
            </div>

            {/* Inset tech card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {[
                { label: "Peso Unitario", value: currentProduct.specifications.weight },
                { label: "Dimensiones (La x An x Al)", value: currentProduct.specifications.dimensions },
                { label: "Material del Contenedor", value: currentProduct.specifications.packagingMaterial },
                { label: "Método de Dispensación", value: currentProduct.specifications.dispenserType },
                { label: "Cantidad por Palet", value: currentProduct.specifications.palletQty },
                { label: "Aplicación de Destino", value: currentProduct.specifications.bestFor },
              ].map((spec, index) => (
                <div key={index} className="space-y-1">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-500">{spec.label}</span>
                  <span className="block text-xs font-sans font-semibold text-white">{spec.value}</span>
                </div>
              ))}

            </div>

            {/* Strategic Advantage */}
            <div className="flex items-center gap-4 border-l-2 border-voll-gold pl-5 py-2">
              <div>
                <span className="block text-[10px] font-mono text-voll-gold uppercase tracking-wider font-bold">Ventaja Clave VOLL</span>
                <p className="text-xs font-sans text-slate-300 font-medium">
                  {currentProduct.keyAdvantage}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
