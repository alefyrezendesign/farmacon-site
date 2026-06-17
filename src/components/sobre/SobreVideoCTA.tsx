import { m  } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useModalEspecialista } from '../../hooks/useModalEspecialista';

const SobreVideoCTA = () => {
  const { openModal } = useModalEspecialista();
  return (
    <section className="pt-2 md:pt-16 pb-2 md:pb-4">
      <div className="container mx-auto px-5 md:px-10 xl:px-16">
        <div className="relative w-full py-16 md:py-20 rounded-3xl flex items-center justify-center overflow-hidden">
      
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          src="/background/sobre-bg/cta-bg.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        />
        {/* Dark/Gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-8 md:px-16 flex flex-col md:flex-row items-start md:items-center justify-between text-left gap-8 md:gap-12">
        
        {/* Left Column - Text */}
        <div className="flex-1 w-full max-w-[500px] lg:max-w-[600px]">
          <m.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-4 leading-tight [text-wrap:balance]"
          >
            Pronto para crescer com a gente?
          </m.h2>
  
          <m.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[15px] md:text-lg text-white/80 font-light max-w-[400px]"
          >
            Faça parte do ecossistema que está <br className="hidden md:block" />
            redefinindo o padrão de resultados <br className="hidden md:block" />
            no varejo farmacêutico do Brasil.
          </m.p>
        </div>

        {/* Right Column - Button */}
        <m.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full md:w-auto"
        >
          <button 
            onClick={() => openModal()} 
            className="w-full justify-center group flex items-center gap-3 bg-white text-slate-900 px-8 py-3.5 rounded-full font-semibold text-[15px] hover:bg-slate-50 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            Junte-se a nós
            <div className="bg-slate-100 rounded-full p-1.5 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
              <ArrowRight size={16} />
            </div>
          </button>
        </m.div>
      </div>

        </div>
      </div>
    </section>
  );
};

export default SobreVideoCTA;
