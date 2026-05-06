import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useSolutionsModal } from '../hooks/useSolutionsModal';

const FinalCTA = () => {
  const { openModal } = useSolutionsModal();

  return (
    <section className="py-24 md:py-32 bg-primary-600 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-500/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-700/50 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10 bg-radial-dots-white" />
      </div>

      <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-white/20">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-8">
            O próximo passo para a sua <br className="hidden md:block"/> farmácia.
          </h2>
          
          <p className="text-xl md:text-2xl text-primary-100 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            Pare de deixar dinheiro na mesa. Agende uma conversa com nossos especialistas e descubra como a Farmacon pode estruturar o seu crescimento.
          </p>

          <button 
            onClick={() => openModal()}
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-primary-600 rounded-full font-bold text-lg hover:bg-surface-50 transition-colors shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            Quero crescer com a Farmacon
            <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform text-primary-600" />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
