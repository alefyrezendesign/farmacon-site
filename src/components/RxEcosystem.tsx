import { motion } from 'framer-motion';
import { ArrowRight, Network } from 'lucide-react';
import { useSolutionsModal } from '../hooks/useSolutionsModal';
import SectionHeader from './ui/SectionHeader';

const RxEcosystem = () => {
  const { openModal } = useSolutionsModal();

  return (
    <section id="rx-solucoes" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Subtle animated gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-primary-100/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-blue-100/30 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-5 md:px-10 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Content */}
          <div className="flex flex-col items-start pb-0 lg:pb-10">
            <SectionHeader
              badgeIcon={<Network className="w-3.5 h-3.5" />}
              badgeText="RX Soluções"
              title={
                <>
                  Muito além da <br className="hidden md:block" />
                  contabilidade
                </>
              }
              subtitle={
                <>
                  A <strong className="text-dark-900 font-medium">RX Soluções</strong> é um hub comercial que integra nosso ecossistema de serviços, operação e parceiros estratégicos. Combinamos diagnóstico, parceiros estratégicos e operação comercial para conectar cada empresa às soluções mais aderentes ao seu momento de crescimento.
                </>
              }
              align="left"
              className="mb-8 md:mb-8"
            />

            <motion.button
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => openModal()}
              className="group inline-flex items-center gap-3 px-8 py-3.5 bg-dark-900 text-white rounded-full font-semibold text-[15px] hover:bg-primary-600 transition-colors shadow-lg"
            >
              Conhecer o RX Soluções
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          {/* Right — Visual abstract */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full aspect-square max-w-[450px]">
              {/* Concentric rings */}
              <div className="absolute inset-0 rounded-full border border-primary-200/50" />
              <div className="absolute inset-[15%] rounded-full border border-primary-300/40" />
              <div className="absolute inset-[30%] rounded-full border border-primary-400/30 bg-white/50 backdrop-blur-sm shadow-xl" />

              {/* Center label */}
              <div className="absolute inset-[35%] rounded-full bg-white flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary-600">RX</p>
                  <p className="text-[10px] uppercase tracking-widest text-surface-400 font-semibold mt-1">Soluções</p>
                </div>
              </div>

              {/* Orbiting dots */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-primary-500 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
                <div className="absolute bottom-[15%] right-0 w-2 h-2 bg-primary-400 rounded-full translate-x-1/2 shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
              </motion.div>

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[15%]"
              >
                <div className="absolute top-1/2 left-0 w-2.5 h-2.5 bg-primary-300 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(147,197,253,0.6)]" />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default RxEcosystem;
