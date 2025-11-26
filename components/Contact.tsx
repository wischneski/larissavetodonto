import React from 'react';
import { MapPin, Phone, Instagram, ArrowRight } from 'lucide-react';

export const Contact: React.FC = () => {
  const getWhatsAppLink = () => {
    const phoneNumber = '5511999999999'; // Replace with actual WhatsApp number
    const message = encodeURIComponent('Olá! Gostaria de agendar uma avaliação para meu pet.');
    return `https://wa.me/${phoneNumber}?text=${message}`;
  };
  return (
    <section id="contact" className="py-16 md:py-24 relative z-10 bg-white">
      <div className="container mx-auto px-4">
        
        <div className="max-w-5xl mx-auto bg-brand-50 rounded-4xl md:rounded-[3rem] p-6 md:p-16 shadow-2xl relative overflow-hidden">
          {/* Decorative Blob */}
          <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-brand-200/50 rounded-bl-[100%] z-0" />

          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 relative z-10">
            <div>
              <span className="text-brand-500 font-bold tracking-widest text-xs uppercase mb-3 block">Contato</span>
              <h2 className="text-3xl md:text-4xl font-display text-brand-900 mb-4 md:mb-6">
                Vamos conversar?
              </h2>
              <p className="text-brand-600 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                Agende uma avaliação e descubra como podemos melhorar a qualidade de vida do seu melhor amigo.
              </p>

              <div className="space-y-4 md:space-y-6">
                <a 
                  href="https://www.instagram.com/larissa.vetodonto/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 hover:opacity-80 transition-opacity cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-500 shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <span className="text-brand-800 font-medium text-sm md:text-base group-hover:text-brand-600">@larissa.vetodonto</span>
                </a>
              </div>
            </div>

            <form className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-lg border border-brand-100">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider mb-2">Seu Nome</label>
                  <input type="text" className="w-full bg-brand-50 border-0 rounded-xl px-4 py-3 text-brand-900 focus:ring-2 focus:ring-brand-300 outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider mb-2">Telefone</label>
                  <input type="tel" className="w-full bg-brand-50 border-0 rounded-xl px-4 py-3 text-brand-900 focus:ring-2 focus:ring-brand-300 outline-none text-sm" />
                </div>
                <button onClick={() => window.open(getWhatsAppLink(), '_blank')} className="w-full bg-brand-500 text-white font-bold py-3 md:py-4 rounded-xl hover:bg-brand-600 transition-colors flex items-center justify-center gap-2 mt-2 text-sm md:text-base">
                  Enviar Mensagem <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};