import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useSolutionsModal } from '../hooks/useSolutionsModal';
import { Search, TrendingDown, CreditCard, Link2, BarChart3, ShoppingCart, ShieldAlert, ArrowRight, Activity, AlertCircle } from 'lucide-react';

const leftCards = [
  {
    text: "Impostos pagos além do devido",
    icon: TrendingDown,
  },
  {
    text: "Taxas de cartão consumindo resultado",
    icon: CreditCard,
  },
  {
    text: "Antecipação virando dependência",
    icon: Link2,
  }
];

const rightCards = [
  {
    text: "Fluxo de caixa sem previsibilidade",
    icon: BarChart3,
  },
  {
    text: "Custo de mercadorias pressionando a operação",
    icon: ShoppingCart,
  },
  {
    text: "Falta de dados para decidir com segurança",
    icon: ShieldAlert,
  }
];

// Helper Component for the Problem Cards
const ProblemCard = ({ card, delay, isInView, align }: { card: { text: string, icon: React.ElementType }, delay: number, isInView: boolean, align: 'left' | 'right' }) => {
  const Icon = card.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: align === 'right' ? -20 : 20, y: 10 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`
        group relative p-4 md:p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-blue-50/80
        hover:bg-white hover:border-primary-100 hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] hover:-translate-y-0.5
        transition-all duration-500 ease-out flex items-center gap-4 cursor-default
        ${align === 'right' ? 'lg:flex-row-reverse lg:text-right' : 'flex-row text-left'}
      `}
    >
      {/* Icon Container */}
      <div className={`
        w-11 h-11 md:w-12 md:h-12 shrink-0 rounded-[14px] flex items-center justify-center bg-slate-50 border border-slate-100 text-slate-500
        group-hover:bg-primary-50 group-hover:border-primary-100 group-hover:text-primary-600
        transition-all duration-500 ease-out
      `}>
        <Icon className="w-[20px] h-[20px] md:w-[22px] md:h-[22px] group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
      </div>
      
      {/* Text */}
      <p className="text-[13.5px] md:text-[14.5px] font-semibold text-dark-900/80 group-hover:text-dark-900 transition-colors leading-snug">
        {card.text}
      </p>
    </motion.div>
  );
};

const RxAnalises = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { openModal } = useSolutionsModal();

  return (
    <section id="rx-analises" className="w-full py-20 md:py-28 bg-[#F8FAFC] relative overflow-hidden">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-white rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-primary-100/30 rounded-full blur-[120px] pointer-events-none" />

      <div ref={containerRef} className="container mx-auto px-5 md:px-10 xl:px-16 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-primary-100/60 shadow-sm mb-6"
          >
            <Search className="w-3.5 h-3.5 text-primary-600" />
            <span className="text-[10.5px] md:text-[11.5px] font-bold uppercase tracking-[0.08em] text-primary-700">
              RX Análises
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-tight leading-[1.1] mb-5 text-dark-900"
          >
            Pare de perder margem
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[1rem] md:text-[1.1rem] font-medium leading-relaxed text-dark-900/60 max-w-2xl mx-auto"
          >
            O problema da sua farmácia pode não estar nas vendas. Pode estar na gestão dos números. Muitas farmácias crescem, vendem, movimentam dinheiro todos os dias, mas ainda assim sentem a margem apertar.
          </motion.p>
        </div>

        {/* 3-Column Diagnostic Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-16 max-w-6xl mx-auto">
          
          {/* Left Cards */}
          <div className="flex flex-col gap-4 w-full lg:w-[32%] xl:w-[28%] order-2 lg:order-1">
            {leftCards.map((card, idx) => (
              <ProblemCard key={idx} card={card} delay={0.3 + (idx * 0.1)} isInView={isInView} align="right" />
            ))}
          </div>

          {/* Center Premium Photo Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
            className="w-full md:w-[60%] lg:w-[36%] xl:w-[34%] max-w-[400px] relative order-1 lg:order-2 mb-10 lg:mb-0"
          >
            <div className="aspect-[4/5] md:aspect-[3/4] w-full rounded-[2.5rem] overflow-hidden relative shadow-[0_20px_50px_rgba(37,99,235,0.08)] border border-white/60 bg-white">
              <img 
                src="/photos/rx-analises-photo.png" 
                alt="Gestor analisando dados da farmácia" 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
              
              {/* Subtle Glass Overlays on Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent mix-blend-overlay pointer-events-none" />
              
              {/* Floating Badge 1 - Top Left */}
              <motion.div 
                initial={{ opacity: 0, x: -20, y: 10 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute top-10 -left-1 sm:-left-6 lg:-left-10 bg-white/90 backdrop-blur-md px-3.5 py-3 rounded-2xl shadow-xl border border-white flex items-center gap-3 z-10"
              >
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                </div>
                <div className="pr-2">
                  <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Alerta</p>
                  <p className="text-[13px] font-semibold text-slate-800 leading-tight whitespace-nowrap">Margem em risco</p>
                </div>
              </motion.div>

              {/* Floating Badge 2 - Bottom Right */}
              <motion.div 
                initial={{ opacity: 0, x: 20, y: -10 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="absolute bottom-16 -right-1 sm:-right-6 lg:-right-10 bg-white/90 backdrop-blur-md px-3.5 py-3 rounded-2xl shadow-xl border border-white flex items-center gap-3 z-10"
              >
                <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4 text-primary-600" />
                </div>
                <div className="pr-2">
                  <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Diagnóstico</p>
                  <p className="text-[13px] font-semibold text-slate-800 leading-tight whitespace-nowrap">Análise ativa</p>
                </div>
              </motion.div>

            </div>
            
            {/* Outer Decorative Glow */}
            <div className="absolute -inset-4 bg-primary-400/20 rounded-[3rem] blur-2xl -z-10 opacity-0 transition-opacity duration-1000" />
          </motion.div>

          {/* Right Cards */}
          <div className="flex flex-col gap-4 w-full lg:w-[32%] xl:w-[28%] order-3">
            {rightCards.map((card, idx) => (
              <ProblemCard key={idx} card={card} delay={0.6 + (idx * 0.1)} isInView={isInView} align="left" />
            ))}
          </div>

        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="flex justify-center mt-16 md:mt-24"
        >
          <button
            onClick={() => openModal()}
            className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-primary-600 text-white rounded-full font-semibold text-[15px] hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary-600/20 hover:-translate-y-0.5 overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <span className="relative z-10">Solicitar um diagnóstico</span>
            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default RxAnalises;
