import { useState } from 'react';
import { m, AnimatePresence  } from 'framer-motion';
import { useModalRxSolucoes } from '../../hooks/useModalRxSolucoes';

const accordionData = [
  {
    title: 'RX Análises',
    description: 'Inteligência estratégica baseada em dados reais do seu negócio. Avaliamos cenários, identificamos oportunidades e entregamos diagnósticos precisos para decisões mais seguras.',
    tags: ['Diagnóstico Estratégico', 'Análise de Dados', 'Inteligência de Mercado', 'Relatórios Personalizados'],
  },
  {
    title: 'Partner Program',
    description: 'Rede curada de parceiros especializados em tecnologia, marketing, jurídico e gestão. Conectamos sua empresa aos melhores fornecedores com curadoria e acompanhamento.',
    tags: ['Curadoria de Parceiros', 'Tecnologia', 'Marketing Digital', 'Gestão e Jurídico'],
  },
  {
    title: 'Operação e Soluções',
    description: 'Acompanhamento completo da operação comercial, do planejamento à execução. Garantimos que as estratégias saiam do papel e gerem resultados mensuráveis.',
    tags: ['Operação Comercial', 'Planejamento Estratégico', 'Acompanhamento de Resultados', 'Crescimento Escalável'],
  },
];

const EcossistemaRx = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { openModal } = useModalRxSolucoes();

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="rx-solucoes" className="-mt-12 lg:-mt-20 flex flex-col bg-[#050505] relative overflow-hidden w-full z-20 min-h-[103.125vw]">
      {/* Unified Background Image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img src="/background/bg-rx-gradient.jpg" alt="" className="w-full h-full object-cover object-top" loading="lazy" decoding="async" />
      </div>

      {/* Fade to blend with white section above */}
      <div className="absolute top-0 left-0 w-full h-32 lg:h-48 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>

      {/* SECTION 1: HERO */}
      <div className="min-h-[100svh] flex flex-col justify-center pt-[12rem] lg:pt-[14rem] pb-0 relative z-10">
        <div className="container mx-auto px-5 md:px-10 xl:px-16 flex flex-col gap-16 lg:gap-24">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Large Title */}
          <div className="flex flex-col items-start lg:pr-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] font-medium text-white tracking-tight leading-[1.2] mb-0 max-w-full">
              <span className="inline-block whitespace-nowrap">Muito além da contabilidade</span><br />
              <span className="inline-block whitespace-nowrap">um ecossistema de soluções</span><br />
              <span className="inline-block whitespace-nowrap">e parcerias estratégicas.</span>
            </h2>
            
            <button 
              onClick={() => openModal()}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 font-semibold text-white text-base sm:text-lg transition-all duration-300 bg-blue-600/20 border border-blue-500/30 rounded-full hover:bg-blue-600/40 hover:border-blue-400 hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] overflow-hidden backdrop-blur-md cursor-pointer mt-8 lg:mt-10"
            >
              <span className="relative z-10 flex items-center gap-2 text-blue-100 group-hover:text-white transition-colors">
                Explorar Soluções
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-5 h-5 text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1.5 transition-all duration-300" aria-hidden="true">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
            </button>
          </div>

          {/* Right — Visual abstract */}
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center w-full h-[350px] md:h-[450px] lg:h-[500px] group cursor-pointer"
          >
            {/* The entire Hub Wrapper for scaling on hover */}
            <div className="relative w-full max-w-[350px] md:max-w-[400px] lg:max-w-[450px] aspect-square flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105">
              
              {/* Outer Rings */}
              <div className="absolute inset-[0%] rounded-full border border-blue-600 transition-colors duration-700 group-hover:border-blue-400/30 group-hover:bg-blue-600/[0.01] group-hover:shadow-[0_0_60px_rgba(37,99,235,0.10)]" />
              <div className="absolute inset-[8%] rounded-full border border-blue-600 transition-colors duration-700 group-hover:border-blue-400/50 group-hover:bg-blue-600/[0.03]" />
              <div className="absolute inset-[16%] rounded-full border border-blue-600 transition-colors duration-700 group-hover:border-blue-400/70 group-hover:bg-blue-600/5" />
              <div className="absolute inset-[24%] rounded-full border border-blue-600 transition-colors duration-700 group-hover:border-blue-400/90 group-hover:bg-blue-600/10" />

              {/* Orbiting dot 1 (Ring 1) */}
              <m.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[0%] pointer-events-none"
              >
                <div className="absolute inset-0 rounded-full border-2 border-blue-500 opacity-60 group-hover:opacity-100 group-hover:border-blue-300 transition-all duration-500 [mask-image:conic-gradient(from_180deg,transparent_0deg,black_90deg,transparent_90deg)] [-webkit-mask-image:conic-gradient(from_180deg,transparent_0deg,black_90deg,transparent_90deg)]" />
                <div className="absolute top-1/2 left-0 w-3 h-3 bg-blue-600 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_12px_rgba(37,99,235,0.8)] group-hover:bg-white group-hover:w-4 group-hover:h-4 group-hover:shadow-[0_0_30px_#ffffff] transition-all duration-500" />
              </m.div>

              {/* Orbiting dot 2 (Ring 2) */}
              <m.div
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[8%] pointer-events-none"
              >
                <div className="absolute inset-0 rounded-full border-2 border-blue-500 opacity-60 group-hover:opacity-100 group-hover:border-blue-300 transition-all duration-500 [mask-image:conic-gradient(from_0deg,black_0deg,transparent_90deg,transparent_360deg)] [-webkit-mask-image:conic-gradient(from_0deg,black_0deg,transparent_90deg,transparent_360deg)]" />
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-blue-600 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_12px_rgba(37,99,235,0.8)] group-hover:bg-white group-hover:w-4 group-hover:h-4 group-hover:shadow-[0_0_30px_#ffffff] transition-all duration-500" />
              </m.div>
              
              {/* Orbiting dot 3 (Ring 3) */}
              <m.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 108, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[16%] pointer-events-none"
              >
                <div className="absolute inset-0 rounded-full border-2 border-blue-500 opacity-60 group-hover:opacity-100 group-hover:border-blue-300 transition-all duration-500 [mask-image:conic-gradient(from_90deg,transparent_0deg,black_90deg,transparent_90deg)] [-webkit-mask-image:conic-gradient(from_90deg,transparent_0deg,black_90deg,transparent_90deg)]" />
                <div className="absolute bottom-0 right-1/2 w-2.5 h-2.5 bg-blue-600 rounded-full translate-x-1/2 translate-y-1/2 shadow-[0_0_10px_rgba(37,99,235,0.8)] group-hover:bg-white group-hover:w-3.5 group-hover:h-3.5 group-hover:shadow-[0_0_25px_#ffffff] transition-all duration-500" />
              </m.div>

              {/* Orbiting dot 4 (Ring 4) */}
              <m.div
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[24%] pointer-events-none"
              >
                <div className="absolute inset-0 rounded-full border-2 border-blue-500 opacity-60 group-hover:opacity-100 group-hover:border-blue-300 transition-all duration-500 [mask-image:conic-gradient(from_90deg,black_0deg,transparent_90deg,transparent_360deg)] [-webkit-mask-image:conic-gradient(from_90deg,black_0deg,transparent_90deg,transparent_360deg)]" />
                <div className="absolute top-1/2 right-0 w-2.5 h-2.5 bg-blue-600 rounded-full translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(37,99,235,0.8)] group-hover:bg-white group-hover:w-3.5 group-hover:h-3.5 group-hover:shadow-[0_0_25px_#ffffff] transition-all duration-500" />
              </m.div>

              {/* Center Hub */}
              <div className="absolute inset-[32%] rounded-full bg-gradient-to-br from-blue-950 to-black flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-blue-600 transition-all duration-700 group-hover:border-blue-500 group-hover:shadow-[0_0_80px_rgba(37,99,235,0.6),inset_0_0_40px_rgba(37,99,235,0.3)] z-20 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.8)_0%,transparent_75%)] opacity-20 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <img 
                  src="/logo/rx-icon.png" 
                  alt="RX" 
                  className="w-[50%] object-contain relative z-10 transition-all duration-700 group-hover:drop-shadow-[0_0_20px_rgba(37,99,235,1)] group-hover:scale-110" 
                />
              </div>

            </div>
          </m.div>

        </div>

        {/* Bottom Section - Logo + Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 py-8 md:py-12 border-y-[3px] border-white/10 mt-8 lg:mt-0 items-center">
          <div className="flex items-center gap-6 md:gap-8">
            <img src="/logo/farmacon_logo_horizontal_branca.png" alt="Farmacon" className="h-9 md:h-11 object-contain" loading="lazy" decoding="async" />
            <div className="w-1 h-10 md:h-14 bg-white/40 rounded-full max-w-[3px]" />
            <img src="/logo/rx-logo-branca.webp" alt="RX Soluções" className="h-8 md:h-10 object-contain" loading="lazy" decoding="async" />
          </div>
          <p className="text-lg md:text-xl text-slate-300/90 leading-relaxed font-light">
            A <strong className="text-white font-medium">RX Soluções</strong> é um hub comercial que integra um ecossistema de serviços, diagnóstico, operação e parceiros estratégicos. Conectamos sua empresa às melhores soluções de maneira aderentes ao seu momento de crescimento.
          </p>
        </div>
        </div>
      </div>

      {/* SECTION 2: CARDS GRID */}
      <div className="w-full relative z-10 py-16 lg:py-24 mt-auto">
        <div className="container mx-auto px-5 md:px-10 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 border-y-[3px] border-white/10 md:divide-x-[3px] md:divide-y-0 divide-y-[3px] divide-white/10 border-x-0 md:border-x-[3px]">
            
            {/* Card 1 */}
            <div className="group relative p-10 lg:p-14 flex flex-col items-start bg-transparent hover:bg-white/[0.02] transition-colors duration-500 cursor-pointer">
              <div className="w-12 h-12 mb-10 lg:mb-12 rounded-lg bg-blue-900/20 border border-blue-500/30 flex items-center justify-center group-hover:border-blue-400 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-500">
                 <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 drop-shadow-[0_0_8px_rgba(37,99,235,0.8)]">
                   <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
                   <path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
                   <path d="m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
                 </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4 tracking-tight">Visão Sistêmica</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                 Compreendemos o seu negócio de ponta a ponta, integrando diferentes áreas para criar estratégias que funcionam na prática.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group relative p-10 lg:p-14 flex flex-col items-start bg-transparent hover:bg-white/[0.02] transition-colors duration-500 cursor-pointer">
              <div className="w-12 h-12 mb-10 lg:mb-12 rounded-lg bg-blue-900/20 border border-blue-500/30 flex items-center justify-center group-hover:border-blue-400 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-500">
                 <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 drop-shadow-[0_0_8px_rgba(37,99,235,0.8)]">
                   <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                   <polyline points="16 7 22 7 22 13" />
                 </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4 tracking-tight">Crescimento Escalável</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                 Focamos em resultados duradouros, construindo bases sólidas para que sua empresa escale de forma segura e contínua.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group relative p-10 lg:p-14 flex flex-col items-start bg-transparent hover:bg-white/[0.02] transition-colors duration-500 cursor-pointer">
              <div className="w-12 h-12 mb-10 lg:mb-12 rounded-lg bg-blue-900/20 border border-blue-500/30 flex items-center justify-center group-hover:border-blue-400 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-500">
                 <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 drop-shadow-[0_0_8px_rgba(37,99,235,0.8)]">
                   <circle cx="12" cy="5" r="3" />
                   <circle cx="5" cy="19" r="3" />
                   <circle cx="19" cy="19" r="3" />
                   <line x1="12" y1="8" x2="5" y2="16" />
                   <line x1="12" y1="8" x2="19" y2="16" />
                 </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4 tracking-tight">Conexões de Valor</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                 Encurtamos caminhos ao conectar sua operação a um ecossistema exclusivo de soluções validadas pelo mercado.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION 3: EXPANDABLE ACCORDION */}
      <div className="w-full relative z-10 pb-56 pt-0">
        <div className="container mx-auto px-5 md:px-10 xl:px-16">
          <div className="border-t-[3px] border-white/10">
            {accordionData.map((item, index) => (
              <div key={index} className="border-b-[3px] border-white/10">
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between py-8 md:py-10 cursor-pointer group text-left"
                >
                  <h3 className={`text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight transition-colors duration-300 ${
                    openIndex === index ? 'text-white' : 'text-white group-hover:text-blue-500'
                  }`}>
                    {item.title}
                  </h3>
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 ml-6 transition-all duration-500 ${
                    openIndex === index 
                      ? 'border-blue-500 bg-blue-500/10 rotate-45' 
                      : 'border-white/20 group-hover:border-white/40'
                  }`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70">
                      <path d="M12 5v14" /><path d="M5 12h14" />
                    </svg>
                  </div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence>
                  {openIndex === index && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 md:pb-12 max-w-2xl">
                        <p className="text-lg md:text-xl text-slate-300/80 leading-relaxed font-light mb-8">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {item.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-4 py-2 rounded-full border border-blue-500/40 text-sm text-blue-400 font-light"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default EcossistemaRx;
