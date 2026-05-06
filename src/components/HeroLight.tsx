import { motion, useScroll, useTransform, animate } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, TrendingDown, DollarSign } from 'lucide-react';
import { useSolutionsModal } from '../hooks/useSolutionsModal';

const words = [
  "Acreditamos", "que", "contabilidade", "é", "muito", "mais", "do", "que", "emitir", "guias.",
  "É", "trabalhar", "para", "que", "você", "possa", "crescer", "do", "jeito", "certo."
] as const;

const highlightWords = [] as const;

// Animated Number Component
const AnimatedNumber = ({ value, duration = 2, isOptimized, prefix = "", suffix = "" }: any) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (!nodeRef.current) return;
    
    // Animate from 0 to value when optimized is toggled ON
    if (isOptimized) {
      const controls = animate(0, value, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (v) => {
          if (nodeRef.current) {
            // Format to 1 decimal place with comma
            nodeRef.current.textContent = `${prefix}${v.toFixed(1).replace('.', ',')}${suffix}`;
          }
        }
      });
      return controls.stop;
    } else {
      // Just set to value immediately if not animating
      nodeRef.current.textContent = `${prefix}${value.toFixed(1).replace('.', ',')}${suffix}`;
    }
  }, [value, duration, isOptimized, prefix, suffix]);

  return <span ref={nodeRef}>{`${prefix}${value.toFixed(1).replace('.', ',')}${suffix}`}</span>;
};

