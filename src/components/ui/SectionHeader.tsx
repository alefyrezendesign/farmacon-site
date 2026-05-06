import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionHeaderProps {
  badgeIcon?: ReactNode;
  badgeText: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  inverted?: boolean;
}

const SectionHeader = ({ 
  badgeIcon, 
  badgeText, 
  title, 
  subtitle, 
  align = 'center',
  className = '',
  inverted = false
}: SectionHeaderProps) => {
  const isCenter = align === 'center';
  
  return (
    <div className={`flex flex-col ${isCenter ? 'items-center text-center mx-auto' : 'items-start text-left'} max-w-4xl mb-16 md:mb-24 ${className}`}>
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm mb-6 ${isCenter ? 'mx-auto' : ''} ${
          inverted ? 'bg-white/20 border-white/30 text-white' : 'bg-primary-50 border-primary-100'
        }`}
      >
        {badgeIcon && (
          <span className={`flex items-center justify-center ${inverted ? 'text-white' : 'text-primary-600'}`}>
            {badgeIcon}
          </span>
        )}
        <span className={`text-[10.5px] md:text-[11.5px] font-bold uppercase tracking-[0.08em] ${inverted ? 'text-white' : 'text-primary-700'}`}>
          {badgeText}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.6 }}
        className={`text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-tight leading-[1.1] mb-5 ${inverted ? 'text-white' : 'text-dark-900'}`}
      >
        {title}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-[1.05rem] md:text-lg font-medium leading-relaxed max-w-2xl ${isCenter ? 'mx-auto' : ''} ${inverted ? 'text-white/80' : 'text-dark-900/70'}`}
        >
          {subtitle}
        </motion.div>
      )}
    </div>
  );
};

export default SectionHeader;
