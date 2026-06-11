import React from 'react';
import { Check, AlertCircle, X, ArrowLeft } from 'lucide-react';

type ImageOption = {
  value: number;
  image: string;
  alt: string;
  label: string;
  iconType: 'check' | 'alert' | 'alert-orange' | 'x';
};

type ImageQuestionProps = {
  onAnswer: (value: number) => void;
  onPrevious: () => void;
  showPrevious: boolean;
  options: ImageOption[];
};

export const ImageQuestion: React.FC<ImageQuestionProps> = ({ 
  onAnswer, 
  onPrevious, 
  showPrevious,
  options 
}) => {
  const getIconComponent = (iconType: ImageOption['iconType']) => {
    switch (iconType) {
      case 'check':
        return {
          icon: <Check className="w-6 h-6" />,
          bgClass: 'bg-green-100',
          textClass: 'text-green-600'
        };
      case 'alert':
        return {
          icon: <AlertCircle className="w-6 h-6" />,
          bgClass: 'bg-brand-100',
          textClass: 'text-brand-500'
        };
      case 'alert-orange':
        return {
          icon: <AlertCircle className="w-6 h-6" />,
          bgClass: 'bg-orange-100',
          textClass: 'text-orange-600'
        };
      case 'x':
        return {
          icon: <X className="w-6 h-6" />,
          bgClass: 'bg-red-100',
          textClass: 'text-red-600'
        };
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 md:gap-4 mt-6 md:mt-8 max-w-3xl mx-auto">
        {options.map((option) => {
          const iconData = getIconComponent(option.iconType);
          return (
            <button
              key={option.value}
              onClick={() => onAnswer(option.value)}
              className="group relative overflow-hidden rounded-2xl border-2 border-brand-100 hover:border-brand-500 transition-all bg-white hover:shadow-xl"
            >
              <div className="flex items-center gap-4 md:gap-6 p-4 md:p-5">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden shrink-0 border-2 border-brand-50">
                  <img 
                    src={option.image}
                    alt={option.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-left flex items-center justify-between">
                  <p className="text-brand-900 font-bold text-lg md:text-xl">{option.label}</p>
                  <div className={`w-12 h-12 rounded-full ${iconData.bgClass} flex items-center justify-center ${iconData.textClass} shrink-0`}>
                    {iconData.icon}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
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