// Typewriter text
const TypewriterText = ({ text }: { text: string }) => {
  return (
    <span className="inline-flex overflow-hidden">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, display: 'none' }}
          animate={{ opacity: 1, display: 'inline' }}
          transition={{ duration: 0.05, delay: 0.5 + index * 0.03 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

const HeroLight = () => {
  const { openModal } = useSolutionsModal();
  const [isOptimized, setIsOptimized] = useState(false);
  
  // Hero Animation Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });

  // Map progress [0, 0.6] to frames [0, 55]. The last 0.4 of scroll is overlap time
  const frameIndex = useTransform(heroProgress, [0, 0.6], [0, 55]);

  // Preload images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    const frameCount = 56;
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const indexStr = i.toString().padStart(3, '0');
      img.src = `/background/frames-bg/hero-bg-vd${indexStr}.webp`;
      images.push(img);
    }
    imagesRef.current = images;

    const drawCover = (img: HTMLImageElement, ctx: CanvasRenderingContext2D, cw: number, ch: number) => {
      const imgRatio = img.width / img.height;
      const canvasRatio = cw / ch;
      let w, h, x, y;
      if (imgRatio > canvasRatio) {
        h = ch;
        w = h * imgRatio;
        x = (cw - w) / 2;
        y = 0;
      } else {
        w = cw;
        h = w / imgRatio;
        x = 0;
        y = (ch - h) / 2;
      }
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, w, h);
    };

    // Draw first frame when it loads
    images[0].onload = () => {
      const canvas = canvasRef.current;
      if (canvas && images[0]) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          drawCover(images[0], ctx, canvas.width, canvas.height);
        }
      }
    };

    // Handle frameIndex changes
    const unsubscribe = frameIndex.on("change", (latest) => {
      const index = Math.min(55, Math.max(0, Math.floor(latest)));
      const canvas = canvasRef.current;
      const img = imagesRef.current[index];
      if (canvas && img && img.complete) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          drawCover(img, ctx, canvas.width, canvas.height);
        }
      }
    });

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const index = Math.floor(frameIndex.get());
        const img = imagesRef.current[index];
        if (img && img.complete) {
          const ctx = canvas.getContext('2d');
          if (ctx) drawCover(img, ctx, canvas.width, canvas.height);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [frameIndex]);

  // Word Reveal Refs
  const wordRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: wordProgress } = useScroll({
    target: wordRef,
    offset: ["start end", "end end"]
  });

  // Main container entrance animation
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      {/* Container 1: Hero Sticky + Spacer */}
      <div ref={heroRef} className="relative w-full z-0">
        <section className="sticky top-[80px] lg:top-0 w-full h-screen lg:pt-[30px] flex flex-col justify-center overflow-hidden z-0 bg-white">
          {/* Canvas Background */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-90 mix-blend-multiply" />
          
          <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-5 md:px-10 xl:px-4 relative z-10 h-full flex flex-col justify-center"
        >
          
          <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8">
            
            {/* Desktop Left Card: Recuperado */}
            <div className="hidden lg:flex order-1 w-1/4 justify-end">
              <motion.div
                variants={itemVariants}
                className="z-30 relative"
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ willChange: "transform" }}
                >
                  <div className={`w-[230px] xl:w-[250px] p-5 rounded-[20px] border transition-all duration-700 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${isOptimized ? 'bg-white border-primary-200 shadow-primary-500/10' : 'bg-white border-surface-100'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary-50 text-primary-600">
                      <DollarSign size={16} strokeWidth={2.5} />
                    </div>
                    <div className={`px-2.5 py-1 rounded-full text-[8.5px] font-bold uppercase tracking-widest transition-all duration-700 ${isOptimized ? 'bg-primary-50 text-primary-600' : 'bg-surface-100 text-surface-400 grayscale'}`}>
                      Créditos Recuperados
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-1.5">
                      <h3 className="text-2xl xl:text-3xl font-bold text-dark-900 tracking-tight flex items-baseline">
                        <span className="text-xl mr-1 font-semibold text-surface-400">R$</span>
                        <AnimatedNumber value={7.5} duration={2} isOptimized={isOptimized} />
                      </h3>
                      <span className="text-sm font-semibold text-dark-900">milhões</span>
                    </div>
                    <p className="text-[11px] text-surface-500 font-medium leading-relaxed">
                      em tributos pagos indevidamente.
                    </p>
                  </div>

                  {/* Animated Sparkline */}
                  <div className="mt-4 h-6 w-full relative flex justify-center">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 200 24">
                      <defs>
                        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#60A5FA" />
                          <stop offset="100%" stopColor="#2563EB" />
                        </linearGradient>
                        <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Area below line */}
                      <motion.path 
                        d="M0,20 C60,18 90,14 120,12 C160,10 180,6 196,4 L196,24 L0,24 Z"
                        fill="url(#area-gradient)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isOptimized ? 1 : 0 }}
                        transition={{ duration: 1.5 }}
                      />
                      
                      {/* The Line */}
                      <motion.path 
                        d="M0,20 C60,18 90,14 120,12 C160,10 180,6 196,4"
                        fill="none"
                        stroke={isOptimized ? "url(#line-gradient)" : "#E2E8F0"}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                          pathLength: isOptimized ? 1 : 0, 
                          opacity: isOptimized ? 1 : 0 
                        }}
                        transition={{ 
                          pathLength: { duration: 1.5, ease: "easeInOut" },
                          opacity: { duration: 0.1, delay: isOptimized ? 0 : 1.4 }
                        }}
                      />

                      {/* The Follower Dot */}
                      <motion.path 
                        d="M0,20 C60,18 90,14 120,12 C160,10 180,6 196,4"
                        fill="none"
                        stroke="#2563EB"
                        strokeWidth="7"
                        strokeLinecap="round"
                        pathLength="1"
                        strokeDasharray="0.001 2"
                        initial={{ strokeDashoffset: 0, opacity: 0 }}
                        animate={{ 
                          strokeDashoffset: isOptimized ? -1 : 0,
                          opacity: isOptimized ? 1 : 0 
                        }}
                        transition={{ 
                          strokeDashoffset: { duration: 1.5, ease: "easeInOut" },
                          opacity: { duration: 0.1, delay: isOptimized ? 0 : 1.4 }
                        }}
                      />
                    </svg>
                  </div>
                    </div>

                </motion.div>
              </motion.div>
            </div>

            {/* Center Main Content */}
            <div className="order-1 lg:order-2 w-full lg:max-w-[700px] flex flex-col items-center text-center">
              
              {/* Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50/70 border border-primary-100/50 mb-8 shadow-sm backdrop-blur-sm"
              >
                {/* Trophy SVG */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                  <path d="M4 22h16"></path>
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                </svg>
                <span className="text-[10.5px] md:text-[11.5px] font-bold text-primary-800 uppercase tracking-[0.08em]">
                  <TypewriterText text="A MAIOR CONTABILIDADE EXCLUSIVA PARA FARMÁCIAS" />
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={itemVariants}
                className="text-[clamp(2rem,4vw,3.5rem)] xl:text-[4rem] font-bold tracking-tight text-dark-900 leading-[1.12] mb-10"
              >
                Sua farmácia precisa <br />
                de <span className={`transition-colors duration-700 ease-out ${isOptimized ? 'text-primary-600' : 'text-dark-900'}`}>mais margem</span>, 
                
                {/* Toggle Container with Animated Border Glow */}
                <div className="relative inline-flex ml-3 sm:ml-4 align-middle">
                  
                  {/* Glowing Aura (soft outer glow) */}
                  {!isOptimized && (
                    <motion.div
                      className="absolute inset-[0px] rounded-full pointer-events-none animated-glow-bg"
                      style={{ filter: "blur(3px)", opacity: 0.85 }}
                      animate={{ opacity: [0, 0.85, 0.85, 0] }}
                      transition={{ 
                        duration: 3.5, 
                        ease: "easeInOut", 
                        repeat: Infinity, 
                        repeatDelay: 1.5, 
                        times: [0, 0.15, 0.7, 1] 
                      }}
                    />
                  )}

                  {/* Toggle Button */}
                  <button 
                    onClick={() => setIsOptimized(!isOptimized)}
                    className={`relative z-10 inline-flex items-center w-[56px] h-8 sm:w-[64px] sm:h-[34px] rounded-full p-1 transition-colors duration-500 focus:outline-none ${isOptimized ? 'bg-primary-600 shadow-inner border border-transparent' : 'bg-white border border-surface-200 shadow-sm'}`}
                    aria-label="Otimizar resultados"
                  >

                    <motion.div 
                      className={`relative w-6 h-6 sm:w-[26px] sm:h-[26px] flex items-center justify-center z-10 rounded-full transition-all duration-300 ${isOptimized ? 'bg-primary-500 shadow-md' : 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-surface-200'}`}
                      animate={{ x: isOptimized ? (typeof window !== 'undefined' && window.innerWidth < 640 ? 24 : 30) : 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <img 
                        src={isOptimized ? "/logo/simbolo_branca.png" : "/logo/simbolo.png"} 
                        alt="Farmacon Toggle" 
                        className={`w-full h-full object-contain ${isOptimized ? 'p-[3px]' : 'p-[3px]'}`}
                      />
                    </motion.div>
                  </button>
                </div>
                <br />

                menos impostos e <br />
                <span className={`transition-all duration-700 ease-out ${isOptimized ? 'text-dark-900' : 'text-dark-900'}`}>previsibilidade real.</span>
              </motion.h1>

              {/* CTAs */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-10 w-full sm:w-auto"
              >
                <button
                  onClick={() => openModal()}
                  className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-[15px] transition-all shadow-[0_8px_20px_rgb(59,130,246,0.25)] bg-primary-600 text-white hover:bg-primary-700 hover:shadow-[0_8px_25px_rgb(59,130,246,0.35)]"
                >
                  Solicitar um diagnóstico
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white border border-surface-200 text-dark-900 rounded-full font-semibold text-[15px] hover:bg-surface-50 transition-all shadow-sm">
                  Falar com especialista
                </button>
              </motion.div>

              {/* Authority Proof */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <div className="flex -space-x-2.5">
                  {[32, 12, 44, 28].map((img, i) => (
                    <div key={i} className={`w-9 h-9 rounded-full border-2 border-white bg-surface-100 overflow-hidden shadow-sm transition-all duration-700 ${isOptimized ? 'grayscale-0' : 'grayscale'}`}>
                      <img src={`https://i.pravatar.cc/150?img=${img}`} alt="Especialista" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold shadow-sm bg-primary-100 text-primary-700 z-10">
                    +6K
                  </div>
                </div>
                <p className="text-[13px] text-surface-500 leading-tight font-medium">
                  6.200+ empresários atendidos
                </p>
              </motion.div>

            </div>

            {/* Desktop Right Card: Tributário */}
            <div className="hidden lg:flex order-3 w-1/4 justify-start">
              <motion.div
                variants={itemVariants}
                className="z-20 relative"
              >
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  style={{ willChange: "transform" }}
                >
                  <div className={`w-[230px] xl:w-[250px] p-5 rounded-[20px] border transition-all duration-700 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${isOptimized ? 'bg-white border-green-200 shadow-green-500/10' : 'bg-white border-surface-100'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-50 text-green-600">
                      <TrendingDown size={16} strokeWidth={2.5} />
                    </div>
                    <div className={`px-2.5 py-1 rounded-full text-[8.5px] font-bold uppercase tracking-widest transition-all duration-700 ${isOptimized ? 'bg-green-50 text-green-700' : 'bg-surface-100 text-surface-400 grayscale'}`}>
                      Média de redução
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl xl:text-3xl font-bold text-dark-900 tracking-tight flex items-baseline">
                      <AnimatedNumber value={23.8} duration={2} isOptimized={isOptimized} suffix="%" />
                    </h3>
                    <p className="text-[11px] text-surface-500 font-medium leading-relaxed">
                      da carga tributária reduzida.
                    </p>
                  </div>

                  {/* Animated mini-chart */}
                  <div className="mt-4 flex items-end gap-1 h-6">
                    {[90, 75, 80, 55, 45, 30].map((h, i) => (
                      <motion.div 
                        key={i} 
                        className={`w-full rounded-[1px] transition-colors duration-500 ${isOptimized ? 'bg-green-500' : 'bg-surface-200'}`}
                        initial={{ height: "20%" }}
                        animate={{ height: isOptimized ? `${h}%` : "20%" }}
                        transition={{ duration: 1, delay: i * 0.1, type: "spring" }}
                      />
                    ))}
                  </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

          </div>

          {/* Mobile Cards Layout (Hidden on Desktop) */}
          <div className="lg:hidden flex flex-col sm:flex-row items-center justify-center gap-4 w-full mt-12 z-20">
             <motion.div
                variants={itemVariants}
                className={`w-full max-w-[280px] p-5 rounded-[20px] border transition-all duration-700 shadow-sm ${isOptimized ? 'bg-white border-primary-200' : 'bg-white border-surface-100'}`}
              >
                 <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary-50 text-primary-600">
                      <DollarSign size={16} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-dark-900 tracking-tight">R$ 7,5 <span className="text-sm text-surface-500">milhões</span></h3>
                    </div>
                  </div>
                  <p className="text-[11px] text-surface-500 font-medium leading-relaxed">
                    créditos recuperados.
                  </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className={`w-full max-w-[280px] p-5 rounded-[20px] border transition-all duration-700 shadow-sm ${isOptimized ? 'bg-white border-green-200' : 'bg-white border-surface-100'}`}
              >
                 <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-50 text-green-600">
                      <TrendingDown size={16} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-dark-900 tracking-tight">23,8%</h3>
                    </div>
                  </div>
                  <p className="text-[11px] text-surface-500 font-medium leading-relaxed">
                    redução tributária média.
                  </p>
              </motion.div>
          </div>

        </motion.div>

      </section>

      {/* Spacers for Hero: 150vh for animation, 100vh for overlap */}
      <div className="h-[150vh] w-full pointer-events-none" />
      <div className="h-screen w-full pointer-events-none" />
    </div>

    {/* Container 2: Word Reveal Sticky + Spacer */}
    <div ref={wordRef} className="relative w-full z-10 -mt-[100vh]">
      <section className="sticky top-0 h-screen w-full flex flex-col items-center justify-center bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
        <div className="container mx-auto px-5 md:px-10 xl:px-16 relative z-10">
          <WordRevealBlock progress={wordProgress} />
        </div>
      </section>
      
      {/* Spacers for Word Reveal: 150vh for animation/pause, 100vh for overlap */}
      <div className="h-[150vh] w-full pointer-events-none" />
      <div className="h-screen w-full pointer-events-none" />
    </div>
  </>
  );
};

// Word reveal block that reads the passed progress
const WordRevealBlock = ({ progress }: { progress: any }) => {

  const allWords = [...words, ...highlightWords];

  return (
    <p className="flex flex-wrap justify-center text-center text-[clamp(1.25rem,3vw,2.2rem)] md:text-4xl xl:text-5xl font-normal leading-[1.3] gap-x-[0.25em] gap-y-[0.1em] max-w-5xl mx-auto">
      {allWords.map((word, i) => {
        const isHighlight = i >= allWords.length - 4;
        const total = allWords.length;
        // Start when the section is almost fully pinned (progress ~0.18)
        // Finish shortly before Section 3 starts sliding up (progress ~0.53)
        // Pause from 0.53 to 0.55. Section 3 slides up at 0.55.
        const animStart = 0.18;
        const animDuration = 0.35;
        const start = animStart + (i / total) * (animDuration * 0.8);
        const end = start + (animDuration * 0.2);
        return (
          <ScrollWord
            key={i}
            progress={progress}
            range={[start, end]}
            isHighlight={isHighlight}
          >
            {word}
          </ScrollWord>
        );
      })}
    </p>
  );
};

const ScrollWord = ({ children, progress, range, isHighlight }: any) => {
  // Gray to blue transition
  const color = useTransform(progress, range, ["#E2E8F0", "#2563EB"]);
  
  return (
    <motion.span 
      style={{ color }} 
      className={`inline-block transition-none ${isHighlight ? 'font-bold tracking-tight' : 'tracking-tight'}`}
    >
      {children}
    </motion.span>
  );
};

export default HeroLight;
