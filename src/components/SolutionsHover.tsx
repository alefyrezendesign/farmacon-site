import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Shield, TrendingUp, Wallet, BarChart3, Users2, Rocket } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';

const solutions = [
  {
    problem: "Carga tributária pesada",
    solution: "Planejamento tributário especializado",
    desc: "Revisamos enquadramento, regimes e obrigações acessórias para eliminar cada real pago indevidamente.",
    icon: <Shield className="w-8 h-8" />,
    color: "from-blue-500 to-blue-600"
  },
  {
    problem: "Margem apertada",
    solution: "Análise de margem por categoria",
    desc: "Identificamos categorias com margem negativa e criamos estratégias de precificação orientadas por dados.",
    icon: <TrendingUp className="w-8 h-8" />,
    color: "from-emerald-500 to-emerald-600"
  },
  {
    problem: "Caixa instável",
    solution: "Gestão financeira e fluxo de caixa",
    desc: "Projeções semanais, alertas de liquidez e controle de antecipação de recebíveis integrados.",
    icon: <Wallet className="w-8 h-8" />,
    color: "from-violet-500 to-violet-600"
  },
  {
    problem: "Decisões no escuro",
    solution: "BI e indicadores do varejo farmacêutico",
    desc: "Dashboards com DRE gerencial, comparativos de mercado e análise de performance por loja.",
    icon: <BarChart3 className="w-8 h-8" />,
    color: "from-amber-500 to-amber-600"
  },
  {
    problem: "Riscos trabalhistas",
    solution: "DP e compliance especializados",
    desc: "Gestão completa de folha, benefícios e obrigações trabalhistas com foco no varejo farmacêutico.",
    icon: <Users2 className="w-8 h-8" />,
    color: "from-rose-500 to-rose-600"
  },
  {
    problem: "Crescimento travado",
    solution: "Consultoria estratégica para expansão",
    desc: "Viabilidade de novas lojas, reestruturação societária e planejamento de expansão com base em dados.",
    icon: <Rocket className="w-8 h-8" />,
    color: "from-sky-500 to-sky-600"
  },
];

const SolutionsHover = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="solucoes" ref={containerRef} className="relative h-full w-full bg-white pt-20 md:pt-28 flex flex-col">
      <div className="container mx-auto px-5 md:px-10 xl:px-16 mb-6 shrink-0">
        <SectionHeader
          badgeIcon={<Shield className="w-3.5 h-3.5" />}
          badgeText="Nossos Serviços"
          title="Cada serviço resolve um problema real"
          subtitle="Entenda como nossas soluções atuam diretamente nas maiores dores da gestão da sua farmácia."
        />
      </div>

      <div className="flex-1 w-full relative min-h-0">
        {/* Horizontal track */}
        <div
          className="flex h-full w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-10"
        >
          {solutions.map((item, idx) => (
            <div key={idx} className="flex-shrink-0 w-screen h-full flex items-center justify-center px-6 md:px-16 snap-center">
              <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">

                {/* Left: Problem → Solution */}
                <div>
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-surface-400 mb-2 block">
                      Problema {String(idx + 1).padStart(2, '0')}
                    </span>
                    <p className="text-2xl md:text-3xl font-medium text-surface-400 line-through decoration-surface-300 decoration-2">
                      {item.problem}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <ArrowRight className="text-primary-500 flex-shrink-0" size={20} />
                    <span className="text-xs font-bold uppercase tracking-widest text-primary-600">Solução</span>
                  </div>

                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-900 tracking-tight mb-4 leading-tight">
                    {item.solution}
                  </h3>
                  <p className="text-base md:text-lg text-surface-500 font-light leading-relaxed max-w-md">
                    {item.desc}
                  </p>
                </div>

                {/* Right: Visual */}
                <div className="flex items-center justify-center">
                  <div className={`w-40 h-40 md:w-56 md:h-56 rounded-[2rem] bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-2xl`}>
                    {item.icon}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {solutions.map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-primary-500 opacity-50" />
          ))}
        </div>
      </div>
    </section>
  );
};



export default SolutionsHover;
