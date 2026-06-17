import { useRef } from 'react';
import { m, useScroll, useTransform, MotionValue  } from 'framer-motion';

const AnimatedChar = ({ char, progress, start, end }: { char: string, progress: MotionValue<number>, start: number, end: number }) => {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return (
    <m.span 
      style={{ opacity }}
      className="inline-block"
    >
      {char}
    </m.span>
  );
};

const SobreHistoria = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: textRef,
    // Começa a revelar quando o topo do texto atinge 85% da tela
    // Termina de revelar quando o final do texto atinge 60% da tela (meio-termo para velocidade ideal)
    offset: ["start 85%", "end 60%"]
  });

  const text = "A Farmacon nasceu para ser a solução definitiva para o varejo farmacêutico. Como a maior contabilidade exclusiva para farmácias da América Latina, unimos inteligência tributária, tecnologia própria e centenas de especialistas dedicados a maximizar o seu lucro na última linha. Com mais de uma década de experiência e fundadores vindos de grandes instituições financeiras, nosso foco é claro: conectar você às estratégias legais e inovadoras dos maiores grupos do setor.";
  
  return (
    <section 
      ref={sectionRef} 
      className="pt-12 pb-16 md:pt-32 md:pb-24 bg-white relative overflow-hidden flex items-center"
    >
      <div className="container mx-auto px-5 md:px-10 xl:px-16 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center w-full">
          
          {/* Lado Esquerdo: Título */}
          <div className="w-full lg:w-[45%] flex flex-col pr-0 lg:pr-8">
            <m.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-[2rem] md:text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight text-dark-900 leading-[1.1] m-0">
                Muito prazer, nós somos a Farmacon
              </h2>
            </m.div>
          </div>

          {/* Lado Direito: Textos Revelados */}
          <div ref={textRef} className="w-full lg:w-[55%] flex flex-col gap-8">
            
            {/* Texto Principal (Revela letra por letra com Scroll Normal) */}
            <p className="text-[15px] md:text-2xl lg:text-[22px] font-medium text-dark-900 leading-relaxed text-left md:text-justify m-0">
              {(() => {
                let currentIndex = 0;
                const totalChars = text.length;
                
                return text.split("\n").map((line, lineIndex) => (
                  <span key={lineIndex} className="block">
                    {line.split(" ").map((word, wordIndex) => {
                      const chars = word.split("").map(char => {
                        const data = { char, index: currentIndex };
                        currentIndex++;
                        return data;
                      });
                      currentIndex++; // Espaço
                      
                      return (
                        <span key={wordIndex} className="inline-block mr-[0.25em] mb-[0.1em]">
                          {chars.map((item, charIndex) => {
                            const start = item.index / totalChars;
                            const end = start + (2 / totalChars); 
                            
                            return (
                              <AnimatedChar 
                                key={charIndex} 
                                char={item.char}
                                progress={scrollYProgress}
                                start={start}
                                end={end}
                              />
                            );
                          })}
                        </span>
                      );
                    })}
                  </span>
                ));
              })()}
            </p>


          </div>

        </div>
      </div>
    </section>
  );
};

export default SobreHistoria;
