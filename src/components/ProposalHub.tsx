import React, { useState, useEffect } from 'react';
import { googleSignIn, initAuth, logout } from '../lib/googleAuth';
import { createSalesPresentation } from '../lib/slidesGenerator';
import { createVollKlypPresentation } from '../lib/slidesGeneratorVoll';
import { User } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Link, Sparkles, Check, ChevronRight, LogOut, ArrowRight, Smartphone, ShieldCheck, Mail, Sliders, Settings, X, ExternalLink } from 'lucide-react';

export default function ProposalHub() {
  // Proposal Type
  const [proposalType, setProposalType] = useState<'klyp_voll' | 'flotas_urea'>('klyp_voll');

  // Form State (Original Flotas Urea)
  const [clientName, setClientName] = useState('Empresa Cliente S.A.C.');
  const [agencyName, setAgencyName] = useState('VOLL Agencia Digital');
  const [agencyEmail, setAgencyEmail] = useState('contacto@tuagencia.com');
  const [agencyPhone, setAgencyPhone] = useState('+51 987 654 321');
  const [priceDevelopment, setPriceDevelopment] = useState(1200);
  const [priceHosting, setPriceHosting] = useState(350);
  const [deliveryDays, setDeliveryDays] = useState(14);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [primaryHex, setPrimaryHex] = useState('#0B0F19');
  const [accentHex, setAccentHex] = useState('#F7B51D');

  // Form State (VOLL x KLYP Proposal)
  const [vollClientName, setVollClientName] = useState('VOLL');
  const [vollAgencyName, setVollAgencyName] = useState('KLYP');
  const [vollDateStr, setVollDateStr] = useState('Julio 2026');
  const [vollSetupPrice, setVollSetupPrice] = useState(1500);
  const [vollEsencialPrice, setVollEsencialPrice] = useState(250);
  const [vollEsencialHours, setVollEsencialHours] = useState(3);
  const [vollAvanzadoPrice, setVollAvanzadoPrice] = useState(500);
  const [vollAvanzadoHours, setVollAvanzadoHours] = useState(10);
  const [vollNewSectionPrice, setVollNewSectionPrice] = useState(400);
  const [vollIntegrationPrice, setVollIntegrationPrice] = useState(450);
  const [vollRedesignPrice, setVollRedesignPrice] = useState(200);
  const [vollRedesignHourPrice, setVollRedesignHourPrice] = useState(70);
  const [vollSubpagePrice, setVollSubpagePrice] = useState(300);
  const [vollSupportBillingDays, setVollSupportBillingDays] = useState(5);

  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // App State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize Auth
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        setNeedsAuth(false);
      }
    } catch (err: any) {
      console.error('Login error detail:', err);
      
      const errorCode = err?.code || '';
      const errorMessage = err?.message || '';
      
      if (errorCode === 'auth/popup-closed-by-user' || errorMessage.includes('popup-closed-by-user')) {
        setError(
          'El proceso de inicio de sesión se interrumpió porque se cerró la ventana emergente de Google. Por favor, haz clic de nuevo en "Vincular Google Drive y Slides" e inicia sesión por completo para otorgar los permisos necesarios.'
        );
      } else if (errorCode === 'auth/popup-blocked' || errorMessage.includes('popup-blocked')) {
        setError(
          'Las ventanas emergentes (popups) están bloqueadas por tu navegador. Por favor, habilita las ventanas emergentes para este sitio en la barra de direcciones de tu navegador e intenta vincular de nuevo.'
        );
      } else if (errorCode === 'auth/network-request-failed' || errorMessage.includes('network-request-failed')) {
        setError(
          'Error de red al intentar conectar con los servicios de Google. Verifica tu conexión a internet e inténtalo de nuevo.'
        );
      } else {
        setError(
          `No se pudo iniciar sesión con Google (${errorCode || 'Error de conexión'}). Si estás viendo la aplicación dentro del visor integrado de AI Studio, te recomendamos abrirla en una pestaña nueva usando el botón de la esquina superior derecha para evitar restricciones de seguridad del navegador.`
        );
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setToken(null);
      setNeedsAuth(true);
      setGeneratedId(null);
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  const handleGenerate = async () => {
    if (!token) {
      setError('Por favor, inicie sesión con Google antes de continuar.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedId(null);

    try {
      let presentationId = '';
      if (proposalType === 'flotas_urea') {
        presentationId = await createSalesPresentation(token, {
          clientName,
          agencyName,
          agencyEmail,
          agencyPhone,
          priceDevelopment,
          priceHosting,
          deliveryDays,
          theme,
          primaryHex,
          accentHex,
        });
      } else {
        presentationId = await createVollKlypPresentation(token, {
          clientName: vollClientName,
          agencyName: vollAgencyName,
          dateStr: vollDateStr,
          setupPrice: vollSetupPrice,
          esencialPrice: vollEsencialPrice,
          esencialHours: vollEsencialHours,
          avanzadoPrice: vollAvanzadoPrice,
          avanzadoHours: vollAvanzadoHours,
          newSectionPrice: vollNewSectionPrice,
          integrationPrice: vollIntegrationPrice,
          redesignPrice: vollRedesignPrice,
          redesignHourPrice: vollRedesignHourPrice,
          subpagePrice: vollSubpagePrice,
          supportBillingDays: vollSupportBillingDays,
          primaryHex,
          accentHex,
        });
      }

      setGeneratedId(presentationId);
    } catch (err: any) {
      console.error('Error generating presentation:', err);
      setError(
        err?.message || 'Error al conectar con la API de Google Slides. Por favor intente de nuevo.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="proposal-hub" className="py-16 px-4 bg-[#0B0F19] text-white">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-voll-gold/10 border border-voll-gold/30 rounded-full text-voll-gold text-xs font-mono uppercase mb-4 tracking-wider">
            <Sparkles size={12} className="animate-pulse" /> Automatización Comercial
          </div>
          <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight mb-3">
            Generador de Propuestas Comerciales
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Crea una presentación formal, persuasiva y editable en <span className="text-white font-medium">Google Slides</span> para vender servicios de desarrollo de Landing Pages con hosting y dominio. Configurada en <span className="text-voll-gold font-semibold">Soles Peruanos (S/.)</span>.
          </p>
        </div>

        {/* Status / Error Toast */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-950/40 border border-red-500/40 rounded-lg text-red-200 text-sm flex justify-between gap-3 items-start"
          >
            <div className="flex flex-col gap-3 w-full">
              <div className="flex gap-3 items-start">
                <span className="font-semibold text-red-400 mt-0.5">Error:</span> 
                <span className="leading-relaxed">{error}</span>
              </div>
              {(error.includes('popup') || error.includes('ventana') || error.includes('bloque') || error.includes('seguridad')) && (
                <div className="mt-1 flex items-center">
                  <a
                    href={window.location.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-voll-gold text-voll-black font-bold text-xs rounded-lg hover:bg-voll-gold-light transition duration-150 shadow"
                  >
                    <ExternalLink size={13} /> Abrir en pestaña nueva para iniciar sesión sin bloqueos
                  </a>
                </div>
              )}
            </div>
            <button 
              onClick={() => setError(null)} 
              className="text-red-400 hover:text-white p-1 rounded-md hover:bg-red-900/40 transition flex-shrink-0"
              aria-label="Cerrar error"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}

        {/* Interactive Workspace Card */}
        <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 md:p-8">
            
            {/* Top Auth status bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 mb-8 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-voll-gold/10 border border-voll-gold/30 flex items-center justify-center text-voll-gold">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Estado de Google Integration</h3>
                  <p className="text-xs text-gray-400">
                    {user ? `Conectado como ${user.email}` : 'Sin conectar a Google Drive y Slides'}
                  </p>
                </div>
              </div>
              
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg text-xs transition"
                >
                  <LogOut size={13} /> Cerrar Sesión Google
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleLogin}
                    disabled={isLoggingIn}
                    className="w-full sm:w-auto gsi-material-button py-2 px-4 bg-white text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-3 text-xs shadow-md disabled:opacity-50"
                  >
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4 h-4 flex-shrink-0">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    </svg>
                    <span>{isLoggingIn ? 'Conectando...' : 'Vincular Google Drive y Slides'}</span>
                  </button>

                  <a
                    href={window.location.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg text-xs font-medium transition"
                    title="Abre la app en pestaña completa para resolver bloqueos de popups en iframes"
                  >
                    <ExternalLink size={13} /> Abrir en pestaña nueva
                  </a>
                </div>
              )}
            </div>

            {/* Config Form and Result Display */}
            <AnimatePresence mode="wait">
              {!generatedId ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-800 pb-4 mb-4 gap-4">
                    <h4 className="font-semibold text-lg border-l-2 border-voll-gold pl-3">
                      Paso 1: Configurar Datos de la Propuesta
                    </h4>
                    
                    {/* Switch layout type */}
                    <div className="flex bg-[#1F2937] p-1 rounded-xl border border-gray-800">
                      <button
                        type="button"
                        onClick={() => setProposalType('klyp_voll')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition ${
                          proposalType === 'klyp_voll'
                            ? 'bg-voll-gold text-voll-black shadow'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        Propuesta Desarrollo (6 Diapos)
                      </button>
                      <button
                        type="button"
                        onClick={() => setProposalType('flotas_urea')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition ${
                          proposalType === 'flotas_urea'
                            ? 'bg-voll-gold text-voll-black shadow'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        Propuesta Venta Industrial (9 Diapos)
                      </button>
                    </div>
                  </div>

                  {proposalType === 'klyp_voll' ? (
                    /* VOLL x KLYP FORM */
                    <div className="space-y-6">
                      <div className="bg-[#182235]/40 border border-[#1F2937] p-4 rounded-xl space-y-4">
                        <h5 className="text-xs font-mono text-voll-gold font-bold uppercase tracking-wider flex items-center gap-2">
                          <Sliders size={12} /> 1. Identificación de Proyecto Corporativo
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[11px] text-gray-400 font-mono uppercase mb-2">Cliente (Empresa)</label>
                            <input
                              type="text"
                              value={vollClientName}
                              onChange={(e) => setVollClientName(e.target.value)}
                              className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-voll-gold transition"
                              placeholder="Ej. VOLL"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-gray-400 font-mono uppercase mb-2">Preparado Por (Agencia)</label>
                            <input
                              type="text"
                              value={vollAgencyName}
                              onChange={(e) => setVollAgencyName(e.target.value)}
                              className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-voll-gold transition"
                              placeholder="Ej. KLYP"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-gray-400 font-mono uppercase mb-2">Fecha Emisión</label>
                            <input
                              type="text"
                              value={vollDateStr}
                              onChange={(e) => setVollDateStr(e.target.value)}
                              className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-voll-gold transition"
                              placeholder="Ej. Julio 2026"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#182235]/40 border border-[#1F2937] p-4 rounded-xl space-y-4">
                        <h5 className="text-xs font-mono text-voll-gold font-bold uppercase tracking-wider flex items-center gap-2">
                          <Settings size={12} /> 2. Setup Técnico & Planes de Soporte Mensual
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[11px] text-gray-400 font-mono uppercase mb-2">Setup Técnico (S/. Pago Único)</label>
                            <div className="relative">
                              <span className="absolute left-3.5 top-2 text-gray-400 text-sm">S/.</span>
                              <input
                                type="number"
                                value={vollSetupPrice}
                                onChange={(e) => setVollSetupPrice(Number(e.target.value))}
                                className="w-full bg-[#1F2937] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-voll-gold transition font-mono"
                                min="0"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[11px] text-gray-400 font-mono uppercase mb-2">Plan Esencial (S/. / mes)</label>
                            <div className="relative">
                              <span className="absolute left-3.5 top-2 text-gray-400 text-sm">S/.</span>
                              <input
                                type="number"
                                value={vollEsencialPrice}
                                onChange={(e) => setVollEsencialPrice(Number(e.target.value))}
                                className="w-full bg-[#1F2937] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-voll-gold transition font-mono"
                                min="0"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[11px] text-gray-400 font-mono uppercase mb-2">Horas Esencial (al mes)</label>
                            <input
                              type="number"
                              value={vollEsencialHours}
                              onChange={(e) => setVollEsencialHours(Number(e.target.value))}
                              className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-voll-gold transition font-mono"
                              min="0"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] text-gray-400 font-mono uppercase mb-2">Plan Avanzado (S/. / mes)</label>
                            <div className="relative">
                              <span className="absolute left-3.5 top-2 text-gray-400 text-sm">S/.</span>
                              <input
                                type="number"
                                value={vollAvanzadoPrice}
                                onChange={(e) => setVollAvanzadoPrice(Number(e.target.value))}
                                className="w-full bg-[#1F2937] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-voll-gold transition font-mono"
                                min="0"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[11px] text-gray-400 font-mono uppercase mb-2">Horas Avanzado (al mes)</label>
                            <input
                              type="number"
                              value={vollAvanzadoHours}
                              onChange={(e) => setVollAvanzadoHours(Number(e.target.value))}
                              className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-voll-gold transition font-mono"
                              min="0"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-gray-400 font-mono uppercase mb-2">Días Límite Pago Facturación</label>
                            <input
                              type="number"
                              value={vollSupportBillingDays}
                              onChange={(e) => setVollSupportBillingDays(Number(e.target.value))}
                              className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-voll-gold transition font-mono"
                              min="1"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#182235]/40 border border-[#1F2937] p-4 rounded-xl space-y-4">
                        <h5 className="text-xs font-mono text-voll-gold font-bold uppercase tracking-wider flex items-center gap-2">
                          <FileText size={12} /> 3. Tarifario de Cambios Estructurados (Bajo Demanda)
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-[10px] text-gray-400 font-mono uppercase mb-2">Nueva Sección (S/.)</label>
                            <input
                              type="number"
                              value={vollNewSectionPrice}
                              onChange={(e) => setVollNewSectionPrice(Number(e.target.value))}
                              className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-voll-gold transition font-mono"
                              min="0"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-gray-400 font-mono uppercase mb-2">Integración Terceros (S/.)</label>
                            <input
                              type="number"
                              value={vollIntegrationPrice}
                              onChange={(e) => setVollIntegrationPrice(Number(e.target.value))}
                              className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-voll-gold transition font-mono"
                              min="0"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-gray-400 font-mono uppercase mb-2">Subpágina Extra (S/.)</label>
                            <input
                              type="number"
                              value={vollSubpagePrice}
                              onChange={(e) => setVollSubpagePrice(Number(e.target.value))}
                              className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-voll-gold transition font-mono"
                              min="0"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-gray-400 font-mono uppercase mb-2">Rediseño Mayor Sección / Hora</label>
                            <div className="flex gap-2">
                              <input
                                type="number"
                                value={vollRedesignPrice}
                                onChange={(e) => setVollRedesignPrice(Number(e.target.value))}
                                className="w-1/2 bg-[#1F2937] border border-gray-700 rounded-lg px-2 py-2 text-xs focus:outline-none focus:border-voll-gold transition font-mono"
                                title="Por sección"
                                min="0"
                              />
                              <input
                                type="number"
                                value={vollRedesignHourPrice}
                                onChange={(e) => setVollRedesignHourPrice(Number(e.target.value))}
                                className="w-1/2 bg-[#1F2937] border border-gray-700 rounded-lg px-2 py-2 text-xs focus:outline-none focus:border-voll-gold transition font-mono"
                                title="Por hora de desarrollo"
                                min="0"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* ORIGINAL UREA TRUCK FORM */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Cliente */}
                      <div>
                        <label className="block text-xs text-gray-400 font-mono uppercase mb-2">Nombre del Cliente (Empresa)</label>
                        <input
                          type="text"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-voll-gold transition"
                          placeholder="Ej. Comercializadora Norte S.A.C."
                        />
                      </div>
                      
                      {/* Tu Agencia */}
                      <div>
                        <label className="block text-xs text-gray-400 font-mono uppercase mb-2">Tu Nombre / Empresa Proveedora</label>
                        <input
                          type="text"
                          value={agencyName}
                          onChange={(e) => setAgencyName(e.target.value)}
                          className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-voll-gold transition"
                          placeholder="Ej. VOLL Digital Studio"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs text-gray-400 font-mono uppercase mb-2">Tu Email de Contacto</label>
                        <input
                          type="email"
                          value={agencyEmail}
                          onChange={(e) => setAgencyEmail(e.target.value)}
                          className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-voll-gold transition"
                          placeholder="ventas@tuagenciadigital.com"
                        />
                      </div>

                      {/* Teléfono */}
                      <div>
                        <label className="block text-xs text-gray-400 font-mono uppercase mb-2">Tu Teléfono / WhatsApp</label>
                        <input
                          type="text"
                          value={agencyPhone}
                          onChange={(e) => setAgencyPhone(e.target.value)}
                          className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-voll-gold transition"
                          placeholder="+51 987 654 321"
                        />
                      </div>

                      {/* Precio Landing */}
                      <div>
                        <label className="block text-xs text-gray-400 font-mono uppercase mb-2">Inversión Landing Page (S/. Soles)</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-2 text-gray-400 text-sm">S/.</span>
                          <input
                            type="number"
                            value={priceDevelopment}
                            onChange={(e) => setPriceDevelopment(Number(e.target.value))}
                            className="w-full bg-[#1F2937] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-voll-gold transition font-mono"
                            min="100"
                          />
                        </div>
                      </div>

                      {/* Precio Hosting / Dominio */}
                      <div>
                        <label className="block text-xs text-gray-400 font-mono uppercase mb-2">Costo Renovación Anual (S/. Soles)</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-2 text-gray-400 text-sm">S/.</span>
                          <input
                            type="number"
                            value={priceHosting}
                            onChange={(e) => setPriceHosting(Number(e.target.value))}
                            className="w-full bg-[#1F2937] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-voll-gold transition font-mono"
                            min="0"
                          />
                        </div>
                      </div>

                      {/* Plazo de entrega */}
                      <div>
                        <label className="block text-xs text-gray-400 font-mono uppercase mb-2">Plazo de Entrega (Días Hábiles)</label>
                        <input
                          type="number"
                          value={deliveryDays}
                          onChange={(e) => setDeliveryDays(Number(e.target.value))}
                          className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-voll-gold transition font-mono"
                          min="1"
                        />
                      </div>

                      {/* Tema Visual */}
                      <div>
                        <label className="block text-xs text-gray-400 font-mono uppercase mb-2">Tema Visual de las Diapositivas</label>
                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => {
                              setTheme('dark');
                              setPrimaryHex('#0B0F19');
                            }}
                            className={`flex-1 py-2 text-sm font-semibold rounded-lg border transition ${
                              theme === 'dark'
                                ? 'bg-voll-gold/10 border-voll-gold text-voll-gold'
                                : 'bg-transparent border-gray-700 text-gray-400 hover:text-white'
                            }`}
                          >
                            Midnight Dark
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setTheme('light');
                              setPrimaryHex('#1E293B');
                            }}
                            className={`flex-1 py-2 text-sm font-semibold rounded-lg border transition ${
                              theme === 'light'
                                ? 'bg-voll-gold/10 border-voll-gold text-voll-gold'
                                : 'bg-transparent border-gray-700 text-gray-400 hover:text-white'
                            }`}
                          >
                            Clean Light
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Advance Styles Collapsible */}
                  <div className="pt-4 border-t border-gray-800">
                    <h5 className="text-xs text-gray-400 font-mono uppercase mb-3">Colores Personalizados</h5>
                    <div className="flex gap-6">
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={primaryHex}
                          onChange={(e) => setPrimaryHex(e.target.value)}
                          className="w-8 h-8 rounded border border-gray-700 bg-transparent cursor-pointer"
                        />
                        <span className="text-xs text-gray-300 font-mono">Fondo: {primaryHex}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={accentHex}
                          onChange={(e) => setAccentHex(e.target.value)}
                          className="w-8 h-8 rounded border border-gray-700 bg-transparent cursor-pointer"
                        />
                        <span className="text-xs text-gray-300 font-mono">Acento: {accentHex}</span>
                      </div>
                    </div>
                  </div>

                  {/* Submission and Action */}
                  <div className="pt-6">
                    {needsAuth ? (
                      <div className="p-4 bg-voll-gold/5 border border-voll-gold/20 rounded-lg text-center">
                        <p className="text-xs text-gray-300 mb-3">
                          Para crear el archivo de Google Slides directamente en su cuenta, primero debe habilitar la integración.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={handleLogin}
                            disabled={isLoggingIn}
                            className="w-full sm:w-auto px-6 py-2.5 bg-voll-gold text-voll-black font-semibold rounded-lg hover:bg-voll-gold-light transition duration-300 text-sm flex items-center justify-center gap-2"
                          >
                            Vincular con Google
                          </button>
                          
                          <a
                            href={window.location.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-semibold rounded-lg transition duration-300 text-sm flex items-center justify-center gap-2"
                          >
                            <ExternalLink size={14} /> Abrir en pestaña nueva
                          </a>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="w-full py-3 bg-voll-gold text-voll-black font-bold rounded-lg hover:bg-voll-gold-light transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isGenerating ? (
                          <>
                            <div className="w-5 h-5 border-2 border-voll-black border-t-transparent rounded-full animate-spin"></div>
                            <span>Generando Presentación en Google Slides...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles size={18} />
                            <span>Crear Diapositivas de Propuesta Comercial</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </motion.div>
              ) : (
                /* Success Result Card */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8 space-y-6"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                    <Check size={32} />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">¡Presentación Creada con Éxito!</h3>
                    <p className="text-sm text-gray-400 max-w-lg mx-auto">
                      Se ha generado la propuesta comercial titulada: <br />
                      <span className="text-voll-gold font-mono text-xs">
                        {proposalType === 'klyp_voll' 
                          ? `Propuesta Comercial - Desarrollo y Soporte Landing - ${vollClientName}`
                          : `Propuesta Premium - Landing Page de Ingeniería - ${clientName}`}
                      </span><br />
                      directamente en su cuenta de Google Drive en formato de Google Slides.
                    </p>
                  </div>

                  {/* Primary Action */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <a
                      href={`https://docs.google.com/presentation/d/${generatedId}/edit`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition shadow-lg text-sm"
                    >
                      <Link size={16} />
                      Abrir Presentación de Google
                      <ArrowRight size={14} />
                    </a>
                    
                    <button
                      onClick={() => setGeneratedId(null)}
                      className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold rounded-lg transition text-sm"
                    >
                      Crear Otra Propuesta
                    </button>
                  </div>

                  {/* Checklist for success */}
                  <div className="bg-[#1F2937]/50 border border-gray-800 rounded-xl p-5 text-left max-w-lg mx-auto mt-6 space-y-3 text-xs text-gray-300">
                    <h5 className="font-bold text-white uppercase tracking-wider font-mono text-[10px] text-voll-gold">
                      💡 Recomendaciones para la venta
                    </h5>
                    {proposalType === 'klyp_voll' ? (
                      <ul className="space-y-2">
                        <li className="flex gap-2">
                          <Check size={14} className="text-voll-gold flex-shrink-0" />
                          <span><strong>Alineación Premium:</strong> La presentación se estructuró con la paleta de colores de la marca para causar un impacto de alta gama y branding corporativo desde el primer momento.</span>
                        </li>
                        <li className="flex gap-2">
                          <Check size={14} className="text-voll-gold flex-shrink-0" />
                          <span><strong>Precios Claros:</strong> El Setup Técnico de S/. {vollSetupPrice}, el Plan Esencial de S/. {vollEsencialPrice}/mes y el Plan Avanzado de S/. {vollAvanzadoPrice}/mes están listados en las diapositivas 3 y 4.</span>
                        </li>
                        <li className="flex gap-2">
                          <Check size={14} className="text-voll-gold flex-shrink-0" />
                          <span><strong>Mantenimiento continuo:</strong> Recalque al cliente que el Plan Avanzado de {vollAvanzadoHours} horas al mes amortiza las actualizaciones continuas de campañas de anuncios.</span>
                        </li>
                      </ul>
                    ) : (
                      <ul className="space-y-2">
                        <li className="flex gap-2">
                          <Check size={14} className="text-voll-gold flex-shrink-0" />
                          <span><strong>Agregue logotipos:</strong> Reemplace los marcadores de texto o inserte el logotipo de su cliente en la portada para darle un toque ultra-personalizado.</span>
                        </li>
                        <li className="flex gap-2">
                          <Check size={14} className="text-voll-gold flex-shrink-0" />
                          <span><strong>Verifique los precios:</strong> Los montos de S/. {priceDevelopment} para desarrollo y S/. {priceHosting} para renovación son modificables directamente en la diapositiva 6.</span>
                        </li>
                        <li className="flex gap-2">
                          <Check size={14} className="text-voll-gold flex-shrink-0" />
                          <span><strong>Soporte continuo:</strong> Enfatice al cliente el soporte posventa de 3 meses para disminuir su sensación de riesgo tecnológico.</span>
                        </li>
                      </ul>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Persuasive benefits of a Landing Page */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-5 space-y-2">
            <Smartphone size={24} className="text-voll-gold" />
            <h4 className="font-bold text-sm">Dispositivo Móvil Primero</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              El 85% de las búsquedas y visitas comerciales en el Perú ocurren en smartphones. Diseñar para móviles maximiza el retorno de la inversión publicitaria.
            </p>
          </div>
          <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-5 space-y-2">
            <ShieldCheck size={24} className="text-voll-gold" />
            <h4 className="font-bold text-sm">Soberanía de Dominio</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              El dominio propio a nombre del cliente garantiza la propiedad y seriedad del canal digital de su negocio, protegiendo su patrimonio tecnológico.
            </p>
          </div>
          <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-5 space-y-2">
            <Mail size={24} className="text-voll-gold" />
            <h4 className="font-bold text-sm">Correos Corporativos</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              El uso de correos con el dominio de la empresa en lugar de plataformas genéricas de email gratuito aumenta la credibilidad y tasa de respuesta comercial en un 40%.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
