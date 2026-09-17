import { useState, useEffect, useCallback, useRef, type FormEvent, type ChangeEvent } from 'react';
import { m, AnimatePresence  } from 'framer-motion';
import { X, CheckCircle2, Loader2, AlertCircle, Activity, ChevronDown } from 'lucide-react';
import { useModalSolucoes } from '../../hooks/useModalSolucoes';
import { RDStationGhostForm, type RDStationGhostFormRef } from '../contato/RDStationGhostForm';

interface FormFields {
    name: string;
    phone: string;
    email: string;
    company: string;
    cargo: string;
    lojas: string;
    state: string;
    city: string;
}

interface FieldError { [key: string]: string | undefined }

type ModalState = 'form' | 'submitting' | 'success' | 'error';

const INITIAL: FormFields = {
    name: '', phone: '', email: '', company: '', cargo: '', lojas: '', state: '', city: ''
};

const ESTADOS = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const CARGOS = [
    'Proprietário(a)',
    'Diretor(a)',
    'Sócio(a)',
    'Gestor(a)',
    'Gerente',
    'Financeiro/Administrativo',
    'Farmacêutico'
];

const LOJAS = [
    '0 a 3 lojas',
    '4 a 10 lojas',
    '+10 lojas'
];

function maskPhone(v: string): string {
    const d = v.replace(/\D/g, '').slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
const unphone = (v: string) => v.replace(/\D/g, '');

function validate(f: FormFields): FieldError {
    const e: FieldError = {};
    if (!f.name.trim()) e.name = 'Obrigatório';
    if (unphone(f.phone).length < 10) e.phone = 'Inválido';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Inválido';
    if (!f.company.trim()) e.company = 'Obrigatório';
    if (!f.cargo.trim()) e.cargo = 'Obrigatório';
    if (!f.lojas.trim()) e.lojas = 'Obrigatório';
    if (!f.state.trim()) e.state = 'Obrigatório';
    if (!f.city.trim()) e.city = 'Obrigatório';
    return e;
}

export default function ModalSolucoes() {
    const { isOpen, closeModal } = useModalSolucoes();
    const [form, setForm] = useState<FormFields>(INITIAL);
    const [errors, setErrors] = useState<FieldError>({});
    const [state, setState] = useState<ModalState>('form');
    const [serverErr, setServerErr] = useState('');
    
    const ghostFormRef = useRef<RDStationGhostFormRef>(null);

    useEffect(() => {
        if (!isOpen) return;
        setTimeout(() => {
            setForm(INITIAL);
            setErrors({});
            setState('form');
            setServerErr('');
        }, 0);
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        document.body.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
        };
        document.addEventListener('keydown', onKey);
        return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); };
    }, [isOpen, closeModal]);

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(p => ({ ...p, [name]: name === 'phone' ? maskPhone(value) : value }));
        setErrors(p => ({ ...p, [name]: undefined }));
    }, []);

    const onSubmit = useCallback(async (e: FormEvent) => {
        e.preventDefault();
        const errs = validate(form);
        if (Object.keys(errs).length) { setErrors(errs); return; }
        
        setState('submitting');
        setServerErr('');
        
        try {
            if (!ghostFormRef.current) throw new Error('RD Form not ready');
            
            await ghostFormRef.current.submitForm({
                name: form.name.trim(),
                email: form.email.trim(),
                personal_phone: unphone(form.phone),
                company: form.company.trim(),
                cf_qual_o_seu_cargo_na_empresa: form.cargo,
                cf_quantas_lojas_voce_possui_hoje: form.lojas,
                state: form.state,
                city: form.city.trim(),
            });
            
            setState('success');
        } catch (err) {
            console.error('[RD Ghost Form Error]', err);
            setServerErr('Ocorreu um erro ao enviar. Tente novamente.');
            setState('error');
        }
    }, [form]);

    const inputCls = (err?: string) =>
        `w-full rounded-[10px] bg-slate-50 border px-3.5 py-2.5 text-[13px] text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300 focus:bg-white focus:shadow-[0_0_0_2px_rgba(37,99,235,0.15)] ${
            err ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'
        }`;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    
                    <RDStationGhostForm 
                        ref={ghostFormRef} 
                        formId="farmacon-site-rx-analises-e653df8870d95c4472a8" 
                    />

                    <m.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer" onClick={closeModal} />
                    
                    <m.div
                        key="card" role="dialog" aria-modal="true" aria-labelledby="ms-title"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="relative z-10 w-full max-w-[500px] rounded-3xl border border-white bg-white shadow-[0_32px_80px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden max-h-[calc(100vh-2rem)]"
                    >
                        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-80" />
                        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />

                        <button onClick={closeModal} className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all cursor-pointer" aria-label="Fechar"><X size={16} strokeWidth={2.5} /></button>

                        <AnimatePresence mode="wait">
                            {(state === 'form' || state === 'error') && (
                                <m.div key="f" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="flex flex-col h-full">
                                    <div className="shrink-0 px-6 pt-7 sm:px-8 sm:pt-8 pb-4 border-b border-slate-50">
                                        <div className="flex items-center gap-3.5 mb-1">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                                                <Activity size={20} className="text-blue-600" />
                                            </div>
                                            <div>
                                                <h2 id="ms-title" className="text-xl font-bold text-slate-900 tracking-tight leading-tight">Solicitar Diagnóstico</h2>
                                                <p className="text-[12px] text-slate-500 font-medium mt-0.5">Descubra o verdadeiro potencial da sua farmácia</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 overflow-y-auto px-6 py-5 sm:px-8 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                        
                                        <AnimatePresence>
                                            {serverErr && (
                                                <m.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-red-600 mb-4">
                                                    <AlertCircle size={14} className="shrink-0" />
                                                    <p className="text-xs font-medium">{serverErr}</p>
                                                </m.div>
                                            )}
                                        </AnimatePresence>

                                        <form id="diagnostico-form" onSubmit={onSubmit} noValidate className="space-y-3.5">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                                <F id="name" label="Nome" err={errors.name}>
                                                    <input id="name" name="name" type="text" placeholder="João da Silva" value={form.name} onChange={onChange} autoComplete="name" className={inputCls(errors.name)} />
                                                </F>
                                                <F id="phone" label="Telefone" err={errors.phone}>
                                                    <input id="phone" name="phone" type="tel" placeholder="(XX) XXXXX-XXXX" value={form.phone} onChange={onChange} autoComplete="tel" className={inputCls(errors.phone)} />
                                                </F>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                                <F id="email" label="Email" err={errors.email}>
                                                    <input id="email" name="email" type="email" placeholder="seu@email.com" value={form.email} onChange={onChange} autoComplete="email" className={inputCls(errors.email)} />
                                                </F>
                                                <F id="company" label="Empresa" err={errors.company}>
                                                    <input id="company" name="company" type="text" placeholder="Sua farmácia" value={form.company} onChange={onChange} autoComplete="organization" className={inputCls(errors.company)} />
                                                </F>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                                <F id="cargo" label="Qual o seu cargo na empresa?" err={errors.cargo}>
                                                    <div className="relative">
                                                        <select id="cargo" name="cargo" title="Cargo" value={form.cargo} onChange={onChange} className={`${inputCls(errors.cargo)} appearance-none pr-10 cursor-pointer ${!form.cargo ? 'text-slate-400' : 'text-slate-800'}`}>
                                                            <option value="" disabled>Selecione</option>
                                                            {CARGOS.map(c => <option key={c} value={c}>{c}</option>)}
                                                        </select>
                                                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                                    </div>
                                                </F>
                                                <F id="lojas" label="Quantas lojas você possui hoje?" err={errors.lojas}>
                                                    <div className="relative">
                                                        <select id="lojas" name="lojas" title="Lojas" value={form.lojas} onChange={onChange} className={`${inputCls(errors.lojas)} appearance-none pr-10 cursor-pointer ${!form.lojas ? 'text-slate-400' : 'text-slate-800'}`}>
                                                            <option value="" disabled>Selecione</option>
                                                            {LOJAS.map(l => <option key={l} value={l}>{l}</option>)}
                                                        </select>
                                                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                                    </div>
                                                </F>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                                <F id="city" label="Cidade" err={errors.city}>
                                                    <input id="city" name="city" type="text" placeholder="Sua cidade" value={form.city} onChange={onChange} className={inputCls(errors.city)} />
                                                </F>
                                                <F id="state" label="Estado" err={errors.state}>
                                                    <div className="relative">
                                                        <select id="state" name="state" title="Estado" value={form.state} onChange={onChange} className={`${inputCls(errors.state)} appearance-none pr-10 cursor-pointer ${!form.state ? 'text-slate-400' : 'text-slate-800'}`}>
                                                            <option value="" disabled>Estado</option>
                                                            {ESTADOS.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                                                        </select>
                                                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                                    </div>
                                                </F>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="shrink-0 px-6 py-5 sm:px-8 border-t border-slate-50 bg-white flex justify-center">
                                        <button form="diagnostico-form" type="submit" className="group inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-base hover:bg-blue-500 hover:scale-105 transition-all duration-300 cursor-pointer w-full justify-center">
                                            Solicitar Diagnóstico
                                        </button>
                                    </div>
                                </m.div>
                            )}

                            {state === 'submitting' && (
                                <m.div key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center gap-4 p-16 min-h-[400px]">
                                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                                    <p className="text-slate-500 font-medium text-[14px]">Enviando seus dados...</p>
                                </m.div>
                            )}

                            {state === 'success' && (
                                <m.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex flex-col items-center text-center p-12 sm:p-14 min-h-[400px] justify-center">
                                    <m.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1, stiffness: 300, damping: 20 }} className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-green-200 bg-green-50 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                                        <CheckCircle2 size={32} className="text-green-500" />
                                    </m.div>
                                    <h2 className="text-xl font-bold text-slate-900 mb-2">Cadastro realizado com sucesso!</h2>
                                    <p className="text-slate-500 text-[14px] leading-relaxed max-w-[320px] mx-auto mb-4">
                                        Sua solicitação foi recebida. Em breve, nosso time entrará em contato para alinhar os próximos passos do seu diagnóstico.
                                    </p>
                                    <div className="w-full max-w-[320px] mx-auto mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <p className="text-slate-600 text-[13px] mb-3">
                                            Se preferir, chame nosso time agora no WhatsApp:
                                        </p>
                                        <a href="https://wa.me/551131635000?text=Ol%C3%A1%2C%20vim%20pelo%20site%2C%20j%C3%A1%20me%20cadastrei%20e%20tenho%20interesse%20em%20saber%20mais%20sobre%20o%20diagn%C3%B3stico." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full gap-2 px-4 py-3 bg-[#25D366] text-white rounded-xl font-bold text-[14px] hover:bg-[#20bd5a] transition-colors cursor-pointer">
                                            Conversar no WhatsApp
                                        </a>
                                    </div>
                                    <button onClick={closeModal} className="w-full max-w-[320px] rounded-xl bg-slate-100 py-3 text-[13px] font-bold text-slate-700 hover:bg-slate-200 transition-all cursor-pointer">
                                        OK, Entendido
                                    </button>
                                </m.div>
                            )}
                        </AnimatePresence>
                    </m.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function F({ id, label, err, children }: { id: string; label: string; err?: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
                <label htmlFor={id} className="text-[12px] font-semibold text-slate-500 tracking-wide">{label}</label>
                {err && <span className="text-[11px] text-red-500 font-medium">{err}</span>}
            </div>
            {children}
        </div>
    );
}
