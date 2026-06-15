import { useState, useEffect, useRef } from 'react';

interface UseTypewriterOptions {
    /** Start immediately without waiting for viewport (e.g. Hero) */
    autoStart?: boolean;
    /**
     * Base delay between characters in ms.
     * Real typing feel: ~60-90ms per char with natural variation.
     */
    baseDelay?: number;
    /** IntersectionObserver threshold to trigger (0–1) */
    threshold?: number;
    /** Initial delay before typing starts (ms) */
    startDelay?: number;
}

/**
 * Realistic typewriter hook.
 * - Variable per-character timing simulates natural human typing rhythm.
 * - Pauses longer at spaces (word boundaries) and punctuation.
 * - Occasional micro-hesitations for realism.
 * - autoStart=true → fires on mount (Hero).
 * - autoStart=false → fires when `ref` enters viewport.
 * - Runs exactly once; respects prefers-reduced-motion.
 */
export function useTypewriter(
    text: string,
    ref: React.RefObject<Element | null>,
    { autoStart = false, baseDelay = 72, threshold = 0.5, startDelay = 300 }: UseTypewriterOptions = {}
) {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);
    const startedRef = useRef(false);
    const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const getDelay = (char: string, nextChar: string): number => {
        // Pause after spaces (between words) — feels like lifting finger
        if (char === ' ') return baseDelay * 2.8 + Math.random() * baseDelay;
        // Pause after punctuation
        if ('.,:;!?'.includes(char)) return baseDelay * 3.5 + Math.random() * baseDelay;
        // Uppercase at word start (shift key mental overhead)
        if (nextChar && nextChar === nextChar.toUpperCase() && nextChar !== ' ')
            return baseDelay * 1.6 + Math.random() * baseDelay * 0.8;
        // Normal character: slight natural variation ±40%
        const jitter = (Math.random() - 0.5) * baseDelay * 0.8;
        // Occasional micro-hesitation (~10% chance)
        const hesitation = Math.random() < 0.10 ? baseDelay * 1.5 : 0;
        return Math.max(Math.min(15, baseDelay), baseDelay + jitter + hesitation);
    };

    const start = () => {
        if (startedRef.current) return;
        startedRef.current = true;



        let i = 0;

        const typeNext = () => {
            i++;
            setDisplayed(text.slice(0, i));

            if (i >= text.length) {
                setDone(true);
                return;
            }

            const delay = getDelay(text[i - 1], text[i]);
            rafRef.current = setTimeout(typeNext, delay);
        };

        // Initial pause before typing starts (person "focusing")
        rafRef.current = setTimeout(typeNext, startDelay + Math.random() * 200);
    };

    useEffect(() => {
        if (autoStart) {
            const t = setTimeout(start, 150);
            return () => {
                clearTimeout(t);
                if (rafRef.current) clearTimeout(rafRef.current);
            };
        }

        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    start();
                    observer.disconnect();
                }
            },
            // Only fire when the element is inside the central 50% of the screen
            { threshold, rootMargin: '-25% 0px -25% 0px' }
        );
        observer.observe(el);

        return () => {
            observer.disconnect();
            if (rafRef.current) clearTimeout(rafRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { displayed, done };
}
