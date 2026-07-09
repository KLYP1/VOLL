import React from 'react';
import { Droplet, Award, Zap, FlaskConical, ShieldCheck, Box, Send } from 'lucide-react';

export default function QualityProcess() {
  const steps = [
    {
      id: 1,
      phase: "01 / DESMINERALIZACIÓN",
      title: "Agua Ultra Pura",
      metric: "Conductividad <0.1 μS/cm",
      desc: "El agua se somete a procesos de doble destilación y osmosis inversa continua para erradicar cualquier traza de minerales disueltos que obstruyan el catalizador.",
      icon: Droplet
    },
    {
      id: 2,
      phase: "02 / SÍNTESIS DE MATERIA",
      title: "Urea de Alta Pureza",
      metric: "Urea Prill de Grado Técnico",
      desc: "Uso exclusivo de urea sintética de grado premium con contenido controlado de biuret. Sin contaminantes orgánicos ni trazas de formaldehídos.",
      icon: Zap
    },
    {
      id: 3,
      phase: "03 / FILTRACIÓN MULTIETAPA",
      title: "Filtración Molecular",
      metric: "Barrera de 0.2 Micras",
      desc: "Tres niveles de micro-filtrado cruzado en circuito cerrado para asegurar un producto final libre de insolubles.",
      icon: FlaskConical
    },
    {
      id: 4,
      phase: "04 / ANÁLISIS ESPECTRAL",
      title: "Pruebas de Laboratorio",
      metric: "Verificación por HPLC",
      desc: "Análisis por espectrofotometría óptica e infrarroja para certificar el porcentaje exacto de concentración del 32.5%.",
      icon: FlaskConical
    },
    {
      id: 5,
      phase: "05 / ASEGURAMIENTO",
      title: "Validación ISO",
      metric: "Sello de Conformidad ISO 22241",
      desc: "Control de calidad riguroso en lote de salida y emisión automática del reporte técnico de pureza para el cliente.",
      icon: ShieldCheck
    },
    {
      id: 6,
      phase: "06 / ENVASADO HERMÉTICO",
      title: "Envasado Automatizado",
      metric: "Llenado bajo Atmósfera Controlada",
      desc: "Inyección automática del fluido en envases de HDPE previamente purgados con nitrógeno para descartar contaminación exterior.",
      icon: Box
    },
    {
      id: 7,
      phase: "07 / DISTRIBUCIÓN EXCLUSIVA",
      title: "Logística Segura",
      metric: "Sellos de Seguridad Inviolables",
      desc: "Flota de distribución sanitizada y dedicada exclusivamente al transporte del producto, garantizando pureza en destino.",
      icon: Send
    }
  ];

  return (
    <section id="quality-process" className="py-24 bg-voll-graphite relative overflow-hidden px-4 md:px-8 border-t border-white/5">
      
      {/* Background visual detail */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-voll-blue/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-20 space-y-4">
          <p className="text-xs font-mono tracking-widest text-voll-gold uppercase">La Cadena de Pureza Absoluta</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Proceso de Manufactura de Alta Tecnología
          </h2>
          <p className="text-slate-400 font-sans font-light text-sm md:text-base max-w-2xl">
            Cada gota de AdBlue VOLL atraviesa un riguroso ciclo de refinamiento térmico y físico. No mezclamos urea de forma artesanal: operamos un ecosistema industrial de grado farmacéutico.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div id={`quality-step-${step.id}`} key={idx} className="relative pl-10 md:pl-12 group">
                
                {/* Glowing Timeline Node marker */}
                <span className="absolute -left-4 top-1.5 w-8 h-8 rounded-full bg-voll-black border border-white/10 group-hover:border-voll-gold flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(23,26,141,0.5)] z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-voll-gold animate-pulse" />
                </span>

                {/* Step Box Content */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-voll-blue/50 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-voll-blue/5">
                  <div className="space-y-3 max-w-2xl">
                    <span className="text-[10px] font-mono text-voll-gold uppercase tracking-wider font-bold">{step.phase}</span>
                    <h3 className="text-xl font-display font-extrabold text-white tracking-tight group-hover:text-voll-gold transition-colors duration-200">{step.title}</h3>
                    <p className="text-slate-400 font-sans font-light text-xs md:text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Right hand metric inside step */}
                  <div className="shrink-0 bg-voll-black/40 border border-white/10 p-4 rounded-xl text-center md:text-right min-w-[160px] md:min-w-[200px]">
                    <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">MÉTRICA DE CONTROL</span>
                    <span className="block text-xs font-mono font-bold text-white uppercase">{step.metric}</span>
                    <span className="inline-flex items-center gap-1 text-[8px] font-mono text-green-400 font-bold uppercase mt-2 bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20">
                      Verificado ISO
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
