import { useState, useEffect } from 'react';
import { m, AnimatePresence  } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useModalSolucoes } from '../../hooks/useModalSolucoes';

const MenuPrincipal = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isInAuthority, setIsInAuthority] = useState(false);
    const [isInDarkSection, setIsInDarkSection] = useState(false);
    const [isHeroDark, setIsHeroDark] = useState(false);
    const { openModal } = useModalSolucoes();

    const location = useLocation();
    const navigate = useNavigate();
    const isSobreTop = location.pathname === '/sobre' && !isScrolled;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            const authoritySection = document.getElementById('sobre-nos');
            const darkSection = document.getElementById('rx-solucoes');

            if (authoritySection) {
                const rect = authoritySection.getBoundingClientRect();
                setIsInAuthority(rect.top <= 82 && rect.bottom >= 80);
            } else {
                setIsInAuthority(false);
            }

            if (darkSection) {
                const rect = darkSection.getBoundingClientRect();
                // trigger when the dark background reaches the bottom of the MenuPrincipal
                setIsInDarkSection(rect.top <= 80 && rect.bottom >= 80);
            } else {
                setIsInDarkSection(false);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check on mount and route change
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    useEffect(() => {
        const handleHeroDark = (e: any) => setIsHeroDark(e.detail);
        window.addEventListener('hero-dark-mode', handleHeroDark);
        return () => window.removeEventListener('hero-dark-mode', handleHeroDark);
    }, []);

    const scrollToTopSmooth = () => {
        const startY = window.scrollY;
        const duration = 600;
        const startTime = performance.now();

        const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

        const animateScroll = (currentTime: number) => {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            window.scrollTo(0, startY * (1 - easeOutExpo(progress)));
            if (timeElapsed < duration) {
                requestAnimationFrame(animateScroll);
            }
        };
        requestAnimationFrame(animateScroll);
    };

    const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault();
        setIsMenuOpen(false);

        if (path === '/' || path === '/sobre' || path === '/contato') {
            if (location.pathname === path) {
                scrollToTopSmooth();
            } else {
                window.scrollTo(0, 0);
                setTimeout(() => window.scrollTo(0, 0), 50);
                navigate(path);
            }
            return;
        }

        if (path.startsWith('/#')) {
            const hash = path.substring(2);
            navigate(path);
            setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    const offset = 80;
                    const top = element.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            }, 100);
        }
    };

    const navLinks = [
        { name: 'Início', path: '/' },
        { name: 'Sobre nós', path: '/sobre' },
        { name: 'Rx Soluções', path: '/#rx-solucoes' },
        { name: 'Trabalhe conosco', path: 'https://app.vaggou.com.br/farmacon', external: true },
        { name: 'Contato', path: '/contato' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
                isMenuOpen
                ? 'bg-white/90 backdrop-blur-xl py-3 border-surface-200 shadow-sm'
                : isHeroDark
                    ? 'bg-[#0B1528]/90 backdrop-blur-xl py-3 border-white/10 shadow-sm'
                    : isInDarkSection
                        ? 'bg-black/90 backdrop-blur-xl py-3 border-white/10 shadow-sm'
                        : isInAuthority
                            ? 'bg-gradient-to-r from-[#03329b]/95 to-[#2563eb]/95 backdrop-blur-xl py-3 border-transparent shadow-sm'
                            : isScrolled
                                ? 'bg-white/90 backdrop-blur-xl py-3 border-surface-200 shadow-sm'
                                : 'bg-transparent py-4 md:py-6 border-transparent'
                }`}
        >
            <div className="w-full px-3 sm:px-4 md:px-8 xl:px-12 mx-auto flex items-center justify-between mt-1 md:mt-2 transition-all">
                
                {/* Logo */}
                <a href="/" onClick={(e) => handleNavigation(e, '/')} className="flex items-center z-50 relative min-w-0">
                    <img src={isMenuOpen ? "/logo/farmacon_logo_horizontal_azul.png" : (isInAuthority || isInDarkSection || isSobreTop || isHeroDark) ? "/logo/farmacon_logo_horizontal_branca.png" : (isScrolled ? "/logo/farmacon_logo_horizontal_azul.png" : "/logo/farmacon_logo_horizontal_principal.png")} alt="Farmacon" className="h-5 sm:h-7 md:h-8 w-auto transition-opacity duration-300" />
                </a>

                {/* Right Group: CTA + Menu Dropdown Toggle */}
                <div className="flex items-center justify-end gap-1 sm:gap-2 md:gap-4 relative z-50 shrink-0">
                    
                    <button
                        onClick={() => openModal()}
                        className={`px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 rounded-full font-semibold text-[10px] sm:text-[11px] md:text-sm transition-all shadow-sm cursor-pointer border
                            ${((isInAuthority || isInDarkSection || isHeroDark) && !isMenuOpen) || (isSobreTop && !isMenuOpen)
                                ? 'bg-white text-dark-900 border-transparent hover:bg-blue-50'
                                : 'bg-primary-50 border-primary-100 text-primary-700 hover:bg-primary-600 hover:text-white hover:border-primary-600'
                            }
                        `}
                    >
                        <span className="hidden sm:inline">Solicitar um diagnóstico</span>
                        <span className="sm:hidden">Diagnóstico</span>
                    </button>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`group flex items-center justify-center gap-1 sm:gap-1.5 md:gap-3 px-2.5 py-1.5 sm:px-5 sm:py-2 md:py-2.5 rounded-full font-bold text-[10px] sm:text-xs md:text-sm tracking-widest uppercase transition-all duration-300 border backdrop-blur-md cursor-pointer
                            ${isMenuOpen 
                                ? 'bg-primary-600 text-white border-transparent shadow-md'
                                : (isInAuthority || isInDarkSection || isSobreTop || isHeroDark)
                                    ? 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                                    : 'bg-primary-50 text-primary-700 border-primary-100 hover:bg-primary-100 hover:border-primary-200'
                            }
                        `}
                    >
                        <span className="mt-[1px]">{isMenuOpen ? 'Fechar' : 'Menu'}</span>
                        
                        <div className={`flex flex-row items-center justify-center gap-[3px] transition-transform duration-300 origin-center ${isMenuOpen ? 'rotate-90' : 'group-hover:rotate-90'}`}>
                            <div className={`w-[5px] h-[5px] rounded-full transition-all duration-300 border ${isMenuOpen || (isInAuthority && !isMenuOpen) || (isInDarkSection && !isMenuOpen) || (isSobreTop && !isMenuOpen) || (isHeroDark && !isMenuOpen) ? 'bg-white border-white' : 'bg-transparent border-primary-700 group-hover:bg-primary-700'}`} />
                            <div className={`w-[5px] h-[5px] rounded-full transition-all duration-300 border ${isMenuOpen || (isInAuthority && !isMenuOpen) || (isInDarkSection && !isMenuOpen) || (isSobreTop && !isMenuOpen) || (isHeroDark && !isMenuOpen) ? 'bg-white border-white' : 'bg-transparent border-primary-700 group-hover:bg-primary-700'}`} />
                            <div className={`w-[5px] h-[5px] rounded-full transition-all duration-300 border ${isMenuOpen || (isInAuthority && !isMenuOpen) || (isInDarkSection && !isMenuOpen) || (isSobreTop && !isMenuOpen) || (isHeroDark && !isMenuOpen) ? 'bg-white border-white' : 'bg-transparent border-primary-700 group-hover:bg-primary-700'}`} />
                        </div>
                    </button>

                    {/* Menu Dropdown Panel */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <m.div
                                initial={{ opacity: 0, y: -10, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                                transition={{ duration: 0.25, type: "spring", stiffness: 350, damping: 25 }}
                                className="absolute top-full mt-4 right-0 w-[calc(100vw-32px)] md:w-auto md:min-w-[280px] bg-white border border-surface-200 rounded-3xl p-4 md:p-5 shadow-2xl origin-top-right flex flex-col overflow-hidden"
                            >
                                {navLinks.map((link, i) => (
                                    <m.a
                                        key={link.name}
                                        href={link.path}
                                        target={link.external ? "_blank" : undefined}
                                        rel={link.external ? "noopener noreferrer" : undefined}
                                        onClick={(e) => {
                                            if (link.external) {
                                                setIsMenuOpen(false);
                                                return; // Allow normal link behavior for external
                                            }
                                            handleNavigation(e, link.path);
                                        }}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 + 0.05, duration: 0.3 }}
                                        className={`group flex items-center justify-between p-2 md:p-3 rounded-2xl hover:bg-surface-50 transition-all cursor-pointer relative z-10 ${
                                            location.pathname === link.path ? 'bg-surface-50' : ''
                                        }`}
                                    >
                                        <span className={`text-xs md:text-sm font-semibold tracking-wide group-hover:text-primary-600 transition-colors uppercase ${
                                            location.pathname === link.path ? 'text-primary-600' : 'text-dark-900'
                                        }`}>
                                            {link.name}
                                        </span>
                                        <ArrowRight size={16} className={`transition-all duration-300 ${
                                            location.pathname === link.path ? 'opacity-100 translate-x-0 text-primary-600' : 'text-surface-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary-600'
                                        }`} />
                                    </m.a>
                                ))}
                            </m.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
            
            <AnimatePresence>
                {isMenuOpen && (
                    <m.div 
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

export default MenuPrincipal;

