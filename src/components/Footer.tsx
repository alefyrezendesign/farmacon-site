const Footer = () => {
    return (
        <footer className="bg-white py-16">
            <div className="container mx-auto px-4 md:px-6 xl:px-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                    <div className="flex items-center">
                        <img src="/logo/farmacon_logo_horizontal.png" alt="Farmacon" className="h-7 md:h-9 w-auto opacity-90" />
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="#" className="text-sm text-surface-500 hover:text-primary-600 transition-colors">Contato</a>
                        
                        {/* Instagram icon (line/outline) */}
                        <a href="#" aria-label="Instagram" className="text-surface-500 hover:text-primary-600 transition-colors">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" />
                                <circle cx="12" cy="12" r="5" />
                                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                            </svg>
                        </a>
                        
                        {/* Facebook icon (line/outline) */}
                        <a href="#" aria-label="Facebook" className="text-surface-500 hover:text-primary-600 transition-colors">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
                    <p className="text-surface-500 text-sm text-center md:text-left">
                        Contabilidade focada no crescimento do varejo farmacêutico.
                    </p>
                    <p className="text-surface-500 text-xs text-center md:text-right">
                        © {new Date().getFullYear()} Farmacon. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
