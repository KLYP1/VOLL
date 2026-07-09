import React from 'react';
import { Wind, ShieldAlert, Droplets, History, Fuel, CheckCircle2, Truck, Box, Tractor, HardHat, Pickaxe, Navigation } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      id: "nox",
      title: "Reducción Crítica de NOx",
      description: "Convierte hasta el 98% de los gases NOx nocivos en nitrógeno gaseoso inerte y vapor de agua, superando con holgura las metas de las normativas de protección de la atmósfera.",
      icon: Wind,
      color: "border-voll-blue/30"
    },
    {
      id: "scr-protection",
      title: "Protección Integral SCR",
      description: "Su bajísima presencia de iones metálicos (hierro, sodio, aluminio, cobre) previene la desactivación química o envenenamiento del catalizador de metales preciosos.",
      icon: CheckCircle2,
      color: "border-voll-gold/30"
    },
    {
      id: "crystallization",
      title: "Prevención de Cristalización",
      description: "Formulado con técnicas avanzadas de estabilización térmica que evitan la formación de biuret residual, cianurato o depósitos de melamina en el colector de escape.",
      icon: Droplets,
      color: "border-voll-blue/30"
    },
    {
      id: "lifespan",
      title: "Optimización de Vida Útil",
      description: "Extiende de manera significativa el ciclo de vida operativa del catalizador SCR y evita costosas paradas de mantenimiento correctivo de la flota.",
      icon: History,
      color: "border-voll-gold/30"
    },
    {
      id: "efficiency",
      title: "Rendimiento y Consumo",
      description: "Permite que el motor opere en su punto óptimo de combustión sin necesidad de estrangular la recirculación de gases (EGR), mejorando el rendimiento térmico general.",
      icon: Fuel,
      color: "border-voll-blue/30"
    },
    {
      id: "euro-comp",
      title: "Sistemas Euro V & Euro VI",
      description: "Totalmente compatible con las tecnologías de inyección más avanzadas del mercado (incluyendo sistemas de aire asistido y dosificadores electromecánicos).",
      icon: Truck,
      color: "border-voll-gold/30"
    }
  ];

  const applications = [
    { name: "Transporte Pesado", label: "Transporte Pesado", icon: Truck, desc: "Flotas de camiones de larga distancia operando bajo máxima exigencia de ruta." },
    { name: "Logística", label: "Logística y Distribución", icon: Navigation, desc: "Sistemas de reparto urbano e interurbano con ciclos constantes de arranque y parada." },
    { name: "Minería", label: "Minería de Alta Montaña", icon: Pickaxe, desc: "Operaciones severas en altitud geográfica con variaciones extremas de temperatura." },
    { name: "Agricultura", label: "Maquinaria Agrícola", icon: Tractor, desc: "Tractores y cosechadoras expuestas a polvo pesado y regímenes de motor prolongados." },
    { name: "Construcción", label: "Construcción & Obras", icon: HardHat, desc: "Excavadoras y cargadores frontales operando en altas cargas intermitentes." }
  ];

  return (
    <section id="benefits" className="py-24 bg-voll-black relative overflow-hidden px-4 md:px-8 border-t border-white/5">
      
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-[450px] h-[450px] bg-voll-blue/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[350px] h-[350px] bg-voll-gold/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Benefits Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <p className="text-xs font-mono tracking-widest text-voll-gold uppercase">Beneficios Tecnológicos Integrales</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Ingeniería de Fluidos <br />
            para la Máxima Confiabilidad
          </h2>
          <p className="text-slate-400 font-sans font-light text-sm md:text-base max-w-xl">
            La pureza química de VOLL no es un detalle estético: se traduce de forma inmediata en el retorno de inversión (ROI) de su operación. Reduzca costos de reparación y optimice cada kilómetro de ruta.
          </p>
        </div>

        {/* Bento Grid Benefits Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                id={`benefit-card-${benefit.id}`}
                key={benefit.id}
                className={`bg-white/5 border ${benefit.color} rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:bg-voll-blue/10 transition-all duration-300 hover:border-voll-gold/50 group`}
              >
                <div className="space-y-4">
                  <div className="p-3.5 bg-white/5 rounded-xl w-max group-hover:bg-voll-blue/30 border border-white/10 group-hover:border-voll-gold/40 transition-all duration-300">
                    <Icon className="w-6 h-6 text-voll-gold group-hover:scale-105 transition-transform" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-white tracking-tight group-hover:text-voll-gold transition-colors duration-200">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-400 font-sans font-light text-xs md:text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase">
                  <span>SISTEMA SCR</span>
                  <span className="text-voll-gold font-bold">ESTÁNDAR ISO 22241</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Applications / Industries Showcase Section */}
        <div className="mt-24 pt-16 border-t border-white/10">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono text-voll-gold uppercase tracking-widest font-bold">Sectores de Aplicación</span>
            <h3 className="text-2xl md:text-3.5xl font-display font-bold text-white tracking-tight">Optimizado para Operaciones Severas</h3>
            <p className="text-xs md:text-sm text-slate-400 font-sans font-light">
              Desde logística urbana de última milla hasta equipos pesados de extracción minera a 4,500 metros sobre el nivel del mar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {applications.map((app, idx) => {
              const Icon = app.icon;
              return (
                <div
                  id={`industry-card-${app.name.toLowerCase()}`}
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-4 hover:border-voll-blue/50 hover:bg-voll-blue/15 transition-all duration-300 group cursor-default"
                >
                  <div className="mx-auto p-4 bg-white/5 rounded-2xl w-max group-hover:bg-voll-gold/25 border border-white/10 transition-all duration-300">
                    <Icon className="w-8 h-8 text-voll-gold group-hover:text-white transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono text-voll-gold tracking-widest uppercase font-semibold">{app.name}</div>
                    <h4 className="text-sm font-display font-bold text-white">{app.label}</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed font-light">
                    {app.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
