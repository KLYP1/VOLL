import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Send, Users, ShieldCheck } from 'lucide-react';

export default function CTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    fleetSize: "1-5",
    interestFormat: "canister-20l",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API request submission
    setSubmitted(true);
    setTimeout(() => {
      // Clear form on success
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        fleetSize: "1-5",
        interestFormat: "canister-20l",
        message: ""
      });
    }, 4000);
  };

  return (
    <section id="cta" className="py-24 bg-voll-black relative overflow-hidden px-4 md:px-8 border-t border-white/5">
      
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-voll-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Premium Value Copy */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="space-y-4">
              <span className="text-xs font-mono text-voll-gold uppercase tracking-widest font-bold">Únase a la Red de Excelencia VOLL</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
                Proteja su Flota con <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-voll-gold">
                  Calidad de Clase Mundial
                </span>
              </h2>
              <p className="text-slate-300 font-sans font-light text-sm md:text-base leading-relaxed">
                No arriesgue la integridad de sus sistemas de escape SCR con fluidos sin certificar. Reciba una propuesta adaptada al tamaño y requerimientos logísticos de su operación corporativa.
              </p>
            </div>

            {/* Quick stats / bullet points */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-voll-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-display font-bold text-white uppercase tracking-wider">Trazabilidad Química Certificada</h4>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">Suministramos reportes espectrométricos firmados por lote de salida.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-voll-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-display font-bold text-white uppercase tracking-wider">Programa de Distribuidores Autorizados</h4>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">Acceda a tarifas de volumen exclusivas, soporte de POS y material de marca.</p>
                </div>
              </div>
            </div>

            {/* Office Contact details */}
            <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-voll-gold" />
                <span>+51 981 123 456 / +51 (1) 748-0050</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-voll-gold" />
                <span>contacto@voll.pe</span>
              </div>
              <div className="flex items-center gap-2 md:col-span-2">
                <MapPin className="w-4 h-4 text-voll-gold" />
                <span>Planta Industrial: San Martín de Porres, Lima, Perú • VOLL Urea Automotriz Lubricantes S.A.C.</span>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Quote Request Form */}
          <div className="lg:col-span-6">
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-voll-blue via-voll-gold to-voll-blue" />
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-green-500/10 border-2 border-green-400 text-green-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white">Solicitud Recibida</h3>
                  <p className="text-xs text-slate-300 font-sans max-w-sm mx-auto leading-relaxed">
                    Su requerimiento técnico de AdBlue VOLL ha sido derivado a nuestro Director de Cuentas Corporativas. Le contactaremos en menos de 24 horas hábiles.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono text-voll-gold underline hover:text-white mt-4"
                  >
                    Enviar otra solicitud
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-display font-extrabold text-base text-white uppercase tracking-wider">Formulario de Requerimiento Técnico</h3>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">ATENCIÓN DIRECTA DE COMPRAS CORPORATIVAS</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase">Nombre Completo</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ej: Ing. Carlos Mendoza"
                        className="w-full bg-voll-black border border-white/10 focus:border-voll-gold/60 focus:ring-1 focus:ring-voll-gold rounded-lg px-4 py-2.5 text-xs text-white outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase">Correo Corporativo</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Ej: c.mendoza@empresa.com"
                        className="w-full bg-voll-black border border-white/10 focus:border-voll-gold/60 focus:ring-1 focus:ring-voll-gold rounded-lg px-4 py-2.5 text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase">Teléfono de Contacto</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Ej: +51 981 123 456"
                        className="w-full bg-voll-black border border-white/10 focus:border-voll-gold/60 focus:ring-1 focus:ring-voll-gold rounded-lg px-4 py-2.5 text-xs text-white outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase">Nombre de la Empresa</label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Ej: Transportes Transandina S.A."
                        className="w-full bg-voll-black border border-white/10 focus:border-voll-gold/60 focus:ring-1 focus:ring-voll-gold rounded-lg px-4 py-2.5 text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase">Tamaño de la Flota (Equipos)</label>
                      <select
                        value={formData.fleetSize}
                        onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
                        className="w-full bg-voll-black border border-white/10 focus:border-voll-gold/60 focus:ring-1 focus:ring-voll-gold rounded-lg px-4 py-2.5 text-xs text-white outline-none cursor-pointer"
                      >
                        <option value="1-5">1 a 5 Camiones / Maquinaria</option>
                        <option value="6-20">6 a 20 Camiones / Maquinaria</option>
                        <option value="21-100">21 a 100 Camiones / Maquinaria</option>
                        <option value="101+">Más de 100 Camiones / Gran Consumidor</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase">Formato de Interés</label>
                      <select
                        value={formData.interestFormat}
                        onChange={(e) => setFormData({ ...formData, interestFormat: e.target.value })}
                        className="w-full bg-voll-black border border-white/10 focus:border-voll-gold/60 focus:ring-1 focus:ring-voll-gold rounded-lg px-4 py-2.5 text-xs text-white outline-none cursor-pointer"
                      >
                        <option value="canister-10l">Envase Ligero 10 Litros</option>
                        <option value="canister-20l">Canister Estándar 20 Litros</option>
                        <option value="drum-200l">Tambor Sellado 200 Litros</option>
                        <option value="ibc-1000l">Contenedor IBC 1000 Litros</option>
                        <option value="bulk-tanker">Despacho Cisterna Granel</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase">Detalles del Requerimiento / Destino</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Indique frecuencia de consumo estimado, ubicaciones de bases de recarga, o si requiere tanques fijos en comodato."
                      className="w-full bg-voll-black border border-white/10 focus:border-voll-gold/60 focus:ring-1 focus:ring-voll-gold rounded-lg px-4 py-2.5 text-xs text-white outline-none resize-none"
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-voll-gold hover:bg-voll-gold/90 text-voll-black font-bold text-xs py-3 rounded-lg uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Solicitar Cotización Corporativa
                    </button>
                    <a
                      href="mailto:contacto@voll.pe?subject=Interes%20en%20Distribucion%20VOLL"
                      className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-voll-gold text-white font-bold text-xs rounded-lg uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-all duration-300"
                    >
                      Ser Distribuidor Oficial
                    </a>
                  </div>

                </form>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
