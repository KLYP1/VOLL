import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyVoll from './components/WhyVoll';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import Certifications from './components/Certifications';
import Laboratory from './components/Laboratory';
import ProductPresentation from './components/ProductPresentation';
import Applications from './components/Applications';
import QualityProcess from './components/QualityProcess';
import TechnicalDashboard from './components/TechnicalDashboard';
import CTA from './components/CTA';
import MockupsHub from './components/MockupsHub';
import ProposalHub from './components/ProposalHub';
import Footer from './components/Footer';

export default function App() {
  const [activeView, setActiveView] = useState<'landing' | 'mockups' | 'proposal'>('landing');

  // Scroll to section helper
  const scrollToSection = (id: string) => {
    setActiveView('landing');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div id="voll-root-container" className="min-h-screen bg-voll-black text-white font-sans flex flex-col justify-between selection:bg-voll-gold selection:text-voll-black">
      
      {/* Universal Navigation Header */}
      <Navbar
        activeView={activeView}
        setActiveView={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        scrollToSection={scrollToSection}
      />

      {/* Main View Wrapper */}
      <main className="flex-1">
        {activeView === 'landing' ? (
          <>
            {/* SECTION 01: HERO */}
            <Hero
              onQuoteClick={() => scrollToSection('cta')}
              onSpecsClick={() => scrollToSection('dashboard')}
            />

            {/* SECTION 02: WHY VOLL */}
            <WhyVoll />

            {/* SECTION 03: HOW ADBLUE WORKS */}
            <HowItWorks />

            {/* SECTION 04: BENEFITS & INDUSTRIES */}
            <Benefits />

            {/* SECTION 05: CERTIFICATIONS Badge collection */}
            <Certifications />

            {/* SECTION 06: LABORATORY & FILTRATION */}
            <Laboratory />

            {/* SECTION 07: PRODUCT PRESENTATION Studio */}
            <ProductPresentation />

            {/* SECTION 08: APPLICATIONS & OEM SYSTEMS */}
            <Applications />

            {/* SECTION 09: QUALITY PROCESS TIMELINE */}
            <QualityProcess />

            {/* SECTION 10: TECHNICAL DATA SPEC SHEET */}
            <TechnicalDashboard />

            {/* SECTION 11: CALL TO ACTION & QUOTE REQUEST */}
            <CTA />
          </>
        ) : activeView === 'mockups' ? (
          /* BRANDING IDENTITY & PACKAGING STUDIO MOCKUPS */
          <MockupsHub />
        ) : (
          /* PROPOSAL AUTOMATION STUDIO */
          <ProposalHub />
        )}
      </main>

      {/* Corporate footer */}
      <Footer />
    </div>
  );
}
