import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Heart, ArrowRight } from 'lucide-react';
import { getWhatsAppLinkWithMessage } from '../services/whatsapp';
import { useNavigate } from 'react-router-dom';

export const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-100 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-brand-200/40 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-300/30 rounded-full blur-3xl animate-pulse delay-700" />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-2xl w-full bg-white rounded-4xl shadow-2xl border border-brand-100 overflow-hidden"
      >
        {/* Header with brand */}
        <div className="bg-brand-500 text-white text-center py-6 px-6">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block"
          >
            <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
              Larissa<span className="italic font-normal">.VetOdonto</span>
            </h1>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mb-6 md:mb-8"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 md:w-14 md:h-14 text-green-500" strokeWidth={2} />
            </div>
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-5xl font-display text-brand-900 mb-4 md:mb-6 leading-tight"
          >
            Obrigado pela sua <span className="italic text-brand-500">Compra!</span>
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-brand-700 text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-xl mx-auto"
          >
            Seu acesso ao <strong>Método para Acabar com Mau Hálito do seu Pet</strong> foi enviado para o seu e-mail. 
            Prepare-se para transformar a saúde bucal do seu melhor amigo! 🐾
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-brand-50 rounded-2xl p-6 md:p-8 mb-8 border border-brand-100"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <Heart className="w-6 h-6 text-brand-500 fill-current" />
              <h3 className="text-xl font-display text-brand-900">Ficou com alguma dúvida?</h3>
            </div>
            <p className="text-brand-600 text-sm md:text-base mb-5">
              Estou aqui para ajudar você e seu pet em cada passo dessa jornada de saúde e bem-estar!
            </p>
            
            <button
              onClick={() => window.open(getWhatsAppLinkWithMessage("Olá Dra Larissa, acabei de adquirir o Método para Acabar com Mau Hálito e gostaria de tirar algumas dúvidas."), '_blank')}
              className="w-full py-3 md:py-4 bg-brand-500 text-white rounded-xl font-bold shadow-lg hover:bg-brand-600 transition-all flex items-center justify-center gap-2 group"
            >
              Tirar dúvida com a Dra Larissa
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <button
              onClick={() => navigate('/')}
              className="text-brand-600 hover:text-brand-900 font-medium text-sm underline underline-offset-4 transition-colors"
            >
              Voltar para a página inicial
            </button>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="bg-brand-50 border-t border-brand-100 py-4 px-6 text-center">
          <p className="text-brand-400 text-xs">
            © 2026 Todos os direitos reservados - VCS Veterinary Care Support
          </p>
          <p className="text-brand-400 text-xs mt-1">Created by SOLIDUS Systems</p>
        </div>
      </motion.div>
    </div>
  );
};
