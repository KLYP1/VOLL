import React, { useState } from 'react';
import { Layers, FileText, Smartphone, Monitor, Truck, Map, ShieldCheck, Mail, Send, Award, Compass, Search, Tag, Eye } from 'lucide-react';
import Logo from './Logo';

interface MockupItem {
  id: string;
  name: string;
  description: string;
  renderType: string;
}

export default function MockupsHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>("stationery");
  const [selectedItem, setSelectedItem] = useState<string>("business-card");

  const categories = [
    { id: "stationery", name: "Papelería & Papel Membretado", icon: FileText },
    { id: "digital", name: "Canales Digitales & Datos", icon: Monitor },
    { id: "logistics", name: "Logística & Flota Terrestre", icon: Truck },
    { id: "spaces", name: "Señalética & Oficinas", icon: Map },
    { id: "packaging", name: "Etiquetas & Punto de Venta", icon: Layers }
  ];

  const mockups: Record<string, MockupItem[]> = {
    stationery: [
      { id: "business-card", name: "Business Card (Tarjeta)", description: "Tarjeta de presentación ejecutiva de alta gama para directores técnicos.", renderType: "business-card" },
      { id: "letterhead", name: "Letterhead (Papel Membretado)", description: "Papelería oficial corporativa para informes espectrales y cotizaciones.", renderType: "letterhead" },
      { id: "invoice", name: "Invoice (Factura)", description: "Plantilla de facturación premium integrada con campos de despacho.", renderType: "invoice" },
      { id: "email-signature", name: "Email Signature (Firma)", description: "Firma digital interactiva homologada para ejecutivos comerciales.", renderType: "email-signature" },
      { id: "corporate-folder", name: "Corporate Folder (Carpeta)", description: "Carpeta de presentación de propuestas comerciales para flotas.", renderType: "corporate-folder" }
    ],
    digital: [
      { id: "desktop-web", name: "Desktop Website (Portal)", description: "Maqueta interactiva de la versión de escritorio del portal VOLL.", renderType: "desktop-web" },
      { id: "mobile-web", name: "Mobile Responsive Web", description: "Visualización de la arquitectura móvil simplificada del sistema.", renderType: "mobile-web" },
      { id: "datasheet", name: "Technical Datasheet", description: "Ficha de datos de seguridad y especificación química para ingenieros.", renderType: "datasheet" },
      { id: "presentation", name: "PowerPoint & Sales Deck", description: "Diapositivas maestras de presentación comercial para juntas de flotas.", renderType: "presentation" },
      { id: "linkedin-banner", name: "Social Templates (LinkedIn)", description: "Banners corporativos de LinkedIn y publicaciones de Instagram.", renderType: "socials" }
    ],
    logistics: [
      { id: "delivery-truck", name: "Delivery Truck Graphics", description: "Rotulación de camiones rígidos para distribución capilar de bidones.", renderType: "delivery-truck" },
      { id: "bulk-tanker-design", name: "Bulk Tanker Design", description: "Branding en camiones cisterna de alta capacidad para despacho granel.", renderType: "bulk-tanker-design" }
    ],
    spaces: [
      { id: "office-reception", name: "Office Reception", description: "Branding en el hall de recepción de la oficina de Múnich/Madrid.", renderType: "office-reception" },
      { id: "warehouse-signage", name: "Warehouse Signage", description: "Señalización de seguridad industrial en centros de envasado.", renderType: "warehouse-signage" },
      { id: "trade-show", name: "Trade Show Booth & Roll-up", description: "Mobiliario modular de exposición para ferias internacionales.", renderType: "trade-show" }
    ],
    packaging: [
      { id: "container-labels", name: "Product Labels (10L / 20L)", description: "Arte final minimalista de la etiqueta de envase resistente a solventes.", renderType: "container-labels" },
      { id: "pos-distributor", name: "POS Point of Sale", description: "Pósteres y exhibidores para distribuidores minoristas autorizados.", renderType: "pos-distributor" }
    ]
  };

  const currentItems = mockups[selectedCategory] || [];
  const activeMockup = currentItems.find(item => item.id === selectedItem) || currentItems[0] || { id: "", name: "", description: "", renderType: "" };

  return (
    <section id="mockups-hub" className="py-12 bg-voll-black min-h-[80vh] px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Hub Header */}
        <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-voll-gold uppercase tracking-widest font-bold">Manual de Normas Gráficas VOLL</span>
            <h2 className="text-2.5xl md:text-4xl font-display font-extrabold text-white">
              Estudio de Marca & Mockups Interactivos
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-sans font-light max-w-md">
            Explore el ecosistema visual de VOLL. No mostramos simples rectángulos vacíos: renderizamos maquetas interactivas funcionales que reflejan el estándar del manual de marca de Pentagram.
          </p>
        </div>

        {/* Category buttons (Horizontal pills) */}
        <div className="flex flex-wrap gap-2 md:gap-3 bg-white/5 p-2 rounded-2xl border border-white/10 max-w-5xl">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const firstItem = mockups[cat.id]?.[0]?.id || "";
                  setSelectedItem(firstItem);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer uppercase tracking-wider ${
                  selectedCategory === cat.id
                    ? 'bg-voll-blue text-white shadow-lg border border-voll-gold/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 text-voll-gold" />
                {cat.name}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Mockup selector sidebar within Category */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block px-2">Elementos Disponibles</span>
              
              <div className="space-y-1.5">
                {currentItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item.id)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-sans transition-all duration-300 flex items-start gap-3 cursor-pointer ${
                      selectedItem === item.id
                        ? 'bg-voll-blue/35 border-voll-gold/60 text-white shadow-md'
                        : 'bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="font-bold uppercase tracking-wide flex items-center gap-1.5">
                        {selectedItem === item.id && <Eye className="w-3.5 h-3.5 text-voll-gold animate-pulse" />}
                        {item.name}
                      </div>
                      <p className="text-[10px] text-slate-400 leading-relaxed font-light">{item.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: High Fidelity Interactive Mockup Render Canvas */}
          <div className="lg:col-span-8 bg-voll-graphite/40 border border-white/10 rounded-2xl p-6 md:p-8 min-h-[500px] flex flex-col justify-between relative overflow-hidden shadow-xl">
            
            {/* Design Specifications corner */}
            <div className="border-b border-white/10 pb-4 mb-6 flex justify-between items-center text-[10px] font-mono text-slate-400">
              <span className="uppercase font-bold tracking-wider text-voll-gold">DISEÑO DE MOCKUP EN TIEMPO REAL</span>
              <span>MEDIDAS: 1:1 VECTOR CANVAS</span>
            </div>

            {/* Interactive Mockup Engine */}
            <div className="flex-1 flex items-center justify-center py-6 min-h-[350px]">
              
              {/* BRANDING GRAPHICS ENGINE BASED ON TYPE */}
              {activeMockup.renderType === "business-card" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl">
                  {/* Front Card */}
                  <div className="aspect-[1.75] rounded-xl bg-gradient-to-br from-voll-black to-slate-950 p-6 border border-white/10 flex flex-col justify-between relative shadow-2xl overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-voll-gold/10 rounded-bl-full group-hover:bg-voll-gold/25 transition-all" />
                    <Logo size="sm" showTagline={false} />
                    <div className="space-y-0.5 z-10">
                      <span className="block text-xs font-bold text-white tracking-widest font-display uppercase">Ing. Carlos Mendoza</span>
                      <span className="block text-[8px] font-mono text-voll-gold tracking-widest uppercase">Director de Aseguramiento de Calidad</span>
                    </div>
                  </div>
                  {/* Back Card */}
                  <div className="aspect-[1.75] rounded-xl bg-voll-blue p-6 border border-voll-gold/40 flex flex-col justify-between relative shadow-2xl overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/5" />
                    <Logo size="sm" showTagline={true} light={true} />
                    <div className="space-y-1 font-mono text-[8px] text-slate-300 z-10 leading-tight">
                      <p>San Martín de Porres, Lima, Perú</p>
                      <p>c.mendoza@voll.pe</p>
                      <p>+51 981 123 456</p>
                    </div>
                  </div>
                </div>
              )}

              {activeMockup.renderType === "letterhead" && (
                <div className="bg-white text-slate-800 w-full max-w-md aspect-[1/1.41] rounded-xl shadow-2xl p-8 flex flex-col justify-between font-sans border-t-8 border-voll-blue">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                      <Logo size="sm" showTagline={true} light={false} />
                      <div className="text-right text-[8px] font-mono text-slate-500 leading-normal">
                        <p className="font-bold text-voll-blue">VOLL Urea Automotriz Lubricantes S.A.C.</p>
                        <p>San Martín de Porres, Lima, Perú</p>
                        <p>RUC: 20610114022</p>
                      </div>
                    </div>
                    
                    {/* Document Content */}
                    <div className="space-y-3">
                      <div className="text-[10px] font-mono text-slate-400">FECHA: 29 DE JUNIO DE 2026</div>
                      <div className="text-xs font-bold text-slate-900 font-display">CERTIFICADO DE CONFORMIDAD QUÍMICA - LOTE V-4028</div>
                      <p className="text-[10px] text-slate-600 leading-relaxed font-light">
                        Por la presente se certifica que la muestra representativa del producto AdBlue VOLL correspondiente al lote de producción mencionado ha sido analizada mediante cromatografía líquida de alta resolución, de acuerdo con los métodos contemplados en la norma internacional <strong>ISO 22241</strong>.
                      </p>
                      <p className="text-[10px] text-slate-600 leading-relaxed font-light">
                        Los resultados confirman que el producto cumple holgadamente con los parámetros de pureza química exigidos, registrando una concentración de urea del <strong>32.54%</strong> y un nivel de biuret máximo de <strong>0.18%</strong>, asegurando el óptimo desempeño del catalizador SCR.
                      </p>
                    </div>
                  </div>

                  {/* Signature block */}
                  <div className="flex justify-between items-end border-t border-slate-100 pt-4">
                    <div className="text-left text-[8px] text-slate-400 leading-normal font-mono">
                      <p>www.voll.pe</p>
                      <p>contacto@voll.pe</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-8 bg-voll-blue/10 border border-voll-blue/20 flex items-center justify-center font-serif text-[9px] text-voll-blue rotate-[-5deg]">VOLL LABS</div>
                      <div className="w-24 border-t border-slate-300 mt-1 mx-auto" />
                      <span className="block text-[7px] text-slate-500 font-mono">Control de Calidad en Línea</span>
                    </div>
                  </div>
                </div>
              )}

              {activeMockup.renderType === "invoice" && (
                <div className="bg-white text-slate-800 w-full max-w-md aspect-[1/1.41] rounded-xl shadow-2xl p-8 flex flex-col justify-between font-sans border-t-8 border-voll-gold">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <Logo size="sm" showTagline={true} light={false} />
                      <div className="text-right">
                        <span className="block text-sm font-bold text-slate-900 font-display">FACTURA</span>
                        <span className="block text-[9px] font-mono text-slate-400">N° PE-2026-00412</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-[9px] border-b border-slate-100 pb-4">
                      <div>
                        <span className="block text-slate-400 uppercase font-mono">CLIENTE:</span>
                        <span className="block font-bold text-slate-800">Mega Logística Transandina S.A.C.</span>
                        <span className="block text-slate-500">Av. Industrial N° 450, Callao, Lima</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-slate-400 uppercase font-mono">FECHA DESPACHO:</span>
                        <span className="block font-bold text-slate-800">29/06/2026</span>
                        <span className="block text-slate-500">Término de Pago: 30 Días</span>
                      </div>
                    </div>

                    {/* Table */}
                    <div className="space-y-2">
                      <div className="grid grid-cols-12 text-[8px] font-mono text-slate-400 border-b border-slate-100 pb-1 uppercase">
                        <span className="col-span-6">Descripción del Formato</span>
                        <span className="col-span-2 text-center">Cant</span>
                        <span className="col-span-2 text-right">Precio</span>
                        <span className="col-span-2 text-right">Subtotal</span>
                      </div>
                      <div className="grid grid-cols-12 text-[9px] text-slate-700 py-1 border-b border-slate-100/50">
                        <span className="col-span-6 font-semibold">IBC Contenedor 1000 Litros VOLL UltraPure</span>
                        <span className="col-span-2 text-center">4</span>
                        <span className="col-span-2 text-right">S/. 720.00</span>
                        <span className="col-span-2 text-right font-bold">S/. 2,880.00</span>
                      </div>
                      <div className="grid grid-cols-12 text-[9px] text-slate-700 py-1">
                        <span className="col-span-6 font-semibold">Envase Canister 20 Litros VOLL Premium</span>
                        <span className="col-span-2 text-center">40</span>
                        <span className="col-span-2 text-right">S/. 18.50</span>
                        <span className="col-span-2 text-right font-bold">S/. 740.00</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom totals */}
                  <div className="border-t-2 border-slate-100 pt-4 flex justify-between items-center text-xs">
                    <span className="text-[8px] text-slate-400 font-mono">Gracias por su confianza técnica con VOLL.</span>
                    <div className="text-right space-y-0.5">
                      <span className="block text-[8px] text-slate-400 uppercase font-mono">TOTAL FACTURADO</span>
                      <span className="block text-base font-extrabold text-voll-blue">S/. 3,620.00</span>
                    </div>
                  </div>
                </div>
              )}

              {activeMockup.renderType === "email-signature" && (
                <div className="bg-slate-900 border border-white/10 rounded-xl p-6 w-full max-w-lg shadow-xl font-sans">
                  <div className="border-b border-white/10 pb-4 mb-4 text-xs text-slate-400 flex justify-between">
                    <span>De: c.mendoza@voll.pe</span>
                    <span>Para: j.martinez@transandina.pe</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-light mb-8">
                    Estimado Javier, adjunto el reporte de lote químico de salida para las cisternas despachadas hoy. Saludos cordiales.
                  </p>
                  
                  {/* The Interactive Signature */}
                  <div className="flex flex-col sm:flex-row items-start gap-4 border-t border-white/10 pt-4">
                    <Logo size="sm" showTagline={true} />
                    <div className="space-y-0.5 font-sans">
                      <p className="text-sm font-bold text-white font-display">Carlos Mendoza</p>
                      <p className="text-[10px] text-voll-gold font-mono uppercase tracking-wider font-semibold">Director de Aseguramiento de Calidad</p>
                      <div className="h-[1px] w-24 bg-white/10 my-2" />
                      <div className="text-[9px] text-slate-400 font-mono space-y-0.5 leading-tight">
                        <p>VOLL Perú | Planta & Centro de Distribución</p>
                        <p>Lima, Perú | +51 981 123 456</p>
                        <p className="text-white hover:text-voll-gold">www.voll.pe</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeMockup.renderType === "corporate-folder" && (
                <div className="relative w-full max-w-md aspect-[1.4] bg-voll-black rounded-2xl border-l-8 border-voll-blue border border-white/10 shadow-2xl p-8 flex flex-col justify-between overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-voll-gold/10 to-transparent rounded-tr-2xl group-hover:from-voll-gold/25 transition-all duration-300" />
                  <div className="flex justify-between items-start">
                    <Logo size="md" showTagline={true} />
                    <span className="text-[9px] font-mono text-voll-gold border border-voll-gold/25 px-2 py-0.5 rounded-md uppercase tracking-wider font-bold">DOSSIER TÉCNICO 2026</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-black text-white leading-tight">SOLUCIONES DE INGENIERÍA EN CONTROL DE EMISIONES</h3>
                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                      Sistemas SCR Euro V / Euro VI / Tier IV Final. Protección extrema de catalizadores para transporte pesado, logística, minería y agroindustria.
                    </p>
                  </div>
                </div>
              )}

              {activeMockup.renderType === "desktop-web" && (
                <div className="bg-[#050505] border border-white/20 rounded-xl overflow-hidden w-full max-w-xl shadow-2xl aspect-[1.6]">
                  {/* Browser top-bar */}
                  <div className="bg-[#111111] px-4 py-2 flex items-center gap-2 border-b border-white/10 text-[9px] font-mono text-slate-400">
                    <div className="flex gap-1.5 shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <div className="bg-black px-4 py-1 rounded-md flex-1 text-center max-w-md border border-white/5 truncate">
                      https://www.voll.pe/es/tecnologia-scr
                    </div>
                  </div>
                  {/* Micro Landing rendering */}
                  <div className="p-6 space-y-6">
                    <div className="flex justify-between items-center">
                      <Logo size="sm" showTagline={false} />
                      <div className="flex gap-3 text-[8px] font-bold uppercase tracking-wider text-slate-300">
                        <span>TECNOLOGÍA</span>
                        <span>FORMATOS</span>
                        <span>PROCESO</span>
                        <span className="text-voll-gold">CONTACTO</span>
                      </div>
                    </div>
                    <div className="space-y-3 py-4 text-center max-w-md mx-auto">
                      <h4 className="text-lg font-display font-extrabold text-white leading-none">PROFESIONALES DE LA UREA</h4>
                      <p className="text-[9px] text-slate-400">Fórmula ultra pura de estabilidad térmica certificada bajo estándar ISO 22241.</p>
                      <button className="bg-voll-gold text-voll-black text-[8px] font-bold uppercase px-4 py-1.5 rounded-md mx-auto block">Cotizar</button>
                    </div>
                  </div>
                </div>
              )}

              {activeMockup.renderType === "mobile-web" && (
                <div className="bg-[#050505] border-4 border-slate-800 rounded-[32px] overflow-hidden w-64 aspect-[9/18] shadow-2xl relative">
                  {/* Phone Speaker & Camera */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-800 rounded-full flex justify-center items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                    <span className="w-10 h-1 bg-slate-900 rounded-full" />
                  </div>
                  {/* Mobile content */}
                  <div className="p-4 pt-10 space-y-6 text-center">
                    <div className="flex justify-center">
                      <Logo size="sm" showTagline={false} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-display font-black text-white">EL FUTURO DE SCR</h4>
                      <p className="text-[10px] text-slate-400 leading-relaxed font-light">Urea automotriz ultra pura formulada para maximizar la eficiencia del motor y reducir emisiones.</p>
                    </div>
                    <button className="w-full bg-voll-gold text-voll-black text-[9px] font-bold uppercase py-2 rounded-lg">COTIZAR AHORA</button>
                    {/* Small specs badge */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 grid grid-cols-2 gap-2 text-[8px] font-mono">
                      <div>
                        <span className="block text-slate-500 font-bold">ISO</span>
                        <span className="block text-white">22241-1</span>
                      </div>
                      <div>
                        <span className="block text-slate-500 font-bold">UREA</span>
                        <span className="block text-white">32.5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeMockup.renderType === "datasheet" && (
                <div className="bg-white text-slate-800 w-full max-w-md aspect-[1/1.41] rounded-xl shadow-2xl p-6 font-sans border-t-8 border-voll-blue space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                    <Logo size="sm" showTagline={false} light={false} />
                    <span className="text-[8px] font-mono text-slate-500">FICHA TÉCNICA DE COMPOSICIÓN QUÍMICA</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-display font-black text-slate-900 uppercase">VOLL ULTRAPURE AUS32</h3>
                    <p className="text-[8px] text-slate-500">Fluido de Reducción Catalítica Selectiva para control de emisiones de NOx.</p>
                  </div>
                  
                  {/* Detailed Specs list inside datasheet */}
                  <div className="space-y-1 text-[8px] font-sans">
                    <div className="grid grid-cols-12 bg-slate-50 py-1 px-2 font-bold font-mono">
                      <span className="col-span-6">Propiedad</span>
                      <span className="col-span-3 text-center">Rango Máximo</span>
                      <span className="col-span-3 text-right">Método</span>
                    </div>
                    <div className="grid grid-cols-12 py-1 px-2 border-b border-slate-100">
                      <span className="col-span-6">Concentración de Urea</span>
                      <span className="col-span-3 text-center text-voll-blue font-bold">31.8% - 33.2%</span>
                      <span className="col-span-3 text-right">ISO 22241-2 C</span>
                    </div>
                    <div className="grid grid-cols-12 py-1 px-2 border-b border-slate-100">
                      <span className="col-span-6">Densidad a 20°C</span>
                      <span className="col-span-3 text-center">1,087 - 1,093 g/ml</span>
                      <span className="col-span-3 text-right">ISO 12185</span>
                    </div>
                    <div className="grid grid-cols-12 py-1 px-2 border-b border-slate-100">
                      <span className="col-span-6">Aldehídos</span>
                      <span className="col-span-3 text-center">5.0 mg/kg máx</span>
                      <span className="col-span-3 text-right">ISO 22241-2 F</span>
                    </div>
                    <div className="grid grid-cols-12 py-1 px-2">
                      <span className="col-span-6">Metales Pesados Totales</span>
                      <span className="col-span-3 text-center">0.5 mg/kg máx</span>
                      <span className="col-span-3 text-right">ISO 22241-2 I</span>
                    </div>
                  </div>
                </div>
              )}

              {activeMockup.renderType === "presentation" && (
                <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden w-full max-w-xl shadow-2xl aspect-[16/9] flex flex-col justify-between p-8 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-voll-blue/10 rounded-bl-full pointer-events-none" />
                  <div className="flex justify-between items-start">
                    <Logo size="sm" showTagline={true} />
                    <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">PROPUESTA LOGÍSTICA PARA SOCIOS</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2.5xl font-display font-black text-white leading-tight">OPTIMIZACIÓN DE COSTOS DE <br />FLOTA MEDIANTE EXCELENCIA SCR</h3>
                    <p className="text-[10px] text-slate-400 font-sans font-light leading-relaxed">
                      Cómo la pureza certificada de VOLL previene detenciones por cristalización y reduce el consumo de combustible diésel.
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-[8px] font-mono text-slate-500 uppercase">
                    <span>© 2026 VOLL PERÚ</span>
                    <span className="text-voll-gold font-bold">LIMA • PERÚ</span>
                  </div>
                </div>
              )}

              {activeMockup.renderType === "socials" && (
                <div className="bg-gradient-to-tr from-slate-950 via-slate-900 to-voll-blue/30 border border-white/10 rounded-xl overflow-hidden w-full max-w-xl shadow-2xl aspect-[1.91] p-6 flex flex-col justify-between relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-voll-blue/20 to-transparent" />
                  <div className="flex justify-between items-start z-10">
                    <Logo size="sm" showTagline={true} />
                    <div className="bg-voll-gold text-voll-black text-[8px] font-mono font-bold uppercase px-2.5 py-1 rounded-md">
                      LINKEDIN POST MOCKUP
                    </div>
                  </div>
                  <div className="space-y-2 z-10 max-w-md">
                    <span className="text-[9px] font-mono text-voll-gold uppercase tracking-wider font-semibold">#SCRTechnology</span>
                    <h3 className="text-lg md:text-xl font-display font-black text-white leading-tight">
                      CERO CRISTALIZACIÓN. MÁXIMA TRAZABILIDAD.
                    </h3>
                    <p className="text-[9px] text-slate-300 font-sans leading-relaxed">
                      Garantice la integridad de sus sistemas postratamiento Euro VI con el fluido homologado por los principales fabricantes de equipo pesado del mundo.
                    </p>
                  </div>
                  <div className="text-[8px] font-mono text-slate-500 flex justify-between z-10 uppercase border-t border-white/5 pt-2">
                    <span>Camiones Volvo • Scania • Mercedes-Benz</span>
                    <span>VOLL Profesionales</span>
                  </div>
                </div>
              )}

              {activeMockup.renderType === "delivery-truck" && (
                <div className="w-full max-w-lg bg-voll-black/40 border border-white/10 rounded-2xl p-6 flex flex-col items-center">
                  <span className="text-[9px] font-mono text-voll-gold uppercase tracking-widest block mb-4">ROTULACIÓN DE CAMIÓN RÍGIDO DE REPARTO (BOX TRUCK)</span>
                  
                  {/* High quality stylized truck vector box design */}
                  <svg viewBox="0 0 450 180" className="w-full h-auto drop-shadow-lg">
                    <defs>
                      <linearGradient id="cab-metal" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#1e293b" />
                        <stop offset="50%" stopColor="#475569" />
                        <stop offset="100%" stopColor="#0f172a" />
                      </linearGradient>
                    </defs>
                    {/* Road */}
                    <line x1="10" y1="150" x2="440" y2="150" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                    {/* Wheels */}
                    <circle cx="95" cy="140" r="14" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="280" cy="140" r="14" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="312" cy="140" r="14" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
                    
                    {/* Truck Cab */}
                    <path d="M40,140 L40,80 L75,70 L115,70 L120,100 L120,140 Z" fill="url(#cab-metal)" />
                    {/* Windshield */}
                    <path d="M78,74 L108,74 L110,95 L78,95 Z" fill="#020617" />
                    {/* Bumper */}
                    <rect x="35" y="128" width="88" height="10" rx="3" fill="#0f172a" />
                    
                    {/* Cargo Box with VOLL Corporate Design */}
                    <rect x="125" y="50" width="280" height="90" fill="#171A8D" rx="4" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <rect x="135" y="60" width="260" height="70" fill="none" stroke="#F7B51D" strokeWidth="0.75" rx="2" />
                    
                    {/* Text logo on truck side */}
                    <text x="265" y="100" fill="#ffffff" fontSize="26" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" letterSpacing="2">VOLL</text>
                    <text x="265" y="112" fill="#F7B51D" fontSize="6.5" letterSpacing="2" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">PROFESIONALES DE LA UREA</text>
                    <text x="360" y="74" fill="#ffffff" fontSize="7" fontFamily="sans-serif" textAnchor="middle">ISO 22241</text>
                  </svg>
                </div>
              )}

              {activeMockup.renderType === "bulk-tanker-design" && (
                <div className="w-full max-w-lg bg-voll-black/40 border border-white/10 rounded-2xl p-6 flex flex-col items-center">
                  <span className="text-[9px] font-mono text-voll-gold uppercase tracking-widest block mb-4">DISEÑO DE ROTULACIÓN EN CISTERNA GRANEL</span>
                  
                  {/* High quality tanker truck mockup */}
                  <svg viewBox="0 0 450 180" className="w-full h-auto drop-shadow-lg">
                    <line x1="10" y1="150" x2="440" y2="150" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                    
                    {/* Wheels */}
                    <circle cx="85" cy="140" r="14" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="260" cy="140" r="14" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="288" cy="140" r="14" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="316" cy="140" r="14" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />

                    {/* Cab */}
                    <path d="M30,140 L30,90 L60,80 L90,80 L100,105 L100,140 Z" fill="#1e293b" />
                    <path d="M62,84 L88,84 L94,102 L62,102 Z" fill="#020617" />
                    
                    {/* Tanker (Stainless Steel look with massive blue branded banner) */}
                    <rect x="105" y="55" width="310" height="85" rx="35" fill="url(#tanker-chrome)" stroke="rgba(255,255,255,0.15)" />
                    
                    {/* Giant Blue Branded Decal */}
                    <rect x="140" y="65" width="230" height="60" fill="#171A8D" rx="4" />
                    <text x="255" y="100" fill="#ffffff" fontSize="22" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">VOLL</text>
                    <text x="255" y="110" fill="#F7B51D" fontSize="6" letterSpacing="2" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">PROFESIONALES DE LA UREA</text>
                  </svg>
                </div>
              )}

              {activeMockup.renderType === "office-reception" && (
                <div className="w-full max-w-md bg-stone-900 border border-white/10 rounded-2xl p-8 relative overflow-hidden min-h-[260px] flex flex-col justify-end">
                  {/* Elegant wooden/concrete architectural panel */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-stone-950 via-stone-900 to-slate-800" />
                  
                  {/* Clean slat timber wall simulation on back */}
                  <div className="absolute top-6 left-6 right-6 bottom-24 bg-stone-950/40 rounded border border-white/5 flex gap-1 p-2">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div key={i} className="flex-1 bg-stone-900/60 rounded" />
                    ))}
                  </div>

                  {/* Golden backlight on wall logo */}
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-12 bg-voll-blue/30 rounded-full blur-xl pointer-events-none" />

                  {/* 3D Wall Logo Mark Signage inside reception */}
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 scale-110">
                    <Logo size="md" showTagline={true} />
                  </div>

                  {/* Designer Reception Desk (Concrete/Metallic) */}
                  <div className="bg-stone-800/90 border border-stone-700 h-16 rounded-t-xl z-10 flex items-center justify-between px-6 shadow-2xl">
                    <span className="text-[7px] font-mono text-stone-500 uppercase">RECEPCIÓN DE PLANTA • LIMA, PERÚ</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  </div>
                </div>
              )}

              {activeMockup.renderType === "warehouse-signage" && (
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <div className="bg-voll-black border-2 border-voll-gold p-6 rounded-xl text-center space-y-3">
                    <span className="block text-[8px] font-mono text-voll-gold uppercase tracking-widest font-bold">ZONA DE ABASTECIMIENTO DE MATERIA PRIMA</span>
                    <div className="w-12 h-12 rounded-full border-2 border-voll-gold flex items-center justify-center mx-auto text-voll-gold">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h4 className="text-xs font-display font-black text-white uppercase">USO EXCLUSIVO DE UREA SINTÉTICA DE ALTA PUREZA</h4>
                    <p className="text-[9px] text-slate-400 font-sans">Prohibida la entrada de camiones sin previa sanitización de acoples químicos.</p>
                  </div>
                  <div className="bg-voll-blue border-2 border-white/20 p-6 rounded-xl text-center space-y-3 flex flex-col justify-between">
                    <span className="block text-[8px] font-mono text-white uppercase tracking-widest font-bold">ÁREA DE LLENADO HERMÉTICO</span>
                    <Logo size="sm" showTagline={false} />
                    <h4 className="text-xs font-display font-black text-white uppercase">CUMPLIMIENTO DE ESTÁNDAR ISO 22241-1</h4>
                    <span className="text-[8px] font-mono bg-white/10 px-2 py-0.5 rounded text-voll-gold font-bold">FILTRACIÓN CRÍTICA 0.2 MICRAS</span>
                  </div>
                </div>
              )}

              {activeMockup.renderType === "trade-show" && (
                <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6 w-full max-w-md aspect-[1.5] relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-voll-blue/20 rounded-bl-full pointer-events-none" />
                  
                  <div className="flex justify-between items-start">
                    <Logo size="sm" showTagline={true} />
                    <span className="text-[8px] font-mono text-voll-gold border border-voll-gold/25 px-2 py-0.5 rounded uppercase font-bold">EXPO TRANSPORTE PERÚ 2026</span>
                  </div>

                  {/* Exposition stand 3D outline render */}
                  <div className="relative w-full h-[60%] border border-white/10 rounded-xl bg-white/5 p-4 flex items-center justify-around">
                    {/* Side Banner panel mockup (Roll-up banner representation) */}
                    <div className="w-[22%] h-full bg-voll-blue rounded border border-voll-gold/40 flex flex-col justify-between p-1.5 text-[6px]">
                      <Logo size="sm" showTagline={false} />
                      <div className="text-white font-bold leading-tight font-display">TECNOLOGÍA DE EMISIONES</div>
                    </div>
                    {/* Main Counter Mockup */}
                    <div className="w-[45%] h-[60%] bg-voll-black border border-white/10 rounded-lg flex flex-col justify-end p-2 relative">
                      <div className="absolute top-2 left-1/2 -translate-x-1/2">
                        <Logo size="sm" showTagline={false} />
                      </div>
                      <div className="bg-voll-gold h-1.5 rounded-full w-full" />
                    </div>
                  </div>
                </div>
              )}

              {activeMockup.renderType === "container-labels" && (
                <div className="bg-voll-blue border-2 border-voll-gold/40 rounded-2xl p-8 w-full max-w-md shadow-2xl relative overflow-hidden text-center space-y-6">
                  {/* Label Layout */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/5" />
                  <div className="flex justify-between items-start z-10 relative border-b border-white/10 pb-4">
                    <Logo size="sm" showTagline={true} />
                    <span className="text-[8px] font-mono text-voll-gold font-bold">FÓRMULA ESTABILIZADA</span>
                  </div>

                  <div className="space-y-2 z-10 relative">
                    <h3 className="text-3xl font-display font-black text-white leading-none">VOLL UltraPure</h3>
                    <p className="text-[10px] text-voll-gold font-mono uppercase tracking-widest font-semibold">Agente de Reducción de Emisión de NOx</p>
                    <div className="w-12 h-0.5 bg-voll-gold mx-auto my-3" />
                    <p className="text-[9px] text-slate-300 max-w-sm mx-auto leading-relaxed">
                      Lote homologado bajo la norma internacional de calidad <strong>ISO 22241</strong> para todos los camiones, autobuses y vehículos de maquinaria equipados con convertidores catalíticos SCR.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 z-10 relative text-[8px] font-mono text-slate-400">
                    <div className="text-center">
                      <span className="block text-white font-bold text-[10px]">32.5%</span>
                      <span>UREA PURA</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-white font-bold text-[10px]">67.5%</span>
                      <span>AGUA BIDEST</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-white font-bold text-[10px]">&lt;0.2%</span>
                      <span>BIURET MÁX</span>
                    </div>
                  </div>
                </div>
              )}

              {activeMockup.renderType === "pos-distributor" && (
                <div className="bg-voll-black border border-white/15 rounded-2xl p-6 w-full max-w-sm text-center space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-voll-gold" />
                  
                  <div className="flex justify-center">
                    <Logo size="sm" showTagline={true} />
                  </div>

                  <h3 className="text-base font-display font-black text-white uppercase tracking-wider">DISTRIBUIDOR AUTORIZADO DE PUREZA SCR</h3>
                  
                  {/* Shield badge */}
                  <div className="w-20 h-20 rounded-full border-2 border-voll-gold/40 bg-voll-blue/15 flex items-center justify-center mx-auto shadow-lg shadow-voll-blue/30">
                    <Award className="w-10 h-10 text-voll-gold" />
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="text-voll-gold font-mono font-bold uppercase tracking-wider block">Estándar DIN 70070</span>
                    <p className="text-slate-300 leading-relaxed font-light">Disponibilidad de stock completo en formatos de 10L, 20L y tambores de 200L con pico vertedor integrado.</p>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Tech Specifications explanation */}
            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-400 leading-relaxed flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-voll-gold" />
                <span>Estatus de Aprobación: <strong className="text-white uppercase font-mono text-[10px]">Manual Oficial VOLL v1.0</strong></span>
              </div>
              <span className="text-[10px] font-mono uppercase bg-voll-blue/20 text-white px-2 py-0.5 rounded border border-voll-gold/25">
                PENTAGRAM BRAND DIRECTIVE
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
