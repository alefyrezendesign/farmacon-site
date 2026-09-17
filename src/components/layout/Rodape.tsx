import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, MessageCircle, ChevronDown } from 'lucide-react';

const AddressAccordion = ({ title, content }: { title: string, content: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="w-full">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-fit flex items-center gap-8 py-2 text-left transition-colors focus:outline-none group"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:bg-blue-600 group-hover:border-blue-500 flex items-center justify-center shrink-0 transition-all">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-medium text-slate-300 group-hover:text-white transition-colors text-sm">{title}</span>
                </div>
                <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </div>
            </button>
            <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="pb-3 text-sm text-slate-400 leading-relaxed mt-1">
                    <div className="pl-11">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Rodape = () => {
    const location = useLocation();
    const navigate = useNavigate();

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

    return (
        <footer className="relative bg-[#070b14] pt-20 pb-8 mt-auto overflow-hidden">
            {/* Efeitos de fundo e brilho */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-5 md:px-10 xl:px-16 relative z-10">

                {/* Top Section: Logo e Descrição */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 mb-12 mt-6">
                    <Link to="/" className="inline-block shrink-0">
                        <img 
                            src="/logo/farmacon_logo_horizontal_principal.png" 
                            alt="Farmacon" 
                            className="h-10 md:h-12 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" 
                            loading="lazy"
                            decoding="async"
                        />
                    </Link>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-[460px] text-center md:text-right">
                        Especialistas em contabilidade para o varejo farmacêutico.
                    </p>
                </div>

                {/* Divisória Superior */}
                <div className="w-full h-px bg-white/10 mb-12"></div>

                {/* Grid Central */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap lg:justify-between gap-y-12 gap-x-6 mb-16 w-full">
                    
                    {/* Coluna 1: Contato */}
                    <div className="flex flex-col gap-5 w-full sm:w-[45%] lg:w-[20%] shrink-0">
                        <h3 className="text-white font-semibold tracking-wider uppercase text-[13px] opacity-90">Contato</h3>
                        <div className="flex flex-col gap-4">
                            <a 
                                href="https://wa.me/551131635000?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Farmacon%20e%20gostaria%20de%20falar%20com%20um%20especialista." 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors w-fit group"
                            >
                                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:bg-blue-600 group-hover:border-blue-500 flex items-center justify-center shrink-0 transition-all">
                                    <MessageCircle className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
                                </div>
                                <span className="font-medium text-sm">(11) 3163-5000</span>
                                <div className="flex items-center justify-center shrink-0 ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="text-slate-500 group-hover:text-[#25D366] transition-colors duration-300">
                                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                                    </svg>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Coluna 2: Endereços */}
                    <div className="flex flex-col gap-5 w-full sm:w-[45%] lg:w-[24%] shrink-0">
                        <h3 className="text-white font-semibold tracking-wider uppercase text-[13px] opacity-90">Endereços</h3>
                        <div className="flex flex-col gap-3">
                            <AddressAccordion 
                                title="Matriz - Itaboraí" 
                                content={
                                    <>
                                        Prédio Hellix - Av. Vinte e Dois de Maio, 6331<br />
                                        Bloco 1, 7° andar<br />
                                        Jardim Imperial, Itaboraí - RJ<br />
                                        <span className="text-slate-300 font-medium mt-2 block">CEP: 24800-258</span>
                                    </>
                                }
                            />
                            <AddressAccordion 
                                title="Filial - Rio de Janeiro" 
                                content={
                                    <>
                                        R. México, 11 Bloco B<br />
                                        Centro do Rio - RJ<br />
                                        <span className="text-slate-300 font-medium mt-2 block">CEP: 20030-114</span>
                                    </>
                                }
                            />
                        </div>
                    </div>

                    {/* Coluna 3: Institucional */}
                    <div className="flex flex-col gap-5 w-full sm:w-[45%] lg:w-[18%] shrink-0">
                        <h3 className="text-white font-semibold tracking-wider uppercase text-[13px] opacity-90">Institucional</h3>
                        <nav className="flex flex-col gap-4">
                            <a 
                                href="/#rx-solucoes" 
                                onClick={(e) => handleNavigation(e, '/#rx-solucoes')}
                                className="text-slate-400 hover:text-blue-400 transition-colors w-fit flex items-center gap-3 group text-[13px]"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400 group-hover:scale-150 transition-all"></div>
                                RX Soluções
                            </a>
                            <a 
                                href="https://app.vaggou.com.br/farmacon" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-slate-400 hover:text-blue-400 transition-colors w-fit flex items-center gap-3 group text-[13px]"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400 group-hover:scale-150 transition-all"></div>
                                Trabalhe conosco
                                <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ml-1">Vagas</span>
                            </a>
                        </nav>
                    </div>

                    {/* Coluna 4: Jurídico */}
                    <div className="flex flex-col gap-5 w-full sm:w-[45%] lg:w-[18%] shrink-0">
                        <h3 className="text-white font-semibold tracking-wider uppercase text-[13px] opacity-90">Jurídico</h3>
                        <nav className="flex flex-col gap-4">
                            <Link to="/politica-de-privacidade" className="text-slate-400 hover:text-white transition-colors w-fit flex items-center gap-3 group text-[13px]">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-colors"></div>
                                Política de Privacidade
                            </Link>
                            <Link to="/termos-de-uso" className="text-slate-400 hover:text-white transition-colors w-fit flex items-center gap-3 group text-[13px]">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-colors"></div>
                                Termos de Uso
                            </Link>
                            <Link to="/politica-de-cookies" className="text-slate-400 hover:text-white transition-colors w-fit flex items-center gap-3 group text-[13px]">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-colors"></div>
                                Política de Cookies
                            </Link>
                        </nav>
                    </div>

                    {/* Coluna 5: Redes Sociais */}
                    <div className="flex w-full sm:w-full lg:justify-end lg:flex-1 shrink-0">
                        <div className="flex items-start gap-4">
                            <a href="https://www.instagram.com/farmacontabilidade/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-blue-500 hover:text-white hover:-translate-y-1 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 25 24">
                                    <path fillRule="evenodd" d="M23.805 7.413c-.051-1.169-.24-1.973-.511-2.67a5.4 5.4 0 0 0-1.273-1.95 5.4 5.4 0 0 0-1.947-1.269c-.7-.27-1.5-.46-2.67-.511-1.177-.056-1.551-.069-4.539-.069s-3.361.013-4.535.064c-1.169.052-1.973.241-2.669.512-.74.28-1.401.71-1.952 1.272A5.4 5.4 0 0 0 2.441 4.74c-.27.7-.46 1.5-.511 2.669-.056 1.178-.069 1.552-.069 4.54s.013 3.36.065 4.534c.051 1.17.24 1.973.511 2.67.28.739.714 1.4 1.272 1.951.55.559 1.217.993 1.948 1.268.7.271 1.5.46 2.67.512 1.173.051 1.547.064 4.534.064s3.362-.013 4.535-.064c1.17-.052 1.973-.24 2.67-.512a5.63 5.63 0 0 0 3.22-3.22c.27-.7.46-1.5.51-2.669.052-1.173.065-1.547.065-4.535 0-2.987-.004-3.361-.056-4.535m-1.981 8.984c-.048 1.075-.228 1.655-.379 2.042a3.65 3.65 0 0 1-2.089 2.09c-.387.15-.971.33-2.042.377-1.16.052-1.508.065-4.444.065s-3.289-.013-4.445-.065c-1.075-.047-1.655-.227-2.042-.378a3.4 3.4 0 0 1-1.264-.82 3.4 3.4 0 0 1-.82-1.265c-.151-.386-.332-.971-.379-2.041-.052-1.161-.064-1.51-.064-4.445s.012-3.289.064-4.445c.047-1.074.228-1.655.378-2.042.177-.477.456-.91.826-1.263a3.4 3.4 0 0 1 1.263-.821c.387-.15.972-.331 2.042-.379 1.16-.051 1.51-.064 4.445-.064 2.94 0 3.288.013 4.445.064 1.074.048 1.655.228 2.041.379.478.176.912.455 1.264.82.366.357.645.787.821 1.264.15.387.331.972.379 2.042.051 1.16.064 1.509.064 4.445s-.013 3.28-.064 4.44M12.865 6.296a5.654 5.654 0 0 0-5.652 5.652 5.654 5.654 0 0 0 5.652 5.653 5.654 5.654 0 0 0 5.653-5.653 5.654 5.654 0 0 0-5.653-5.652m0 9.319a3.667 3.667 0 1 1 .001-7.335 3.667 3.667 0 0 1 0 7.335m5.876-8.223a1.32 1.32 0 1 0 0-2.64 1.32 1.32 0 0 0 0 2.64" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="https://www.facebook.com/farmaconcontabilidade" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-blue-500 hover:text-white hover:-translate-y-1 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/company/farmaconcontabilidade/mycompany/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-blue-500 hover:text-white hover:-translate-y-1 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                            <a href="https://www.youtube.com/@farmacontabilidade?sub_confirmation=1" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-blue-500 hover:text-white hover:-translate-y-1 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" viewBox="0 0 36 24">
                                    <path fillRule="evenodd" d="M27.529 4.514a3.01 3.01 0 0 1 2.115 2.115c.514 1.878.494 5.793.494 5.793s0 3.894-.494 5.772a3.01 3.01 0 0 1-2.115 2.116c-1.878.494-9.39.494-9.39.494s-7.493 0-9.391-.514a3.01 3.01 0 0 1-2.115-2.115c-.495-1.859-.495-5.773-.495-5.773s0-3.895.495-5.773a3.07 3.07 0 0 1 2.115-2.135C10.626 4 18.138 4 18.138 4s7.513 0 9.39.514M15.746 16V8.804l6.247 3.598z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Linha Inferior */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-[13px]">
                        Copyright © {new Date().getFullYear()} - Farmacon Contabilidade LTDA
                    </p>
                    <p className="text-slate-500 text-[13px]">
                        CNPJ: 26.690.384/0001-05
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Rodape;

