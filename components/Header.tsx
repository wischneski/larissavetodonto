import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { getWhatsAppLink } from '../services/whatsapp';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        
        <a href="#" className="text-2xl font-display font-bold text-brand-900 tracking-tight">
          Larissa<span className="text-brand-500 italic font-normal">.VetOdonto</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-brand-800 hover:text-brand-500 transition font-medium text-sm tracking-wide uppercase">Início</a>
          <a href="#about" className="text-brand-800 hover:text-brand-500 transition font-medium text-sm tracking-wide uppercase">Sobre</a>
          <a href="#services" className="text-brand-800 hover:text-brand-500 transition font-medium text-sm tracking-wide uppercase">Serviços</a>
          <a href="#depoimentos" className="text-brand-800 hover:text-brand-500 transition font-medium text-sm tracking-wide uppercase">Depoimentos</a>
          <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-brand-900 text-brand-50 rounded-full font-medium text-sm hover:bg-brand-800 transition shadow-lg shadow-brand-900/10">
            Agendar Agora
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-brand-900">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-brand-100 p-6 flex flex-col gap-4 shadow-xl">
          <a href="#" className="text-brand-800 font-medium py-2 border-b border-brand-50">Início</a>
          <a href="#about" className="text-brand-800 font-medium py-2 border-b border-brand-50">Sobre</a>
          <a href="#services" className="text-brand-800 font-medium py-2 border-b border-brand-50">Serviços</a>
          <a href="#depoimentos" className="text-brand-800 font-medium py-2 border-b border-brand-50">Depoimentos</a>
          <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="block w-full py-3 text-center bg-brand-500 text-white rounded-lg font-bold">
            Agendar Consulta
          </a>
        </div>
      )}
    </header>
  );
};