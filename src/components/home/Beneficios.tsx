import { m, AnimatePresence, useInView  } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ShieldCheck, BarChart2, CalendarDays, ChevronDown, TrendingUp, Rocket } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const allCards = [
  {
    number: "01",
    title: "Margem protegida",
    subtitle: "Auditoria Tributária Contínua",
    desc: "Auditoria tributária contínua que devolve ao caixa o que nunca deveria ter saído. Monitoramos cada operação fiscal para garantir que sua farmácia não pague mais do que deve.",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    number: "02",
    title: "Clareza estratégica",
    subtitle: "Dashboards & Indicadores",
    desc: "Dashboards e indicadores construídos para a realidade do varejo farmacêutico. Visualize seus números com clareza e tome decisões baseadas em dados reais.",
    icon: <BarChart2 className="w-5 h-5" />,
  },
  {
    number: "03",
    title: "Previsibilidade real",
    subtitle: "Planejamento Financeiro",
    desc: "Planejamento financeiro sob medida, para decidir com 90 dias de antecedência. Antecipe cenários e proteja o futuro da sua operação com projeções precisas.",
    icon: <CalendarDays className="w-5 h-5" />,
  },
  {
    number: "04",
    title: "Crescimento escalável",
    subtitle: "Estratégia de Expansão",
    desc: "Estruture sua operação para crescer sem perder rentabilidade. Modelagem financeira para abertura de novas lojas de forma segura e sustentável.",
    icon: <TrendingUp className="w-5 h-5" />,
  },
];

const phrases = [
  "Ela precisa de segurança em cada operação fiscal.",
  "Ela precisa de dados claros para tomar decisões.",
  "Ela precisa antecipar cenários com precisão.",
  "Ela precisa de resultados reais.",
];

const useTypewriter = (targetText: string) => {
  const [displayText, setDisplayText] = useState(targetText);
  const currentTextRef = useRef(displayText);

  useEffect(() => {
    // Skip if it's already the target text
    if (currentTextRef.current === targetText) return;

    let isCancelled = false;

    const animateText = async () => {
      const current = currentTextRef.current;

      // Erase current text
      for (let i = current.length; i >= 0; i--) {
        if (isCancelled) return;
        setDisplayText(current.substring(0, i));
        await new Promise(r => setTimeout(r, 15));
      }

      // Type new text
      for (let i = 0; i <= targetText.length; i++) {
        if (isCancelled) return;
        setDisplayText(targetText.substring(0, i));
        await new Promise(r => setTimeout(r, 25));
      }

      if (!isCancelled) {
        currentTextRef.current = targetText;
      }
    };

    animateText();

    return () => { isCancelled = true; };
  }, [targetText]);

  return displayText;
};

