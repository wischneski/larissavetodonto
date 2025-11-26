import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, Check, X, AlertCircle, Activity, HeartPulse, Stethoscope, ArrowLeft } from 'lucide-react';
import { getWhatsAppLink } from '../services/whatsapp';

type Question = {
  id: number;
  text: string;
  icon: React.ReactNode;
};

const questions: Question[] = [
  { 
    id: 1, 
    text: "Ao chegar perto do rostinho dele(a), você sente um mau hálito forte?", 
    icon: <Activity className="w-6 h-6" /> 
  },
  { 
    id: 2, 
    text: "Você nota dentes amarelados, amarronzados ou com 'pedrinhas'?", 
    icon: <ClipboardCheck className="w-6 h-6" /> 
  },
  { 
    id: 3, 
    text: "A gengiva parece vermelha, inchada ou sangra ao escovar/tocar?", 
    icon: <HeartPulse className="w-6 h-6" /> 
  },
  { 
    id: 4, 
    text: "Ele(a) tem deixado a ração cair da boca ou mastiga só de um lado?", 
    icon: <Stethoscope className="w-6 h-6" /> 
  },
  { 
    id: 5, 
    text: "Ele(a) evita que toquem no focinho ou esfrega o rosto nos móveis?", 
    icon: <AlertCircle className="w-6 h-6" /> 
  },
  { 
    id: 6, 
    text: "Você percebeu espirros frequentes ou secreção nasal recentemente?", 
    icon: <Activity className="w-6 h-6" /> 
  }
];

export const VetOdontoScorePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (isYes: boolean) => {
    if (isYes) setScore(s => s + 1);
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(c => c + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  const getResult = () => {
    if (score === 0) return {
      title: "Sorriso Saudável!",
      desc: "Parabéns! Continue com a prevenção e escovação diária.",
      color: "text-green-600",
      bg: "bg-green-50",
      cta: "Agendar Check-up Preventivo"
    };
    if (score <= 2) return {
      title: "Sinal de Alerta (Gengivite)",
      desc: "Há sinais iniciais de doença periodontal. O tratamento agora evita dores futuras.",
      color: "text-brand-500",
      bg: "bg-brand-50",
      cta: "Agendar Limpeza de Tártaro"
    };
    return {
      title: "Risco Alto (Periodontite)",
      desc: "Seu pet pode estar sentindo dor silenciosa. Bactérias podem afetar órgãos vitais.",
      color: "text-red-600",
      bg: "bg-red-50",
      cta: "Solicitar Avaliação Urgente"
    };
  };

  const resultData = getResult();

  return (
    <div className="min-h-screen bg-brand-900/60 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative border border-brand-100"
      >
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-brand-300 hover:text-brand-900 transition-colors z-20"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Back Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 left-4 p-2 text-brand-300 hover:text-brand-900 transition-colors z-20 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Voltar</span>
        </button>

        {!showResult ? (
          /* Question Step */
          <div className="p-6 md:p-12 pt-16 md:pt-16">
            <div className="mb-6 md:mb-8">
              <div className="flex justify-between text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">
                <span>Pergunta {currentStep + 1} de {questions.length}</span>
                <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="w-full h-1 bg-brand-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                  className="h-full bg-brand-500"
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="min-h-40 md:min-h-[200px] flex flex-col justify-center text-center"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-50 rounded-full flex items-center justify-center text-brand-500 mx-auto mb-4 md:mb-6">
                  {questions[currentStep].icon}
                </div>
                <h3 className="text-xl md:text-2xl font-display text-brand-900 leading-tight">
                  {questions[currentStep].text}
                </h3>
              </motion.div>
            </AnimatePresence>

            <div className="grid grid-cols-2 gap-3 md:gap-4 mt-6 md:mt-8">
              <button
                onClick={() => handleAnswer(false)}
                className="py-3 md:py-4 rounded-xl border-2 border-brand-100 text-brand-600 font-medium hover:border-brand-500 hover:bg-brand-50 transition-all flex justify-center items-center gap-2 text-sm md:text-base"
              >
                Não
              </button>
              <button
                onClick={() => handleAnswer(true)}
                className="py-3 md:py-4 rounded-xl bg-brand-900 text-white font-medium hover:bg-brand-700 transition-all shadow-lg flex justify-center items-center gap-2 text-sm md:text-base"
              >
                <Check className="w-4 h-4" /> Sim
              </button>
            </div>
          </div>
        ) : (
          /* Result Step */
          <div className="p-6 md:p-12 pt-16 md:pt-16 text-center">
             <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full flex items-center justify-center mb-4 md:mb-6 ${resultData.bg} ${resultData.color}`}>
               <Activity className="w-8 h-8 md:w-10 md:h-10" />
             </div>
             
             <h3 className="text-2xl md:text-3xl font-display text-brand-900 mb-3 md:mb-4">
               {resultData.title}
             </h3>
             
             <p className="text-brand-600 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
               {resultData.desc}
             </p>

             <div className="bg-brand-50 p-4 rounded-xl mb-6 md:mb-8 border border-brand-100">
               <p className="text-xs md:text-sm text-brand-500 italic">
                 "Lembre-se: Este teste é educativo e não substitui a avaliação clínica presencial."
               </p>
             </div>

             <button 
               onClick={() => window.open(getWhatsAppLink(), '_blank')}
               className="block w-full py-3 md:py-4 bg-brand-500 text-white rounded-xl font-bold shadow-xl hover:bg-brand-600 transition-colors text-sm md:text-base"
             >
               {resultData.cta}
             </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
