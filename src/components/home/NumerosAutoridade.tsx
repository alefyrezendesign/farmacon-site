import { m  } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';

type Stat = {
  value: string;
  text: string;
  desktopHeight: string;
  mobileHeight: string;
  delay: number;
  highlight: boolean;
};

const stats: Stat[] = [
  { value: '9,2%', text: 'do Market Share no Brasil', desktopHeight: 'h-[150px]', mobileHeight: 'h-[150px]', delay: 0.1, highlight: false },
  { value: '1.800', text: 'Municípios atendidos em todo o Brasil', desktopHeight: 'h-[200px]', mobileHeight: 'h-[150px]', delay: 0.2, highlight: false },
  { value: '6.200+', text: 'Empresários confiam em nossa expertise', desktopHeight: 'h-[290px]', mobileHeight: 'h-[260px]', delay: 0.3, highlight: false },
  { value: '22%', text: 'Nossos clientes cresceram em média 22% a mais do que o mercado', desktopHeight: 'h-full', mobileHeight: 'h-[260px]', delay: 0.4, highlight: true },
];

const AnimatedBarChart = ({ delay }: { delay: number }) => {
  const bars = [
    { height: '45%', delay: delay + 0.4, type: 'mercado' },
    { height: '55%', delay: delay + 0.5, type: 'mercado' },
    { height: '40%', delay: delay + 0.6, type: 'mercado' },
    { height: '85%', delay: delay + 0.7, type: 'clientes' },
    { height: '45%', delay: delay + 0.8, type: 'mercado' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[50%] w-full z-0 pointer-events-none flex items-end">
      <div className="w-full h-full flex items-end gap-0 px-0 pb-0">
        {bars.map((bar, i) => (
          <div key={i} className="flex-1 h-full relative flex items-end justify-center">
            {bar.type === 'clientes' && (
              <m.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: delay + 1.2 }}
                className="absolute z-20 flex items-center justify-center"
                style={{ bottom: bar.height }}
              >
                <div className="w-10 h-10 rounded-full border border-blue-200/60 bg-white shadow-[0_4px_15px_rgba(37,99,235,0.2)] flex items-center justify-center overflow-hidden">
                  <img src="/logo/simbolo.png" alt="Farmacon" className="w-6 h-6 object-contain" loading="lazy" decoding="async" />
                </div>
              </m.div>
            )}

            <m.div
              initial={{ height: '0%' }}
              whileInView={{ height: bar.height }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: bar.delay, ease: [0.22, 1, 0.36, 1] }}
              className="w-full relative"
            >
              <div className={`absolute inset-0 blur-[8px] ${
                bar.type === 'clientes'
                  ? 'bg-gradient-to-t from-[#2563EB]/90 to-transparent'
                  : 'bg-gradient-to-t from-[#60A5FA]/80 to-transparent'
              }`} />

              <div className={`absolute inset-0 rounded-t-lg ${
                bar.type === 'clientes'
                  ? 'bg-gradient-to-t from-[#2563EB] via-[#3B82F6]/90 to-transparent'
                  : 'bg-gradient-to-t from-[#60A5FA] via-[#93C5FD]/60 to-transparent'
              }`} />
            </m.div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatCard = ({ stat, heightClass, className = '' }: { stat: Stat; heightClass: string; className?: string }) => (
  <m.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.8, delay: stat.delay, ease: [0.22, 1, 0.36, 1] }}
    className={`w-full rounded-[24px] lg:rounded-3xl p-4 lg:p-7 flex flex-col justify-start items-start relative overflow-hidden ${
      stat.highlight
        ? 'bg-white text-[#2563EB] shadow-xl shadow-black/10'
        : 'bg-[#3b82f6]/30 backdrop-blur-[16px] border border-white/20 text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]'
    } ${heightClass} ${className}`}
  >
    <m.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: stat.delay + 0.4 }}
      className="flex flex-col gap-1 lg:gap-2 relative z-10"
    >
      <div className={`text-[1.8rem] sm:text-[2.8rem] lg:text-[3.5rem] font-bold tracking-tighter leading-none ${stat.highlight ? 'text-[#2563EB]' : 'text-white'}`}>
        {stat.value}
      </div>

      <p className={`text-[11px] sm:text-[13px] lg:text-[14px] font-medium leading-snug ${stat.highlight ? 'text-slate-700' : 'text-blue-100'}`}>
        {stat.text}
      </p>
    </m.div>

    {stat.value === '22%' && <AnimatedBarChart delay={stat.delay} />}

    {stat.value === '6.200+' && (
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: stat.delay + 0.6 }}
        className="absolute bottom-4 left-0 right-0 w-full px-4 h-[45%] z-0"
      >
        <div className="w-full h-full rounded-3xl overflow-hidden border border-white/10 relative bg-white/5 backdrop-blur-sm">
          <img 
            alt="Empresários confiando na Farmacon" 
            className="w-full h-full object-cover" 
            src="/images/parceiro-seção2.webp" 
          />
        </div>
      </m.div>
    )}
  </m.div>
);

const AuthorityTextContent = () => (
  <SectionHeader
    badgeIcon={
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="1" />
        <polygon points="12,6 22,12 12,18 2,12" />
        <circle cx="12" cy="12" r="3.5" />
      </svg>
    }
    badgeText="Resultados reais no mercado farmacêutico"
    titleLines={["Somos a maior da", "América Latina"]}
    subtitle="Todos os anos, nossos clientes crescem acima da média do mercado. Todos os dias, empresários tomam decisões mais seguras com base em números claros."
    align="mobile-center"
    className="mb-0"
    inverted={true}
  />
);

const NumerosAutoridade = () => {
  return (
    <section 
      id="sobre-nos" 
      className="relative z-20 bg-[#2563eb] bg-cover bg-center w-full shadow-[0_-20px_60px_rgba(0,0,0,0.06)] lg:min-h-screen py-20 lg:py-0 overflow-hidden lg:flex lg:flex-col lg:justify-center"
      style={{ backgroundImage: "url('/background/bg-azul.png')" }}
    >
      <div className="container mx-auto px-5 md:px-10 xl:px-16 lg:h-full relative z-10">
        <div className="w-full max-w-7xl mx-auto lg:h-full">
          <div className="lg:hidden flex flex-col">
            <div className="mb-4">
              <AuthorityTextContent />
            </div>

            <div className="w-full relative mt-0">
              <div className="flex gap-3 w-full">
                {/* Coluna Esquerda: Curto + Longo */}
                <div className="flex flex-col gap-3 flex-1 w-1/2">
                  <StatCard stat={stats[0]} heightClass={stats[0].mobileHeight} />
                  <StatCard stat={stats[2]} heightClass={stats[2].mobileHeight} />
                </div>
                {/* Coluna Direita: Longo + Curto */}
                <div className="flex flex-col gap-3 flex-1 w-1/2">
                  <StatCard stat={stats[3]} heightClass={stats[3].mobileHeight} />
                  <StatCard stat={stats[1]} heightClass={stats[1].mobileHeight} />
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex w-full h-full items-center justify-center py-28 xl:py-36">
            <div className="relative w-full h-[460px] xl:h-[520px]">
              <div className="absolute top-0 left-0 w-[48%] z-10 xl:-top-4">
                <AuthorityTextContent />
              </div>

              <div className="absolute bottom-0 left-0 right-0 flex items-end gap-4 xl:gap-5">
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
                  <StatCard stat={stats[3]} heightClass="h-[330px] xl:h-[370px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NumerosAutoridade;

