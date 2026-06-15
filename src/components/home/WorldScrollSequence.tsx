import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, MotionValue } from 'framer-motion';

const FRAME_COUNT = 58;
const FRAME_PREFIX = '/background/frame-bg-world/world-bruto';
const FRAME_SUFFIX = '.jpg';

const padZero = (num: number) => num.toString().padStart(3, '0');

interface WorldScrollSequenceProps {
  progress: MotionValue<number>;
}

const WorldScrollSequence = ({ progress }: WorldScrollSequenceProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `${FRAME_PREFIX}${padZero(i)}${FRAME_SUFFIX}`;
      img.onload = () => {
        if (i === 0 && canvasRef.current) {
          drawFrame(img);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const drawFrame = (img: HTMLImageElement) => {
    if (!canvasRef.current || !img.complete) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw cover (mantendo aspecto ratio)
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;
    
    ctx.drawImage(
      img, 
      0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
    );
  };

  // Update canvas on scroll
  useMotionValueEvent(progress, 'change', (latest) => {
    if (!canvasRef.current || images.length === 0) return;

    let frameIndex = Math.floor(latest * (FRAME_COUNT - 1));
    if (frameIndex < 0) frameIndex = 0;
    if (frameIndex >= FRAME_COUNT) frameIndex = FRAME_COUNT - 1;

    drawFrame(images[frameIndex]);
  });

  return (
    <div className="relative w-full overflow-hidden flex items-center justify-center pointer-events-none z-0">
      <canvas 
        ref={canvasRef} 
        width={1920} 
        height={1080}
        className="w-[130%] max-w-[130%] h-auto object-cover md:w-full md:max-w-[1920px]"
      />
    </div>
  );
};

export default WorldScrollSequence;
