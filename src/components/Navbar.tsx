import React from 'react';
import Logo from './Logo';
import { Layers, Shield, Settings, Truck, Award, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeView: 'landing' | 'mockups' | 'proposal';
  setActiveView: (view: 'landing' | 'mockups' | 'proposal') => void;
  scrollToSection: (id: string) => void;
}

export default function Navbar({ activeView, setActiveView, scrollToSection }: NavbarProps) {
  return (
    <header
      id="voll-main-header"
      className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 px-4 md:px-8 py-3 flex items-center justify-between"
    >
      <div className="flex items-center gap-12">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveView('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center"
        >
          <Logo size="md" showTagline={true} />
        </a>

        {/* Navigation - hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
          {activeView === 'landing' ? (
            <>
              <button
                onClick={() => scrollToSection('why-voll')}
                className="hover:text-voll-gold transition-colors duration-200 cursor-pointer"
              >
                Ingeniería & Pureza
              </button>
              <button
                onClick={() => scrollToSection('scr-works')}
                className="hover:text-voll-gold transition-colors duration-200 cursor-pointer"
              >
                Tecnología SCR
              </button>
              <button
                onClick={() => scrollToSection('products')}
                className="hover:text-voll-gold transition-colors duration-200 cursor-pointer"
              >
                Formatos
              </button>
              <button
                onClick={() => scrollToSection('quality-process')}
                className="hover:text-voll-gold transition-colors duration-200 cursor-pointer"
              >
                Proceso ISO
              </button>
              <button
                onClick={() => scrollToSection('dashboard')}
                className="hover:text-voll-gold transition-colors duration-200 cursor-pointer"
              >
                Datos Técnicos
              </button>
            </>
          ) : (
            <button
              onClick={() => setActiveView('landing')}
              className="hover:text-voll-gold transition-colors duration-200 flex items-center gap-1 cursor-pointer"
            >
              ← Volver al Portal de Ingeniería
            </button>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-3 md:gap-4 flex-wrap lg:flex-nowrap">
        {/* Toggle View Buttons */}
        <button
          id="btn-portal"
          onClick={() => setActiveView('landing')}
          className={`px-3 py-2 rounded-lg text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
            activeView === 'landing'
              ? 'bg-voll-blue/80 text-white border border-voll-gold/40 shadow-lg'
              : 'bg-white/5 text-slate-400 hover:text-white border border-transparent hover:bg-white/10'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-voll-gold" />
          Portal VOLL
        </button>

        <button
          id="btn-mockups"
          onClick={() => setActiveView('mockups')}
          className={`px-3 py-2 rounded-lg text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
            activeView === 'mockups'
              ? 'bg-voll-blue/80 text-white border border-voll-gold/40 shadow-lg'
              : 'bg-white/5 text-slate-400 hover:text-white border border-transparent hover:bg-white/10'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-voll-gold" />
          Estudio de Marca
        </button>

        <button
          id="btn-proposals"
          onClick={() => setActiveView('proposal')}
          className={`px-3 py-2 rounded-lg text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
            activeView === 'proposal'
              ? 'bg-voll-gold text-voll-black font-bold shadow-lg shadow-voll-gold/20'
              : 'bg-white/5 text-slate-400 hover:text-white border border-transparent hover:bg-white/10'
          }`}
        >
          <Sparkles className={`w-3.5 h-3.5 ${activeView === 'proposal' ? 'text-voll-black' : 'text-voll-gold'}`} />
          Generador de Propuestas
        </button>

        <button
          onClick={() => {
            if (activeView !== 'landing') {
              setActiveView('landing');
              setTimeout(() => scrollToSection('cta'), 100);
            } else {
              scrollToSection('cta');
            }
          }}
          className="bg-voll-blue hover:bg-voll-blue/90 border border-white/10 text-white font-semibold text-[10px] sm:text-xs px-4 py-2.5 rounded-lg transition-all duration-300 shadow-md uppercase tracking-wider cursor-pointer"
        >
          Cotizar
        </button>
      </div>
    </header>
  );
}
