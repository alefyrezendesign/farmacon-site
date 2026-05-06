import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';

const testimonials = [
  {
    quote: "A clareza que passamos a ter sobre nossos números mudou completamente nossa forma de tomar decisões. Pela primeira vez, sentimos que temos um parceiro estratégico de verdade.",
    author: "Ricardo Almeida",
    role: "CEO, Drogaria Saúde Integrada",
    avatar: "https://i.pravatar.cc/150?img=32"
  },
  {
    quote: "Com a Farmacon, deixamos de apenas pagar impostos e começamos a entender onde nossa margem estava sendo consumida. O impacto no caixa foi imediato.",
    author: "Mariana Costa",
    role: "Diretora Financeira, Rede Pharmavida",
    avatar: "https://i.pravatar.cc/150?img=44"
  },
  {
    quote: "Não é apenas contabilidade. É uma verdadeira consultoria de negócios focada no varejo farmacêutico. O ecossistema de soluções resolve dores que nem sabíamos que tínhamos.",
    author: "João Pedro Silva",
    role: "Sócio Fundador, Essencial Farma",
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    quote: "O time da Farmacon entregou em 3 meses o que nossa antiga contabilidade não conseguiu em 5 anos. Recuperamos mais de R$ 200 mil em tributos pagos a mais.",
    author: "Ana Beatriz Souza",
    role: "Diretora Geral, Rede FarmaPlus",
    avatar: "https://i.pravatar.cc/150?img=47"
  }
];

const CARD_WIDTH = 400; // px
const GAP = 24;

const TestimonialsLight = () => {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const canPrev = current > 0;
  const canNext = current < testimonials.length - 1;

  const goTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(idx, testimonials.length - 1));
    setCurrent(clamped);
  };

  return (
    <section className="py-20 md:py-28 bg-white relative">
      <div className="container mx-auto px-5 md:px-10 xl:px-16">

        {/* Header + Navigation */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
          <div className="lg:w-2/3">
            <SectionHeader
              badgeIcon={<Quote className="w-3.5 h-3.5" />}
              badgeText="Depoimentos"
              title="Quem confia cresce junto"
              align="left"
              className="mb-0 md:mb-0" // override margin because it's side-by-side
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => goTo(current - 1)}
              disabled={!canPrev}
              title="Depoimento anterior"
              aria-label="Depoimento anterior"
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                canPrev
                  ? 'border-surface-300 hover:border-primary-400 hover:bg-primary-50 text-dark-900'
                  : 'border-surface-200 text-surface-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => goTo(current + 1)}
              disabled={!canNext}
              title="Próximo depoimento"
              aria-label="Próximo depoimento"
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                canNext
                  ? 'border-surface-300 hover:border-primary-400 hover:bg-primary-50 text-dark-900'
                  : 'border-surface-200 text-surface-300 cursor-not-allowed'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div className="overflow-hidden">
          <motion.div
            ref={trackRef}
            animate={{ x: -(current * (CARD_WIDTH + GAP)) }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex"
            style={{ gap: GAP }}
          >
            {testimonials.map((item, idx) => (
              <motion.div
                key={idx}
                className="flex-shrink-0 bg-surface-50 p-7 md:p-8 rounded-2xl border border-surface-200 flex flex-col"
                style={{ width: CARD_WIDTH }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * idx }}
              >
                <Quote size={32} className="text-primary-200 fill-primary-100 mb-5" />
                <p className="text-surface-600 text-base leading-relaxed mb-6 flex-1">
                  "{item.quote}"
                </p>
                <div className="flex items-center gap-3 mt-auto pt-5 border-t border-surface-200">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h4 className="font-bold text-dark-900 text-sm">{item.author}</h4>
                    <p className="text-xs text-surface-500">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              title={`Ir para o depoimento ${i + 1}`}
              aria-label={`Ir para o depoimento ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? 'bg-primary-500 w-6' : 'bg-surface-300 hover:bg-surface-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsLight;
