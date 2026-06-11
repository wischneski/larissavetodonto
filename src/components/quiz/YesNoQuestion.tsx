import React from 'react';
import { Check, ArrowLeft } from 'lucide-react';

type YesNoQuestionProps = {
  onAnswer: (value: number) => void;
  onPrevious: () => void;
  showPrevious: boolean;
  imageSrc?: string;
  imageAlt?: string;
  imageLabel?: string;
};

export const YesNoQuestion: React.FC<YesNoQuestionProps> = ({ 
  onAnswer, 
  onPrevious, 
  showPrevious 
  , imageSrc, imageAlt, imageLabel
}) => {
  return (
    <>
      {imageSrc && (
        <div className="mt-6 flex flex-col items-center">
          <img src={imageSrc} alt={imageAlt} className="w-40 md:w-56 rounded-lg object-cover shadow-sm" />
          {imageLabel && <p className="text-sm text-center text-brand-700 mt-3 px-2">{imageLabel}</p>}
        </div>
      )}
      <div className="grid grid-cols-2 gap-3 md:gap-4 mt-6 md:mt-8">
        <button
          onClick={() => onAnswer(0)}
          className="py-3 md:py-4 rounded-xl border-2 border-brand-100 text-brand-600 font-medium hover:border-brand-500 hover:bg-brand-50 transition-all flex justify-center items-center gap-2 text-sm md:text-base"
        >
          Não
        </button>
        <button
          onClick={() => onAnswer(1)}
          className="py-3 md:py-4 rounded-xl bg-brand-900 text-white font-medium hover:bg-brand-700 transition-all shadow-lg flex justify-center items-center gap-2 text-sm md:text-base"
        >
          <Check className="w-4 h-4" /> Sim
        </button>
      </div>
      {showPrevious && (
        <button
          onClick={onPrevious}
          className="mt-4 py-2 px-4 text-brand-500 hover:text-brand-700 font-medium transition-colors flex items-center gap-2 mx-auto"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar à questão anterior
        </button>
      )}
    </>
  );
};
