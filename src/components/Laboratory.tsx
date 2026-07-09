import React, { useState } from 'react';
import { FlaskConical, Beaker, Check, ShieldCheck, Microscope, Layers } from 'lucide-react';

interface LabParameter {
  name: string;
  unit: string;
  min: string;
  max: string;
  measured: string;
  status: "Conforme" | "Fuera de Rango";
  critical: boolean;
}

export default function Laboratory() {
  const [selectedSpec, setSelectedSpec] = useState<number>(0);

  const chemicalSpecs: LabParameter[] = [
    { name: "Contenido de Urea", unit: "wt %", min: "31.8", max: "33.2", measured: "32.54", status: "Conforme", critical: true },
    { name: "Biuret Residual", unit: "wt %", min: "0", max: "0.3", measured: "0.18", status: "Conforme", critical: true },
    { name: "Amoníaco Libre (NH₃)", unit: "wt %", min: "0", max: "0.2", measured: "0.08", status: "Conforme", critical: false },
    { name: "Carbonato (CO₂)", unit: "wt %", min: "0", max: "0.2", measured: "0.04", status: "Conforme", critical: false },
    { name: "Aldehídos Residuales", unit: "mg/kg", min: "0", max: "5.0", measured: "1.2", status: "Conforme", critical: true },
    { name: "Hierro (Fe)", unit: "mg/kg", min: "0", max: "0.5", measured: "0.02", status: "Conforme", critical: true },
    { name: "Cobre (Cu)", unit: "mg/kg", min: "0", max: "0.2", measured: "0.01", status: "Conforme", critical: true },
    { name: "Níquel (Ni)", unit: "mg/kg", min: "0", max: "0.2", measured: "0.005", status: "Conforme", critical: false },
    { name: "Calcio (Ca)", unit: "mg/kg", min: "0", max: "0.5", measured: "0.08", status: "Conforme", critical: true },
    { name: "Sodio (Na)", unit: "mg/kg", min: "0", max: "0.5", measured: "0.11", status: "Conforme", critical: true },
  ];

  const filtrationStages = [
    {
      step: "01",
      name: "Ultrafiltración Multietapa",
      mesh: "0.2 Micras",
      description: "Eliminación absoluta de micropartículas insolubles en suspensión, bacterias e impurezas orgánicas procedentes de la disolución de urea sintética.",
      icon: Layers
    },
    {
      step: "02",
      name: "Intercambio Iónico Homologado",
      mesh: "Resinas Catiónicas/Aniónicas",
      description: "Desmineralización profunda por conductos herméticos para retener trazas críticas de metales como calcio, magnesio, cobre e hierro.",
      icon: Microscope
    },
    {
      step: "03",
      name: "Espectrometría UV Constante",
      mesh: "Monitoreo por Lote",
      description: "Verificación de densidad y refracción óptica en línea mediante sensores infrarrojos acoplados al sistema automatizado de envasado.",
      icon: FlaskConical
    }
  ];

  return (
    <section id="laboratory" className="py-24 bg-voll-black relative overflow-hidden px-4 md:px-8 border-t border-white/5">
      {/* Background visual graphics */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-voll-blue/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Lab Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-mono tracking-widest text-voll-gold uppercase">Laboratorio & Control Químico</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
              Precisión Científica, <br />
              Filtración de Clase Mundial
            </h2>
            <p className="text-slate-400 font-sans font-light max-w-2xl text-sm md:text-base leading-relaxed pt-2">
              El AdBlue VOLL no se fabrica en plantas convencionales de mezcla química básica. Cada fase del proceso de disolución y pulido se realiza bajo atmósferas controladas, con sistemas de control numérico que previenen la contaminación externa cruzada.
            </p>
          </div>
          <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4">
            <Microscope className="w-12 h-12 text-voll-gold shrink-0" />
            <div>
              <span className="block text-xs font-mono text-voll-gold uppercase tracking-wider font-bold">Monitoreo Constante por HPLC</span>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Trazabilidad total: cada lote entregado cuenta con un certificado de calidad firmado por el director técnico de laboratorio de control, disponible para auditorías de flotas.
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Dashboard layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Panel: Scientific Test Data Sheet */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-voll-gold uppercase font-bold">Reporte de Análisis Espectrométrico</span>
                  <h3 className="font-display font-bold text-lg text-white">Análisis Químico de Pureza VOLL</h3>
                </div>
                <span className="text-xs font-mono bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-1 rounded-full flex items-center gap-1.5 font-bold uppercase">
                  <ShieldCheck className="w-4 h-4" /> Certificado Conforme
                </span>
              </div>

              {/* Specifications Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead>
                    <tr className="border-b border-white/5 text-slate-400 uppercase text-[9px] tracking-widest font-mono">
                      <th className="pb-3 font-semibold">Parámetro Evaluado</th>
                      <th className="pb-3 font-semibold">Unidad</th>
                      <th className="pb-3 font-semibold text-center">Norma ISO 22241</th>
                      <th className="pb-3 font-semibold text-right">Resultado VOLL</th>
                      <th className="pb-3 font-semibold text-right">Estatus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {chemicalSpecs.map((spec, idx) => (
                      <tr
                        key={idx}
                        className={`hover:bg-white/5 transition-colors duration-150 ${spec.critical ? 'bg-voll-blue/5' : ''}`}
                      >
                        <td className="py-3 font-medium text-slate-200 flex items-center gap-2">
                          {spec.name}
                          {spec.critical && (
                            <span className="text-[8px] bg-voll-gold/15 text-voll-gold border border-voll-gold/20 px-1 rounded-sm uppercase tracking-wide font-mono font-bold">
                              Crítico
                            </span>
                          )}
                        </td>
                        <td className="py-3 font-mono text-slate-400">{spec.unit}</td>
                        <td className="py-3 text-center font-mono text-slate-400">
                          {spec.min} - {spec.max}
                        </td>
                        <td className="py-3 text-right font-mono text-white font-semibold">
                          {spec.measured}
                        </td>
                        <td className="py-3 text-right">
                          <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20 uppercase">
                            <Check className="w-3 h-3" /> {spec.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

          </div>

          {/* Right Panel: Active 3-Stage Filtration process illustration */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="space-y-4">
              <span className="text-xs font-mono text-voll-gold uppercase tracking-widest font-bold">Tecnología de Filtrado</span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight">El Proceso de Purificación de Tres Fases</h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                El agua utilizada se desmineraliza hasta obtener una conductividad eléctrica inferior a 1.0 μS/cm. Esto evita la introducción de silicatos y otros minerales que acortan drásticamente la vida útil del catalizador SCR.
              </p>
            </div>

            <div className="space-y-4">
              {filtrationStages.map((stage, idx) => {
                const Icon = stage.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-voll-gold/40 transition-colors duration-300 flex items-start gap-4"
                  >
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center shrink-0 text-voll-gold">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-voll-gold font-bold uppercase tracking-wider">Etapa {stage.step}</span>
                        <span className="text-[10px] font-mono text-slate-500 font-medium uppercase">{stage.mesh}</span>
                      </div>
                      <h4 className="text-sm font-display font-extrabold text-white">{stage.name}</h4>
                      <p className="text-xs text-slate-400 font-sans font-light leading-relaxed">{stage.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
