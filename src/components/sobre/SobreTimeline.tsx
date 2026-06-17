import { useRef, useState, useEffect } from 'react';
import { m, useScroll, useTransform, useMotionValueEvent, MotionValue, useSpring  } from 'framer-motion';

const timelineEvents = [
  {
    year: "2013",
    title: "Fundação",
    description: "O início de um projeto focado em resolver as dores reais do mercado farmacêutico."
  },
  {
    year: "2016",
    title: "Expansão nacional",
    description: "Alcançamos novos estados, levando nossa metodologia de gestão a mais de 500 farmácias."
  },
  {
    year: "2019",
    title: "Ecossistema RX",
    description: "Nascimento da holding Farmacon RX, integrando tecnologia, contabilidade e consultoria."
  },
  {
    year: "2021",
    title: "Foco no digital",
    description: "Lançamento da plataforma proprietária para acompanhamento de resultados em tempo real."
  },
  {
    year: "2024",
    title: "Consolidação",
    description: "Marco de 2000 clientes ativos e reconhecimento como principal player do setor."
  },
  {
    year: "2025",
    title: "Inovação IA",
    description: "Implementação de inteligência artificial para diagnósticos tributários automáticos."
  },
  {
    year: "2026",
    title: "O Futuro",
    description: "Expansão para novos mercados da saúde e lançamento do novo hub de inovação."
  }
];

