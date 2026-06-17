import { useRef } from 'react';
import { m, useScroll, useTransform, useSpring  } from 'framer-motion';
import { Target, Eye, Heart, Lightbulb, Landmark, Trophy, Shield, Scale, Handshake, TrendingUp, Rocket, BookOpen, Users, Star, Link, Pill, Store } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const WordPill = ({ text, icon: Icon, bottom, left, targetRotate, delay, scrollYProgress, isFirst }: any) => {
  // Início e fim da queda controlada pelo scroll
  const startDrop = 0.65 + delay;
  const land = startDrop + 0.12; 
  const bounce1 = land + 0.02;
  const settle = land + 0.05;

  // Queda relativa ao container azul (que possui overflow-hidden)
  const startY = isFirst ? "-140px" : "-600px";
  
  const y = useTransform(
    scrollYProgress, 
    [startDrop, land, bounce1, settle], 
    [startY, "0px", "-20px", "0px"]
  );
  
  const startRotate = targetRotate - 30; 
  const rotate = useTransform(
    scrollYProgress,
    [startDrop, land, bounce1, settle],
    [isFirst ? 0 : startRotate, targetRotate + 8, targetRotate - 4, targetRotate]
  );
  
  const fusionScale = useTransform(scrollYProgress, [0.63, 0.65], [0, 1]);
  
  const firstOpacity = useTransform(scrollYProgress, [0.63, 0.64], [0, 1]);
  const otherOpacity = useTransform(scrollYProgress, [startDrop, startDrop + 0.02], [0, 1]);

  return (
    <m.div 
      style={{
        position: 'absolute',
        bottom,
        left,
        y,
        x: "-50%",
        rotate,
        scale: isFirst ? fusionScale : 1,
        opacity: isFirst ? firstOpacity : otherOpacity,
        originX: 0.5,
        originY: 0.5
      }}
      className="bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-xl border border-white/80 shadow-[1px_3px_7px_rgba(0,0,0,0.12)] px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center gap-2 z-10 whitespace-nowrap"
    >
      {Icon && <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />}
      <span className="text-[13px] md:text-[15px] font-bold text-slate-800 tracking-tight whitespace-nowrap">{text}</span>
    </m.div>
  );
};

