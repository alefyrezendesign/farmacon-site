import { useRef, useState, useEffect } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { Shield, TrendingUp, Wallet, Package, Tag, Activity, ArrowRight, Lightbulb } from 'lucide-react';
import { AnimatedTitle } from '../ui/AnimatedTitle';
import { TypewriterBadge } from '../ui/TypewriterBadge';

const solutions = [
  {
    id: 'planejamento',
    title: "Planejamento tributário especializado",
    desc: "Revisamos seu enquadramento, regimes e obrigações acessórias para eliminar cada real pago indevidamente.",
    icon: <Shield className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />,
    image: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 'margem',
    title: "Análise de margem por categoria",
    desc: "Identificamos categorias com margem negativa e criamos estratégias de precificação orientadas por dados.",
    icon: <TrendingUp className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />,
    image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 'financeiro',
    title: "Gestão financeira e fluxo de caixa",
    desc: "Obtenha clareza com projeções semanais, alertas de liquidez e um controle integrado de antecipação de recebíveis.",
    icon: <Wallet className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />,
    image: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 'estoque',
    title: "Controle de estoque",
    desc: "Otimizamos o giro de produtos da sua farmácia, reduzindo rupturas e prevenindo perdas financeiras.",
    icon: <Package className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />,
    image: "https://images.unsplash.com/photo-1557683304-673a23048d34?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 'precificacao',
    title: "Precificação estratégica",
    desc: "Aplicamos mark-ups inteligentes e dinâmicos para maximizar seus lucros sem perder a competitividade.",
    icon: <Tag className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />,
    image: "https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 'diagnostico',
    title: "Diagnóstico de gestão da farmácia",
    desc: "Realizamos uma avaliação 360º dos seus processos para identificar oportunidades de melhoria imediata.",
    icon: <Activity className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />,
    image: "https://images.unsplash.com/photo-1557683325-3ba8f0df79de?auto=format&fit=crop&w=600&q=80"
  },
];

const SolutionCard = ({ solution, index, isDesktop }: { solution: any, index: number, isDesktop: boolean }) => {
  const mobileStyle = {
    top: `calc(51vh + ${index * 12}px)`,
    zIndex: index + 1,
    minHeight: `calc(100vh + ${60 - index * 12}px)`,
    transform: 'translateZ(0)',
    willChange: 'transform',
  };

  return (
    <m.div
      style={!isDesktop ? mobileStyle : undefined}
      initial={!isDesktop && index === 0 ? { opacity: 0, y: 30 } : undefined}
      whileInView={!isDesktop && index === 0 ? { opacity: 1, y: 0 } : undefined}
      viewport={!isDesktop && index === 0 ? { once: true, margin: "0px 0px -50px 0px" } : undefined}
      transition={{ duration: 0.5 }}
      className={`group flex flex-col justify-start px-6 sm:px-8 md:px-10 lg:px-0 lg:w-[300px] xl:w-[340px] 2xl:w-[380px] lg:flex-shrink-0 py-10 md:py-12 lg:pt-8 lg:pb-12 cursor-pointer lg:border-none last:border-0
        ${!isDesktop ? 'sticky bg-white shadow-[0_-3px_12px_rgba(0,0,0,0.09)] rounded-t-[32px] border-t border-surface-200/80' : 'relative border-b border-surface-100 min-h-[auto]'}
      `}
    >
      {/* Mobile Layout: Number + Title side by side */}
      <div className="flex lg:hidden flex-row items-center gap-5 mb-5">
        <div className="text-[4.2rem] font-medium text-slate-800 tracking-tighter leading-none">
          {String(index + 1).padStart(2, '0')}
        </div>
        <h3 className="text-[1.15rem] font-bold text-dark-900 leading-[1.25]">
          {solution.title}
        </h3>
      </div>

      {/* Desktop Layout: Giant Number */}
      <div className="hidden lg:block text-[7rem] font-medium text-slate-800 transition-colors duration-500 group-hover:text-primary-600 mb-6 tracking-tighter leading-none">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Shared Border */}
      <div className="w-full h-[2px] bg-slate-200 mb-5 lg:mb-16 relative overflow-hidden">
         <div className="absolute top-0 left-0 h-full w-0 bg-primary-500 transition-all duration-700 ease-out group-hover:w-full"></div>
      </div>

      {/* Desktop Layout: Title */}
      <h3 className="hidden lg:block text-2xl font-bold text-dark-900 mb-8 leading-[1.3] transition-colors duration-500 group-hover:text-primary-700">
        {solution.title}
      </h3>
      
      {/* Description */}
      <p className="text-[15px] md:text-[15.5px] text-slate-500 font-medium leading-[1.7]">
        {solution.desc}
      </p>
    </m.div>
  );
};

