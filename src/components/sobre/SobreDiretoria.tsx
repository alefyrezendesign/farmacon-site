import { useState, useEffect } from 'react';
import { m, AnimatePresence  } from 'framer-motion';
import { Users } from 'lucide-react';


const directors = [
  {
    id: 1,
    name: "Marcos Cordeiro",
    role: "CEO Farmacon",
    quote: "A inovação contábil não\né sobre números, é sobre\nprever o futuro do varejo\nfarmacêutico e agir agora.",
    image: "/diretoria/bg-frases (0).webp",
    thumb: "/diretoria/bg-frases (0).webp",
    social: "LinkedIn"
  },
  {
    id: 2,
    name: "Marcos Cordeiro",
    role: "CEO Farmacon",
    quote: "Nossa inteligência financeira\né desenhada para blindar\nsua margem de lucro em um\nmercado altamente competitivo.",
    image: "/diretoria/bg-frases (1).webp",
    thumb: "/diretoria/bg-frases (1).webp",
    social: "LinkedIn"
  },
  {
    id: 3,
    name: "Marcos Cordeiro",
    role: "CEO Farmacon",
    quote: "Processos bem definidos são\na ponte entre o planejamento\nestratégico e o dinheiro efetivo\nno caixa da sua farmácia.",
    image: "/diretoria/bg-frases (2).webp",
    thumb: "/diretoria/bg-frases (2).webp",
    social: "LinkedIn"
  },
  {
    id: 4,
    name: "Marcos Cordeiro",
    role: "CEO Farmacon",
    quote: "Segurança e governança\nsão as bases fundamentais\npara o crescimento estruturado\ne sustentável do seu negócio.",
    image: "/diretoria/bg-frases (3).webp",
    thumb: "/diretoria/bg-frases (3).webp",
    social: "LinkedIn"
  },
  {
    id: 5,
    name: "Marcos Cordeiro",
    role: "CEO Farmacon",
    quote: "Acreditamos que o sucesso\nde cada cliente é a verdadeira\nmétrica do nosso próprio\ncrescimento e evolução.",
    image: "/diretoria/bg-frases (4).webp",
    thumb: "/diretoria/bg-frases (4).webp",
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
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center gap-2 bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
              <Users size={14} />
              Diretoria
            </span>
          </div>
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
          {/* Main Statement / Animated Quote on Left */}
          <div className="w-full md:w-[70%] lg:w-[60%]">
            <AnimatePresence mode="wait">
              <m.h2
                key={activeDir.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-xl md:text-3xl lg:text-4xl font-medium tracking-tight leading-tight md:leading-snug text-white whitespace-pre-line"
              >
                "{activeDir.quote}"
              </m.h2>
            </AnimatePresence>
          </div>
          
          {/* Right side is now empty per requirements */}
          <div className="w-full md:w-[30%] lg:w-[25%] md:text-right md:pt-2">
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
              <span className="text-[1.3rem] md:text-2xl font-medium tracking-tight whitespace-nowrap">{activeDir.name}</span>
            </div>

            <div className="hidden md:flex flex-col items-center text-center">
              <span className="text-sm md:text-base font-medium text-white/70 uppercase tracking-wider">{activeDir.role}</span>
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
