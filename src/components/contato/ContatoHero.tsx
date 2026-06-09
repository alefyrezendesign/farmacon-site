import { m } from 'framer-motion';
import ContatoForm from './ContatoForm';
import { useModalEspecialista } from '../../hooks/useModalEspecialista';
import { TypewriterBadge } from '../ui/TypewriterBadge';

const ContatoHero = () => {
  const { openModal } = useModalEspecialista();
  return (
    <section className="relative w-full pt-4 pb-16 md:pt-6 md:pb-24 bg-white overflow-hidden">
      <div className="w-full px-4 md:px-8 xl:px-12 mx-auto">
        {/* Top Rounded Card */}
        <div className="bg-primary-600 rounded-[32px] md:rounded-[48px] p-8 md:p-12 lg:p-16 flex flex-col items-start justify-center text-left relative overflow-hidden mb-16 md:mb-24 shadow-2xl shadow-primary-900/20 min-h-[350px] md:min-h-[400px]">
          
          {/* Background Image */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img 
              src="/background/background-contato.webp" 
              alt="Fundo Contato" 
              className="w-full h-full object-cover" 
              fetchPriority="high"
            />
          </div>

          {/* Subtle Background Elements for the card (Overlays) */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[150%] bg-gradient-to-b from-white/5 to-transparent opacity-50" />
            <div className="absolute -top-1/2 right-1/4 w-[50%] h-[150%] bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-[80px]" />
          </div>

          <div className="w-full relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex flex-col items-start max-w-3xl">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-6"
              >
                <TypewriterBadge 
                  text="CONTATO"
                  icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>}
                  inverted
                  autoStart
                />
              </m.div>

              <m.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight text-white leading-[1.1] text-left"
              >
                Fale com nossos <br className="hidden md:block"/>
                especialistas.
              </m.h1>
            </div>

            <m.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="shrink-0 mt-8 md:mt-0 w-full md:w-auto"
            >
              <button 
                onClick={() => openModal()} 
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-[15px] transition-all shadow-[0_8px_20px_rgba(59,130,246,0.25)] bg-blue-500 text-white hover:bg-blue-400 hover:shadow-[0_8px_25px_rgba(59,130,246,0.35)] cursor-pointer"
              >
                Falar com especialista
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right group-hover:translate-x-1 transition-transform" aria-hidden="true">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </m.div>
          </div>
        </div>

        {/* Bottom Centered Statement with Avatars */}
        <div className="max-w-5xl mx-auto text-center pb-8 md:pb-16">
          <m.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-[2.2rem] md:text-5xl lg:text-[4rem] font-medium tracking-tight text-dark-900 leading-[1.2] inline-flex flex-wrap justify-center items-center gap-x-3 gap-y-2"
          >
            <span>Descubra o poder</span>
            <span>da inteligência em</span>
            
            <span className="inline-flex items-center mx-2 bg-surface-50 rounded-full p-1.5 border border-surface-200 shadow-sm align-middle">
              <img src="/small-fotos-contato/small-fotos-contato-1.jpg" alt="Especialista 1" className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full border-[3px] border-white object-cover" />
              <img src="/small-fotos-contato/small-fotos-contato-2.jpg" alt="Especialista 2" className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full border-[3px] border-white object-cover -ml-4" />
              <img src="/small-fotos-contato/small-fotos-contato-3.jpg" alt="Especialista 3" className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full border-[3px] border-white object-cover -ml-4" />
              <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full border-[3px] border-white bg-dark-900 text-white flex items-center justify-center -ml-4 text-base md:text-xl font-medium z-10 shadow-sm">
                +
              </div>
            </span>
            
            <span>gestão farmacêutica</span>
          </m.h2>
        </div>

        {/* Contact Form & Info Section */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mt-8 md:mt-12">
          
          {/* Left Column - Contact Information */}
          <m.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-white rounded-[32px] p-8 md:p-10 border-2 border-surface-200 shadow-sm flex flex-col h-full"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-dark-900 mb-8">Informações de Contato</h3>

            <div className="space-y-8 flex-1">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div>
                  <h4 className="text-dark-900 font-semibold mb-1">Telefones</h4>
                  <p className="text-surface-500 text-sm md:text-base">
                    (21) 2635-4903 <br/> 
                    (21) 97180-7881
                  </p>
                </div>
              </div>
              
              <div className="w-full h-[2px] bg-surface-200"></div>
              
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                </div>
                <div>
                  <h4 className="text-dark-900 font-semibold mb-1">E-mail</h4>
                  <p className="text-surface-500 text-sm md:text-base">relacionamento@farmacon.com.br</p>
                </div>
              </div>

              <div className="w-full h-[2px] bg-surface-200"></div>

              {/* Opening Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <div>
                  <h4 className="text-dark-900 font-semibold mb-1">Horário de Atendimento</h4>
                  <p className="text-surface-500 text-sm md:text-base">Segunda a Quinta: 08h00 – 18h00<br/>Sexta: 08h00 – 17h00</p>
                </div>
              </div>

              <div className="w-full h-px bg-surface-100"></div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div className="flex flex-col gap-5">
                  <div>
                    <h4 className="text-dark-900 font-semibold mb-1">Matriz - Itaboraí</h4>
                    <p className="text-surface-500 text-sm leading-relaxed">
                      Prédio Hellix - Av. Vinte e Dois de Maio, 6331<br/>
                      Bloco 1, 7º andar<br/>
                      Jardim Imperial, Itaboraí - RJ<br/>
                      CEP: 24800-258
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </m.div>

          {/* Right Column - Form */}
          <m.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 bg-surface-50 rounded-[32px] p-8 md:p-10 lg:p-12 border-2 border-surface-200 shadow-sm flex flex-col justify-center h-full"
          >
            <div className="mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-dark-900 tracking-tight">Envie uma mensagem</h3>
            </div>

            <ContatoForm />
          </m.div>
        </div>

      </div>
    </section>
  );
};

export default ContatoHero;
