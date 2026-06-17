import { m, useInView  } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const statsLeft = [
  { value: 6200, label: "Empresários atendidos", prefix: "+", suffix: "" },
  { value: 9.2, label: "De market share no Brasil", prefix: "", suffix: "%" },
  { value: 1800, label: "Municípios atendidos", prefix: "+", suffix: "" },
];

const statsRight = [
  { value: 7.2, label: "Bilhões operados em 2025", prefix: "R$", suffix: " bi" },
  { value: 67, label: "Mil folhas processadas", prefix: "+", suffix: "" },
  { value: 3, label: "Novas farmácias por dia", prefix: "+", suffix: "" },
];

const Counter = ({ value, prefix, suffix, align = 'center' }: { value: number; prefix: string; suffix: string; align?: 'left' | 'right' | 'center' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  // Exibe 1 casa decimal caso seja número quebrado (ex: 9.2)
  const displayValue = value % 1 !== 0 ? count.toFixed(1) : Math.floor(count);

  const justifyClass = align === 'right' ? 'justify-end' : align === 'left' ? 'justify-start' : 'justify-center';

  return (
    <div ref={ref} className={`text-[28px] md:text-[38px] lg:text-[46px] font-[500] tracking-tight text-dark-900 leading-none mt-1 flex items-baseline ${justifyClass}`}>
      {prefix && <span className="text-primary-600 mr-1">{prefix}</span>}
      <span>{displayValue}</span>
      {suffix && (
        <span className={`${suffix.trim() === '%' ? 'text-primary-600' : 'text-dark-900'} text-[0.6em] font-bold ml-1`}>
          {suffix}
        </span>
      )}
    </div>
  );
};

const StatBlock = ({ stat, align, idx }: { stat: any, align: 'left' | 'right' | 'center', idx: number }) => {
  const alignClass = align === 'right' ? 'items-end text-right' : align === 'left' ? 'items-start text-left' : 'items-center text-center';

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: idx * 0.15 }}
      className={`flex flex-col gap-1 lg:pb-6 lg:pt-2 lg:border-b border-surface-200/80 lg:last:border-b-0 ${alignClass} relative z-20`}
    >
      <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} align={align} />
      <span className="text-[13px] md:text-[15px] font-[600] text-surface-600 max-w-full md:max-w-[200px] leading-tight">
        {(() => {
          const words = stat.label.split(' ');
          if (words.length <= 1) return stat.label;
          const mid = Math.ceil(words.length / 2);
          const line1 = words.slice(0, mid).join(' ');
          const line2 = words.slice(mid).join(' ');
          return (
            <>
              {line1}
              <br className="lg:hidden" />
              {line2}
            </>
          );
        })()}
      </span>
    </m.div>
  );
};

const SobreNumeros = () => {
  return (
    <section id="numeros" className="pt-10 pb-10 md:pt-24 md:pb-32 relative overflow-hidden lg:min-h-[80vh] flex flex-col justify-start lg:justify-center lg:-mt-[15vh] z-20">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-[length:100%_100%] bg-no-repeat z-0"
        style={{ backgroundImage: "url('/background/sobre-bg/bg-3-partes_02.jpg')" }}
      />

      {/* Centro Orgânico Animado (Video em mix-blend-multiply) */}
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none overflow-hidden mix-blend-multiply opacity-80 mt-48 lg:mt-56">
        <m.div
          animate={{ 
            y: [-25, 25, -25],
            rotate: [-4, 4, -4],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="relative w-[340px] h-[340px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px]"
        >
          <video 
            src="/background/sobre-bg/esfera-orbe2.mp4" 
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain relative z-10 scale-[1.2]"
          />
        </m.div>
      </div>

      <div className="container mx-auto px-5 md:px-10 xl:px-16 relative z-10 flex flex-col items-center">
        
        {/* Descrição Removida, apenas Badge e Título */}
        <div className="w-full flex justify-center z-10 relative">
          <SectionHeader
            badgeIcon={<Activity size={14} />}
            badgeText="Impacto Real"
            titleLines={[
              "Números que provam",
              "o nosso resultado."
            ]}
            align="center"
            className="!mb-0"
          />
        </div>

        {/* Layout Mobile: Grid 2 Colunas */}
        <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 lg:hidden relative z-20 mt-10">
          {[...statsLeft, ...statsRight].map((stat, idx) => (
            <StatBlock key={idx} stat={stat} align={idx % 2 === 0 ? 'left' : 'right'} idx={idx} />
          ))}
        </div>

        {/* Layout Desktop: Duas Colunas com Buraco no Meio */}
        <div className="relative w-full max-w-7xl mx-auto hidden lg:flex flex-row items-center justify-between mt-12 gap-0 z-20">
          
          {/* Lado Esquerdo */}
          <div className="w-[30%] flex flex-col gap-10 relative z-20">
            {statsLeft.map((stat, idx) => (
              <StatBlock key={idx} stat={stat} align="right" idx={idx} />
            ))}
          </div>

          {/* Lado Direito */}
          <div className="w-[30%] flex flex-col gap-10 relative z-20">
            {statsRight.map((stat, idx) => (
              <StatBlock key={idx} stat={stat} align="left" idx={idx + 3} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default SobreNumeros;
