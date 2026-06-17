import { m } from 'framer-motion';
import { MapPin, Building2, ExternalLink } from 'lucide-react';
import { TypewriterBadge } from '../ui/TypewriterBadge';

const outrasUnidades = [
  { cidade: "Rio de Janeiro", estado: "RJ", pais: "Brasil", flagCode: "br" },
  { cidade: "Goiânia", estado: "GO", pais: "Brasil", flagCode: "br" },
  { cidade: "Curitiba", estado: "PR", pais: "Brasil", flagCode: "br" },
  { cidade: "Lisboa", estado: "", pais: "Portugal", flagCode: "pt" },
];

const ContatoMapa = () => {
  return (
    <section className="py-24 bg-primary-50 relative">
      <div className="container mx-auto px-4 md:px-6 xl:px-12 max-w-6xl">
        
        {/* Title */}
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="mb-4">
             <TypewriterBadge text="Nossas Unidades" icon={<Building2 size={16} />} className="bg-white border-surface-200" />
          </div>
          <m.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-dark-900 tracking-tight leading-tight"
          >
            Onde estamos
          </m.h2>
        </div>

        {/* Map Container */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-white p-2 rounded-[32px] md:rounded-[48px] shadow-xl shadow-surface-200/50 border border-surface-200 mb-4 md:mb-6 group"
        >
          <div className="relative w-full h-[400px] md:h-[500px] rounded-[24px] md:rounded-[40px] overflow-hidden isolate">
            <iframe 
              src="https://maps.google.com/maps?q=Edif%C3%ADcio%20Hellix%20-%20Av.%20Vinte%20e%20Dois%20de%20Maio,%206331%20-%20Itabora%C3%AD%20-%20RJ&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale-[20%] contrast-125 opacity-90 mix-blend-multiply"
              title="Mapa da Matriz Itaboraí"
            ></iframe>
            
            {/* Click Overlay */}
            <a 
              href="https://www.google.com/maps/place/Edif%C3%ADcio+Hellix+Business+Center/@-22.7883296,-42.8631165,15z/data=!4m6!3m5!1s0x99cbfb9b009eeb:0xc665b1cdb1c55bba!8m2!3d-22.7883296!4d-42.8605416" 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute inset-0 bg-transparent flex items-center justify-center opacity-0 group-hover:bg-dark-900/30 group-hover:opacity-100 transition-all duration-300 z-10"
              aria-label="Abrir no Google Maps"
            >
              <span className="flex items-center gap-2 bg-white text-dark-900 font-bold px-6 py-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <ExternalLink size={18} className="text-primary-600" />
                Ver no Google Maps
              </span>
            </a>

            {/* Matriz Label (bottom left) */}
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-white/95 backdrop-blur-md p-6 rounded-[24px] shadow-xl border border-white/80 max-w-sm z-20 pointer-events-none">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 border border-primary-100 shadow-sm">
                  <MapPin size={22} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-dark-900 text-lg leading-tight tracking-tight">Matriz Itaboraí</h3>
                  <p className="text-primary-600 font-bold text-xs uppercase tracking-widest mt-0.5">Rio de Janeiro</p>
                </div>
              </div>
              <p className="text-surface-600 text-sm leading-relaxed mt-4 font-medium">
                Prédio Hellix - Av. Vinte e Dois de Maio, 6331<br/>Bloco 1, 7º andar - Jardim Imperial
              </p>
            </div>
          </div>
        </m.div>

        {/* Global Presence */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
            {outrasUnidades.map((loc, i) => (
              <div 
                key={i}
                className="flex items-center p-4 md:p-8 bg-white border border-surface-200 rounded-[20px] md:rounded-[24px] shadow-sm"
              >
                <div className="relative shrink-0 mr-4 md:mr-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-surface-100 shadow-sm bg-primary-50 flex items-center justify-center text-primary-600">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 stroke-[2]" />
                  </div>
                  {/* Small visual element: Flag */}
                  <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-7 h-7 md:w-9 md:h-9 bg-white rounded-full shadow-sm border-[2px] md:border-[3px] border-white overflow-hidden flex items-center justify-center">
                    <img 
                      src={`https://flagcdn.com/w40/${loc.flagCode}.png`} 
                      alt={`Bandeira ${loc.pais}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col flex-1 text-left">
                  <h4 className="font-extrabold text-dark-900 text-[17px] md:text-2xl mb-0.5 md:mb-1">
                    {loc.cidade}
                  </h4>
                  <span className="font-medium text-surface-500 text-[13px] md:text-base">
                    {loc.estado ? `${loc.estado} • ${loc.pais}` : loc.pais}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </m.div>

      </div>
    </section>
  );
};

export default ContatoMapa;
