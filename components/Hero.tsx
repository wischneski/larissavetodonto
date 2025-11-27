import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { getWhatsAppLink } from '../services/whatsapp';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center px-4 pt-24 md:pt-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-linear-to-l from-brand-100/50 to-transparent -z-10" />
      
      <div className="container mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-left order-2 md:order-1"
        >
          <span className="block text-brand-500 font-medium tracking-[0.2em] text-xs md:text-sm mb-4 md:mb-6 uppercase">
            Odontologia Veterinária
          </span>
          
          <h1 className="text-4xl md:text-7xl font-display font-medium leading-[1.1] mb-6 md:mb-8 text-brand-900">
            A saúde do seu pet <br />
            começa pelo <br />
            <span className="italic text-brand-500">Sorriso.</span>
          </h1>
          
          <p className="text-base md:text-xl text-brand-600 mb-8 md:mb-10 max-w-lg leading-relaxed font-light">
            Especialista em proporcionar qualidade de vida e longevidade através de tratamentos odontológicos humanizados e de alta precisão.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <motion.a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 md:px-8 md:py-4 bg-brand-500 text-white rounded-full font-serif italic text-base md:text-lg shadow-xl shadow-brand-500/20 flex items-center justify-center gap-2 hover:bg-brand-600 transition-colors"
            >
              Agendar 1ª Avaliação
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#periodontal-test"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 md:px-8 md:py-4 bg-transparent border border-brand-300 text-brand-800 rounded-full font-medium text-sm md:text-lg hover:bg-brand-100 transition flex items-center justify-center text-center leading-tight"
            >
              Descubra o Grau de Saúde
            </motion.a>
          </div>
        </motion.div>

        {/* Visual/Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative h-full flex justify-center items-center order-1 md:order-2 mb-4 md:mb-0"
        >
          {/* Elegant Shape Container - Reduzido no mobile */}
          <div className="relative w-full max-w-[280px] md:max-w-md aspect-3/4 rounded-t-[5rem] md:rounded-t-[10rem] rounded-b-4xl overflow-hidden shadow-2xl border-4 md:border-8 border-white mx-auto">
             {/* Imagem da Dra. Larissa - WebP com fallback */}
            <picture>
              <source srcSet="/images/dr-larissa.webp" type="image/webp" />
              <img 
                src="/images/dr-larissa.png" 
                alt="Dra. Larissa VetOdonto" 
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-[1.5s]"
              />
            </picture>
            
            {/* Floating Info Card - Compacto no mobile */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 glass-card p-4 md:p-6 rounded-xl text-center md:text-left"
            >
              <p className="font-display italic text-lg md:text-2xl text-brand-900 mb-1">Cuidado & Carinho</p>
              <p className="text-xs md:text-sm text-brand-600">Especialista em cães e gatos.</p>
            </motion.div>
          </div>

          {/* Decorative Circle */}
          <div className="absolute -z-10 top-20 -right-10 w-48 h-48 md:w-64 md:h-64 bg-brand-200 rounded-full blur-3xl opacity-60" />
        </motion.div>
      </div>
    </section>
  );
};