const ResumoSolucoes = () => {
  const targetRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const updateLayout = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);

      if (desktop && scrollContainerRef.current) {
        // Largura total de todos os itens (scrollWidth)
        const totalWidth = scrollContainerRef.current.scrollWidth;
        // A largura visível disponível apenas para os cards (o container pai que possui overflow-hidden)
        const visibleWidth = scrollContainerRef.current.parentElement?.clientWidth || window.innerWidth;
        // O valor negativo exato que a div precisa se mover para a direita encostar na borda direita
        const range = Math.max(0, totalWidth - visibleWidth);
        // Usamos -range para mover para a esquerda
        setScrollRange(-range); 
      }
    };

    updateLayout();
    
    // ResizeObserver garante que se a fonte carregar ou o layout se ajustar, ele recalcula
    const resizeObserver = new ResizeObserver(() => {
      updateLayout();
    });

    if (scrollContainerRef.current) {
      resizeObserver.observe(scrollContainerRef.current);
    }
    if (scrollContainerRef.current?.parentElement) {
      resizeObserver.observe(scrollContainerRef.current.parentElement);
    }

    window.addEventListener('resize', updateLayout);
    
    // Timeout de fallback para garantir pintura completa
    const timeoutId = setTimeout(updateLayout, 500);

    return () => {
      window.removeEventListener('resize', updateLayout);
      resizeObserver.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Mapeia o scroll vertical para o movimento exato em pixels
  // [0, 0.15] -> O conteúdo fica parado (dá 1 ou 2 scrolls de respiro para ler a introdução)
  // [0.15, 0.85] -> Ocorre o movimento horizontal
  // [0.85, 1] -> Fica parado no último item antes de soltar a seção
  const x = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 0, scrollRange, scrollRange]);

  return (
    <section 
      ref={targetRef}
      id="solucoes" 
      className="relative h-auto lg:h-[380vh] bg-white overflow-visible lg:overflow-visible -mb-[62vh] lg:-mb-0" 
    >
      <div className="relative lg:sticky top-0 h-auto lg:h-screen flex flex-col lg:flex-row lg:items-center overflow-visible lg:overflow-hidden pt-20 pb-0 lg:pb-16 lg:py-0">
        
        {/* Background decoration */}
        <div
          className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:32px_32px]"
        />
        <div className="absolute top-0 w-full h-[400px] bg-gradient-to-b from-white to-transparent pointer-events-none" />

        {/* Container animado que engloba tudo */}
        <m.div 
          ref={scrollContainerRef}
          style={isDesktop ? { x } : {}}
          className="flex flex-col lg:flex-row lg:items-center gap-0 md:gap-8 lg:gap-16 xl:gap-24 px-0 lg:px-32 w-full lg:w-max relative z-10 h-auto"
        >
          
          {/* Slide 1: Intro / MenuPrincipal */}
          <div 
            className="w-full lg:w-[38vw] xl:w-[32vw] 2xl:w-[28vw] flex-shrink-0 flex flex-col justify-start lg:justify-center items-start px-6 sm:px-8 lg:px-0 py-2 lg:py-8 lg:pt-24 mb-6 lg:mb-0 lg:z-20 sticky top-[70px] lg:relative lg:top-auto bg-white z-0 pb-4"
            style={!isDesktop ? { minHeight: 'calc(151vh - 34px)' } : undefined}
          >
            
            <m.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-4 lg:mb-6"
            >
              <TypewriterBadge 
                text="Soluções"
                icon={<Lightbulb className="w-3.5 h-3.5 text-primary-600" strokeWidth={2.5} />}
                startDelay={1000}
              />
            </m.div>

            <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-bold tracking-tight leading-[1.1] mb-4 lg:mb-6 text-dark-900">
              <AnimatedTitle lines={["Resultados de", "ponta a ponta."]} delay={0.1} />
            </h2>

            <m.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 100,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.3,
                duration: 0.8
              }}
              className="text-[0.95rem] md:text-[1.1rem] text-slate-600 font-medium leading-relaxed max-w-[420px] md:max-w-xl mb-2 lg:mb-8"
            >
              Nossas soluções resolvem problemas reais. Combinamos expertise contábil, tributária e financeira para conectar sua farmácia às estratégias mais adequadas ao seu momento de crescimento.
            </m.p>

            <div className="hidden lg:flex mt-8 md:mt-12 items-center gap-4 text-primary-600 font-semibold tracking-wide">
              <span className="animate-pulse">Continue rolando</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>

          {/* Slides 2-7: Solution Cards */}
          <div className="relative flex flex-col lg:flex-row w-full lg:w-max gap-0 lg:gap-12 xl:gap-16 pt-0 lg:pt-12 -mt-[calc(100vh+60px)] lg:mt-0">
            {solutions.map((solution, index) => (
              <SolutionCard 
                key={solution.id}
                solution={solution}
                index={index}
                isDesktop={isDesktop}
              />
            ))}
            {/* Spacer longo para garantir uma etapa completa de pausa visual (encaixe) do Card 06 no mobile */}
            <div className="w-full h-[40vh] lg:hidden" />
          </div>

        </m.div>
      </div>
    </section>
  );
};

export default ResumoSolucoes;

