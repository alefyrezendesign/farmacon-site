import { useRef } from 'react';
import { m, useScroll, useTransform  } from 'framer-motion';

const AnimatedWord = ({ word, progress, i, total }: { word: string, progress: any, i: number, total: number }) => {
  const start = 0.30 + (i / total) * 0.15;
  const end = start + 0.05;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [30, 0]);
  
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '0.1em' }}>
      <m.span style={{ display: 'inline-block', opacity, y }}>
        {word}
      </m.span>
    </span>
  );
};

const Demonstracao = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start end', 'end start'],
  });

  // Phase 1 (0 → 0.25): Card grows into view
  const cardScale = useTransform(scrollYProgress, [0.05, 0.28], [0.75, 1]);
  const cardRadius = useTransform(scrollYProgress, [0.05, 0.28], [48, 24]);
  const cardOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);

  // Parallax image (subtle throughout)
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <div ref={wrapperRef} style={{ position: 'relative', height: '100%' }}>
      <section
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          zIndex: 0,
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '100px 24px 48px 24px',
          boxSizing: 'border-box',
        }}
      >
        {/* Animated card container */}
        <m.div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: cardRadius,
            overflow: 'hidden',
            scale: cardScale,
            opacity: cardOpacity,
            willChange: 'transform, opacity, border-radius',
            backgroundColor: '#000',
          }}
        >
          {/* Parallax image */}
          <m.div
            style={{
              position: 'absolute',
              inset: 0,
              y: imageY,
              scale: imageScale,
              width: '100%',
              height: '115%',
              top: '-7.5%',
              willChange: 'transform',
            }}
          >
            <picture>
              <source media="(min-width: 768px)" srcSet="/background/background-feira-desktop.webp" />
              <img
                src="/background/background-feira-mobile.webp"
                alt="Farmacon Experience — Stand no maior evento do setor farmacêutico"
                className="w-full h-full object-cover object-center block"
                loading="lazy"
              />
            </picture>
          </m.div>

          {/* Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.55)',
              zIndex: 1,
            }}
          />

          {/* Phrase — top left, naturally wrapping */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 2,
              padding: 'clamp(32px, 7vw, 100px) clamp(24px, 7vw, 110px)',
              maxWidth: '800px',
            }}
          >
            <div
              style={{
                fontSize: 'clamp(1.5rem, 3.2vw, 2.6rem)',
                fontWeight: 400,
                letterSpacing: '-0.015em',
                lineHeight: 1.25,
                color: '#ffffff',
                textWrap: 'balance',
                display: 'flex',
                flexWrap: 'wrap',
                columnGap: '0.25em'
              }}
            >
              {"Por trás de cada farmácia que cresce, existe uma estratégia e gestão que começou aqui.".split(' ').map((word, i, arr) => (
                <AnimatedWord key={i} word={word} progress={scrollYProgress} i={i} total={arr.length} />
              ))}
            </div>
          </div>
        </m.div>
      </section>
    </div>
  );
};

export default Demonstracao;

