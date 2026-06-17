import { m, AnimatePresence  } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ArrowRight, MessageCircle, HelpCircle } from 'lucide-react';
import { useModalEspecialista } from '../../hooks/useModalEspecialista';
import SectionHeader from '../ui/SectionHeader';

const faqs = [
  {
    question: "Por que escolher uma contabilidade especializada em farmácias?",
    answer: "Farmácias possuem regras tributárias e regulatórias únicas. A Farmacon domina essas particularidades, identifica oportunidades de economia fiscal e evita riscos que contabilidades generalistas não conseguem prever, atuando como um parceiro estratégico para o seu crescimento."
  },
  {
    question: "Como funciona o processo de migração ou troca de contador?",
    answer: "O processo é simples e 100% conduzido pelo nosso time de onboarding. Nós assumimos o contato com seu contador atual e gerenciamos toda a burocracia da transição, garantindo que a operação da sua farmácia não pare por um único minuto."
  },
  {
    question: "É seguro fazer a recuperação de impostos da minha farmácia?",
    answer: "Absolutamente. A Farmacon atua apenas em teses tributárias já pacificadas pelos tribunais superiores. Nossa equipe jurídica e contábil audita suas operações, garantindo segurança total e legalidade na recuperação de impostos pagos indevidamente."
  },
  {
    question: "A Farmacon auxilia na abertura de novas farmácias e filiais?",
    answer: "Sim! Se você é nosso cliente, a assessoria para abertura de novas lojas é gratuita. Cuidamos de toda a burocracia, e você paga apenas as taxas oficiais do governo e dos órgãos reguladores."
  },
  {
    question: "Como saber qual é o melhor regime tributário para o meu negócio?",
    answer: "O enquadramento ideal (Simples Nacional, Lucro Presumido ou Lucro Real) exige mais que suposições. Realizamos um diagnóstico profundo da sua operação para definir a estratégia que gera a maior economia de impostos dentro da lei."
  },
  {
    question: "A Farmacon atende farmácias de todo o Brasil?",
    answer: "Sim. Operamos em todo o território nacional. Combinamos inteligência digital, tecnologia de ponta e um time multidisciplinar (contadores, advogados e economistas) para entregar resultados com agilidade em qualquer estado."
  }
];

const PerguntasFrequentes = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openModal } = useModalEspecialista();

  return (
    <section id="contato" className="relative bg-white pt-8 pb-20 md:pt-12 md:pb-28">
      <div className="container mx-auto px-5 md:px-10 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left — PerguntasFrequentes */}
          <div className="flex flex-col">
            <SectionHeader
              badgeIcon={<HelpCircle className="w-3.5 h-3.5" />}
              badgeText="Perguntas Frequentes"
              titleLines={["Tudo o que você", "precisa saber"]}
              align="left"
              className="mb-6 md:mb-8"
            />

            <div className="space-y-3">
              {faqs.map((PerguntasFrequentes, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`bg-white rounded-xl border transition-all duration-300 ${isOpen ? 'border-primary-300 shadow-md' : 'border-surface-200 hover:border-surface-300'}`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                    >
                      <span className={`text-base font-semibold transition-colors duration-300 pr-4 ${isOpen ? 'text-primary-600' : 'text-dark-900'}`}>
                        {PerguntasFrequentes.question}
                      </span>
                      <m.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className={`flex-shrink-0 p-1.5 rounded-full ${isOpen ? 'bg-primary-50 text-primary-600' : 'bg-surface-50 text-surface-400'}`}
                      >
                        <ChevronDown size={18} />
                      </m.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <m.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 text-surface-600 text-sm leading-relaxed">
                            {PerguntasFrequentes.answer}
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — CTA */}
          <div className="flex items-stretch h-full">
            <div className="w-full rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col items-start justify-center text-left relative overflow-hidden shadow-2xl shadow-primary-600/20">
              {/* Video Background */}
              <div className="absolute inset-0 z-0 bg-primary-900">
                <video
                  src="/background/cta-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-primary-900/60 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent" />
              </div>
              
              <div className="relative z-10 w-full">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-8 backdrop-blur-sm border border-white/20">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-5 leading-tight">
                  O próximo passo <br className="hidden lg:block"/>para a sua farmácia.
                </h3>

                <p className="text-[15px] md:text-lg text-primary-100 font-light max-w-md mb-10 leading-relaxed">
                  Agende uma conversa com nossos especialistas e descubra como a Farmacon pode estruturar o seu crescimento.
                </p>

                <button
                  onClick={() => openModal()}
                  className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 md:gap-3 px-4 sm:px-8 py-4 bg-primary-600 text-white rounded-full font-bold text-sm md:text-base hover:bg-primary-500 hover:scale-105 transition-all duration-300 whitespace-nowrap"
                >
                  Quero crescer com a Farmacon
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PerguntasFrequentes;

