import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ArrowRight, MessageCircle, HelpCircle } from 'lucide-react';
import { useSolutionsModal } from '../hooks/useSolutionsModal';
import SectionHeader from './ui/SectionHeader';

const faqs = [
  {
    question: "A Farmacon atende farmácias de todo o Brasil?",
    answer: "Sim. Nossa operação é 100% digital e estruturada para atender redes e farmácias independentes em todo o território nacional, garantindo a mesma qualidade e proximidade."
  },
  {
    question: "Qual a diferença da Farmacon para uma contabilidade tradicional?",
    answer: "Enquanto a contabilidade tradicional foca apenas em gerar guias e cumprir obrigações fiscais, nós atuamos como parceiros estratégicos. Focamos em proteger sua margem, recuperar impostos, analisar dados e direcionar o crescimento do seu negócio."
  },
  {
    question: "Como funciona o processo de migração de contabilidade?",
    answer: "O processo é simples, seguro e totalmente guiado pelo nosso time de onboarding. Nós cuidamos de toda a transição de documentos e dados, sem que sua operação precise parar por um único minuto."
  },
  {
    question: "Vocês atendem outros segmentos além de farmácias?",
    answer: "Nosso foco principal e expertise profunda estão no varejo farmacêutico. Isso nos permite ter um nível de profundidade analítica e conhecimento tributário que contabilidades generalistas não conseguem oferecer."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openModal } = useSolutionsModal();

  return (
    <section id="contato" className="relative bg-white py-20 md:py-28">
      <div className="container mx-auto px-5 md:px-10 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left — FAQ */}
          <div className="flex flex-col">
            <SectionHeader
              badgeIcon={<HelpCircle className="w-3.5 h-3.5" />}
              badgeText="FAQ"
              title="Perguntas Frequentes"
              subtitle="Tire suas principais dúvidas sobre como a Farmacon pode ajudar no dia a dia da sua farmácia."
              align="left"
              className="mb-10 md:mb-12"
            />

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.08 * idx }}
                    className={`bg-white rounded-xl border transition-all duration-300 ${isOpen ? 'border-primary-300 shadow-md' : 'border-surface-200 hover:border-surface-300'}`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                    >
                      <span className={`text-base font-semibold transition-colors duration-300 pr-4 ${isOpen ? 'text-primary-600' : 'text-dark-900'}`}>
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className={`flex-shrink-0 p-1.5 rounded-full ${isOpen ? 'bg-primary-50 text-primary-600' : 'bg-surface-50 text-surface-400'}`}
                      >
                        <ChevronDown size={18} />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 text-surface-600 text-sm leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right — CTA */}
          <div className="flex items-stretch h-full">
            <div className="w-full bg-primary-600 rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col items-center lg:items-start justify-center text-center lg:text-left relative overflow-hidden shadow-2xl shadow-primary-600/20">
              {/* Background depth */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-500/50 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary-700/50 rounded-full blur-[80px] translate-y-1/3 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-8 backdrop-blur-sm border border-white/20">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-5 leading-tight">
                  O próximo passo <br className="hidden lg:block"/>para a sua farmácia.
                </h3>

                <p className="text-base md:text-lg text-primary-100 font-light max-w-md mb-10 leading-relaxed">
                  Agende uma conversa com nossos especialistas e descubra como a Farmacon pode estruturar o seu crescimento.
                </p>

                <button
                  onClick={() => openModal()}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-600 rounded-full font-bold text-base hover:bg-surface-50 transition-colors shadow-xl"
                >
                  Quero crescer com a Farmacon
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
