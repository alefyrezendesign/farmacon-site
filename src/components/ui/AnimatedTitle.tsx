import { m  } from 'framer-motion';

import type { ReactNode } from 'react';

interface AnimatedTitleProps {
  lines: ReactNode[];
  className?: string;
  delay?: number;
}

export const AnimatedTitle = ({ lines, className = '', delay = 0 }: AnimatedTitleProps) => {
  return (
    <span className={`flex flex-col ${className}`}>
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden py-4 -my-4 px-4 -mx-4">
            <m.span
            initial={{ opacity: 0, y: "110%" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 100,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + (index * 0.15),
              duration: 0.8
            }}
            className="block"
            aria-hidden="true"
            style={{ willChange: "transform, opacity" }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </span>
  );
};

