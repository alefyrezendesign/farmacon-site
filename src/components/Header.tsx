import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSolutionsModal } from '../hooks/useSolutionsModal';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isInAuthority, setIsInAuthority] = useState(false);
    const { openModal } = useSolutionsModal();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            const authoritySection = document.getElementById('sobre-nos');
            if (authoritySection) {
                const rect = authoritySection.getBoundingClientRect();
                // Quando o topo da seção Authority chegar ao topo da tela (ou muito perto)
                // E o final dela ainda estiver visível no topo
                if (rect.top <= 20 && rect.bottom >= 80) {
                    setIsInAuthority(true);
                } else {
                    setIsInAuthority(false);
                }
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        setIsMenuOpen(false);
        if (id === 'top') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        
        const element = document.getElementById(id);
        if (element) {
            e.preventDefault();
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navLinks = [
        { name: 'Início', id: 'top' },
        { name: 'Sobre nós', id: 'sobre-nos' },
        { name: 'Rx Soluções', id: 'rx-solucoes' },
        { name: 'Contato', id: 'contato' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
                isMenuOpen
                ? 'bg-white/90 backdrop-blur-xl py-3 border-surface-200 shadow-sm'
                : isInAuthority
                    ? 'bg-[#2563eb]/95 backdrop-blur-xl py-3 border-transparent shadow-sm'
                    : isScrolled
                        ? 'bg-white/90 backdrop-blur-xl py-3 border-surface-200 shadow-sm'
                        : 'bg-transparent py-4 md:py-6 border-transparent'
                }`}
        >
            <div className="w-full px-4 md:px-8 xl:px-12 mx-auto flex items-center justify-between mt-1 md:mt-2 transition-all">
                
                {/* Logo */}
                <a href="#" onClick={(e) => scrollToSection(e, 'top')} className="flex items-center z-50 relative shrink-0">
                    <img src={isMenuOpen ? "/logo/farmacon_logo_horizontal_azul.png" : isInAuthority ? "/logo/farmacon_logo_horizontal_branca.png" : (isScrolled ? "/logo/farmacon_logo_horizontal_azul.png" : "/logo/farmacon_logo_horizontal_principal.png")} alt="Farmacon" className="h-6 sm:h-7 md:h-8 w-auto transition-opacity duration-300" />
                </a>

                {/* Right Group: CTA + Menu Dropdown Toggle */}
                <div className="flex items-center justify-end gap-2 sm:gap-3 md:gap-4 relative z-50 shrink-0">
                    
                    <button
                        onClick={() => openModal()}
                        className={`px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 rounded-full font-semibold text-[10px] sm:text-[11px] md:text-sm transition-all shadow-sm cursor-pointer border
                            ${isInAuthority && !isMenuOpen
                                ? 'bg-white text-[#2563eb] border-transparent hover:bg-blue-50'
                                : 'bg-primary-50 border-primary-100 text-primary-700 hover:bg-primary-600 hover:text-white hover:border-primary-600'
                            }
                        `}
                    >
                        <span className="hidden sm:inline">Solicitar um diagnóstico</span>
                        <span className="sm:hidden">Diagnóstico</span>
                    </button>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`group flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 px-3 py-1.5 sm:px-5 sm:py-2 md:py-2.5 rounded-full font-bold text-[10px] sm:text-xs md:text-sm tracking-widest uppercase transition-all duration-300 border backdrop-blur-md cursor-pointer
                            ${isMenuOpen 
                                ? 'bg-primary-600 text-white border-transparent shadow-md'
                                : isInAuthority
                                    ? 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                                    : 'bg-primary-50 text-primary-700 border-primary-100 hover:bg-primary-100 hover:border-primary-200'
                            }
                        `}
                    >
                        <span className="mt-[1px]">{isMenuOpen ? 'Fechar' : 'Menu'}</span>
                        
                        <div className={`flex flex-row items-center justify-center gap-[3px] transition-transform duration-300 origin-center ${isMenuOpen ? 'rotate-90' : 'group-hover:rotate-90'}`}>
                            <div className={`w-[5px] h-[5px] rounded-full transition-all duration-300 border ${isMenuOpen || (isInAuthority && !isMenuOpen) ? 'bg-white border-white' : 'bg-transparent border-primary-700 group-hover:bg-primary-700'}`} />
                            <div className={`w-[5px] h-[5px] rounded-full transition-all duration-300 border ${isMenuOpen || (isInAuthority && !isMenuOpen) ? 'bg-white border-white' : 'bg-transparent border-primary-700 group-hover:bg-primary-700'}`} />
                            <div className={`w-[5px] h-[5px] rounded-full transition-all duration-300 border ${isMenuOpen || (isInAuthority && !isMenuOpen) ? 'bg-white border-white' : 'bg-transparent border-primary-700 group-hover:bg-primary-700'}`} />
                        </div>
                    </button>

                    {/* Menu Dropdown Panel */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                                transition={{ duration: 0.25, type: "spring", stiffness: 350, damping: 25 }}
                                className="absolute top-full mt-4 right-0 min-w-[220px] md:min-w-[280px] bg-white border border-surface-200 rounded-3xl p-4 md:p-5 shadow-2xl origin-top-right flex flex-col overflow-hidden"
                            >
                                {navLinks.map((link, i) => (
                                    <motion.a
                                        key={link.id}
                                        href={`#${link.id}`}
                                        onClick={(e) => scrollToSection(e, link.id)}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 + 0.05, duration: 0.3 }}
                                        className="group flex items-center justify-between p-2 md:p-3 rounded-2xl hover:bg-surface-50 transition-all cursor-pointer relative z-10"
                                    >
                                        <span className="text-dark-900 text-xs md:text-sm font-semibold tracking-wide group-hover:text-primary-600 transition-colors uppercase">
                                            {link.name}
                                        </span>
                                        <ArrowRight size={16} className="text-surface-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary-600 transition-all duration-300" />
                                    </motion.a>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
            
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-dark-900/10 backdrop-blur-sm -mt-[80px]"
                        style={{ height: '120vh' }}
                        onClick={() => setIsMenuOpen(false)}
                    />
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
