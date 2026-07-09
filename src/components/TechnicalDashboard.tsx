import React, { useState } from 'react';
import { Settings, Info, Gauge, HelpCircle, ShieldCheck, Activity } from 'lucide-react';

export default function TechnicalDashboard() {
  const [concentration, setConcentration] = useState<number>(32.5);

  // Eutectic calculation based on concentration
  // 32.5% is the eutectic point of -11.5C.
  const calculateFreezingPoint = (conc: number) => {
    if (conc === 32.5) return -11.5;
    // Simple parabolic approximation for eutectic curve
    const diff = Math.abs(conc - 32.5);
    const fp = -11.5 + (diff * diff * 1.4);
    return parseFloat(Math.min(0, fp).toFixed(1));
  };

  const calculateCrystalRisk = (conc: number) => {
    if (conc === 32.5) return { risk: "Mínimo (Punto Eutéctico)", color: "text-green-400", bg: "bg-green-400/10" };
    const diff = Math.abs(conc - 32.5);
    if (diff < 1.0) return { risk: "Estable / Conforme", color: "text-green-400", bg: "bg-green-400/10" };
    if (diff < 2.5) return { risk: "Moderado (Riesgo de cristalización en ductos)", color: "text-yellow-400", bg: "bg-yellow-400/10" };
    return { risk: "Crítico (Precipitación sólida a temperatura ambiente)", color: "text-red-400", bg: "bg-red-400/10" };
  };

  const freezingPoint = calculateFreezingPoint(concentration);
  const crystalRisk = calculateCrystalRisk(concentration);

  const chemicalSpecs = [
    { property: "Concentración de Urea", target: "32.5 %", range: "31.8 % - 33.2 %", method: "ISO 22241-2 Anexo C" },
    { property: "Densidad a 20°C", target: "1,090 kg/m³", range: "1,087 - 1,093 kg/m³", method: "ISO 12185" },
    { property: "Índice de Refracción a 20°C", target: "1.3829", range: "1.3814 - 1.3843", method: "ISO 22241-2 Anexo C" },
    { property: "Alcalinidad Libre (como NH₃)", target: "<0.2 %", range: "0.2 % máximo", method: "ISO 22241-2 Anexo D" },
    { property: "Biuret", target: "<0.3 %", range: "0.3 % máximo", method: "ISO 22241-2 Anexo E" },
    { property: "Aldehídos", target: "<5.0 mg/kg", range: "5.0 mg/kg máximo", method: "ISO 22241-2 Anexo F" },
    { property: "Insolubles", target: "<20.0 mg/kg", range: "20.0 mg/kg máximo", method: "ISO 22241-2 Anexo G" },
    { property: "Fosfatos (como PO₄)", target: "<0.5 mg/kg", range: "0.5 mg/kg máximo", method: "ISO 22241-2 Anexo H" },
    { property: "Metales (Calcio, Sodio, Cobre)", target: "<0.5 mg/kg", range: "0.5 mg/kg máximo", method: "ISO 22241-2 Anexo I" }
  ];

  const thermalProperties = [
    { label: "Punto de Ebullición", value: "103°C (Descomposición inicia a 80°C)" },
    { label: "Viscosidad Dinámica (25°C)", value: "aprox. 1.4 mPa·s" },
    { label: "pH (Solución directa)", value: "9.0 - 10.0 (Ligeramente alcalino)" },
    { label: "Conductividad Eléctrica", value: "Aislante en reposo (alta pureza)" }
  ];

  return (
    <section id="dashboard" className="py-24 bg-voll-black relative overflow-hidden px-4 md:px-8 border-t border-white/5">
      
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(23,26,141,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(23,26,141,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <p className="text-xs font-mono tracking-widest text-voll-gold uppercase">Vademécum de Ingeniería SCR</p>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Ficha Técnica & Control Fisicoquímico
          </h2>
          <p className="text-slate-400 font-sans font-light text-sm md:text-base">
            Acceda a los datos analíticos precisos del AdBlue VOLL. Todo bajo los lineamientos oficiales de la norma DIN 70070 e ISO 22241-1. Diseñado para analistas mecánicos y directores de flotas.
          </p>
        </div>

        {/* Technical Data Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Interactive Eutectic Curve Calculator */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
              
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Activity className="w-5 h-5 text-voll-gold" />
                <div>
                  <span className="block text-[9px] font-mono text-slate-500 uppercase">CALCULADOR ANALÍTICO</span>
                  <h3 className="font-display font-bold text-base text-white">Análisis de Concentración vs Congelación</h3>
                </div>
              </div>

              <p className="text-xs text-slate-400 font-sans leading-relaxed font-light">
                Mueva el control deslizante para alterar de forma teórica el porcentaje de concentración de urea. Descubra por qué el estándar de <strong>32.5%</strong> representa el punto eutéctico ideal para evitar la congelación del fluido.
              </p>

              {/* Slider */}
              <div className="space-y-4 bg-voll-black/40 p-4 rounded-xl border border-white/5">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400 uppercase font-semibold">Concentración de Urea</span>
                  <span className={`font-bold ${concentration === 32.5 ? 'text-voll-gold' : 'text-white'}`}>{concentration}%</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="40"
                  step="0.5"
                  value={concentration}
                  onChange={(e) => setConcentration(parseFloat(e.target.value))}
                  className="w-full accent-voll-gold bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Output Readout */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
                  <span className="block text-[9px] font-mono text-slate-500 uppercase mb-1">Temperatura de Congelación</span>
                  <span className="text-2xl font-mono font-bold text-white">{freezingPoint}°C</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
                  <span className="block text-[9px] font-mono text-slate-500 uppercase mb-1">Punto de Cristalización</span>
                  <span className="text-2xl font-mono font-bold text-white">{(freezingPoint + 1.2).toFixed(1)}°C</span>
                </div>
              </div>

              {/* Status Alert box */}
              <div className={`${crystalRisk.bg} border border-white/10 p-4 rounded-xl flex items-start gap-3`}>
                <ShieldCheck className="w-5 h-5 text-voll-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] font-mono uppercase text-slate-400 font-bold">Estado del Fluido</span>
                  <p className={`text-xs font-bold ${crystalRisk.color} mt-1`}>{crystalRisk.risk}</p>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 font-sans italic leading-relaxed">
                *Nota técnica: Concentraciones fuera de rango alteran el punto de cristalización térmica, provocando obstrucciones en la boquilla inyectora en climas fríos. VOLL garantiza un control absoluto por lote a 32.5%.
              </div>

            </div>

            {/* Storage and Shelf Life Information */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
              <h4 className="font-display font-extrabold text-sm text-white uppercase tracking-wider">Lineamientos de Almacenamiento</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="block text-[9px] font-mono text-slate-500 uppercase">Temperatura Recomendada</span>
                  <p className="text-xs font-sans text-slate-300 font-medium">-5°C a 25°C (Evitar radiación solar directa)</p>
                </div>
                <div className="space-y-1">
                  <span className="block text-[9px] font-mono text-slate-500 uppercase">Vida Útil (Shelf Life)</span>
                  <p className="text-xs font-sans text-slate-300 font-medium">18 meses (almacenado bajo los 25°C)</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Aerospace Spec sheet */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-display font-extrabold text-lg text-white uppercase tracking-wider">Ficha Técnica Analítica (ISO 22241-1)</h3>
                <span className="text-[10px] font-mono text-voll-gold uppercase tracking-widest font-bold">HOJA 01 de 01</span>
              </div>

              {/* Table of chemical limits */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead>
                    <tr className="border-b border-white/5 text-slate-400 uppercase text-[9px] tracking-widest font-mono">
                      <th className="pb-3 font-semibold">Parámetro Fisicoquímico</th>
                      <th className="pb-3 font-semibold text-center">Valor Objetivo VOLL</th>
                      <th className="pb-3 font-semibold text-center">Rango Permisible</th>
                      <th className="pb-3 font-semibold text-right">Método de Prueba</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {chemicalSpecs.map((spec, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors duration-150">
                        <td className="py-3 font-medium text-slate-200">{spec.property}</td>
                        <td className="py-3 text-center font-mono text-voll-gold font-bold">{spec.target}</td>
                        <td className="py-3 text-center font-mono text-slate-400">{spec.range}</td>
                        <td className="py-3 text-right font-mono text-slate-500">{spec.method}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Physical Thermal Properties */}
              <div className="pt-6 border-t border-white/10">
                <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Propiedades Físicoquímicas Adicionales</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                  {thermalProperties.map((prop, idx) => (
                    <div key={idx} className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-slate-400">{prop.label}</span>
                      <span className="text-white font-medium">{prop.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
