import { motion } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';

const stats = [
  { value: "9,2%", text: "do Market Share no Brasil", desktopHeight: "h-[180px]", mobileHeight: "h-[200px]", delay: 0.1, highlight: false },
  { value: "1.800", text: "Municípios atendidos em todo o Brasil", desktopHeight: "h-[240px]", mobileHeight: "h-[240px]", delay: 0.2, highlight: false },
  { value: "6.200+", text: "Empresários confiam em nossa expertise", desktopHeight: "h-[340px]", mobileHeight: "h-[300px]", delay: 0.3, highlight: false },
  { value: "22%", text: "Nossos clientes cresceram em média 22% a mais do que o mercado", desktopHeight: "h-full", mobileHeight: "h-[380px]", delay: 0.4, highlight: true }
];

const AnimatedBarChart = ({ delay }: { delay: number }) => {
  const bars = [
    { height: "45%", delay: delay + 0.4, type: 'mercado' },
    { height: "55%", delay: delay + 0.5, type: 'mercado' },
    { height: "40%", delay: delay + 0.6, type: 'mercado' },
    { height: "85%", delay: delay + 0.7, type: 'clientes' },
    { height: "45%", delay: delay + 0.8, type: 'mercado' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[65%] w-full z-0 pointer-events-none flex items-end overflow-hidden">
      <div className="w-full h-full flex items-end gap-0 px-0 pb-0">
        {bars.map((bar, i) => (
          <div key={i} className="flex-1 h-full relative flex items-end justify-center">
            {bar.type === 'clientes' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: delay + 1.2 }}
                className="absolute z-20 flex items-center justify-center"
                style={{ bottom: bar.height }}
              >
                <div className="w-10 h-10 rounded-full border border-blue-200/60 bg-white shadow-[0_4px_15px_rgba(37,99,235,0.2)] flex items-center justify-center overflow-hidden">
                  <img src="/logo/simbolo.png" alt="Farmacon" className="w-6 h-6 object-contain" />
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ height: "0%" }}
              whileInView={{ height: bar.height }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: bar.delay, ease: [0.22, 1, 0.36, 1] }}
              className="w-full relative"
            >
              <div className={`absolute inset-0 blur-[8px] ${
                bar.type === 'clientes' 
                  ? 'bg-gradient-to-t from-[#2563EB]/80 to-white/0' 
                  : 'bg-gradient-to-t from-[#60A5FA]/40 to-white/0'
              }`} />
              
              <div className={`absolute inset-0 ${
                bar.type === 'clientes'
                  ? 'bg-gradient-to-t from-[#2563EB] via-[#3B82F6]/80 to-white/0'
                  : 'bg-gradient-to-t from-[#60A5FA]/70 via-[#93C5FD]/40 to-white/0'
              }`} />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatCard = ({ stat, heightClass, className = "" }: { stat: any, heightClass: string, className?: string }) => (
  <motion.div
    initial={{ scaleY: 0 }}
    whileInView={{ scaleY: 1 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.8, delay: stat.delay, ease: [0.22, 1, 0.36, 1] }}
    style={{ transformOrigin: "bottom" }}
    className={`w-full rounded-[24px] p-6 lg:p-7 flex flex-col justify-start items-start relative overflow-hidden ${
      stat.highlight 
        ? 'bg-white text-[#2563EB] shadow-xl shadow-black/10' 
        : 'bg-white/10 border border-white/20 text-white'
    } ${heightClass} ${className}`}
  >
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: stat.delay + 0.4 }}
      className="flex flex-col gap-2 relative z-10"
    >
      <div className={`text-[2.8rem] lg:text-[3.5rem] font-bold tracking-tighter leading-none ${stat.highlight ? 'text-[#2563EB]' : 'text-white'}`}>
        {stat.value}
      </div>
      
      <p className={`text-[13px] lg:text-[14px] font-medium leading-snug ${stat.highlight ? 'text-slate-700' : 'text-blue-100'}`}>
        {stat.text}
      </p>
    </motion.div>
    
    {stat.value === "22%" && <AnimatedBarChart delay={stat.delay} />}
  </motion.div>
);

const Authority = () => {
  const TextContent = () => (
    <SectionHeader
      badgeIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
        </svg>
      }
      badgeText="Resultados reais no mercado farmacêutico"
      title={
        <>
          Somos a maior da <br className="hidden md:block" />
          América Latina
        </>
      }
      subtitle="Todos os anos, nossos clientes crescem acima da média do mercado. Todos os dias, empresários tomam decisões mais seguras com base em números claros."
      align="left"
      className="mb-0"
      inverted={true}
    />
  );

  return (
    <section id="sobre-nos" className="relative z-20 bg-[#2563eb] w-full shadow-[0_-20px_60px_rgba(0,0,0,0.06)] lg:h-screen py-16 lg:py-0 overflow-hidden">
      <div className="container mx-auto px-5 md:px-10 xl:px-16 lg:h-full">
        
        <div className="w-full max-w-7xl mx-auto lg:h-full">
          
          {/* MOBILE LAYOUT (<lg) */}
          <div className="lg:hidden flex flex-col">
            <div className="mb-10">
              <TextContent />
            </div>
            
            <div className="w-full relative -mx-5 px-5">
              <div className="flex flex-row overflow-x-auto hide-scrollbar snap-x snap-mandatory items-end gap-4 pb-6 pt-4 w-full">
                {stats.map((stat, idx) => (
                  <div key={idx} className="snap-center shrink-0 w-[260px]">
                    <StatCard stat={stat} heightClass={stat.mobileHeight} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DESKTOP LAYOUT (>= lg) */}
          <div className="hidden lg:flex w-full h-full items-center justify-center">
            
            {/* Content Wrapper */}
            <div className="relative w-full h-[540px] xl:h-[580px]">
              
              {/* Text - positioned at top left */}
              <div className="absolute top-0 left-0 w-[48%] z-10">
                <TextContent />
              </div>
              
              {/* Cards - pinned to bottom */}
              <div className="absolute bottom-0 left-0 right-0 flex items-end gap-5">
                <div className="flex-1">
                  <StatCard stat={stats[0]} heightClass={stats[0].desktopHeight} />
                </div>
                <div className="flex-1">
                  <StatCard stat={stats[1]} heightClass={stats[1].desktopHeight} />
                </div>
                <div className="flex-1">
                  <StatCard stat={stats[2]} heightClass={stats[2].desktopHeight} />
                </div>
                <div className="flex-1">
                  <StatCard stat={stats[3]} heightClass="h-[420px]" />
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Authority;
