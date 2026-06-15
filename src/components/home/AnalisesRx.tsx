import { useRef, useState, useEffect } from 'react';
import { m, useScroll, useTransform, useMotionValueEvent  } from 'framer-motion';
import { useModalSolucoes } from '../../hooks/useModalSolucoes';
import {
  Eye, TrendingDown, CreditCard, Landmark, TrendingUp,
  Tag, EyeOff, Cog, BarChart3, ArrowRight,
} from 'lucide-react';
import { AnimatedTitle } from '../ui/AnimatedTitle';
import { TypewriterBadge } from '../ui/TypewriterBadge';

/* ── Data ──────────────────────────────────────────── */
const services = [
  {
    num: '01', title: 'Fluxo de caixa', tags: ['Entradas e saídas', 'Previsibilidade'],
    desc: 'Sem controle de entradas e saídas, você trabalha no escuro. A falta de previsibilidade do fluxo de caixa pode esconder prejuízos e impedir o crescimento sustentável da sua operação.',
    icon: BarChart3,
  },
  {
    num: '02', title: 'Impostos pagos a mais', tags: ['PIS/COFINS', 'Monofásicos'],
    desc: 'Milhares de farmácias pagam impostos indevidos sobre produtos monofásicos. Sem uma revisão tributária, você pode estar deixando parte do seu lucro na mesa do governo todos os meses.',
    icon: TrendingDown,
  },
  {
    num: '03', title: 'Altas taxas de cartões', tags: ['Maquininhas', 'Cobranças indevidas'],
    desc: 'Você sabe exatamente quanto as maquininhas estão levando do seu lucro? Taxas não negociadas e cobranças indevidas corroem sua margem de forma silenciosa e contínua.',
    icon: CreditCard,
  },
  {
    num: '04', title: 'Taxas bancárias', tags: ['Custos recorrentes', 'Tarifas ocultas'],
    desc: 'Mapeie custos financeiros recorrentes que passam despercebidos na operação. Tarifas bancárias, taxas de manutenção e juros acumulados podem representar uma fatia significativa do seu faturamento.',
    icon: Landmark,
  },
  {
    num: '05', title: 'Margem de lucro', tags: ['Rentabilidade', 'Análise por categoria'],
    desc: 'Veja com clareza onde sua margem está sendo comprimida. Analisamos cada categoria de produto para identificar onde você ganha e onde está perdendo dinheiro sem perceber.',
    icon: TrendingUp,
  },
  {
    num: '06', title: 'Precificação incorreta', tags: ['Formação de preço', 'Competitividade'],
    desc: 'Evite vender com margem baixa por falhas na formação de preço. Uma precificação mal calibrada destrói a lucratividade antes mesmo do produto chegar à prateleira.',
    icon: Tag,
  },
  {
    num: '07', title: 'Custos invisíveis', tags: ['Despesas ocultas', 'Previsibilidade'],
    desc: 'Revele despesas ocultas que prejudicam a previsibilidade financeira. Custos que não aparecem nos relatórios podem estar drenando seu resultado mês após mês.',
    icon: EyeOff,
  },
  {
    num: '08', title: 'Desperdícios operacionais', tags: ['Eficiência', 'Processos internos'],
    desc: 'Encontre gargalos que consomem tempo, dinheiro e eficiência. Processos manuais, retrabalho e falta de automação prejudicam a operação e reduzem o lucro.',
    icon: Cog,
  },
];

/* ── Constants ─────────────────────────────────────── */
const ITEM_H = 150; // 149px height + 1px border
const VISIBLE = 2;
const MAX_FLOAT = services.length - VISIBLE; // 6

