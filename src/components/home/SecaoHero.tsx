import { m, useScroll, useTransform, animate, useMotionValueEvent } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, TrendingDown, DollarSign } from 'lucide-react';
import { useModalSolucoes } from '../../hooks/useModalSolucoes';
import { useModalEspecialista } from '../../hooks/useModalEspecialista';
import type { MotionValue } from 'framer-motion';
import type { ReactNode } from 'react';
import { AnimatedTitle } from '../ui/AnimatedTitle';
import { TypewriterBadge } from '../ui/TypewriterBadge';
import { FundoCodigoHero } from './FundoCodigoHero';

const words = [
  "Acreditamos", "que", "contabilidade", "é", "muito", "mais", "do", "que", "emitir", "guias.",
  "É", "trabalhar", "para", "que", "você", "possa", "crescer", "do", "jeito", "certo."
] as const;

const highlightWords = [] as const;

// Animated Number Component
type AnimatedNumberProps = {
  value: number;
  duration?: number;
  isOptimized: boolean;
  prefix?: string;
  suffix?: string;
};

const AnimatedNumber = ({ value, duration = 2, isOptimized, prefix = "", suffix = "" }: AnimatedNumberProps) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (!nodeRef.current) return;
    
    // Animate from 0 to value when optimized is toggled ON
    if (isOptimized) {
      const controls = animate(0, value, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (v) => {
          if (nodeRef.current) {
            // Format to 1 decimal place with comma
            nodeRef.current.textContent = `${prefix}${v.toFixed(1).replace('.', ',')}${suffix}`;
          }
        }
      });
      return controls.stop;
    } else {
      // Just set to value immediately if not animating
      nodeRef.current.textContent = `${prefix}${value.toFixed(1).replace('.', ',')}${suffix}`;
    }
  }, [value, duration, isOptimized, prefix, suffix]);

  return <span ref={nodeRef}>{`${prefix}${value.toFixed(1).replace('.', ',')}${suffix}`}</span>;
};



