import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 88; // 0000 to 0087

// Pad number to 4 digits (e.g. 0 -> 0000, 1 -> 0001)
const currentFrame = (index: number) => 
  `/background/sobre-bg/timeline-bg-frame/line-gradient${index.toString().padStart(4, '0')}.webp`;

const SobreSequence = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  // Pre-load all frames for smooth playback
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT && canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx && loadedImages[0] && loadedImages[0].complete) {
            // Desenha o primeiro frame enquanto aguarda o scroll
            ctx.drawImage(loadedImages[0], 0, 0, 1920, 290);
          }
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Começa quando o topo do container entra na parte de baixo da tela
    // Termina quando a base do container sai pela parte de cima
    offset: ["start end", "end start"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (images.length === FRAME_COUNT && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      const frame = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(latest)));
      const img = images[frame];
      
      if (img && img.complete && ctx) {
        ctx.clearRect(0, 0, 1920, 290);
        ctx.drawImage(img, 0, 0, 1920, 290);
      }
    }
  });

  return (
    <section ref={containerRef} className="relative w-full pointer-events-none z-20 mt-2 md:mt-8 -mb-[18vh] md:-mb-[28vh]">
      {/* 
        Canvas com resolução nativa travada em 1920x290, 
        escalado via CSS w-full h-auto para ajustar à largura exata sem cortes.
        mix-blend-multiply torna o fundo branco do jpg transparente.
      */}
      <canvas 
        ref={canvasRef} 
        width={1920} 
        height={290} 
        className="block w-full h-auto mix-blend-multiply opacity-90" 
      />
    </section>
  );
};

export default SobreSequence;
