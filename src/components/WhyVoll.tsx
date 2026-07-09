import React from 'react';
import { ShieldCheck, Compass, Award, Gauge } from 'lucide-react';

export default function WhyVoll() {
  const cards = [
    {
      id: "ultra-pure",
      title: "Fórmula Ultra Pura",
      subtitle: "Pureza Certificada",
      description: "VOLL se fabrica exclusivamente con urea sintética de grado premium y agua ultra desmineralizada bidestilada. El resultado es un fluido con un nivel de impurezas cercano a cero, superando los límites exigidos por la norma ISO 22241.",
      benefit: "Evita obstrucciones y depósitos en el inyector SCR.",
      icon: ShieldCheck,
      metric: "99.9%",
      metricLabel: "Pureza Molecular"
    },
    {
      id: "engineering",
      title: "Precisión de Ingeniería",
      subtitle: "Control de Cristalización",
      description: "Cada lote es testeado en laboratorio con espectrometría avanzada. Desarrollado con tecnología de estabilización molecular que disminuye drásticamente el riesgo de cristalización de la urea en el catalizador y en los ductos.",
      benefit: "Mantiene la dosificación óptima y previene fallas de motor.",
      icon: Compass,
      metric: "<0.2%",
      metricLabel: "Biuret Máximo"
    },
    {
      id: "oem-quality",
      title: "Calidad OEM",
      subtitle: "Estándar de Fábrica",
      description: "Cumple rigurosamente con las especificaciones de los principales fabricantes de equipo original (OEM) a nivel mundial. Recomendado para motores Scania, Volvo, Mercedes-Benz, MAN, DAF, Iveco y maquinaria pesada.",
      benefit: "Conserva intacta la garantía del fabricante de su flota.",
      icon: Award,
      metric: "100%",
      metricLabel: "Homologado OEM"
    },
    {
      id: "fleet-perf",
      title: "Rendimiento de Flota",
      subtitle: "Eficiencia Termodinámica",
      description: "Maximiza la tasa de conversión de óxidos de nitrógeno (NOx) en nitrógeno gaseoso y vapor de agua inofensivos. Garantiza el máximo rendimiento del combustible y el correcto funcionamiento del sistema de postratamiento de gases.",
      benefit: "Optimiza la regeneración del filtro de partículas (DPF).",
      icon: Gauge,
      metric: "-98%",
      metricLabel: "Reducción de NOx"
    }
  ];

  return (
    <section id="why-voll" className="py-24 bg-voll-black relative overflow-hidden px-4 md:px-8 border-t border-white/5">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-voll-blue/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-voll-gold/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 space-y-4">
          <p className="text-xs font-mono tracking-widest text-voll-gold uppercase">Ingeniería Química de Vanguardia</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            ¿Por qué los ingenieros <br />
            y administradores de flotas eligen <span className="text-voll-blue underline decoration-voll-gold decoration-2 underline-offset-4">VOLL</span>?
          </h2>
          <p className="text-slate-400 font-sans font-light max-w-2xl text-sm md:text-base leading-relaxed">
            Nuestra formulación no es un simple commodity de urea líquida. Es una solución de ingeniería de alta precisión diseñada para proteger el sistema SCR (Selective Catalytic Reduction) frente a las condiciones de operación más severas.
          </p>
        </div>

        {/* 4 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                id={`why-card-${card.id}`}
                key={card.id}
                className="glass-panel rounded-2xl p-8 md:p-10 flex flex-col justify-between transition-all duration-300 border border-white/10 hover:border-voll-gold/30 hover:shadow-[0_15px_40px_-15px_rgba(23,26,141,0.4)] group"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 group-hover:border-voll-gold/40 group-hover:bg-voll-blue/20 transition-all duration-300">
                      <Icon className="w-8 h-8 text-voll-gold group-hover:scale-105 transition-transform" />
                    </div>
                    {/* Floating Tech Metric */}
                    <div className="text-right">
                      <span className="block text-xl md:text-2xl font-mono font-bold text-white tracking-tight">{card.metric}</span>
                      <span className="block text-[9px] font-mono tracking-wider text-slate-400 uppercase">{card.metricLabel}</span>
                    </div>
                  </div>

                  {/* Card Typography */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono tracking-widest text-voll-gold uppercase font-semibold">{card.subtitle}</span>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight group-hover:text-voll-gold transition-colors duration-200">{card.title}</h3>
                    <p className="text-slate-400 font-sans font-light text-sm leading-relaxed pt-2">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Card Benefit Badge */}
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-voll-gold shrink-0 animate-pulse" />
                  <span className="text-xs font-sans text-slate-300 font-medium">{card.benefit}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Technical Banner */}
        <div className="mt-12 bg-gradient-to-r from-voll-blue/20 via-white/5 to-transparent border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] font-mono text-voll-gold uppercase tracking-wider font-semibold">Garantía de Integridad del Sistema SCR</span>
            <p className="text-sm font-sans font-medium text-white">Protección completa contra la cristalización de urea en inyectores y deflectores del catalizador.</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <span className="text-xs font-mono text-slate-400 uppercase">Acreditado</span>
            <div className="h-6 w-[1px] bg-white/20" />
            <span className="text-sm font-display font-bold text-white tracking-wider">DIN V 70070</span>
            <div className="h-6 w-[1px] bg-white/20" />
            <span className="text-sm font-display font-bold text-voll-gold tracking-wider">ISO 22241-1/2</span>
          </div>
        </div>

      </div>
    </section>
  );
}
