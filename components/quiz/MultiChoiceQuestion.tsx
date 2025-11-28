import React from 'react';
import { ArrowLeft } from 'lucide-react';

type MultiChoiceQuestionProps = {
  onAnswer: (value: number) => void;
  onPrevious: () => void;
  showPrevious: boolean;
  options: { label: string; value: number; className: string }[];
};

export const MultiChoiceQuestion: React.FC<MultiChoiceQuestionProps> = ({ 
  onAnswer, 
  onPrevious, 
  showPrevious,
  options 
}) => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6 md:mt-8">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(option.value)}
            className={option.className}
          >
            {option.label}
          </button>
        ))}
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
