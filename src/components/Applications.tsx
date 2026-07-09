import React from 'react';
import { Truck, ShieldCheck, Cpu, HardHat, Pickaxe, Tractor } from 'lucide-react';

interface BrandSpec {
  name: string;
  technology: string;
  description: string;
}

export default function Applications() {
  const brandSpecs: BrandSpec[] = [
    { name: "Scania SCR", technology: "Euro V / Euro VI Range", description: "Flujo libre constante. VOLL protege las boquillas inyectoras en motores DC13 y DC16 de altas presiones térmicas." },
    { name: "Volvo Trucks", technology: "D11 / D13 / D16 Engine Series", description: "Evita la cristalización prematura de urea en el colector e inyector neumático de los sistemas D-SCR." },
    { name: "Mercedes-Benz", technology: "BlueTec® 5 & BlueTec® 6", description: "La pureza absoluta de VOLL cuida los catalizadores de platino de la exigente gama de camiones Actros y Arocs." },
    { name: "MAN Trucks", technology: "EAS-SCR Catalyst System", description: "Mantiene la dosificación óptima en condiciones de alto régimen en motores D26 y D38." },
    { name: "DAF Trucks", technology: "PACCAR MX-11 / MX-13 SCR", description: "Perfecto para la dosificación dosificada integrada en el silenciador compacto EAS de la línea DAF." },
    { name: "Iveco", technology: "HI-SCR Only Technology", description: "Maximiza el filtrado sin recirculación de gases (EGR) garantizando combustión óptima y baja emisión." }
  ];

  return (
    <section id="applications" className="py-24 bg-voll-black relative overflow-hidden px-4 md:px-8 border-t border-white/5">
      
      {/* Visual glowing elements */}
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-voll-blue/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <p className="text-xs font-mono tracking-widest text-voll-gold uppercase">Compatibilidad de Ingeniería OEM</p>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Homologado para los Principales <br />
            Fabricantes del Mundo
          </h2>
          <p className="text-slate-400 font-sans font-light text-sm md:text-base max-w-2xl">
            Nuestra fórmula se desarrolla bajo parámetros idénticos a los fluidos de fábrica. No compre genéricos: proteja la integridad de las unidades de transporte de gama alta más representativas del mercado.
          </p>
        </div>

        {/* 2x3 Grid of Brand System specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandSpecs.map((brand, idx) => (
            <div
              id={`app-brand-${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
              key={idx}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-voll-blue/60 transition-all duration-300 hover:bg-voll-blue/5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-voll-gold font-bold uppercase tracking-wider">{brand.technology}</span>
                  <Cpu className="w-4 h-4 text-slate-500" />
                </div>
                <h3 className="text-lg font-display font-extrabold text-white">{brand.name}</h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  {brand.description}
                </p>
              </div>

              {/* Verified OEM Standard Check */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>ESTADO</span>
                <span className="text-green-400 font-bold flex items-center gap-1 uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Homologado
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Heavy Industry Systems */}
        <div className="mt-16 bg-gradient-to-r from-voll-blue/10 via-voll-blue/5 to-transparent border border-white/10 rounded-3xl p-8 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-mono text-voll-gold uppercase tracking-wider font-bold">Maquinaria Pesada & Motores Estacionarios</span>
            <h3 className="text-xl md:text-2xl font-display font-bold text-white">Soporte Completo para Caterpillar, Komatsu y John Deere</h3>
            <p className="text-xs text-slate-300 font-sans leading-relaxed font-light">
              Los sistemas SCR fuera de carretera en minería pesada y agricultura operan con cargas térmicas extremas. La composición de VOLL garantiza una tasa de evaporación controlada previniendo la degradación y taponamiento térmico.
            </p>
            
            {/* Inline icons */}
            <div className="flex gap-4 pt-2">
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400"><Pickaxe className="w-3.5 h-3.5 text-voll-gold" /> MINERÍA</span>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400"><HardHat className="w-3.5 h-3.5 text-voll-gold" /> CONSTRUCCIÓN</span>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400"><Tractor className="w-3.5 h-3.5 text-voll-gold" /> AGRICULTURA</span>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-4 bg-voll-black/50 border border-white/10 px-6 py-5 rounded-2xl">
            <Truck className="w-10 h-10 text-voll-gold" />
            <div className="space-y-0.5">
              <span className="block text-lg font-display font-black text-white">Euro V & Euro VI</span>
              <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest">Totalmente Compatible</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
