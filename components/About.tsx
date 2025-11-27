import React from 'react';
import { motion } from 'framer-motion';
import { Award, Heart } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-32 relative overflow-hidden bg-brand-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 md:gap-20">
          
          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl md:text-5xl font-display text-brand-900 mb-6 md:mb-8 leading-tight">
              Encontre o equilíbrio entre a <span className="italic text-brand-500">Saúde</span> e o <span className="italic text-brand-500">Bem-estar</span> do seu pet.
            </h2>
            <p className="text-brand-700 text-base md:text-lg mb-8 leading-relaxed font-light">
              A odontologia veterinária vai além de dentes brancos. É sobre garantir que seu animal não sinta dor silenciosa. Com anos de especialização, ofereço um atendimento que une técnica apurada e acolhimento.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mt-8 md:mt-12">
              <div className="border-l-2 border-brand-300 pl-4 md:pl-6">
                <Award className="w-6 h-6 md:w-8 md:h-8 text-brand-500 mb-2 md:mb-4" />
                <h4 className="font-display text-lg md:text-xl text-brand-900 mb-1 md:mb-2">Especialista</h4>
                <p className="text-sm text-brand-600">Pós-graduada com foco exclusivo em odontologia de pequenos animais e animais exóticos.</p>
              </div>
              
              <div className="border-l-2 border-brand-300 pl-4 md:pl-6">
                <Heart className="w-6 h-6 md:w-8 md:h-8 text-brand-500 mb-2 md:mb-4" />
                <h4 className="font-display text-lg md:text-xl text-brand-900 mb-1 md:mb-2">Acolhimento</h4>
                <p className="text-sm text-brand-600">Ambiente preparado para reduzir o estresse e ansiedade.</p>
              </div>
            </div>
          </motion.div>

           {/* Image Side */}
           <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative w-full"
          >
            <div className="relative">
              <div className="absolute top-4 -left-4 w-full h-full border-2 border-brand-300 rounded-4xl -z-10" />
              <picture>
                <source srcSet="/images/lov-dog.webp" type="image/webp" />
                <img 
                  src="/images/lov-dog.jpg" 
                  alt="Atendimento Veterinário"
                  loading="lazy"
                  className="w-full rounded-4xl shadow-2xl object-cover aspect-video md:aspect-4/5"
                />
              </picture>
              
              <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-t-2xl rounded-bl-2xl shadow-xl max-w-xs hidden md:block">
                <p className="font-display italic text-brand-900 text-lg">"Odontologia veterinária não é estética, é saúde e longevidade."</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};