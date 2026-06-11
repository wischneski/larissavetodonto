import React from 'react';

type WelcomeScreenProps = {
  onStart: () => void;
};

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="p-6 md:p-12 pt-16 md:pt-20 text-center flex flex-col items-center justify-center gap-6">
      <h2 className="text-2xl md:text-4xl font-display text-brand-900 leading-tight">
        Avaliação Rápida da Saúde Bucal
      </h2>
      <p className="max-w-2xl text-brand-600 text-sm md:text-lg">
        Doenças na boca e dentes podem levar a grande desconforto e dor. Se não tratadas podem causar a doenças ainda mais graves. Avalie o estado de saúde da boca do seus pets em apenas seis passos.
      </p>
      <div className="w-full max-w-xs">
        <button
          onClick={onStart}
          className="w-full py-3 md:py-4 bg-brand-500 text-white rounded-xl font-bold shadow-xl hover:bg-brand-600 transition-colors text-sm md:text-base"
        >
          COMEÇAR
        </button>
      </div>
    </div>
  );
};
