import { m  } from 'framer-motion';
import type { ReactNode } from 'react';
import { AnimatedTitle } from './AnimatedTitle';
import { TypewriterBadge } from './TypewriterBadge';

interface SectionHeaderProps {
  badgeIcon?: ReactNode;
  customBadge?: ReactNode;
  badgeText?: string;
  titleLines?: string[];
  title?: ReactNode;
  subtitleLines?: string[];
  subtitle?: ReactNode;
  align?: 'left' | 'center' | 'mobile-center';
  className?: string;
  inverted?: boolean;
}

const SectionHeader = ({ 
  badgeIcon, 
  badgeText, 
  customBadge,
  titleLines,
  title, 
  subtitleLines,
  subtitle, 
  align = 'center',
  className = '',
  inverted = false
}: SectionHeaderProps) => {
  const isCenter = align === 'center';
  const isMobileCenter = align === 'mobile-center';
  
  const alignClasses = isCenter 
    ? 'items-center text-center mx-auto' 
    : isMobileCenter 
      ? 'items-center text-center md:items-start md:text-left mx-auto md:mx-0'
      : 'items-start text-left';
  
  return (
    <div className={`flex flex-col ${alignClasses} max-w-4xl mb-16 md:mb-24 ${className}`}>
      {/* Badge */}
      {customBadge ? (
        <m.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className={`mb-6 ${isCenter ? 'mx-auto' : isMobileCenter ? 'mx-auto md:mx-0' : ''}`}
        >
          {customBadge}
        </m.div>
      ) : badgeText ? (
        <TypewriterBadge text={badgeText} icon={badgeIcon} inverted={inverted} className={`mb-6 ${isCenter ? 'mx-auto' : isMobileCenter ? 'mx-auto md:mx-0' : ''}`} />
      ) : null}

      {/* Title */}
      {titleLines ? (
        <h2 className={`text-[2rem] md:text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight leading-[1.1] mb-6 ${inverted ? 'text-white' : 'text-dark-900'}`}>
          <AnimatedTitle lines={titleLines} delay={badgeText ? 0.7 : 0.1} />
        </h2>
      ) : title ? (
        <m.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6, delay: badgeText ? 0.7 : 0.1 }}
          className={`text-[2rem] md:text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight leading-[1.1] mb-6 ${inverted ? 'text-white' : 'text-dark-900'}`}
        >
          {title}
        </m.h2>
      ) : null}

      {/* Subtitle */}
      {subtitleLines ? (
        <div className={`text-[15px] md:text-[1.1rem] font-medium leading-relaxed max-w-2xl ${isCenter ? 'mx-auto' : ''} ${inverted ? 'text-white/80' : 'text-slate-600'}`}>
          <AnimatedTitle lines={subtitleLines} delay={badgeText ? 0.9 : 0.4} />
        </div>
      ) : subtitle ? (
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6, delay: badgeText ? 0.9 : 0.1 }}
          className={`text-[15px] md:text-[1.1rem] font-medium leading-relaxed max-w-2xl ${isCenter ? 'mx-auto' : ''} ${inverted ? 'text-white/80' : 'text-slate-600'}`}
        >
          {subtitle}
        </m.div>
      ) : null}
    </div>
  );
};

export default SectionHeader;

