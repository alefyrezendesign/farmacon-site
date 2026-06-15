import { useEffect, useRef, useState } from 'react';
import { useTransform, MotionValue, useInView } from 'framer-motion';

export const FundoCodigoHero = ({ progress, inverted = false, isOptimized = false }: { progress: MotionValue<number>, inverted?: boolean, isOptimized?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);
  
  // Track optimized factor for smooth transition in rAF
  const isOptimizedRef = useRef(isOptimized || inverted);
  const optimizedFactorRef = useRef(isOptimized || inverted ? 1 : 0);

  useEffect(() => {
    isOptimizedRef.current = isOptimized || inverted;
  }, [isOptimized, inverted]);
  
  // 14 bars as requested
  const NUM_BARS = 14;
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Map scroll progress to a normalized 0-1 value
  const normalizedProgress = useTransform(progress, [0, 0.6], [0, 1]);

  const [barsData] = useState(() => {
    const arr = [];
    for (let i = 0; i < NUM_BARS; i++) {
      const nx = i / (NUM_BARS - 1);
      
      // U-shape for the initial state (smaller in center, larger on sides)
      const xCentered = (nx * 2 - 1);
      const uShape = Math.pow(xCentered, 2); 
      
      const initialHeight = 25 + (uShape * 50); // 25% to 75%
      const targetHeight = 25 + (Math.random() * 65); // 25% to 90%
      
      // Speed of the subtle continuous oscillation
      const speed = 1.2 + Math.random() * 1.5; 
      const phase = Math.random() * Math.PI * 2;
      
      // Amplitude: Base amplitude at rest (subtle continuous movement)
      const baseAmplitude = 2 + Math.random() * 3; // 2% to 5%
      
      arr.push({
        id: i,
        x: (i / NUM_BARS) * 100, 
        w: 100 / NUM_BARS, // Exact width to prevent overlapping opacities
        initialHeight,
        targetHeight,
        speed,
        phase,
        baseAmplitude
      });
    }
    return arr;
  });

  useEffect(() => {
    if (!isInView) return;

    let animationFrameId: number;
    const start = Date.now();

    const render = () => {
      const t = (Date.now() - start) / 1000;
      const p = normalizedProgress.get(); // 0 to 1

      // Lerp optimized factor for smooth surge animation
      const targetFactor = isOptimizedRef.current ? 1 : 0;
      optimizedFactorRef.current += (targetFactor - optimizedFactorRef.current) * 0.08;
      const opt = optimizedFactorRef.current;

      // Just subtle animation, NO surge for optimized
      barsData.forEach((bar, index) => {
        const el = barsRef.current[index];
        if (el) {
          // Base height interpolated by scroll
          let baseHeight = bar.initialHeight * (1 - p) + bar.targetHeight * p;
          
          // Amplitude increases as we scroll to make animation more intense
          let currentAmplitude = bar.baseAmplitude + (p * 12); 
          
          // Organic independent oscillation
          const oscillation = Math.sin(t * bar.speed + bar.phase) * currentAmplitude;
          
          const finalHeight = Math.max(2, Math.min(100, baseHeight + oscillation));
          
          el.style.height = `${finalHeight}%`;
        }
      });

      if (glowRef.current) {
        // Intensify glow slightly
        glowRef.current.style.opacity = (0.95 + opt * 0.2).toString();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [barsData, normalizedProgress, isInView]);

  const darkBg = '#0B1528';

  return (
    <div ref={containerRef} className={`absolute inset-0 w-full h-full overflow-hidden transition-colors duration-700 ${isOptimized ? 'bg-[#0B1528]' : (inverted ? 'bg-[#1D4ED8]' : 'bg-white')} z-0 pointer-events-none`}>
      <style>{`
        .hero-bar-container {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          z-index: 2;
          
          /* Blur on the container perfectly merges the bars without summing opacities in seams */
          filter: blur(2px);
        }

        .hero-bar {
          position: absolute;
          bottom: 0;
          left: calc(var(--x) * 1%);
          width: calc(var(--w) * 1%);
          
          /* Smooth premium gradient for the bars. No random alpha to prevent dark seams. */
          background: ${isOptimized ? 
            'linear-gradient(to top, rgba(37, 99, 235, 1), rgba(96, 165, 250, 0.8), transparent)' : 
            'linear-gradient(to top, rgba(37, 99, 235, 0.85), rgba(147, 197, 253, 0.4), transparent)'};
          
          transform-origin: bottom center;
          will-change: height;
          
          /* Subtle rounding on top creates elegant peaks when blurred */
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }

        /* Intense glowing blue base at the bottom */
        .hero-base-glow {
          position: absolute;
          bottom: -10%;
          left: 0;
          width: 100%;
          height: 35%;
          background: ${isOptimized ?
            'linear-gradient(to top, rgba(30, 64, 175, 0.9) 0%, rgba(59, 130, 246, 0.5) 40%, transparent 80%)' :
            'linear-gradient(to top, rgba(11, 36, 102, 1) 0%, rgba(37,99,235, 0.8) 40%, rgba(59,130,246, 0.1) 80%, transparent 100%)'};
          filter: blur(30px);
          opacity: 0.95;
          z-index: 1;
          transition: opacity 0.7s ease;
        }
        
        /* Gradient at the top to blend with the MenuPrincipal/content */
        .hero-top-fade {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 60%;
          background: ${isOptimized ? 
            'linear-gradient(to bottom, rgba(11,21,40,1) 0%, rgba(11,21,40,0.85) 30%, rgba(11,21,40,0.4) 60%, transparent 100%)' :
            (inverted ?
              'linear-gradient(to bottom, rgba(29, 78, 216, 1) 0%, rgba(29, 78, 216, 0.85) 30%, rgba(29, 78, 216, 0.4) 60%, transparent 100%)' :
              'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.4) 60%, transparent 100%)'
            )};
          z-index: 10;
          pointer-events: none;
          transition: background 0.7s ease;
        }

        /* Fade at the bottom to blend with the next section */
        .hero-bottom-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 35%;
          background: ${isOptimized ? 
            'linear-gradient(to top, rgba(11,21,40,1) 0%, rgba(11,21,40,0.8) 25%, rgba(11,21,40,0.3) 60%, transparent 100%)' :
            (inverted ? 
              'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 25%, rgba(255,255,255,0.3) 60%, transparent 100%)' : 
              'transparent'
            )};
          z-index: 10;
          pointer-events: none;
          transition: background 0.7s ease;
        }
      `}</style>
      
      <div className="hero-bar-container">
        {barsData.map((bar, i) => (
          <div
            key={bar.id}
            ref={(el) => { barsRef.current[i] = el; }}
            className={`hero-bar transition-colors duration-700`}
            style={{
              '--x': bar.x,
              '--w': bar.w,
              background: isOptimized 
                ? 'linear-gradient(to top, rgba(37, 99, 235, 1) 0%, rgba(96, 165, 250, 0.8) 50%, transparent 100%)' 
                : 'linear-gradient(to top, rgba(37, 99, 235, 0.85) 0%, rgba(147, 197, 253, 0.4) 50%, transparent 100%)'
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div ref={glowRef} className="absolute bottom-[-10%] left-0 w-full h-[35%] blur-[30px] z-[1]">
        {/* Light Glow */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${isOptimized ? 'opacity-0' : 'opacity-95'}`} style={{ background: 'linear-gradient(to top, rgba(11, 36, 102, 1) 0%, rgba(37,99,235, 0.8) 40%, rgba(59,130,246, 0.1) 80%, transparent 100%)' }} />
        {/* Dark Glow */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${isOptimized ? 'opacity-95' : 'opacity-0'}`} style={{ background: 'linear-gradient(to top, rgba(30, 64, 175, 0.9) 0%, rgba(59, 130, 246, 0.5) 40%, transparent 80%)' }} />
      </div>

      <div className="absolute top-0 left-0 w-full h-[60%] z-10 pointer-events-none">
        {/* Light/Inverted Top Fade */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${isOptimized ? 'opacity-0' : 'opacity-100'}`} style={{ background: inverted ? 'linear-gradient(to bottom, rgba(29, 78, 216, 1) 0%, rgba(29, 78, 216, 0.85) 30%, rgba(29, 78, 216, 0.4) 60%, transparent 100%)' : 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.4) 60%, transparent 100%)' }} />
        {/* Dark Top Fade */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${isOptimized ? 'opacity-100' : 'opacity-0'}`} style={{ background: 'linear-gradient(to bottom, rgba(11,21,40,1) 0%, rgba(11,21,40,0.85) 30%, rgba(11,21,40,0.4) 60%, transparent 100%)' }} />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[35%] z-10 pointer-events-none">
        {/* Light/Inverted Bottom Fade */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${isOptimized ? 'opacity-0' : 'opacity-100'}`} style={{ background: inverted ? 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 25%, rgba(255,255,255,0.3) 60%, transparent 100%)' : 'transparent' }} />
        {/* Dark Bottom Fade */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${isOptimized ? 'opacity-100' : 'opacity-0'}`} style={{ background: 'linear-gradient(to top, rgba(11,21,40,1) 0%, rgba(11,21,40,0.8) 25%, rgba(11,21,40,0.3) 60%, transparent 100%)' }} />
      </div>
    </div>
  );
};


