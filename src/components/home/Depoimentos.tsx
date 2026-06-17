import { useState } from 'react';
import { Quote, X, Play, ChevronLeft, ChevronRight, Handshake } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { m, AnimatePresence  } from 'framer-motion';

const writtenTestimonials = [
  {
    name: "Juliano Blotta",
    pharmacy: "Farmácia Quero bem",
    quote: "A FARMACON auxilia em todos os processos e são verdadeiros especialistas. O profissionalismo, capacidade técnica e agilidade da equipe são excelentes. Não imagino minha farmácia com outra empresa!"
  },
  {
    name: "Igor",
    pharmacy: "Drogarias Unidas",
    quote: "Notamos uma evolução de 95% na parte contábil, o que resultou em um grande crescimento para nossa rede. Estamos muito satisfeitos e confiamos na Farmacon para alcançarmos novos patamares."
  },
  {
    name: "Osvandir",
    pharmacy: "MedFácil",
    quote: "Recebemos uma assessoria contábil completa. A Farmacon nos ajuda no planejamento tributário e até já realizamos recuperação de créditos tributários graças ao excelente trabalho deles."
  },
  {
    name: "Luciano",
    pharmacy: "Grupo Medeiros de Farmácias",
    quote: "O nível de atendimento superou as expectativas. Estou no ramo há 20 anos e nunca vi tamanha excelência e eficiência. Atingem um nível muito alto porque são exclusivos e especializados no segmento."
  },
  {
    name: "Cláudio",
    pharmacy: "Famontão",
    quote: "Sempre sou atendido com rapidez e agilidade. Vejo na Farmacon uma empresa comprometida em encontrar soluções para nossas demandas. A parceria é essencial para o sucesso da minha farmácia."
  }
];

const availableThumbnails = [
  "adriano.webp",
  "ana.webp",
  "andre.webp",
  "douglas.webp",
  "fernando.webp",
  "gracielio souza.webp",
  "jjoão paulo e daniele.webp",
  "leila.webp",
  "sheila.webp",
  "vinicius.webp"
];