const Beneficios = () => {
  const [expandedCard, setExpandedCard] = useState<number>(-1);
  const targetPhrase = phrases[expandedCard === -1 ? 0 : expandedCard];
  const displayText = useTypewriter(targetPhrase);

  // Triggers the first card to open after the cascade animation finishes
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsInView = useInView(cardsContainerRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (cardsInView) {
      // The cascade takes about ~1.45s to fully settle (4 cards).
      // Opening the first card at 1500ms creates a seamless, fluid transition.
      const timer = setTimeout(() => {
        setExpandedCard((prev) => (prev === -1 ? 0 : prev));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [cardsInView]);

  const toggleCard = (idx: number) => {
    setExpandedCard(expandedCard === idx ? -1 : idx);
  };

  return (
    <section className="pt-16 pb-12 md:pt-52 lg:pt-64 md:pb-0 mb-0 lg:-mb-[190px] relative w-full bg-white z-10">
      <div className="container mx-auto px-5 md:px-10 xl:px-16 relative z-10">

        {/* Two-column layout: text left, accordion right */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 xl:gap-20">

          {/* Left column — text (40%) */}
          <div className="lg:w-[40%] mb-10 lg:mb-0">
            <SectionHeader
              className="!mb-0 md:!mb-0"
              badgeIcon={<Rocket className="w-3.5 h-3.5" />}
              badgeText="Evolução Estratégica"
              titleLines={["O mercado farmacêutico", "está evoluindo."]}
              subtitle={
                <div className="grid">
                  {/* Invisible spacer — always renders the longest phrase to lock height */}
                  <div className="invisible col-start-1 row-start-1" aria-hidden="true">
                    Sua farmácia não precisa apenas mudar de contabilidade.{' '}
                    <span className="font-semibold">
                      Ela precisa de segurança em cada operação fiscal.
                    </span>
                  </div>
                  {/* Visible text overlaid */}
                  <div className="col-start-1 row-start-1">
                    Sua farmácia não precisa apenas mudar de contabilidade.{' '}
                    <span className="text-dark-900 font-semibold">
                      {displayText}
                      <m.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity }}
                        className="inline-block w-[2px] h-[18px] md:h-[20px] bg-dark-900 ml-1 align-middle"
                      />
                    </span>
                  </div>
                </div>
              }
              align="mobile-center"
            />
          </div>

          {/* Right column — vertical accordion (60%) */}
          <div ref={cardsContainerRef} className="lg:w-[60%] flex flex-col gap-3">
            {allCards.map((card, idx) => {
              const isExpanded = expandedCard === idx;

              return (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    delay: 0.25 * idx, 
                    duration: 0.7, 
                    ease: [0.25, 0.8, 0.25, 1] 
                  }}
                  className={`
                    group rounded-3xl overflow-hidden cursor-pointer
                    transition-[background-color,border-color,box-shadow] duration-700 ease-out
                    ${isExpanded
                      ? 'bg-white border border-primary-200 shadow-lg shadow-primary-500/10'
                      : 'bg-[#F8FAFC] border border-blue-100/50 hover:bg-white hover:border-blue-200 hover:shadow-[0_4px_20px_rgba(37,99,235,0.06)]'
                    }
                  `}
                  onClick={() => toggleCard(idx)}
                >
                  {/* Card MenuPrincipal — always visible */}
                  <div className="flex items-center justify-between px-5 py-4 md:px-6 md:py-5">
                    <div className="flex items-center gap-4">
                      {/* Number */}
                      <span className={`
                        text-[13px] font-semibold tracking-wider tabular-nums
                        transition-colors duration-400
                        ${isExpanded ? 'text-primary-600' : 'text-slate-400'}
                      `}>
                        {card.number}
                      </span>

                      {/* Icon */}
                      <div className={`
                        w-9 h-9 rounded-xl flex items-center justify-center
                        transition-colors duration-400
                        ${isExpanded
                          ? 'bg-primary-50 text-primary-600'
                          : 'bg-slate-100 text-slate-400'
                        }
                      `}>
                        {card.icon}
                      </div>

                      {/* Title */}
                      <h3 className={`
                        font-bold text-[1rem] md:text-[1.1rem] tracking-tight
                        transition-colors duration-400
                        ${isExpanded ? 'text-dark-900' : 'text-slate-900'}
                      `}>
                        {card.title}
                      </h3>
                    </div>

                    {/* Toggle chevron */}
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                      transition-all duration-700 ease-out
                      ${isExpanded
                        ? 'bg-primary-50 border border-primary-200 text-primary-600'
                        : 'bg-white border border-slate-200 text-slate-500 group-hover:border-primary-200 group-hover:text-primary-500 group-hover:bg-primary-50/50'
                      }
                    `}>
                      <ChevronDown className={`
                        w-4 h-4 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                        ${isExpanded 
                          ? 'rotate-180 group-hover:-translate-y-0.5' 
                          : 'rotate-0 group-hover:translate-y-0.5'
                        }
                      `} />
                    </div>
                  </div>

                  {/* Expandable content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0">
                          {/* Divider */}
                          <div className="w-full h-px bg-surface-200 mb-4" />

                          {/* Subtitle */}
                          <h4 className="text-primary-600 text-[13px] md:text-[14px] font-semibold mb-2 tracking-wide">
                            {card.subtitle}
                          </h4>

                          {/* Description */}
                          <p className="text-dark-900/65 text-[13.5px] md:text-[14px] leading-relaxed max-w-lg">
                            {card.desc}
                          </p>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Beneficios;

