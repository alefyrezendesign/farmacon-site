import { useRef } from 'react';
import { m, useScroll, useTransform  } from 'framer-motion';

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
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.3]);

  // Phase 2 (0.28 → 0.40): Text enters after card is fully grown
  const line1Opacity = useTransform(scrollYProgress, [0.30, 0.36], [0, 1]);
  const line1Y = useTransform(scrollYProgress, [0.30, 0.36], [50, 0]);

  const line2Opacity = useTransform(scrollYProgress, [0.33, 0.39], [0, 1]);
  const line2Y = useTransform(scrollYProgress, [0.33, 0.39], [50, 0]);

  const line3Opacity = useTransform(scrollYProgress, [0.36, 0.42], [0, 1]);
  const line3Y = useTransform(scrollYProgress, [0.36, 0.42], [50, 0]);

  const line4Opacity = useTransform(scrollYProgress, [0.39, 0.45], [0, 1]);
  const line4Y = useTransform(scrollYProgress, [0.39, 0.45], [50, 0]);

  // Phase 3 (0.45 → 0.75): Section stays pinned, just parallax
  // Phase 4 (0.75 → 1): Next section covers it (handled by App.tsx z-index)

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
              height: '140%',
              top: '-20%',
              willChange: 'transform',
            }}
          >
            <img
              src="/background/background-feira-frase.webp"
              alt="Farmacon Experience — Stand no maior evento do setor farmacêutico"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: '50% 40%',
                display: 'block',
              }}
              loading="lazy"
            />
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

          {/* Phrase — top left, line by line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 2,
              padding: 'clamp(48px, 7vw, 100px) clamp(48px, 7vw, 110px)',
              maxWidth: '700px',
            }}
          >
            <div
              style={{
                fontSize: 'clamp(1.5rem, 3.2vw, 2.6rem)',
                fontWeight: 400,
                letterSpacing: '-0.015em',
                lineHeight: 1.15,
                color: '#ffffff',
              }}
            >
              {/* Line 1 */}
              <span style={{ display: 'block', overflow: 'hidden', padding: '4px 0' }}>
                <m.span
                  style={{ display: 'block', opacity: line1Opacity, y: line1Y }}
                >
                  Por trás de cada farmácia
                </m.span>
              </span>

              {/* Line 2 */}
              <span style={{ display: 'block', overflow: 'hidden', padding: '4px 0' }}>
                <m.span
                  style={{ display: 'block', opacity: line2Opacity, y: line2Y }}
                >
                  que cresce, existe uma
                </m.span>
              </span>

              {/* Line 3 */}
              <span style={{ display: 'block', overflow: 'hidden', padding: '4px 0' }}>
                <m.span
                  style={{ display: 'block', opacity: line3Opacity, y: line3Y }}
                >
                  estratégia e gestão que
                </m.span>
              </span>

              {/* Line 4 */}
              <span style={{ display: 'block', overflow: 'hidden', padding: '4px 0' }}>
                <m.span
                  style={{ display: 'block', opacity: line4Opacity, y: line4Y }}
                >
                  começou aqui.
                </m.span>
              </span>
            </div>
          </div>
        </m.div>
      </section>
    </div>
  );
};

export default Demonstracao;

