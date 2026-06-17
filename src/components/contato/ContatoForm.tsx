import { useState, useCallback, useRef, type FormEvent, type ChangeEvent } from 'react';
import { m } from 'framer-motion';
import { CheckCircle2, Loader2, AlertCircle, ChevronDown, ArrowRight, MessageCircle } from 'lucide-react';
import { RDStationGhostForm, type RDStationGhostFormRef } from './RDStationGhostForm';

interface FormFields {
    name: string;
    phone: string;
    email: string;
    company: string;
    city: string;
    state: string;
    moment: string;
}

interface FieldError { [key: string]: string | undefined }

const INITIAL: FormFields = {
    name: '', phone: '', email: '', company: '', city: '', state: '', moment: ''
};

const ESTADOS = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const MOMENTOS = [
    'Quero abrir uma farmácia',
    'Quero trocar de contabilidade',
    'Quero inteligência tributária para minha rede'
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
    if (!f.city.trim()) e.city = 'Obrigatório';
    if (!f.state.trim()) e.state = 'Obrigatório';
    if (!f.moment.trim()) e.moment = 'Obrigatório';
    return e;
}

export default function ContatoForm() {
    const [form, setForm] = useState<FormFields>(INITIAL);
    const [errors, setErrors] = useState<FieldError>({});
    const [state, setState] = useState<'form' | 'submitting' | 'success' | 'error'>('form');
    const [serverErr, setServerErr] = useState('');
    
    const ghostFormRef = useRef<RDStationGhostFormRef>(null);

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
                city: form.city.trim(),
                state: form.state,
                cf_qual_o_seu_momento: form.moment, 
            });
            
            setState('success');
        } catch (err) {
            console.error('[RD Ghost Form Error]', err);
            setServerErr('Ocorreu um erro ao enviar. Tente novamente.');
            setState('error');
        }
    }, [form]);

    const inputCls = (err?: string) =>
        `w-full px-4 py-3 md:px-5 md:py-4 text-[14px] md:text-base rounded-xl md:rounded-2xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors shadow-sm ${
            err ? 'border-red-400 focus:border-red-500' : 'border-surface-200 focus:border-blue-500'
        }`;

    if (state === 'success') {
        return (
            <m.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center p-8 min-h-[400px] justify-center w-full">
                <m.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }} className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-500">
                    <CheckCircle2 size={40} />
                </m.div>
                <h3 className="text-2xl font-bold text-dark-900 mb-2">Mensagem enviada com sucesso!</h3>
                <p className="text-surface-500 max-w-md mx-auto mb-8">
                    Em breve, nossos especialistas entrarão em contato com você.
                </p>
                
                <p className="text-sm font-semibold text-dark-900 mb-4">
                    Deseja continuar o atendimento pelo WhatsApp ou permanecer no site?
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm mx-auto">
                    <a 
                        href="https://wa.me/5521971807881?text=Ol%C3%A1%2C%20acabei%20de%20preencher%20o%20formul%C3%A1rio%20no%20site%20e%20gostaria%20de%20continuar%20o%20atendimento!" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#20bd5a] transition-colors shadow-sm shadow-[#25D366]/20"
                    >
                        <MessageCircle size={18} />
                        Ir para o WhatsApp
                    </a>
                    
                    <button 
                        onClick={() => { setForm(INITIAL); setState('form'); }} 
                        className="w-full px-6 py-3 rounded-xl bg-surface-100 text-dark-900 font-semibold hover:bg-surface-200 transition-colors"
                    >
                        Continuar no site
                    </button>
                </div>
            </m.div>
        );
    }

    if (state === 'submitting') {
        return (
            <div className="flex flex-col items-center justify-center p-8 min-h-[400px] w-full">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                <p className="text-surface-500 font-medium">Enviando seus dados...</p>
            </div>
        );
    }

    return (
        <>
            <RDStationGhostForm ref={ghostFormRef} formId="farmacon-falar-com-especialista-61970b97e7b14c7e127d" />
            
            <form onSubmit={onSubmit} noValidate className="space-y-4 md:space-y-6 w-full">
                {serverErr && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-600">
                        <AlertCircle size={18} className="shrink-0" />
                        <p className="text-sm font-medium">{serverErr}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="flex flex-col gap-1.5 md:gap-2">
                        <label htmlFor="name" className="flex justify-between text-[13px] md:text-sm font-medium text-dark-900 ml-1">
                            Nome completo {errors.name && <span className="text-red-500 font-bold">{errors.name}</span>}
                        </label>
                        <input id="name" name="name" type="text" placeholder="João da Silva" value={form.name} onChange={onChange} className={inputCls(errors.name)} />
                    </div>
                    <div className="flex flex-col gap-1.5 md:gap-2">
                        <label htmlFor="phone" className="flex justify-between text-[13px] md:text-sm font-medium text-dark-900 ml-1">
                            Telefone / WhatsApp {errors.phone && <span className="text-red-500 font-bold">{errors.phone}</span>}
                        </label>
                        <input id="phone" name="phone" type="tel" placeholder="(XX) XXXXX-XXXX" value={form.phone} onChange={onChange} className={inputCls(errors.phone)} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="flex flex-col gap-1.5 md:gap-2">
                        <label htmlFor="email" className="flex justify-between text-[13px] md:text-sm font-medium text-dark-900 ml-1">
                            E-mail {errors.email && <span className="text-red-500 font-bold">{errors.email}</span>}
                        </label>
                        <input id="email" name="email" type="email" placeholder="seu@email.com" value={form.email} onChange={onChange} className={inputCls(errors.email)} />
                    </div>
                    <div className="flex flex-col gap-1.5 md:gap-2">
                        <label htmlFor="company" className="flex justify-between text-[13px] md:text-sm font-medium text-dark-900 ml-1">
                            Empresa {errors.company && <span className="text-red-500 font-bold">{errors.company}</span>}
                        </label>
                        <input id="company" name="company" type="text" placeholder="Nome da farmácia" value={form.company} onChange={onChange} className={inputCls(errors.company)} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="flex flex-col gap-1.5 md:gap-2">
                        <label htmlFor="city" className="flex justify-between text-[13px] md:text-sm font-medium text-dark-900 ml-1">
                            Cidade {errors.city && <span className="text-red-500 font-bold">{errors.city}</span>}
                        </label>
                        <input id="city" name="city" type="text" placeholder="Sua cidade" value={form.city} onChange={onChange} className={inputCls(errors.city)} />
                    </div>
                    <div className="flex flex-col gap-1.5 md:gap-2">
                        <label htmlFor="state" className="flex justify-between text-[13px] md:text-sm font-medium text-dark-900 ml-1">
                            Estado {errors.state && <span className="text-red-500 font-bold">{errors.state}</span>}
                        </label>
                        <div className="relative">
                            <select id="state" name="state" value={form.state} onChange={onChange} className={`${inputCls(errors.state)} appearance-none pr-10 ${!form.state ? 'text-surface-500' : 'text-dark-900'}`}>
                                <option value="" disabled>UF</option>
                                {ESTADOS.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                            </select>
                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5 md:gap-2">
                    <label htmlFor="moment" className="flex justify-between text-[13px] md:text-sm font-medium text-dark-900 ml-1">
                        Qual o seu momento? {errors.moment && <span className="text-red-500 font-bold">{errors.moment}</span>}
                    </label>
                    <div className="relative">
                        <select id="moment" name="moment" value={form.moment} onChange={onChange} className={`${inputCls(errors.moment)} appearance-none pr-10 ${!form.moment ? 'text-surface-500' : 'text-dark-900'}`}>
                            <option value="" disabled>Selecione seu momento atual</option>
                            {MOMENTOS.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                        <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400 pointer-events-none" />
                    </div>
                </div>

                <div className="pt-2">
                    <button type="submit" className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-[15px] transition-all shadow-[0_8px_20px_rgba(59,130,246,0.25)] bg-blue-500 text-white hover:bg-blue-400 hover:shadow-[0_8px_25px_rgba(59,130,246,0.35)] w-full md:w-auto min-w-[220px]">
                        Enviar Mensagem
                        <ArrowRight size={18} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </form>
        </>
    );
}
