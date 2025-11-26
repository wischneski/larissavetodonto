import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Bone, Sparkles, Activity, ArrowUpRight } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: '1',
    category: 'Prevenção',
    title: 'Limpeza de Tártaro (Profilaxia)',
    description: 'A base da saúde bucal. Removemos a placa bacteriana que causa doenças cardíacas e renais, devolvendo o hálito fresco.',
    icon: <Sparkles className="w-5 h-5" />,
    imageUrl: '/images/dente1.jpg',
    className: 'md:col-span-2'
  },
  {
    id: '2',
    category: 'Endodontia',
    title: 'Canal & Recuperação',
    description: 'Tratamento especializado para dentes fraturados. Evitamos a extração desnecessária e eliminamos a dor do seu pet.',
    icon: <Activity className="w-5 h-5" />,
    imageUrl: 'https://images.pexels.com/photos/6234603/pexels-photo-6234603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    className: 'md:col-span-1'
  },
  {
    id: '3',
    category: 'Cirurgia',
    title: 'Cirurgia Oral Avançada',
    description: 'Extrações complexas e tratamento de neoplasias com monitoramento anestésico de ponta para total segurança.',
    icon: <Stethoscope className="w-5 h-5" />,
    imageUrl: 'https://images.pexels.com/photos/6235008/pexels-photo-6235008.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    className: 'md:col-span-1'
  },
  {
    id: '4',
    category: 'Ortodontia',
    title: 'Correção de Mordida',
    description: 'Aparelhos e técnicas para corrigir dentes que machucam a boca, garantindo conforto e funcionalidade na mastigação.',
    icon: <Bone className="w-5 h-5" />,
    imageUrl: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    className: 'md:col-span-2'
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-16 md:py-24 relative z-10 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Header da Seção */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 gap-4 md:gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-brand-500 uppercase tracking-widest text-xs font-bold mb-2 md:mb-3 block"
            >
              Excelência Técnica
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-display text-brand-900 leading-tight"
            >
              Tratamentos <span className="italic text-brand-500">Exclusivos</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-brand-600 max-w-md text-right hidden md:block"
          >
            Tecnologia de ponta e conhecimento especializado para diagnósticos precisos e recuperação rápida.
          </motion.p>
        </div>

        {/* Bento Grid Layout - Reduced height on mobile (auto-rows-[280px]) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[280px] md:auto-rows-[400px]">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`group relative rounded-3xl md:rounded-4xl overflow-hidden cursor-pointer ${service.className}`}
            >
              {/* Background Image with Zoom Effect */}
              <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-brand-900/30 group-hover:bg-brand-900/10 transition-colors duration-500 z-10" />
                <img 
                  src={service.imageUrl} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-linear-to-t from-brand-950/90 via-brand-950/50 to-transparent opacity-100 md:opacity-90 transition-opacity duration-300 z-20" />

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-30">
                {/* Top Badge */}
                <div className="flex justify-between items-start">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] md:text-xs font-bold tracking-wider uppercase">
                    {service.icon}
                    {service.category}
                  </span>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white text-brand-900 flex items-center justify-center opacity-100 md:opacity-0 md:-translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>

                {/* Bottom Text */}
                <div className="transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl md:text-3xl font-display text-white mb-2 md:mb-3 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-brand-100 text-xs md:text-base leading-relaxed opacity-100 md:opacity-0 md:max-h-0 md:group-hover:opacity-100 md:group-hover:max-h-24 transition-all duration-500 ease-in-out overflow-hidden line-clamp-3 md:line-clamp-none">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};