const TimelineItem = ({ 
  event, 
  index, 
  progress,
  trackGeometry,
  isDesktop
}: { 
  event: any, 
  index: number, 
  progress: MotionValue<number>,
  trackGeometry: { initialWidth: number, totalWidth: number },
  isDesktop: boolean
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [threshold, setThreshold] = useState(1);
  const [isActive, setIsActive] = useState(index === 0);

  useEffect(() => {
    const calculateThreshold = () => {
      if (!itemRef.current) return;
      
      if (index === 0) {
        setThreshold(0);
        return;
      }
      
      if (isDesktop) {
        if (trackGeometry.totalWidth <= 1) return;
        const itemX = itemRef.current.offsetLeft;
        const dotCenterAbsolute = itemX + 8;
        const distanceToCover = dotCenterAbsolute - 15 - trackGeometry.initialWidth;
        const expandableWidth = trackGeometry.totalWidth - trackGeometry.initialWidth;
        
        if (expandableWidth > 0) {
          setThreshold(distanceToCover / expandableWidth);
        }
      } else {
        const container = itemRef.current.offsetParent as HTMLElement;
        if (!container) return;
        // On mobile, the scroll container is the vertical div.
        // Measure Y position
        const itemY = itemRef.current.offsetTop;
        const dotCenterAbsolute = itemY + 14; // bolinha is near top
        const expandableHeight = container.scrollHeight;
        if (expandableHeight > 0) {
          setThreshold((dotCenterAbsolute - 15) / expandableHeight);
        }
      }
    };

    calculateThreshold();
    const t1 = setTimeout(calculateThreshold, 100);

    const resizeObserver = new ResizeObserver(calculateThreshold);
    const container = itemRef.current?.offsetParent;
    if (container) {
      resizeObserver.observe(container);
    }

    return () => {
      clearTimeout(t1);
      resizeObserver.disconnect();
    };
  }, [trackGeometry, index, isDesktop]);

  useMotionValueEvent(progress, "change", (latest: number) => {
    if (threshold === 1 && index !== 0) return;
    const currentlyActive = latest >= threshold;
    if (currentlyActive !== isActive) {
      setIsActive(currentlyActive);
    }
  });

  const isTop = index % 2 === 0;

  if (!isDesktop) {
    return (
      <m.div 
        ref={itemRef}
        className="timeline-item-wrapper flex gap-4 relative pl-8 pb-10 last:pb-0"
      >
        {/* A linha vertical cinza será desenhada globalmente no container pai, 
            removendo a necessidade de cada item desenhar a sua. 
            (Iremos adicionar isso no SobreTimeline.tsx) */}
            
        {/* Bolinha */}
        <div className="absolute top-[6px] left-[-8px] w-4 h-4 flex items-center justify-center z-10">
          <div 
            className={`w-3.5 h-3.5 rounded-full border-[2.5px] bg-white transition-colors duration-200 ${isActive ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`} 
          />
        </div>
        
        <div className="flex flex-col w-full">
          <span className={`text-2xl font-bold tracking-tighter mb-1 leading-none transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-slate-300'}`}>
            {event.year}
          </span>
          <h3 className="text-lg font-semibold text-slate-900 tracking-tight mb-2">{event.title}</h3>
          <m.div
            initial={false}
            animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-slate-500 leading-relaxed font-light pb-2">{event.description}</p>
          </m.div>
        </div>
      </m.div>
    );
  }

  return (
    <div ref={itemRef} className="timeline-item-wrapper w-[280px] md:w-[320px] lg:w-[380px] flex-shrink-0 flex flex-col relative h-full">
      {/* Bolinha cravada matematicamente na linha central */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 flex items-center justify-center z-10 w-4 h-4">
        <div 
          className={`w-3.5 h-3.5 rounded-full border-[2.5px] bg-white transition-colors duration-75 ${isActive ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`} 
        />
      </div>

      {/* Top half */}
      <div className={`flex-1 flex flex-col justify-end pb-8 pr-8 ${isTop ? '' : 'invisible'}`}>
        <div className="flex flex-col justify-end">
          <h3 className="text-xl md:text-2xl font-semibold text-slate-900 tracking-tight">
            {event.title}
          </h3>
          <m.div
            initial={false}
            animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-2">
              <p className="text-sm text-slate-500 leading-relaxed font-light">
                {event.description}
              </p>
            </div>
          </m.div>
        </div>
        <div className="mt-3">
           <span className={`text-4xl md:text-5xl font-bold tracking-tighter transition-colors duration-75 ${isActive ? 'text-blue-600' : 'text-slate-200'}`}>
             {event.year}
           </span>
        </div>
      </div>

      {/* Bottom half */}
      <div className={`flex-1 flex flex-col justify-start pt-8 pr-8 ${!isTop ? '' : 'invisible'}`}>
        <div className="mb-3">
           <span className={`text-4xl md:text-5xl font-bold tracking-tighter transition-colors duration-75 ${isActive ? 'text-blue-600' : 'text-slate-200'}`}>
             {event.year}
           </span>
        </div>
        <div className="flex flex-col justify-start">
          <h3 className="text-xl md:text-2xl font-semibold text-slate-900 tracking-tight">
            {event.title}
          </h3>
          <m.div
            initial={false}
            animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-2">
              <p className="text-sm text-slate-500 leading-relaxed font-light">
                {event.description}
              </p>
            </div>
          </m.div>
        </div>
      </div>
    </div>
  );
};

const SobreTimeline = () => {
  const targetRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [sectionHeight, setSectionHeight] = useState("auto"); 
  const [trackGeometry, setTrackGeometry] = useState({ initialWidth: 0, totalWidth: 1 });
  const [isDesktop, setIsDesktop] = useState(true);
  const [mobileLineHeight, setMobileLineHeight] = useState(0);

  useEffect(() => {
    const updateLayout = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);

      if (desktop && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const totalWidth = container.scrollWidth;
        const viewportWidth = window.innerWidth;
        const range = Math.max(0, totalWidth - viewportWidth);
        setScrollRange(-range);
        
        // Mantém a proporção do scroll fluida
        setSectionHeight(`calc(100vh + ${range * 1.5}px)`);

        // Extrai as coordenadas reais dos itens
        const items = container.querySelectorAll('.timeline-item-wrapper');
        if (items.length > 0) {
          const firstItem = items[0] as HTMLElement;
          const initialWidth = firstItem.offsetLeft + 8; 
          
          setTrackGeometry({
            initialWidth,
            totalWidth
          });
        }
      } else if (!desktop && scrollContainerRef.current) {
        setSectionHeight("auto");
        const items = scrollContainerRef.current.querySelectorAll('.timeline-item-wrapper');
        if (items.length > 0) {
          const lastItem = items[items.length - 1] as HTMLElement;
          setMobileLineHeight(lastItem.offsetTop);
        }
      }
    };

    updateLayout();
    const timeout = setTimeout(updateLayout, 200); 

    const resizeObserver = new ResizeObserver(updateLayout);
    if (scrollContainerRef.current) {
      resizeObserver.observe(scrollContainerRef.current);
    }
    window.addEventListener('resize', updateLayout);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', updateLayout);
      resizeObserver.disconnect();
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // O spring garante que a linha azul continue animando/preenchendo suavemente 
  // mesmo após o scroll ter fisicamente destravado a seção
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, scrollRange]);
  const scaleX = useTransform(smoothProgress, [0, 1], [0, 1]);

  const { scrollYProgress: mobileProgressRaw } = useScroll({
    target: targetRef,
    offset: ["start 60%", "end 60%"]
  });
  const smoothMobileProgress = useSpring(mobileProgressRaw, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001
  });

  return (
    <section 
      ref={targetRef}
      id="timeline" 
      className="relative bg-white overflow-clip"
      style={{ height: sectionHeight }}
    >
      <div className="relative lg:sticky top-0 h-auto lg:h-screen flex items-center overflow-hidden pt-40 pb-16 lg:pt-0 lg:pb-0 px-4 md:px-10 lg:px-0">
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-[length:100%_100%] bg-no-repeat z-0"
          style={{ backgroundImage: "url('/background/sobre-bg/bg-3-partes_01.jpg')" }}
        />


        <m.div 
          ref={scrollContainerRef}
          style={isDesktop ? { x } : {}} 
          className="flex flex-col lg:flex-row items-start lg:items-stretch w-full lg:w-max relative z-10 h-auto lg:h-[60vh] lg:mt-[15vh] max-w-lg mx-auto lg:max-w-none ml-6 md:ml-auto"
        >
          {/* Linhas animadas: Desktop (horizontal) vs Mobile (vertical) */}
          {isDesktop ? (
            <>
              {/* Base Track (Light Gray) - Horizontal */}
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200 -translate-y-1/2 z-0" />
              
              {/* Active Track Base (Azul) - Horizontal */}
              <div 
                className="absolute top-1/2 left-0 h-[2px] bg-blue-600 -translate-y-1/2 z-[5]" 
                style={{ width: trackGeometry.initialWidth ? `${trackGeometry.initialWidth}px` : 0 }}
              />

              {/* Active Track Extension (Azul) - Horizontal */}
              <m.div 
                className="absolute top-1/2 h-[2px] bg-blue-600 -translate-y-1/2 z-[5] origin-left"
                style={{ 
                  left: trackGeometry.initialWidth ? `${trackGeometry.initialWidth}px` : 0,
                  width: trackGeometry.totalWidth > 1 ? `${trackGeometry.totalWidth - trackGeometry.initialWidth}px` : 0,
                  scaleX 
                }}
              />

              {/* Spacer Inicial Alinhado */}
              <div className="w-[20px] md:w-[40px] lg:w-[132px] 2xl:w-[179px] min-[1920px]:w-[calc(50vw-960px+179px)] flex-shrink-0 relative h-full" />
            </>
          ) : (
            <>
              {/* Base Track (Light Gray) - Vertical */}
              <div 
                className="absolute left-[-1px] w-[2px] bg-slate-200 z-0" 
                style={{ top: '14px', height: `${mobileLineHeight}px` }}
              />
              
              {/* Active Track (Azul) - Vertical */}
              <m.div 
                className="absolute left-[-1px] w-[2px] bg-blue-600 z-[5] origin-top"
                style={{ 
                  top: '14px', 
                  height: `${mobileLineHeight}px`,
                  scaleY: smoothMobileProgress 
                }}
              />
            </>
          )}

          {/* Timeline Items */}
          {timelineEvents.map((event, index) => (
            <TimelineItem 
              key={index}
              event={event}
              index={index}
              progress={isDesktop ? smoothProgress : smoothMobileProgress}
              trackGeometry={trackGeometry}
              isDesktop={isDesktop}
            />
          ))}

          {isDesktop && (
            /* Spacer Final Longo: O "1 scroll extra" exato pedido. Cerca de 1 a 2 ticks do mouse. */
            <div className="flex-shrink-0 relative w-[10vw] md:w-[12vw]" />
          )}
        </m.div>
      </div>
    </section>
  );
};

export default SobreTimeline;
