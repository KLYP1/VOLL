import React from 'react';
import { Award, ShieldAlert, CheckCircle, FlameKindling, Globe, FlaskConical, Scale } from 'lucide-react';

export default function Certifications() {
  const certifications = [
    {
      id: "iso",
      title: "ISO 22241-1 / 2 / 3",
      authority: "Estándar Internacional",
      description: "Certificación de cumplimiento total sobre los parámetros químicos de pureza de urea, límites máximos de metales pesados y métodos de prueba de espectroscopia.",
      badge: "Pureza Certificada",
      icon: Award
    },
    {
      id: "aus",
      title: "AUS32 Standard",
      authority: "Diesel Exhaust Fluid",
      description: "Concentración exacta garantizada del 32.5% de urea de alta pureza disuelta de forma homogénea, ideal para el punto eutéctico térmico del SCR (-11°C).",
      badge: "Formulación Homogénea",
      icon: Scale
    },
    {
      id: "din",
      title: "DIN V 70070",
      authority: "Estándar Automotriz Alemán",
      description: "Cumplimiento de la norma matriz de la asociación de la industria automotriz de Alemania (VDA) que rige la calidad del DEF para motores pesados.",
      badge: "Ingeniería de Alemania",
      icon: CheckCircle
    },
    {
      id: "oem",
      title: "Homologación OEM",
      authority: "Aprobación del Fabricante",
      description: "Fórmula de composición validada químicamente para el uso seguro en flotas de marcas líderes, respetando los términos de garantía de cada fabricante.",
      badge: "Aprobación OEM",
      icon: Award
    },
    {
      id: "lab",
      title: "Pruebas de Laboratorio",
      authority: "Control de Calidad Lote a Lote",
      description: "Cada lote producido se somete a cromatografía líquida de alta resolución (HPLC) para verificar niveles de biuret, aldehídos e insolubles.",
      badge: "Cero Impurezas",
      icon: FlaskConical
    },
    {
      id: "env",
      title: "Sostenibilidad Activa",
      authority: "Cumplimiento Ambiental",
      description: "Contribución directa en la reducción catalítica del esmog fotoquímico urbano, disminuyendo drásticamente las partículas finas en suspensión.",
      badge: "Huella Eco-Protegida",
      icon: Globe
    }
  ];

  return (
    <section id="certifications" className="py-24 bg-voll-graphite relative overflow-hidden px-4 md:px-8 border-t border-white/5">
      {/* Background radial gold/blue ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-voll-blue/10 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <p className="text-xs font-mono tracking-widest text-voll-gold uppercase">Garantías de Clase Mundial</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Certificaciones de Calidad Premium
          </h2>
          <div className="w-16 h-1 bg-voll-gold mx-auto my-6 rounded-full" />
          <p className="text-slate-400 font-sans font-light text-sm">
            La confianza de los operadores se respalda con estándares medibles en laboratorio. VOLL no es un producto genérico, es un estándar de ingeniería validado por entidades globales.
          </p>
        </div>

        {/* Certifications Badge Layout - Luxury Seals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => {
            const Icon = cert.icon;
            return (
              <div
                id={`cert-card-${cert.id}`}
                key={cert.id}
                className="bg-voll-black/50 border border-white/10 rounded-2xl p-8 hover:border-voll-gold/60 transition-all duration-300 relative group flex flex-col justify-between"
              >
                {/* Visual Accent Corner Glow */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-voll-gold/10 to-transparent rounded-tr-2xl group-hover:from-voll-gold/25 transition-all duration-300" />
                
                <div className="space-y-4">
                  {/* Luxury Gold Seal Icon */}
                  <div className="w-14 h-14 rounded-full border-2 border-voll-gold/40 flex items-center justify-center bg-voll-blue/15 group-hover:border-voll-gold shadow-lg shadow-voll-blue/20 transition-all duration-300">
                    <Icon className="w-6 h-6 text-voll-gold" />
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono tracking-widest text-voll-gold uppercase font-bold">{cert.authority}</span>
                    <h3 className="text-xl font-display font-extrabold text-white tracking-tight">{cert.title}</h3>
                  </div>

                  <p className="text-slate-400 font-sans font-light text-xs md:text-sm leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {/* Bottom luxury certification tag */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-500 uppercase">ESTÁNDAR COOPERATIVO</span>
                  <span className="text-voll-gold bg-voll-gold/10 border border-voll-gold/20 px-2 py-0.5 rounded-md font-semibold">{cert.badge}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quote on Heavy Duty Confidence */}
        <div className="mt-16 text-center max-w-xl mx-auto border border-white/10 rounded-2xl p-6 bg-white/5">
          <p className="text-xs font-sans text-slate-300 italic">
            "En el transporte de larga distancia y minería, un lote de AdBlue de baja calidad puede detener maquinaria pesada valorada en millones. VOLL elimina por completo esa variable de riesgo."
          </p>
          <p className="text-[10px] font-mono uppercase tracking-wider text-voll-gold mt-4 font-bold">
            — Comité de Aseguramiento de Calidad VOLL
          </p>
        </div>

      </div>
    </section>
  );
}
