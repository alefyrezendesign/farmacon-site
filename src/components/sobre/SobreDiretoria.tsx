import { useState, useEffect } from 'react';
import { m, AnimatePresence  } from 'framer-motion';
import { Users } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const directors = [
  {
    id: 1,
    name: "Marcus Cordeiro",
    role: "CEO Farmacon",
    quote: "A inovação contábil não é sobre números, é sobre prever o futuro do varejo farmacêutico e agir agora.",
    image: "/diretoria/Marcus Cordeiro - CEO Farmacon.webp",
    thumb: "/diretoria/Marcus Cordeiro - CEO Farmacon.webp",
    social: "LinkedIn"
  },
  {
    id: 2,
    name: "Sérgio Vianna",
    role: "CFO Farmacon",
    quote: "Nossa inteligência financeira é desenhada para blindar sua margem de lucro em um mercado extremamente competitivo.",
    image: "/diretoria/Sérgio Vianna - CFO Farmacon.webp",
    thumb: "/diretoria/Sérgio Vianna - CFO Farmacon.webp",
    social: "LinkedIn"
  },
  {
    id: 3,
    name: "Pedro Brasil",
    role: "COO Farmacon",
    quote: "Processos bem definidos são a ponte entre o planejamento estratégico e o dinheiro efetivo no caixa da sua farmácia.",
    image: "/diretoria/Pedro Brasil - COO Farmacon.webp",
    thumb: "/diretoria/Pedro Brasil - COO Farmacon.webp",
    social: "LinkedIn"
  },
  {
    id: 4,
    name: "Michel Medeiros",
    role: "Conselho Farmacon",
    quote: "Segurança e governança são as bases fundamentais para o crescimento estruturado e sustentável do seu negócio.",
    image: "/diretoria/michel-medeiros-conselho.webp",
    thumb: "/diretoria/michel-medeiros-conselho.webp",
    social: "LinkedIn"
  }
];

const SobreDiretoria = () => {
  const [activeDir, setActiveDir] = useState(directors[0]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveDir((prev) => {
        const currentIndex = directors.findIndex(d => d.id === prev.id);
        const nextIndex = (currentIndex + 1) % directors.length;
        return directors[nextIndex];
      });
    }, 6000); // 6 segundos de tempo considerável

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="pt-16 md:pt-24 pb-6 md:pb-8 bg-white">
      <div className="container mx-auto px-5 md:px-10 xl:px-16">
        
        {/* Title for mobile, outside the card */}
        <div className="md:hidden mb-8">
          <SectionHeader
            badgeIcon={<Users size={14} />}
            badgeText="Diretoria"
            titleLines={[
              "As mentes que",
              "constroem o",
              "futuro do varejo",
              "farmacêutico."
            ]}
            align="left"
            className="!mb-0"
          />
        </div>

        <div className="h-[650px] lg:h-[600px] w-full relative bg-slate-900 rounded-3xl overflow-hidden text-white flex flex-col justify-between">
      {/* Background Image Transitions */}
      <div className="absolute inset-x-0 top-0 h-[65%] md:h-full md:inset-0 z-0">
        <AnimatePresence>
          <m.img 
            key={activeDir.id}
            src={activeDir.image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-top md:object-center"
          />
        </AnimatePresence>
        {/* Gradientes Desktop */}
        <div className="hidden md:block absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-slate-900/95 via-slate-900/60 to-transparent pointer-events-none"></div>
        <div className="hidden md:block absolute inset-y-0 right-0 w-[35%] bg-gradient-to-l from-slate-900/90 via-slate-900/40 to-transparent pointer-events-none"></div>
        {/* Gradiente Inferior Mobile (Mescla a foto com o fundo sólido) */}
        <div className="md:hidden absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent pointer-events-none"></div>
        {/* Gradiente Inferior Desktop */}
        <div className="hidden md:block absolute inset-x-0 bottom-0 h-[25%] bg-gradient-to-t from-slate-900/95 via-slate-900/70 to-transparent pointer-events-none"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full px-6 md:px-12 py-8 md:py-12 flex flex-col justify-end md:justify-between pointer-events-none">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-8 pointer-events-auto mb-6 md:mb-0">
          {/* Main Statement (Desktop Only) */}
          <div className="hidden md:block w-full md:w-[45%] lg:w-[35%]">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight md:leading-snug">
              As mentes que constroem o futuro do varejo farmacêutico.
            </h2>
          </div>

          {/* Changing Quote */}
          <div className="w-full md:w-[30%] lg:w-[25%] md:text-right md:pt-2">
            <AnimatePresence mode="wait">
              <m.p
                key={activeDir.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-[14px] md:text-lg font-light text-white/90 leading-relaxed italic md:not-italic"
              >
                "{activeDir.quote}"
              </m.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-6 md:gap-8 pointer-events-auto">
          
          {/* Thumbnails */}
          <div 
            className="flex items-end gap-3 md:gap-4 h-24 w-fit"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {directors.map((dir) => (
              <div key={dir.id} className="relative flex flex-col items-center gap-2">
                {/* Active Indicator Dot */}
                <div className="h-2 w-2 flex items-center justify-center">
                  {activeDir.id === dir.id && (
                    <m.div layoutId="active-dot" className="w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </div>
                
                {/* Thumb Button */}
                <button 
                  onMouseEnter={() => setActiveDir(dir)}
                  onClick={() => setActiveDir(dir)}
                  className={`relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden transition-all duration-300 ${
                    activeDir.id === dir.id 
                      ? 'border-[2px] border-white scale-110 shadow-xl' 
                      : 'border-2 border-transparent opacity-50 hover:opacity-100 hover:scale-105 filter grayscale hover:grayscale-0'
                  }`}
                >
                  <img src={dir.thumb} alt={dir.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </button>
              </div>
            ))}
          </div>

          {/* Footer Info Line */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-end border-t border-white/20 pt-5 md:pt-6">
            
            <div className="flex flex-col">
              <AnimatePresence mode="wait">
                <m.div
                  key={activeDir.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[1.3rem] md:text-2xl font-medium tracking-tight whitespace-nowrap">{activeDir.name}</span>
                </m.div>
              </AnimatePresence>
            </div>

            <div className="hidden md:flex flex-col items-center text-center">
              <AnimatePresence mode="wait">
                <m.div
                  key={activeDir.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-sm md:text-base font-medium text-white/70 uppercase tracking-wider">{activeDir.role}</span>
                </m.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col items-end text-right">
              {/* Mobile fallback role se necessário futuramente */}
            </div>

          </div>
        </div>

        </div>
        </div>
      </div>
    </section>
  );
};

export default SobreDiretoria;
