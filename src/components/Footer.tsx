import React from 'react';
import Logo from './Logo';
import { Award, ShieldCheck, Mail, Globe, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#020202] border-t border-white/10 text-slate-400 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main Footer columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Logo & Tagline */}
          <div className="md:col-span-4 space-y-4">
            <Logo size="md" showTagline={true} />
            <p className="text-xs text-slate-500 font-sans font-light leading-relaxed max-w-sm pt-2">
              VOLL es una marca de tecnología industrial premium comercializada por VOLL Urea Automotriz Lubricantes S.A.C. Diseñamos soluciones químicas de alta precisión certificada bajo el estándar de calidad internacional ISO 22241.
            </p>
          </div>

          {/* Column 2: Quick navigation */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">TECNOLOGÍA</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#why-voll" className="hover:text-voll-gold transition-colors">¿Por qué VOLL?</a></li>
              <li><a href="#scr-works" className="hover:text-voll-gold transition-colors">Sistema SCR</a></li>
              <li><a href="#laboratory" className="hover:text-voll-gold transition-colors">Control de Calidad</a></li>
              <li><a href="#dashboard" className="hover:text-voll-gold transition-colors">Ficha Química</a></li>
            </ul>
          </div>

          {/* Column 3: Suministro */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">SUMINISTRO</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#products" className="hover:text-voll-gold transition-colors">Envase 10 Litros</a></li>
              <li><a href="#products" className="hover:text-voll-gold transition-colors">Canister 20 Litros</a></li>
              <li><a href="#products" className="hover:text-voll-gold transition-colors">Tambor 200 Litros</a></li>
              <li><a href="#products" className="hover:text-voll-gold transition-colors">Cisterna Granel</a></li>
            </ul>
          </div>

          {/* Column 4: Certificaciones */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">SOPORTE DE CALIDAD</h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-voll-gold shrink-0" />
                <span>Normativa DIN V 70070 / Alemania</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-voll-gold shrink-0" />
                <span>Aprobación de Garantías OEM para Flotas</span>
              </div>
              <p className="text-[11px] text-slate-500 font-sans leading-relaxed pt-2">
                Para solicitar certificados espectrométricos de lote de producción, contacte directamente a <strong className="text-slate-300">contacto@voll.pe</strong> indicando el código impreso en la boquilla de envasado.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright area */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono uppercase text-slate-600">
          <div>
            © 2026 VOLL UREA AUTOMOTRIZ LUBRICANTES S.A.C. TODOS LOS DERECHOS RESERVADOS.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">POLÍTICA DE CALIDAD</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">TÉRMINOS DE GARANTÍA OEM</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">SEGURIDAD QUÍMICA</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