/* ── Component ─────────────────────────────────────── */
const AnalisesRx = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { openModal } = useModalSolucoes();
  const popupOpenedRef = useRef(false);

  const [desktop, setDesktop] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeFloat, setActiveFloat] = useState(0);
  const [mobileOpen, setMobileOpen] = useState<number | null>(0);

  useEffect(() => {
    const c = () => setDesktop(window.innerWidth >= 1024);
    c();
    window.addEventListener('resize', c);
    return () => window.removeEventListener('resize', c);
  }, []);

  /* ── Scroll Logic (Desktop) ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (desktop) {
      setActiveFloat(latest * MAX_FLOAT);
    }
  });

  // Calculate the vertical shift for the carousel
  // Subtracting (VISIBLE * ITEM_H) / 2 to vertically center the 3 active items around top: 50%
  const yTrack = useTransform(scrollYProgress, v => {
    const f = v * MAX_FLOAT;
    return -f * ITEM_H - (VISIBLE * ITEM_H) / 2;
  });

  // Calculate progress bar width removed

  /* ── Render ── */
  return (
    <section
      ref={sectionRef}
      id="rx-analises"
      className="relative w-full lg:h-[250vh]" // 250vh gives plenty of scroll distance to smoothly view all 8 items
    >
      {/* Sticky wrapper for desktop, static for mobile */}
      <div className="lg:sticky lg:top-0 lg:h-screen w-full flex items-center justify-center lg:overflow-hidden pt-16 pb-6 lg:py-0">
        <div className="container mx-auto px-5 md:px-10 xl:px-16 w-full">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16 xl:gap-24">

            {/* ══ LEFT COLUMN: Fixed Content ══ */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              onViewportEnter={() => {
                if (!popupOpenedRef.current) {
                  setTimeout(() => {
                    openModal();
                    popupOpenedRef.current = true;
                  }, 600);
                }
              }}
              className="w-full lg:w-[42%] xl:w-[40%] shrink-0 flex flex-col justify-center relative z-20 items-center text-center lg:items-start lg:text-left"
            >
              {/* Badge */}
              <div className="mb-6 w-fit mx-auto lg:mx-0">
                <TypewriterBadge 
                  text="RX Análises"
                  icon={<Eye className="w-4 h-4" strokeWidth={2.5} />}
                />
              </div>

              {/* Title */}
              <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight leading-[1.1] mb-6 text-dark-900">
                <AnimatedTitle lines={["Análise Profunda"]} delay={0.1} />
              </h2>

              {/* Description */}
              <p className="text-[1rem] md:text-[1.1rem] text-slate-500 font-medium leading-relaxed mb-14 max-w-md mx-auto lg:mx-0">
                Identifique impostos pagos a mais, taxas invisíveis e gargalos
                financeiros que reduzem o lucro da sua farmácia todos os meses.
              </p>

              {/* CTA */}
              <button
                onClick={() => openModal()}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-primary-600 text-white rounded-full font-semibold text-[15px] hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/25 transition-all duration-300 w-full md:w-fit"
              >
                <span>Solicitar um diagnóstico</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>

              {/* Progress Indicator removed */}
            </m.div>

            {/* ══ RIGHT COLUMN: Interactive List ══ */}
            <div className="flex-1 w-full relative z-10">
              
              {desktop ? (
                /* DESKTOP: Native scroll-driven carousel */
                <div className="relative w-full h-[600px] xl:h-[650px] flex flex-col justify-center overflow-hidden">
                  


                  {/* Carousel Track */}
                  <m.div
                    className="absolute left-0 right-0"
                    style={{ top: '50%', y: yTrack }}
                  >
                    {services.map((item, idx) => {
                      const Icon = item.icon;
                      
                      // Calculate opacity based on distance from the active 2-item window
                      let dist = 0;
                      if (idx < activeFloat) dist = activeFloat - idx;
                      else if (idx > activeFloat + 1) dist = idx - (activeFloat + 1);
                      
                      const isHov = hovered === idx;
                      // Force full opacity on hover, otherwise fade strongly based on distance
                      const op = isHov ? 1 : Math.max(0.15, 1 - dist * 0.7);

                      return (
                        <m.div
                          key={item.num}
                          onMouseEnter={() => setHovered(idx)}
                          onMouseLeave={() => setHovered(null)}
                          className="border-b border-slate-100 last:border-b-0 cursor-pointer transition-opacity duration-300 ease-out"
                          style={{ opacity: op }}
                        >
                          {/* Collapsed state MenuPrincipal (Fixed height guarantees smooth translation math) */}
                          <div className="h-[149px] flex items-center gap-6 xl:gap-10">
                            <span 
                              className={`text-[2rem] xl:text-[2.75rem] font-semibold tabular-nums shrink-0 transition-colors duration-300 w-14 xl:w-16 ${isHov ? 'text-primary-500' : 'text-slate-900'}`}
                            >
                              {item.num}
                            </span>
                            <div className="flex-1 min-w-0">
                              <h3 
                                className={`text-[1.5rem] xl:text-[1.75rem] font-bold tracking-tight transition-colors duration-300 ${isHov ? 'text-primary-600' : 'text-slate-900'}`}
                              >
                                {item.title}
                              </h3>
                              <div className="flex items-center gap-2.5 mt-2 flex-wrap">
                                {item.tags.map((tag, i) => (
                                  <span key={i} className="flex items-center gap-2.5">
                                    <span className="text-[14px] xl:text-[15px] text-slate-400 font-medium">{tag}</span>
                                    {i < item.tags.length - 1 && (
                                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                                    )}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Hover Expansion (Flows naturally downward without pushing the track up) */}
                          <div
                            className={`overflow-hidden transition-all duration-500 ease-out ${isHov ? 'max-h-[160px] opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0'}`}
                          >
                            <div className="flex items-start gap-4 pl-[4.5rem] xl:pl-[5.5rem] pr-4">
                              <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 border border-primary-100/50">
                                <Icon className="w-5 h-5" strokeWidth={1.5} />
                              </div>
                              <p className="text-[14.5px] text-slate-500 leading-relaxed max-w-lg">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        </m.div>
                      );
                    })}
                  </m.div>
                </div>
              ) : (
                /* MOBILE: Standard Click Accordion */
                <div className="space-y-0 mt-8">
                  {services.map((item, idx) => {
                    const Icon = item.icon;
                    const isOpen = mobileOpen === idx;
                    
                    return (
                      <m.div 
                        key={item.num} 
                        initial={{ opacity: 0, y: 20 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05, duration: 0.4 }} 
                        className="border-b border-slate-100 last:border-b-0"
                      >
                        <button 
                          onClick={() => setMobileOpen(isOpen ? null : idx)} 
                          className="w-full flex items-start gap-5 py-6 text-left"
                        >
                          <span className={`text-[1.35rem] font-bold tabular-nums leading-none pt-0.5 shrink-0 transition-colors duration-300 ${isOpen ? 'text-primary-500' : 'text-slate-300'}`}>
                            {item.num}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h3 className={`text-[1.15rem] font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-primary-600' : 'text-slate-900'}`}>
                              {item.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                              {item.tags.map((tag, i) => (
                                <span key={i} className="flex items-center gap-2">
                                  <span className="text-[12px] text-slate-400 font-medium">{tag}</span>
                                  {i < item.tags.length - 1 && <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />}
                                </span>
                              ))}
                            </div>
                          </div>
                          <svg className={`w-5 h-5 shrink-0 mt-1 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary-500' : 'text-slate-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        <div className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                          <div className="flex items-start gap-3 pb-6 pl-[3.25rem]">
                            <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 border border-primary-100/50">
                              <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
                            </div>
                            <p className="text-[12.5px] text-slate-500 leading-relaxed pr-2">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </m.div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalisesRx;

