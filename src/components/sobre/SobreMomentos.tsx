import { m  } from 'framer-motion';
import { Store, RefreshCcw, Network, ArrowRight, Compass } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { useModalEspecialista } from '../../hooks/useModalEspecialista';

const momentos = [
  {
    icon: <Store size={32} strokeWidth={1.5} />,
    title: "Quero abrir uma farmácia",
    value: "Quero abrir uma farmácia",
    description: "Preciso de orientação societária, tributária e passos iniciais para inaugurar com segurança.",
    cta: "Planejar abertura"
  },
  {
    icon: <RefreshCcw size={32} strokeWidth={1.5} />,
    title: "Quero trocar de contabilidade",
    value: "Quero trocar de contabilidade",
    description: "Minha contabilidade atual não entende do varejo farmacêutico e sinto que estou perdendo dinheiro.",
    cta: "Quero ser Farmacon"
  },
  {
    icon: <Network size={32} strokeWidth={1.5} />,
    title: "Quero inteligência tributária para rede",
    value: "Quero inteligência tributária para minha rede",
    description: "Já possuo múltiplas lojas e preciso de otimização tributária avançada e gestão de holding.",
    cta: "Falar com especialista"
  }
];

const SobreMomentos = () => {
  const { openModal } = useModalEspecialista();
  return (
    <section className="pt-12 md:pt-40 pb-24 md:pb-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-10 xl:px-16 relative z-10">
        
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <SectionHeader
            badgeIcon={<Compass size={14} />}
            badgeText="Soluções Direcionadas"
            titleLines={["Qual é o seu momento?"]}
            subtitle="Independente do tamanho do seu desafio, a Farmacon tem a estrutura exata para levar sua operação ao próximo nível."
            align="center"
            className="!mb-0"
          />
        </div>

        {/* List Layout - Reference Style */}
        <div className="max-w-6xl mx-auto flex flex-col mt-8">
          {momentos.map((item, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`flex flex-col lg:flex-row items-start lg:items-center justify-between py-10 lg:py-14 gap-6 lg:gap-12 border-slate-300 ${idx === 0 ? 'border-t' : 'border-t'} ${idx === momentos.length - 1 ? 'border-b' : ''}`}
            >
              {/* Coluna 1: Icone e Título (Equivalente ao "People") */}
              <div className="w-full lg:w-[35%] flex flex-row items-center gap-3 md:gap-6">
                <div className="text-slate-800 shrink-0">
                  {item.icon}
                </div>
                <h3 className="text-[1.15rem] md:text-3xl font-semibold text-slate-900 tracking-tight leading-tight">
                  {item.title}
                </h3>
              </div>

              {/* Coluna 2: Descrição (Equivalente ao texto central) */}
              <div className="w-full lg:w-[40%]">
                <p className="text-[14px] md:text-[18px] text-slate-500 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Coluna 3: Botão (Equivalente ao Número da referência) */}
              <div className="w-full lg:w-[25%] flex justify-start lg:justify-end mt-4 lg:mt-0">
                <button 
                  onClick={() => openModal(item.value)}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 text-[15px] w-full sm:w-[280px] shadow-[0_4px_14px_rgba(37,99,235,0.2)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.3)] whitespace-nowrap cursor-pointer"
                >
                  {item.cta}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SobreMomentos;
