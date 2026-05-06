import { motion } from 'framer-motion';
import { RefreshCcw, CreditCard, Building2, Landmark } from 'lucide-react';

const services = [
  {
    title: "Recuperação Tributária",
    desc: "Identificamos valores pagos indevidamente nos últimos 5 anos.",
    icon: <RefreshCcw className="w-6 h-6 text-primary-500" />
  },
  {
    title: "Gestão de Cartões & PBMs",
    desc: "Conciliação eficiente para garantir que cada centavo chegue ao caixa.",
    icon: <CreditCard className="w-6 h-6 text-primary-500" />
  },
  {
    title: "Consultoria BPC",
    desc: "Desenvolvimento e estruturação de holdings familiares e empresariais.",
    icon: <Building2 className="w-6 h-6 text-primary-500" />
  },
  {
    title: "Crédito Estratégico",
    desc: "Acesso a linhas de crédito com taxas diferenciadas para o setor.",
    icon: <Landmark className="w-6 h-6 text-primary-500" />
  }
];

const MoreServices = () => {
  return (
    <section className="py-24 bg-surface-50 border-t border-surface-200">
      <div className="container mx-auto px-4 md:px-8 xl:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1 * idx }}
                className="bg-white p-8 rounded-3xl border border-surface-200 hover:border-primary-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-dark-900 mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-surface-500 leading-relaxed mt-auto">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoreServices;
