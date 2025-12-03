import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, ChevronRight } from 'lucide-react';

export const PeriodontalTest: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Call to Action Section */}
      <section id="periodontal-test" className="py-16 md:py-20 bg-brand-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#a87b62_1px,transparent_1px)] bg-size-[16px_16px]"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="animate-fade-in-up">
            <span className="inline-block py-1 px-3 rounded-full bg-brand-800 text-brand-200 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4 border border-brand-700">
              Autoexame Gratuito
            </span>
            <h2 className="text-2xl md:text-5xl font-display text-white mb-4 md:mb-6 leading-tight">
              O sorriso dele esconde <span className="italic text-brand-400">dor silenciosa?</span>
            </h2>
            <p className="text-brand-200 max-w-2xl mx-auto mb-8 md:mb-10 text-base md:text-lg font-light leading-relaxed">
              Cães e gatos raramente choram de dor de dente. Eles sofrem em silêncio. 
              Faça nosso teste rápido de 30 segundos e descubra o grau de risco do seu pet.
            </p>
            
            <button
              onClick={() => navigate('/vetodontoscore')}
              className="group bg-brand-500 text-white px-6 py-4 md:px-8 md:py-5 rounded-full text-base md:text-lg font-medium shadow-2xl shadow-brand-500/30 flex items-center gap-3 mx-auto transition-all hover:bg-brand-400 hover:scale-105 active:scale-95"
            >
              <ClipboardCheck className="w-5 h-5" />
              Iniciar Teste de Risco
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};