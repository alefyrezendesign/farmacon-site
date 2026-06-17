import { m, useScroll  } from 'framer-motion';
import { useState, useRef } from 'react';
import { FundoCodigoHero } from '../home/FundoCodigoHero';
import { useModalEspecialista } from '../../hooks/useModalEspecialista';
import { TypewriterBadge } from '../ui/TypewriterBadge';

const especialistas = [
  { id: 1, bg: 'bg-[#FFB5C6]', img: '/background/sobre-bg/1.png' },
  { id: 2, bg: 'bg-[#B4B6FF]', img: '/background/sobre-bg/2.png' },
  { id: 3, bg: 'bg-[#B6EDFF]', img: '/background/sobre-bg/3.png' },
  { id: 4, bg: 'bg-[#BEFFD3]', img: '/background/sobre-bg/4.png' },
];

const SobreHero = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { openModal } = useModalEspecialista();

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.8, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } }
  };

  return (
    <section ref={heroRef} className="relative w-full h-[100svh] lg:h-screen flex flex-col justify-start pt-32 pb-10 lg:pt-0 lg:pb-0 lg:justify-center bg-transparent overflow-hidden z-0">
      
      {/* Procedural Code Background */}
      <FundoCodigoHero progress={heroProgress} inverted={true} />

      <m.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full px-5 md:px-10 lg:px-[132px] 2xl:px-[179px] max-w-[1920px] mx-auto"
      >
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-[100px] xl:gap-[130px] 2xl:gap-[200px] w-full">
          
          {/* Left Content */}
          <div className="w-full lg:w-auto flex flex-col items-start">
            
            {/* Badge */}
            <m.div
              variants={badgeVariants}
              className="mb-6"
            >
              <TypewriterBadge 
                text="SOBRE NÓS"
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>}
                inverted
                autoStart
              />
            </m.div>

            {/* Title */}
            <m.h1 
              variants={itemVariants}
              className="text-[2.2rem] md:text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight text-white leading-[1.1] mb-8 lg:w-auto text-left lg:whitespace-nowrap"
            >
              {/* Desktop Title */}
              <span className="hidden md:inline-block">
                Há mais de uma década <br />
                transformando histórias, <br />
                pessoas e negócios.
              </span>
              
              {/* Mobile Title */}
              <span className="md:hidden">
                Há mais de <br />
                uma década <br />
                transformando <br />
                histórias, pessoas <br />
                e negócios.
              </span>
            </m.h1>

            <m.div variants={itemVariants} className="w-full sm:w-auto">
              <button 
                onClick={() => openModal()} 
                className="w-full group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-[15px] transition-all shadow-[0_8px_20px_rgba(59,130,246,0.25)] bg-blue-500 text-white hover:bg-blue-400 hover:shadow-[0_8px_25px_rgba(59,130,246,0.35)] cursor-pointer"
              >
                Falar com especialista
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right group-hover:translate-x-1 transition-transform" aria-hidden="true">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </m.div>

          </div>

          {/* Right Content - Specialists & Cards */}
          <div className="w-full lg:w-auto flex flex-col lg:items-start">
            
            <div className="flex flex-col items-start w-full lg:w-[410px]">
              
              <m.div 
                variants={itemVariants}
                className="flex items-center gap-[17px] mb-8 lg:mb-[20px] w-full"
              >
                 <div className="w-[54px] h-[54px] rounded-full bg-blue-500/20 flex items-center justify-center text-white font-[800] text-[14px] shrink-0 border border-blue-400/30">
                    +150
                 </div>
                 <p className="text-[14px] font-[400] text-white leading-snug w-[321px]">
                   Centenas de Especialistas que <br />
                   se dedicam aos seus resultados
                 </p>
              </m.div>

              {/* Overlapping Cards Container */}
              <m.div 
                variants={itemVariants}
                className="relative flex items-center h-[150px] lg:h-[200px] w-full"
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {especialistas.map((esp, i) => {
                  const isHovered = hoveredIndex === i;
                  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
                  const baseOffset = i * (isMobile ? 70 : 92); // px from left
                  
                  // Física de estado contínuo ultra-suave (Apple/Linear style)
                  let currentX = baseOffset;
                  let currentY = 0;
                  let currentScale = 1;
                  let currentZIndex = i; // Ordem natural
                  let currentRotate = 0;

                  if (hoveredIndex !== null) {
                    if (isHovered) {
                      // Card ativo: sobe suavemente
                      currentZIndex = 50;
                      currentY = -16;
                      currentScale = 1.05;
                      currentRotate = 0;
                    } else {
                      // Cards inativos: abrem espaço e abaixam levemente de forma orgânica
                      if (i < hoveredIndex) {
                        currentX = baseOffset - 25;
                        currentRotate = -5;
                        currentY = 5;
                        currentZIndex = i;
                      } else {
                        currentX = baseOffset + 25;
                        currentRotate = 5;
                        currentY = 5;
                        currentZIndex = 10 - i;
                      }
                    }
                  }

                  return (
                    <m.div
                      key={esp.id}
                      onMouseEnter={() => {
                        if (typeof window !== 'undefined' && window.innerWidth >= 1024) setHoveredIndex(i);
                      }}
                      onTouchStart={() => {
                        if (typeof window !== 'undefined' && window.innerWidth < 1024) setHoveredIndex(i);
                      }}
                      onTouchEnd={() => {
                        if (typeof window !== 'undefined' && window.innerWidth < 1024) setHoveredIndex(null);
                      }}
                      onTouchCancel={() => {
                        if (typeof window !== 'undefined' && window.innerWidth < 1024) setHoveredIndex(null);
                      }}
                      className={`absolute rounded-3xl w-[105px] lg:w-[133px] h-[150px] lg:h-[200px] bg-slate-200 cursor-pointer overflow-hidden left-0 origin-bottom`}
                      initial={{ x: 0 }}
                      animate={{
                        x: currentX,
                        y: currentY,
                        scale: currentScale,
                        rotate: currentRotate,
                        zIndex: currentZIndex,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30, // Damping alto = sem oscilação elástica feia (movimento maduro)
                        mass: 0.8,
                        // O truque mestre da fluidez: 
                        // Sobe de z-index instantaneamente (delay 0), mas demora 0.15s para perder o z-index quando o mouse sai.
                        // Isso faz ele abaixar "por cima" dos outros sem NUNCA dar flicker de camada.
                        zIndex: { delay: isHovered ? 0 : 0.15 } 
                      }}
                    >
                       <div className="w-full h-full relative">
                         {/* Zoom interno orgânico no hover */}
                         <img 
                           src={esp.img} 
                           alt="Especialista" 
                           className={`w-full h-full object-cover transition-transform duration-700 ease-out ${isHovered ? 'scale-110' : 'scale-100'}`} 
                         />
                       </div>
                    </m.div>
                  );
                })}
              </m.div>
            </div>

          </div>
        </div>
      </m.div>
    </section>
  );
};

export default SobreHero;

