import { useEffect, useRef, useState, useCallback } from 'react';
import { m, useInView  } from 'framer-motion';

const FULL_TEXT = 'A Farmacon une a evolução do mercado e as soluções mais completas para sua farmácia.';

const TypewriterText = () => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(FULL_TEXT.slice(0, i));
      if (i >= FULL_TEXT.length) {
        clearInterval(interval);
        setTimeout(() => setShowCursor(false), 1500);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <p
      ref={ref}
      className="font-normal leading-[1.6] m-0 p-0 min-h-[2.6em] text-white"
      style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)', textWrap: 'balance' }}
    >
      <span>{displayed}</span>
      {showCursor && (
        <m.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block w-[2px] h-[1.2em] bg-white ml-[2px] align-text-bottom"
        />
      )}
    </p>
  );
};

const FraseImpactante = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 });

  // Store the text zone rect relative to the section
  const textZone = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const updateTextZone = useCallback(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const sRect = section.getBoundingClientRect();
    const tRect = text.getBoundingClientRect();

    const pad = 20; // breathing room around text
    textZone.current = {
      x: tRect.left - sRect.left - pad,
      y: tRect.top - sRect.top - pad,
      w: tRect.width + pad * 2,
      h: tRect.height + pad * 2,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const spacing = 40;
    const dotRadius = 2.0;
    const totalRows = 11;
    const hoverRadius = 120;
    const whiteColor = '#2563eb';
    const activeR = 255, activeG = 255, activeB = 255;

    let w = 0;
    let h = 0;
    let dots: { x: number; y: number; opacity: number; delay: number; inZone?: boolean; f?: number }[] = [];

    const buildGrid = () => {
      dots = [];
      const cols = Math.floor(w / spacing);
      if (cols <= 0) return;

      const gridW = (cols - 1) * spacing;
      const ox = (w - gridW) / 2;

      const gridH = (totalRows - 1) * spacing;
      const oy = (h - gridH) / 2;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < totalRows; r++) {
          dots.push({ 
            x: ox + c * spacing, 
            y: oy + r * spacing,
            opacity: 0,
            delay: Math.random() * 2000 // More spaced out: up to 2s delay
          });
        }
      }
    };

    const syncSize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = section.clientWidth;
      h = section.clientHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildGrid();
      updateTextZone();
    };

    let mx = -9999, my = -9999;
    let smx = -9999, smy = -9999;
    let startTime = 0;

    const isInTextZone = (dx: number, dy: number) => {
      const z = textZone.current;
      return dx >= z.x && dx <= z.x + z.w && dy >= z.y && dy <= z.y + z.h;
    };

    const draw = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (window.innerWidth < 1024) {
        // Auto animate on mobile - slow Lissajous curve covering the whole grid
        const cx = w / 2;
        const cy = h / 2;
        const speed = elapsed * 0.0004;
        mx = cx + Math.sin(speed) * (w * 0.45);
        my = cy + Math.sin(speed * 1.3) * Math.cos(speed * 0.8) * (h * 0.45);
      }

      smx += (mx - smx) * 0.15;
      smy += (my - smy) * 0.15;
      ctx.clearRect(0, 0, w, h);

      // First pass: Calculate active states and draw glows/dots
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        
        if (isInView) {
            if (elapsed > d.delay) {
                d.opacity = Math.min(1, d.opacity + 0.01);
            }
        }

        const ddx = smx - d.x;
        const ddy = smy - d.y;
        const dist = Math.max(0.1, Math.sqrt(ddx * ddx + ddy * ddy));

        d.inZone = isInTextZone(d.x, d.y);
        d.f = 0;
        
        let currentRadius = dotRadius;
        
        if (dist < hoverRadius && !d.inZone && d.opacity > 0.5) {
          d.f = Math.pow(1 - dist / hoverRadius, 1.4);
          currentRadius = dotRadius + (d.f * 1.5);

          // Soft ambient glow
          ctx.beginPath();
          ctx.arc(d.x, d.y, dotRadius + d.f * 18, 0, 6.2832);
          ctx.fillStyle = `rgba(${activeR},${activeG},${activeB},${d.f * 0.12 * d.opacity})`;
          ctx.fill();
        }

        const dotAlpha = d.inZone ? 0 : d.opacity;
        if (dotAlpha > 0) {
            ctx.beginPath();
            ctx.arc(d.x, d.y, currentRadius, 0, 6.2832);
            ctx.fillStyle = d.inZone ? whiteColor : `rgba(${activeR}, ${activeG}, ${activeB}, ${d.opacity})`;
            ctx.fill();
        }
      }

      // Second pass: Draw network lines between dots
      for (let i = 0; i < dots.length; i++) {
        const d1 = dots[i];
        if (d1.f && d1.f > 0.01 && !d1.inZone) {
          for (let j = i + 1; j < dots.length; j++) {
            const d2 = dots[j];
            if (!d2.inZone && d2.opacity > 0.5) {
              const dx = d1.x - d2.x;
              const dy = d1.y - d2.y;
              const distSq = dx * dx + dy * dy;
              
              if (distSq > 0 && distSq <= spacing * spacing * 2.5) {
                const lineFactor = Math.max(d1.f, d2.f || 0); 
                if (lineFactor > 0.01) {
                  const isDiagonal = distSq > spacing * spacing * 1.2;
                  let alpha = lineFactor * 0.45 * Math.min(d1.opacity, d2.opacity);
                  if (isDiagonal) alpha *= 0.4; // make diagonals much softer
                  
                  ctx.beginPath();
                  ctx.moveTo(d1.x, d1.y);
                  ctx.lineTo(d2.x, d2.y);
                  ctx.strokeStyle = `rgba(${activeR}, ${activeG}, ${activeB}, ${alpha})`;
                  ctx.lineWidth = 0.8;
                  ctx.stroke();
                }
              }
            }
          }
        }
      }
    };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const onLeave = () => { mx = -9999; my = -9999; };

    let raf: number;
    const loop = (timestamp: number) => { 
        draw(timestamp); 
        raf = requestAnimationFrame(loop); 
    };

    const ro = new ResizeObserver(() => syncSize());
    ro.observe(section);

    const textRO = new ResizeObserver(() => updateTextZone());
    if (textRef.current) textRO.observe(textRef.current);

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    syncSize();
    raf = requestAnimationFrame(loop);

    return () => {
      ro.disconnect();
      textRO.disconnect();
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [updateTextZone, isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[480px] bg-[#2563eb] overflow-hidden isolate"
    >
      {/* Canvas — fills entire section */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full z-0 cursor-crosshair"
      />

      {/* Text — centered vertically via flexbox, no background */}
      <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
        <div className="container mx-auto px-6 md:px-10">
          <div ref={textRef} className="ml-0 md:ml-16 w-fit max-w-[calc(100vw-3rem)] pointer-events-auto">
            <TypewriterText />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FraseImpactante;

