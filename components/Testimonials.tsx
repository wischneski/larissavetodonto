import React from 'react';
import { Quote, Star } from 'lucide-react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ana Paula Souza',
    petName: 'Thor (Golden Retriever)',
    text: 'A Dra. Larissa foi um anjo. O Thor estava com muita dor por causa de um dente quebrado e eu nem sabia. O tratamento salvou o dente dele e ele voltou a brincar como filhote!',
    avatarUrl: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Roberto Mendes',
    petName: 'Luna (Siamês)',
    text: 'Eu tinha muito medo da anestesia, mas a equipe me passou total segurança. A limpeza de tártaro da Luna ficou impecável e o hálito dela melhorou 100%. Recomendo de olhos fechados.',
    avatarUrl: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Camila & João',
    petName: 'Paçoca (SRD)',
    text: 'O carinho que a Dra. tem com os animais é visível. O Paçoca geralmente tem medo de veterinário, mas com ela foi super tranquilo. O consultório é lindo e muito acolhedor.',
    avatarUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop'
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section id="depoimentos" className="py-16 md:py-24 relative overflow-hidden bg-brand-50">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-100/60 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-brand-500 font-bold tracking-widest text-xs uppercase mb-2 md:mb-3 block">
            Depoimentos
          </span>
          <h2 className="text-3xl md:text-5xl font-display text-brand-900 mb-4 md:mb-6">
            Histórias de <span className="italic text-brand-500">Carinho</span>
          </h2>
          <p className="max-w-xl mx-auto text-brand-600 font-light text-sm md:text-base">
            A satisfação de ver nossos pacientes sem dor e com qualidade de vida é o que nos move todos os dias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((item, index) => (
            <div
              key={item.id}
              className="relative group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Card */}
              <div className="bg-white p-6 md:p-8 rounded-t-4xl md:rounded-t-[3rem] rounded-b-2xl shadow-xl shadow-brand-900/5 border border-brand-100 h-full flex flex-col hover:-translate-y-2 transition-transform duration-300">
                
                {/* Quote Icon */}
                <div className="mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-50 rounded-full flex items-center justify-center text-brand-400">
                    <Quote className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 mb-6 md:mb-8">
                  <div className="flex gap-1 mb-3 md:mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3 h-3 text-brand-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-brand-700 leading-relaxed italic font-display text-base md:text-lg">
                    "{item.text}"
                  </p>
                </div>

                {/* Author (no avatar / pet photo) */}
                <div className="pt-4 md:pt-6 border-t border-brand-50">
                  <h4 className="font-bold text-brand-900 text-sm">{item.name}</h4>
                  <p className="text-brand-500 text-[10px] md:text-xs font-medium uppercase tracking-wide">{item.petName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};