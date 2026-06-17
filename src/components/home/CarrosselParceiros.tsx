import { useRef, useEffect, useCallback } from 'react';

const IMG_1 = '/logo-clientes/logo-clientes-1.webp';
const IMG_2 = '/logo-clientes/logo-clientes-2.webp';
const IMG_3 = '/logo-clientes/logo-clientes-3.webp';

// Enough copies to always cover the viewport + overflow
const COPIES = 4;
// Base speed in px/s
const BASE_SPEED = 35;

/**
 * Scroll-reactive infinite marquee.
 * - Direction alternates per track.
 * - Reverses direction while the user scrolls in the opposite direction.
 */
const CarrosselParceiros = () => {
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const track3Ref = useRef<HTMLDivElement>(null);

  const offset1Ref = useRef(0);
  const offset2Ref = useRef(0);
  const offset3Ref = useRef(0);
  
  const directionRef = useRef(-1); // -1 left, 1 right
  
  const w1Ref = useRef(0);
  const w2Ref = useRef(0);
  const w3Ref = useRef(0);
  
  const rafRef = useRef(0);
  const prevTimeRef = useRef(0);
  const prevScrollRef = useRef(0);

  /* ── Scroll direction detection ────────────────────────── */
  const onScroll = useCallback(() => {
    const y = window.scrollY;
    const delta = y - prevScrollRef.current;
    if (Math.abs(delta) > 2) {
      directionRef.current = delta > 0 ? -1 : 1;
    }
    prevScrollRef.current = y;
  }, []);

  /* ── Measure image widths ───────────────────────────── */
  const measure1 = useCallback(() => {
    if (!track1Ref.current) return;
    const img = track1Ref.current.querySelector('img');
    if (img && img.offsetWidth > 0) w1Ref.current = img.offsetWidth;
  }, []);

  const measure2 = useCallback(() => {
    if (!track2Ref.current) return;
    const img = track2Ref.current.querySelector('img');
    if (img && img.offsetWidth > 0) w2Ref.current = img.offsetWidth;
  }, []);

  const measure3 = useCallback(() => {
    if (!track3Ref.current) return;
    const img = track3Ref.current.querySelector('img');
    if (img && img.offsetWidth > 0) w3Ref.current = img.offsetWidth;
  }, []);

  /* ── Animation loop ────────────────────────────────────── */
  useEffect(() => {
    prevScrollRef.current = window.scrollY;
    window.addEventListener('scroll', onScroll, { passive: true });

    const tick = (t: number) => {
      if (!prevTimeRef.current) prevTimeRef.current = t;
      const dt = (t - prevTimeRef.current) / 1000;
      prevTimeRef.current = t;

      // Track 1 (Right: -directionRef)
      offset1Ref.current += BASE_SPEED * (-directionRef.current) * dt;
      const w1 = w1Ref.current;
      if (w1 > 0) {
        while (offset1Ref.current <= -w1) offset1Ref.current += w1;
        while (offset1Ref.current >= 0) offset1Ref.current -= w1;
      }
      if (track1Ref.current) track1Ref.current.style.transform = `translateX(${offset1Ref.current}px)`;

      // Track 2 (Left: directionRef)
      offset2Ref.current += BASE_SPEED * directionRef.current * dt;
      const w2 = w2Ref.current;
      if (w2 > 0) {
        while (offset2Ref.current <= -w2) offset2Ref.current += w2;
        while (offset2Ref.current >= 0) offset2Ref.current -= w2;
      }
      if (track2Ref.current) track2Ref.current.style.transform = `translateX(${offset2Ref.current}px)`;

      // Track 3 (Right: -directionRef)
      offset3Ref.current += BASE_SPEED * (-directionRef.current) * dt;
      const w3 = w3Ref.current;
      if (w3 > 0) {
        while (offset3Ref.current <= -w3) offset3Ref.current += w3;
        while (offset3Ref.current >= 0) offset3Ref.current -= w3;
      }
      if (track3Ref.current) track3Ref.current.style.transform = `translateX(${offset3Ref.current}px)`;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <div className="w-full overflow-hidden pt-4 pb-10 md:pt-14 md:pb-28 bg-white relative flex flex-col gap-6 md:gap-10">
      {/* Fade masks no container relative */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-fade-edges-white" />

      {/* ── Track 1 ──────────────────────────────── */}
      <div
        ref={track1Ref}
        className="flex items-center will-change-transform w-max"
      >
        {Array.from({ length: COPIES }).map((_, i) => (
          <img
            key={`t1-${i}`}
            src={IMG_1}
            alt="Clientes Farmacon"
            onLoad={i === 0 ? measure1 : undefined}
            draggable={false}
            className="h-8 sm:h-10 lg:h-12 xl:h-14 max-w-none object-contain select-none pointer-events-none flex-shrink-0"
          />
        ))}
      </div>

      {/* ── Track 2 ──────────────────────────────── */}
      <div
        ref={track2Ref}
        className="flex items-center will-change-transform w-max"
      >
        {Array.from({ length: COPIES }).map((_, i) => (
          <img
            key={`t2-${i}`}
            src={IMG_2}
            alt="Clientes Farmacon"
            onLoad={i === 0 ? measure2 : undefined}
            draggable={false}
            className="h-8 sm:h-10 lg:h-12 xl:h-14 max-w-none object-contain select-none pointer-events-none flex-shrink-0"
          />
        ))}
      </div>

      {/* ── Track 3 ──────────────────────────────── */}
      <div
        ref={track3Ref}
        className="flex items-center will-change-transform w-max"
      >
        {Array.from({ length: COPIES }).map((_, i) => (
          <img
            key={`t3-${i}`}
            src={IMG_3}
            alt="Clientes Farmacon"
            onLoad={i === 0 ? measure3 : undefined}
            draggable={false}
            className="h-8 sm:h-10 lg:h-12 xl:h-14 max-w-none object-contain select-none pointer-events-none flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default CarrosselParceiros;