const SobreCultura = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Física de mola (spring) aplicada ao scroll para criar suavidade extrema e inércia (Premium Feel)
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
    restDelta: 0.001
  });

  // Rotação mais lenta (dura 10% do scroll cada) e usa o progresso suavizado
  const rotateX1 = useTransform(smoothProgress, [0.15, 0.25, 0.55, 0.55], [0, 180, 180, 180]);
  const rotateX2 = useTransform(smoothProgress, [0.29, 0.39, 0.55, 0.55], [0, 180, 180, 180]);
  const rotateX3 = useTransform(smoothProgress, [0.43, 0.53, 0.55, 0.55], [0, 180, 180, 180]);

  // Move cards 1 and 3 to the center to stack behind card 2
  const card1Y = useTransform(smoothProgress, [0.57, 0.61], [0, 126]); // Move down
  const card3Y = useTransform(smoothProgress, [0.57, 0.61], [0, -126]); // Move up

  // Sumiço e encolhimento dos cards empilhados ANTES da fusão
  const cardsOpacity = useTransform(smoothProgress, [0.61, 0.63], [1, 0]);
  const cardsScale = useTransform(smoothProgress, [0.61, 0.63], [1, 0]);

  // Posições da pilha de pílulas no final
  const wordsData = [
    { text: "Humanidade", icon: Heart, bottom: "15%", left: "50%", targetRotate: -3, isFirst: true },
    { text: "Sucesso", icon: Trophy, bottom: "12%", left: "20%", targetRotate: -8 },
    { text: "Confiança", icon: Shield, bottom: "10%", left: "75%", targetRotate: 4 },
    { text: "Integridade", icon: Scale, bottom: "22%", left: "60%", targetRotate: 10 },
    { text: "Respeito", icon: Handshake, bottom: "28%", left: "25%", targetRotate: 6 },
    { text: "Resultado", icon: TrendingUp, bottom: "25%", left: "50%", targetRotate: -5 },
    { text: "Evolução", icon: Rocket, bottom: "32%", left: "80%", targetRotate: 12 },
    { text: "Autodesenvolvimento", icon: BookOpen, bottom: "45%", left: "35%", targetRotate: -10 },
    { text: "Inovação", icon: Lightbulb, bottom: "42%", left: "65%", targetRotate: 5 },
    { text: "Clientes", icon: Store, bottom: "60%", left: "25%", targetRotate: -15 },
    { text: "Excelência", icon: Star, bottom: "55%", left: "50%", targetRotate: 8 },
    { text: "Parceria", icon: Link, bottom: "58%", left: "75%", targetRotate: -6 },
    { text: "Mercado Farmacêutico", icon: Pill, bottom: "75%", left: "40%", targetRotate: 4 },
    { text: "Time", icon: Users, bottom: "72%", left: "70%", targetRotate: -12 },
  ].map((w, i) => ({ ...w, delay: i * 0.015 }));

  const cardsData = [
    {
      title: "Missão",
      text: "Ser a melhor definição de sucesso para nossos clientes, para o nosso time e para nossos parceiros.",
      icon: Target,
      rotateX: rotateX1
    },
    {
      title: "Visão",
      text: "Atender o mercado farmacêutico brasileiro inovando o jeito de entregar sucesso e resultado.",
      icon: Eye,
      rotateX: rotateX2
    },
    {
      title: "Valores",
      text: "Humanidade, integridade, respeito e autodesenvolvimento.",
      icon: Heart,
      rotateX: rotateX3
    }
  ];

  return (
    <section ref={containerRef} className="h-[400vh] relative bg-white">
      
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Fullscreen Background Image */}
        <div 
          className="absolute right-0 top-0 w-full md:w-2/3 h-full bg-[length:180%_auto] md:bg-contain bg-right-bottom md:bg-right bg-no-repeat z-0 lg:translate-y-12"
          style={{ backgroundImage: "url('/background/sobre-bg/bg-azul-lateral-light.webp')" }}
        />
        
        <div className="container mx-auto px-5 md:px-10 xl:px-16 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-20 relative z-10 lg:translate-y-12">
          
          {/* Left Column: Title and text */}
          <div className="w-full md:w-1/2 flex flex-col items-start lg:-mt-8 pt-12 md:pt-0">
            <SectionHeader
              badgeIcon={<Landmark className="w-3.5 h-3.5" />}
              badgeText="Nossos pilares"
              titleLines={[
                "Muito além de",
                "contabilidade."
              ]}
              subtitle={<>Mais do que tecnologia avançada, inteligência artificial e análise de dados, a Farmacon é feita essencialmente de pessoas e propósitos verdadeiros.</>}
              align="left"
              className="!mb-0"
            />
          </div>

          {/* Right Column: Free Floating Cards */}
          <div className="w-full md:w-1/2 relative flex flex-col justify-center min-h-[380px] md:min-h-[500px]">
              
              {/* CARDS */}
              <m.div 
                style={{ opacity: cardsOpacity, scale: cardsScale }} 
                className="flex flex-col gap-3 md:gap-4 relative z-20 w-full"
              >
                {cardsData.map((card, i) => {
                  const Icon = card.icon;
                  const cardY = i === 0 ? card1Y : i === 2 ? card3Y : 0;
                  const zIndex = i === 1 ? 10 : 0;

                  return (
                    <m.div 
                      key={i} 
                      style={{ y: cardY, zIndex }}
                      className="w-full h-[100px] md:h-[110px] relative perspective-[1200px]"
                    >
                      <m.div 
                        style={{ rotateX: card.rotateX, transformStyle: "preserve-3d" }} 
                        className="w-full h-full relative origin-center"
                      >
                        {/* Frente */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-xl border border-white/80 shadow-[1px_3px_7px_rgba(0,0,0,0.12)] rounded-3xl flex items-center justify-between px-6 md:px-8" style={{ backfaceVisibility: "hidden" }}>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black">{card.title}</h3>
                          <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </div>
                        {/* Verso */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-xl border border-white/80 shadow-[1px_3px_7px_rgba(0,0,0,0.12)] rounded-3xl flex items-center justify-between gap-4 px-6 md:px-8" style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}>
                          <p className="text-[12px] sm:text-sm md:text-base text-slate-600 font-medium leading-snug flex-1">
                            {card.text}
                          </p>
                          <Icon className="w-6 h-6 md:w-8 md:h-8 text-white shrink-0" />
                        </div>
                      </m.div>
                    </m.div>
                  );
                })}
              </m.div>

              {/* Pílulas que caem e se acomodam */}
              <div className="absolute inset-0 pointer-events-none z-10">
                 {wordsData.map((word, idx) => (
                   <WordPill 
                     key={idx} 
                     {...word} 
                     scrollYProgress={smoothProgress} 
                   />
                 ))}
              </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default SobreCultura;