const SecaoHero = () => {
  const { openModal } = useModalSolucoes();
  const { openModal: openModalEspecialista } = useModalEspecialista();
  const [isOptimized, setIsOptimized] = useState(false);
  
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const isMobileOptimized = isOptimized && isMobile;

  // Hero Animation Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });

  const [isCurrentlyDark, setIsCurrentlyDark] = useState(false);

  // Sync initially or on toggle
  useEffect(() => {
    const shouldBeDark = isMobileOptimized && heroProgress.get() < 0.85;
    if (shouldBeDark !== isCurrentlyDark) {
      setIsCurrentlyDark(shouldBeDark);
      window.dispatchEvent(new CustomEvent('hero-dark-mode', { detail: shouldBeDark }));
    }
  }, [isMobileOptimized, heroProgress, isCurrentlyDark]);

  useMotionValueEvent(heroProgress, "change", (latest) => {
    const shouldBeDark = isMobileOptimized && latest < 0.85;
    if (shouldBeDark !== isCurrentlyDark) {
      setIsCurrentlyDark(shouldBeDark);
      window.dispatchEvent(new CustomEvent('hero-dark-mode', { detail: shouldBeDark }));
    }
  });

  useEffect(() => {
    return () => {
      window.dispatchEvent(new CustomEvent('hero-dark-mode', { detail: false }));
    };
  }, []);



  // Word Reveal Refs
  const wordRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: wordProgress } = useScroll({
    target: wordRef,
    offset: ["start end", "end end"]
  });

  // Main container entrance animation
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.9 } }
  };

  const renderToggle = (className: string) => (
    <div className={`relative inline-flex align-middle ${className}`}>
      {/* Glowing Aura (soft outer glow) */}
      {!isOptimized && (
        <m.div
          className="absolute inset-[0px] rounded-full pointer-events-none animated-glow-bg"
          style={{ filter: "blur(3px)", opacity: 0.85 }}
          animate={{ opacity: [0, 0.85, 0.85, 0] }}
          transition={{ 
            duration: 3.5, 
            ease: "easeInOut", 
            repeat: Infinity, 
            repeatDelay: 1.5, 
            times: [0, 0.15, 0.7, 1] 
          }}
        />
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOptimized(!isOptimized)}
        className={`relative z-10 inline-flex items-center w-[56px] h-8 sm:w-[64px] sm:h-[34px] rounded-full p-1 transition-colors duration-500 focus:outline-none ${isOptimized ? 'bg-primary-600 shadow-inner border border-transparent' : 'bg-white border border-surface-200 shadow-sm'}`}
        aria-label="Otimizar resultados"
      >

        <m.div 
          className={`relative w-6 h-6 sm:w-[26px] sm:h-[26px] flex items-center justify-center z-10 rounded-full transition-all duration-300 ${isOptimized ? 'bg-primary-500 shadow-md' : 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-surface-200'}`}
          animate={{ x: isOptimized ? (typeof window !== 'undefined' && window.innerWidth < 640 ? 24 : 30) : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <img 
            src={isOptimized ? "/logo/simbolo_branca.png" : "/logo/simbolo.png"} 
            alt="Farmacon Toggle" 
            className={`w-full h-full object-contain ${isOptimized ? 'p-[3px]' : 'p-[3px]'}`}
            fetchPriority="high"
          />
        </m.div>
      </button>
    </div>
  );

  return (
    <>
      {/* Container 1: Hero Sticky + Spacer */}
      <div ref={heroRef} className="relative w-full z-0">
        <section className={`sticky top-0 w-full min-h-[100dvh] h-[100dvh] pt-[80px] lg:pt-[30px] flex flex-col justify-center overflow-hidden z-0 transition-colors duration-700 ${isMobileOptimized ? 'bg-transparent' : 'bg-white'}`}>
          {/* Procedural Code Background */}
          <FundoCodigoHero progress={heroProgress} isOptimized={isMobileOptimized} />
          
          <m.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-5 md:px-10 xl:px-4 relative z-10 h-full flex flex-col justify-center"
        >
          
          <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8 -mt-[12vh] lg:mt-0">
            
            {/* Desktop Left Card: Recuperado */}
            <div className="hidden lg:flex order-1 w-1/4 justify-end">
              <m.div
                variants={itemVariants}
                className="z-30 relative"
              >
                <m.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ willChange: "transform" }}
                >
                  <div className={`w-[230px] xl:w-[250px] p-5 rounded-3xl border transition-all duration-700 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${isOptimized ? 'bg-white border-primary-200 shadow-primary-500/10' : 'bg-white border-surface-100'}`}>
                  <div className="flex items-start justify-between mb-1">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary-50 text-primary-600">
                      <DollarSign size={16} strokeWidth={2.5} />
                    </div>
                    <div className={`px-2.5 py-1 rounded-full text-[8.5px] font-bold uppercase tracking-widest transition-all duration-700 ${isOptimized ? 'bg-primary-50 text-primary-600' : 'bg-surface-100 text-surface-400 grayscale'}`}>
                      Créditos Recuperados
                    </div>
                  </div>
                  
                  <div className="relative w-full flex flex-col items-center mt-1">
                    <div className="relative w-[130px] h-[130px] flex items-center justify-center">
                      <svg width="130" height="130" viewBox="0 0 130 130" className="transform -rotate-90 absolute inset-0">
                        <defs>
                          <pattern id="stripes" width="5" height="5" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                            <line x1="0" y1="0" x2="0" y2="5" stroke="#CBD5E1" strokeWidth="1.5" />
                          </pattern>
                        </defs>
                        
                        {/* Base striped circle */}
                        <circle 
                          cx="65" cy="65" r="52" 
                          fill="none" 
                          stroke={isOptimized ? "url(#stripes)" : "#F1F5F9"} 
                          strokeWidth="8" 
                        />
                        
                        {/* Secondary segment (e.g. 85%) */}
                        <m.circle 
                          cx="65" cy="65" r="52" 
                          fill="none" 
                          stroke="#DBEAFE" 
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="326.7"
                          initial={{ strokeDashoffset: 326.7 }}
                          animate={{ strokeDashoffset: isOptimized ? 326.7 * (1 - 0.85) : 326.7 }}
                          transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
                        />

                        {/* Primary segment (e.g. 60%) */}
                        <m.circle 
                          cx="65" cy="65" r="52" 
                          fill="none" 
                          stroke="#2563EB" 
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="326.7"
                          initial={{ strokeDashoffset: 326.7 }}
                          animate={{ strokeDashoffset: isOptimized ? 326.7 * (1 - 0.60) : 326.7 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      </svg>
                      
                      {/* Text inside the doughnut */}
                      <div className="flex flex-row items-center justify-center relative z-10 gap-1.5">
                        <span className="text-base xl:text-lg font-bold text-dark-900">R$</span>
                        <h3 className="text-3xl xl:text-[34px] font-bold text-dark-900 tracking-tight leading-none">
                          <AnimatedNumber value={7.5} duration={1.5} isOptimized={isOptimized} />
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-col items-center mt-3 text-center px-2">
                      <span className="text-[13px] font-bold text-dark-900 tracking-wide">MILHÕES DE REAIS</span>
                      <p className="text-[10px] xl:text-[11px] text-surface-500 font-medium leading-relaxed mt-0.5">
                        recuperados em tributos indevidos.
                      </p>
                    </div>
                  </div>
                    </div>

                </m.div>
              </m.div>
            </div>

            {/* Center Main Content */}
            <div className="order-1 lg:order-2 w-full lg:max-w-[700px] flex flex-col items-center text-center">
              
              {/* Badge */}
              <m.div
                variants={badgeVariants}
                className="mb-6"
              >
                <TypewriterBadge 
                  text="A MAIOR CONTABILIDADE EXCLUSIVA PARA FARMÁCIAS"
                  icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isMobileOptimized ? 'text-white' : 'text-primary-600'}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>}
                  autoStart
                  baseDelay={20}
                  inverted={isMobileOptimized}
                />
              </m.div>

              {/* Title */}
              <h1 className={`text-[2rem] md:text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight leading-[1.1] mb-6 transition-colors duration-700 ${isMobileOptimized ? 'text-white' : 'text-dark-900'}`}>
                <AnimatedTitle lines={[
                  <span key="precisa">
                    Sua farmácia <span className="whitespace-nowrap">precisa{renderToggle("lg:hidden ml-2")}</span>
                  </span>,
                  <span key="margem">
                    de <span className={`transition-colors duration-700 ease-out ${isOptimized ? (isMobileOptimized ? 'text-primary-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'text-primary-600') : 'text-dark-900'}`}>mais margem</span>, 
                    {renderToggle("hidden lg:inline-flex ml-3 sm:ml-4")}
                  </span>,
                  "menos impostos e",
                  <span key="prev" className={`transition-all duration-700 ease-out ${isMobileOptimized ? 'text-white' : 'text-dark-900'}`}>previsibilidade real.</span>
                ]} delay={0.2} />
              </h1>

              {/* CTAs */}
              <m.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-10 w-full sm:w-auto"
              >
                <button
                  onClick={() => openModal()}
                  className={`w-full sm:w-auto group flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-[15px] transition-all ${isMobileOptimized ? 'bg-primary-500 text-white hover:bg-primary-400 shadow-[0_8px_25px_rgba(59,130,246,0.4)]' : 'shadow-[0_8px_20px_rgb(59,130,246,0.25)] bg-primary-600 text-white hover:bg-primary-700 hover:shadow-[0_8px_25px_rgb(59,130,246,0.35)]'}`}
                >
                  Solicitar um diagnóstico
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => openModalEspecialista()} className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 border-2 rounded-full font-semibold text-[15px] transition-all cursor-pointer ${isMobileOptimized ? 'bg-transparent border-surface-700 text-white hover:bg-surface-800' : 'bg-white border-surface-200 text-dark-900 hover:bg-surface-50 shadow-sm'}`}>
                  Falar com especialista
                </button>
              </m.div>

              {/* NumerosAutoridade Proof */}
              <m.div
                variants={itemVariants}
                className="flex items-center gap-3 w-full sm:w-auto justify-start sm:justify-center pl-2 sm:pl-0"
              >
                <div className="flex -space-x-2.5">
                  {['small-fotos-100+1.webp', 'small-fotos-100+2.webp', 'small-fotos-100+3.webp', 'small-fotos-100+4.webp'].map((img, i) => (
                    <div key={i} className={`w-9 h-9 rounded-full border-2 bg-surface-100 overflow-hidden shadow-sm transition-all duration-700 ${isOptimized ? 'grayscale-0 sm:grayscale-0' : 'grayscale-0 sm:grayscale'} ${isMobileOptimized ? 'border-[#0B1528]' : 'border-white'}`}>
                      <img src={`/small-fotos-100/${img}`} alt="Cliente Farmacon" className="w-full h-full object-cover" fetchPriority="high" decoding="async" />
                    </div>
                  ))}
                  <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-[10px] font-bold shadow-sm z-10 transition-colors duration-700 ${isMobileOptimized ? 'bg-primary-600 text-white border-[#0B1528]' : 'bg-primary-100 text-primary-700 border-white'}`}>
                    +6K
                  </div>
                </div>
                <p className={`text-[13px] leading-tight font-medium transition-colors duration-700 text-left ${isMobileOptimized ? 'text-white' : 'text-surface-500'}`}>
                  6.200+ empresários<br className="sm:hidden" /> atendidos
                </p>
              </m.div>

            </div>

            {/* Desktop Right Card: Tributário */}
            <div className="hidden lg:flex order-3 w-1/4 justify-start">
              <m.div
                variants={itemVariants}
                className="z-20 relative"
              >
                <m.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  style={{ willChange: "transform" }}
                >
                  <div className={`w-[230px] xl:w-[250px] p-5 rounded-3xl border transition-all duration-700 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${isOptimized ? 'bg-white border-green-200 shadow-green-500/10' : 'bg-white border-surface-100'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-50 text-green-600">
                      <TrendingDown size={16} strokeWidth={2.5} />
                    </div>
                    <div className={`px-2.5 py-1 rounded-full text-[8.5px] font-bold uppercase tracking-widest transition-all duration-700 ${isOptimized ? 'bg-green-50 text-green-700' : 'bg-surface-100 text-surface-400 grayscale'}`}>
                      Média de redução
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl xl:text-3xl font-bold text-dark-900 tracking-tight flex items-baseline">
                      <AnimatedNumber value={23.8} duration={2} isOptimized={isOptimized} suffix="%" />
                    </h3>
                    <p className="text-[11px] text-surface-500 font-medium leading-relaxed">
                      da carga tributária reduzida.
                    </p>
                  </div>

                  {/* Animated mini-chart */}
                  <div className="mt-4 flex items-end gap-1 h-6">
                    {[90, 75, 80, 55, 45, 30].map((h, i) => (
                      <m.div 
                        key={i} 
                        className={`w-full rounded-[1px] transition-colors duration-500 ${isOptimized ? 'bg-green-500' : 'bg-surface-200'}`}
                        initial={{ height: "20%" }}
                        animate={{ height: isOptimized ? `${h}%` : "20%" }}
                        transition={{ duration: 1, delay: i * 0.1, type: "spring" }}
                      />
                    ))}
                  </div>
                  </div>
                </m.div>
              </m.div>
            </div>

          </div>

          {/* Mobile Cards Layout (Hidden on Desktop) */}
          <div className="hidden flex-row items-stretch justify-center gap-2 sm:gap-4 w-full mt-6 sm:mt-12 z-20">
             <m.div
                variants={itemVariants}
                className={`flex-1 max-w-[280px] p-2.5 sm:p-5 rounded-[16px] sm:rounded-3xl border transition-all duration-700 shadow-sm flex flex-col justify-between ${isOptimized ? 'bg-white border-primary-200' : 'bg-white border-surface-100'}`}
              >
                 <div>
                   <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-3 mb-1 sm:mb-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-primary-50 text-primary-600 shrink-0">
                        <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={2.5} />
                      </div>
                      <div className="w-full overflow-hidden">
                        <h3 className="text-[14px] sm:text-xl font-bold text-dark-900 tracking-tight leading-none whitespace-nowrap">
                          <AnimatedNumber value={7.5} duration={1.5} isOptimized={isOptimized} prefix="R$ " /> 
                          <span className="text-[9px] sm:text-sm text-surface-500 ml-0.5">milhões</span>
                        </h3>
                      </div>
                    </div>
                    <p className="text-[9px] sm:text-[11px] text-surface-500 font-medium leading-snug">
                      créditos recuperados.
                    </p>
                 </div>
                  
                 {/* Animated mini progress line for card 1 mobile */}
                 <div className="mt-2 w-full h-1 bg-surface-100 rounded-full overflow-hidden">
                   <m.div 
                     className={`h-full rounded-full transition-colors duration-500 ${isOptimized ? 'bg-primary-500' : 'bg-surface-200'}`}
                     initial={{ width: "15%" }}
                     animate={{ width: isOptimized ? "85%" : "15%" }}
                     transition={{ duration: 1.5, ease: "easeOut" }}
                   />
                 </div>
              </m.div>

              <m.div
                variants={itemVariants}
                className={`flex-1 max-w-[280px] p-2.5 sm:p-5 rounded-[16px] sm:rounded-3xl border transition-all duration-700 shadow-sm flex flex-col justify-between ${isOptimized ? 'bg-white border-green-200' : 'bg-white border-surface-100'}`}
              >
                 <div>
                   <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-3 mb-1 sm:mb-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-green-50 text-green-600 shrink-0">
                        <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h3 className="text-[14px] sm:text-xl font-bold text-dark-900 tracking-tight leading-none mt-1 sm:mt-0">
                          <AnimatedNumber value={23.8} duration={2} isOptimized={isOptimized} suffix="%" />
                        </h3>
                      </div>
                    </div>
                    <p className="text-[9px] sm:text-[11px] text-surface-500 font-medium leading-snug">
                      redução tributária média.
                    </p>
                 </div>

                 {/* Animated mini-chart for card 2 mobile */}
                 <div className="mt-2 flex items-end gap-0.5 h-3 w-full">
                   {[90, 75, 80, 55, 45, 30].map((h, i) => (
                     <m.div 
                       key={i} 
                       className={`w-full rounded-[1px] transition-colors duration-500 ${isOptimized ? 'bg-green-500' : 'bg-surface-200'}`}
                       initial={{ height: "20%" }}
                       animate={{ height: isOptimized ? `${h}%` : "20%" }}
                       transition={{ duration: 1, delay: i * 0.1, type: "spring" }}
                     />
                   ))}
                 </div>
              </m.div>
          </div>

        </m.div>

      </section>

      {/* Spacers for Hero: 150vh for animation, 100vh for overlap */}
      <div className="h-[60vh] lg:h-[150vh] w-full pointer-events-none" />
      <div className="h-screen w-full pointer-events-none" />
    </div>

    {/* Container 2: Word Reveal Sticky + Spacer */}
    <div ref={wordRef} className="relative w-full z-10 -mt-[100vh]">
      <section className="sticky top-0 h-screen w-full flex flex-col items-center justify-center bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
        <div className="container mx-auto px-5 md:px-10 xl:px-16 relative z-10">
          <WordRevealBlock progress={wordProgress} />
        </div>
      </section>
      
      {/* Spacers for Word Reveal: 150vh for animation/pause, 100vh for overlap */}
      <div className="h-[60vh] lg:h-[150vh] w-full pointer-events-none" />
      <div className="h-screen w-full pointer-events-none" />
    </div>
  </>
  );
};

// Word reveal block that reads the passed progress
const WordRevealBlock = ({ progress }: { progress: MotionValue<number> }) => {

  const allWords = [...words, ...highlightWords];

  return (
    <p className="flex flex-wrap justify-center text-center text-[clamp(1.25rem,3vw,2.2rem)] md:text-4xl xl:text-5xl font-normal leading-[1.3] gap-x-[0.25em] gap-y-[0.1em] max-w-5xl mx-auto">
      {allWords.map((word, i) => {
        const isHighlight = i >= allWords.length - 4;
        const total = allWords.length;
        // Start when the section is almost fully pinned (progress ~0.18)
        // Finish shortly before Section 3 starts sliding up (progress ~0.53)
        // Pause from 0.53 to 0.55. Section 3 slides up at 0.55.
        const animStart = 0.18;
        const animDuration = 0.35;
        const start = animStart + (i / total) * (animDuration * 0.8);
        const end = start + (animDuration * 0.2);
        
        // Define after which word index to force a line break on mobile
        const breakAfter = [3, 9, 15].includes(i);

        return [
          <ScrollWord
            key={`word-${i}`}
            progress={progress}
            range={[start, end]}
            isHighlight={isHighlight}
          >
            {word}
          </ScrollWord>,
          breakAfter ? <span key={`break-${i}`} className="basis-full h-0 sm:hidden" /> : null
        ];
      })}
    </p>
  );
};

type ScrollWordProps = {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  isHighlight: boolean;
};

const ScrollWord = ({ children, progress, range, isHighlight }: ScrollWordProps) => {
  // Gray to blue transition
  const color = useTransform(progress, range, ["#E2E8F0", "#2563EB"]);
  
  return (
    <m.span 
      style={{ color }} 
      className={`inline-block transition-none ${isHighlight ? 'font-bold tracking-tight' : 'tracking-tight'}`}
    >
      {children}
    </m.span>
  );
};

export default SecaoHero;