const getThumbnailForName = (name: string, videoId: string) => {
  const normalizedName = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '');
  
  let match = availableThumbnails.find(file => {
    const normalizedFile = file.replace('.webp', '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '');
    return normalizedFile.includes(normalizedName) || normalizedName.includes(normalizedFile);
  });

  // Fallback baseado no primeiro nome para suportar variações na grafia de sobrenomes (ex: Sousa vs Souza)
  if (!match) {
    const firstName = name.split(' ')[0].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    match = availableThumbnails.find(file => {
      const firstFileWord = file.replace('.webp', '').split(' ')[0].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return firstFileWord === firstName;
    });
  }

  if (match) {
    return `/thumbnail-clientes-parceiros/${match}`;
  }
  
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

const videos = [
  { id: 'QYZIBtfL9Jc', name: 'Sheila Jensen', pharmacy: 'São Rafael', type: 'Cliente', desc: 'Suporte rápido, claro e preciso desde o primeiro contato.' },
  { id: 'P4xOt35YOgI', name: 'Adriano Campos', pharmacy: 'City Farma', type: 'Cliente', desc: 'Estratégia tributária com impacto direto nos resultados.' },
  { id: 'KWlvX9tjoXI', name: 'Leila Alvarenga', pharmacy: 'Drogarias SOL', type: 'Cliente', desc: 'Uma mudança tributária segura para crescer com confiança.' },
  { id: '2nMaKuFsOyo', name: 'João Paulo e Daniele', pharmacy: 'Drogarias FarMelhor', type: 'Cliente', desc: 'Gestão mais ágil com suporte contábil completo.' },
  { id: 'nkS9ZWhjeVc', name: 'Gracielio Sousa', pharmacy: 'Farmácias Bigfort', type: 'Cliente', desc: 'Atendimento técnico que facilita o dia a dia da farmácia.' },
  { id: 'rZ9F9kfnfb8', name: 'Ana Gonçalves', pharmacy: 'Farmácias Mini Preços', type: 'Cliente', desc: 'Gestão tributária especializada para uma rede com 16 lojas.' },
  { id: '8dU8XUvPi14', name: 'Douglas Gálias', pharmacy: 'Farmais Drogasil', type: 'Cliente', desc: 'Mais organização, crescimento e redução tributária.' },
  { id: 'uScY1u6vS8c', name: 'Fernando Ferreira', pharmacy: 'Retail Jedi', type: 'Parceiro', desc: 'Contabilidade que entende a farmácia por dentro.' },
  { id: 'msS5CNj8osw', name: 'Vinicius DallOvo', pharmacy: 'Abradilan', type: 'Parceiro', desc: 'Conteúdo e orientação fiscal que fortalecem o varejo farmacêutico.' },
  { id: 'Bx0X2M9RhGQ', name: 'André Justino', pharmacy: 'Flux Farma', type: 'Parceiro', desc: 'Inovação, tecnologia e segurança para não errar na contabilidade.' },
];

const Depoimentos = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [textCurrent, setTextCurrent] = useState(0);

  const openVideo = (id: string) => setActiveVideoId(id);
  const closeVideo = () => setActiveVideoId(null);

  const nextText = () => {
    setTextCurrent(prev => (prev + 1) % writtenTestimonials.length);
  };

  const prevText = () => {
    setTextCurrent(prev => (prev === 0 ? writtenTestimonials.length - 1 : prev - 1));
  };

  return (
    <section className="w-full pt-20 pb-10 md:pt-28 md:pb-14 bg-white relative">
      <div className="container mx-auto px-5 md:px-10 xl:px-16">
        
        {/* Header and Text Testimonials */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-12 gap-0 lg:gap-10">
          <div className="lg:w-3/5">
            <SectionHeader
              badgeIcon={<Handshake className="w-3.5 h-3.5" />}
              badgeText="Vem ser Farmacon"
              titleLines={["3 novas farmácias", "por dia confiam", "em nossa expertise"]}
              align="left"
              className="mb-0 md:mb-0 [&_h2]:max-w-none [&_h2]:mb-0 lg:[&_h2]:mb-6"
            />
          </div>
          
          <div className="lg:w-2/5 flex items-center justify-end">
            <div className="w-full flex flex-col -mt-2 md:mt-0 lg:pl-10">
              <Quote size={32} className="text-primary-200 fill-primary-100 mb-5" />
              
              <div className="relative min-h-[140px] md:min-h-[120px] lg:min-h-[160px] flex flex-col">
                <AnimatePresence mode="wait">
                  <m.div
                    key={textCurrent}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex-1 flex items-center"
                  >
                    <p className="text-surface-600 text-[15px] md:text-base leading-relaxed">
                      "{writtenTestimonials[textCurrent].quote}"
                    </p>
                  </m.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between mt-auto pt-5 border-t border-surface-200">
                <div className="relative flex-1">
                  <AnimatePresence mode="wait">
                    <m.div
                      key={textCurrent}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col justify-center"
                    >
                      <h4 className="font-bold text-dark-900 text-sm">{writtenTestimonials[textCurrent].name}</h4>
                      <p className="text-xs text-surface-500">{writtenTestimonials[textCurrent].pharmacy}</p>
                    </m.div>
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={prevText}
                    title="Depoimento anterior"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors border border-surface-300 text-dark-900 hover:bg-surface-50 hover:shadow-sm cursor-pointer"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextText}
                    title="Próximo depoimento"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors border border-surface-300 text-dark-900 hover:bg-surface-50 hover:shadow-sm cursor-pointer"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Título Acima dos Vídeos */}
        <div className="w-full mb-10 flex items-center justify-start gap-3">
          <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary-100 text-primary-600 shadow-sm shrink-0">
            <Play className="w-4 h-4 md:w-5 md:h-5 ml-[2px]" fill="currentColor" />
          </div>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-dark-900 tracking-tight">
            O que falam sobre nós
          </h3>
        </div>

        {/* Video Accordion (Desktop) */}
        <div 
          className="hidden h-[500px] gap-2 lg:flex w-full mx-auto col-span-full"
          onMouseLeave={() => setActiveIndex(null)}
        >
          {videos.map((video, index) => {
            const isActive = activeIndex === index;
            const src = getThumbnailForName(video.name, video.id);
            const isYouTubeThumb = src.includes('youtube.com');
            return (
              <button
                key={video.id}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => openVideo(video.id)}
                className={`relative cursor-pointer overflow-hidden rounded-3xl transition-[flex,width,max-width] duration-500 ease-out min-w-0 ${isActive ? 'flex-[0_0_400px] max-w-[400px]' : 'flex-1 max-w-none'}`}
                aria-label={`Reproduzir depoimento de ${video.name}`}
              >
                {/* Thumbnail */}
                <img 
                  alt={video.name} 
                  src={src}
                  className={`absolute inset-0 w-full h-full object-cover bg-slate-100 origin-center ${isYouTubeThumb ? 'scale-[1.35]' : ''}`}
                  loading="lazy"
                  decoding="async"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-60'}`}></div>
                
                {/* Tag Cliente/Parceiro */}
                {video.type && (
                   <div className={`absolute top-5 right-5 z-30 transition-all duration-500 ease-out ${isActive ? 'opacity-100 translate-y-0 delay-150' : 'opacity-0 -translate-y-4 delay-0 pointer-events-none'}`}>
                     <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-blue-600/90 text-white shadow-lg border border-blue-400/50 backdrop-blur-md">
                       {video.type}
                     </span>
                   </div>
                )}
                
                {/* Play Button */}
                <figure className={`absolute top-1/2 left-1/2 z-20 flex w-12 h-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blue-600 transition-all duration-300 ${isActive ? 'scale-100 opacity-100 shadow-[0_0_30px_rgba(37,99,235,0.8)]' : 'scale-75 opacity-0'}`}>
                  <Play className="w-5 h-5 text-white ml-1" fill="currentColor" />
                </figure>
                
                {/* Text Info */}
                <div className={`absolute inset-x-0 bottom-0 p-6 text-left transition-all duration-500 ease-out ${isActive ? 'opacity-100 translate-y-0 delay-150' : 'opacity-0 translate-y-8 delay-0 pointer-events-none'}`}>
                  <div className="w-[240px] xl:w-[280px]">
                    <h1 className="text-2xl font-extrabold text-white mb-1.5 drop-shadow-md leading-tight">{video.name}</h1>
                    {video.pharmacy && (
                      <h3 className="text-base font-bold text-white mb-2 drop-shadow-md leading-tight">
                        {video.pharmacy}
                      </h3>
                    )}
                    <p className="text-[13px] font-medium text-white drop-shadow-md leading-relaxed">{video.desc}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Video Accordion (Mobile/Tablet) */}
        <div className="flex flex-col gap-2 lg:hidden w-full mx-auto pb-8">
          {videos.map((video, index) => {
            const isActive = activeIndex === index;
            const src = getThumbnailForName(video.name, video.id);
            const isYouTubeThumb = src.includes('youtube.com');
            
            return (
              <m.button
                key={video.id}
                onViewportEnter={() => setActiveIndex(index)}
                viewport={{ margin: "-40% 0px -40% 0px" }}
                onClick={() => {
                  if (isActive) {
                    openVideo(video.id);
                  } else {
                    setActiveIndex(index);
                  }
                }}
                className={`relative cursor-pointer overflow-hidden rounded-2xl transition-[height] duration-500 ease-out w-full shrink-0 ${isActive ? 'h-[360px]' : 'h-[64px]'}`}
                aria-label={`Reproduzir depoimento de ${video.name}`}
              >
                {/* Thumbnail */}
                <img 
                  alt={video.name} 
                  src={src}
                  className={`absolute inset-0 w-full h-full object-cover bg-slate-100 origin-center ${isYouTubeThumb ? 'scale-[1.35]' : ''}`}
                  loading="lazy"
                  decoding="async"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-60'}`}></div>
                
                {/* Tag Cliente/Parceiro */}
                {video.type && (
                   <div className={`absolute top-4 right-4 z-30 transition-all duration-500 ease-out ${isActive ? 'opacity-100 translate-y-0 delay-150' : 'opacity-0 -translate-y-4 delay-0 pointer-events-none'}`}>
                     <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-blue-600/90 text-white shadow-lg border border-blue-400/50 backdrop-blur-md">
                       {video.type}
                     </span>
                   </div>
                )}
                
                {/* Play Button */}
                <figure className={`absolute top-1/2 left-1/2 z-20 flex w-12 h-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blue-600 transition-all duration-300 ${isActive ? 'scale-100 opacity-100 shadow-[0_0_30px_rgba(37,99,235,0.8)]' : 'scale-75 opacity-0'}`}>
                  <Play className="w-5 h-5 text-white ml-1" fill="currentColor" />
                </figure>
                
                {/* Text Info */}
                <div className={`absolute inset-x-0 bottom-0 p-5 text-left transition-all duration-500 ease-out ${isActive ? 'opacity-100 translate-y-0 delay-150' : 'opacity-0 translate-y-8 delay-0 pointer-events-none'}`}>
                  <h1 className="text-xl font-extrabold text-white mb-1 drop-shadow-md leading-tight">{video.name}</h1>
                  {video.pharmacy && (
                    <h3 className="text-sm font-bold text-white mb-1.5 drop-shadow-md leading-tight">
                      {video.pharmacy}
                    </h3>
                  )}
                  <p className="text-xs font-medium text-white drop-shadow-md leading-relaxed">{video.desc}</p>
                </div>
              </m.button>
            );
          })}
        </div>

      </div>
      {/* Video Modal (Lightbox) */}
      <AnimatePresence>
        {activeVideoId && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10 backdrop-blur-sm"
            onClick={closeVideo}
          >
            <button 
              onClick={closeVideo}
              className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
              aria-label="Fechar vídeo"
            >
              <X className="w-6 h-6" />
            </button>
            
            <m.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-[90vw] max-w-[420px] aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()} // Prevent clicking video from closing modal
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=1`}
                title="Depoimento Cliente Farmacon"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Depoimentos;
