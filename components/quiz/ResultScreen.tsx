import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { getWhatsAppLink, getWhatsAppLinkWithMessage } from '../../services/whatsapp';

type ResultScreenProps = {
  score: number;
};

export const ResultScreen: React.FC<ResultScreenProps> = ({ score }) => {
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState(false);

  const getResult = () => {
    if (score === 0) return {
      title: 'BOM',
      desc: `A saúde oral do seu pet  parece ser boa. Continue com a higiene oral em casa tal como escovações diárias ou outros produtos que sejam efectivos na redução da placa bacteriana e acumulação de tártaro\n\nRecomenda-se realizar esta avaliação todos os meses de forma a acompanhar a saúde oral do seu pet. Se desejar receber um lembrete, por favor coloque o seu e-mail aqui.`,
      color: 'text-green-600',
      bg: 'bg-green-50',
      cta: 'Agendar Consulta Agora'
    };
    if (score <= 3) return {
      title: 'MÉDIO',
      desc: `A boca do seu pet não se apresenta saudável. Agende uma consulta o mais breve possível.\n\nRecomenda-se realizar esta avaliação todos os meses de forma a acompanhar a saúde oral do seu cão. Se desejar receber um lembrete, por favor coloque o seu e-mail aqui`,
      color: 'text-brand-500',
      bg: 'bg-brand-50',
      cta: 'Agendar Consulta Agora'
    };
    return {
      title: 'GRAVE',
      desc: `O seu pet tem dor na boca, agende uma consulta com urgencia, o seu pet precisa de tratamento imediato.\n\nRecomenda-se realizar esta avaliação todos os meses de forma a acompanhar a saúde oral do seu cão. Se desejar receber um lembrete, por favor coloque o seu e-mail aqui`,
      color: 'text-red-600',
      bg: 'bg-red-50',
      cta: 'Agendar Consulta Agora'
    };
  };

  const resultData = getResult();

  return (
    <div className="p-6 md:p-12 pt-16 md:pt-16 text-center">
      <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full flex items-center justify-center mb-4 md:mb-6 ${resultData.bg} ${resultData.color}`}>
        <Activity className="w-8 h-8 md:w-10 md:h-10" />
      </div>
      
      <h3 className="text-2xl md:text-3xl font-display text-brand-900 mb-3 md:mb-4">
        {resultData.title}
      </h3>
      
      <p className="text-brand-600 mb-6 md:mb-8 leading-relaxed text-sm md:text-base whitespace-pre-line">
        {resultData.desc}
      </p>

      <div className="max-w-md mx-auto mb-6">
        <label className="block text-sm font-medium text-brand-700 mb-2">Receber lembrete por e-mail (opcional)</label>
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="flex-1 py-2 px-3 rounded-lg border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
          <button
            onClick={() => {
              if (!email) return;
              try {
                localStorage.setItem('vetodonto_reminder_email', email);
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
              } catch (err) {
                // ignore
              }
            }}
            className="px-4 py-2 bg-brand-500 text-white rounded-lg font-medium"
          >
            Salvar
          </button>
        </div>
        {saved && <p className="text-sm text-green-600 mt-2">Lembrete salvo. Iremos lembrar mensalmente.</p>}
      </div>

      <div className="bg-brand-50 p-4 rounded-xl mb-6 md:mb-8 border border-brand-100">
        <p className="text-xs md:text-sm text-brand-500 italic">
          "Lembre-se: Este teste é educativo e não substitui a avaliação clínica presencial."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <button
          onClick={() => window.open(getWhatsAppLinkWithMessage("Olá Dra Larissa, tudo bem? Acabei de realizar o teste de saúde bucal do meu pet e gostaria de agendar uma consulta PRESENCIAL."), '_blank')}
          className="w-full py-3 md:py-4 bg-brand-500 text-white rounded-xl font-bold shadow-xl hover:bg-brand-600 transition-colors text-sm md:text-base"
        >
          Agendar Consulta Presencial
        </button>

        <button
          onClick={() => window.open(getWhatsAppLinkWithMessage("Olá Dra Larissa, tudo bem? Acabei de realizar o teste de saúde bucal do meu pet e gostaria de agendar uma consulta ONLINE."), '_blank')}
          className="w-full py-3 md:py-4 bg-brand-600 text-white rounded-xl font-bold shadow-lg hover:bg-brand-700 transition-colors text-sm md:text-base"
        >
          Agendar Consulta Online
        </button>
      </div>

      {/* Placeholder checkout URL - replace when you provide the real checkout link */}
      <div>
        <button
          onClick={() => window.open('https://payfast.greenn.com.br/147857', '_blank')}
          className="block w-full py-3 md:py-4 bg-brand-700 text-white rounded-xl font-bold shadow-lg hover:bg-brand-800 transition-colors text-sm md:text-base"
        >
          Baixar Método para Acabar com Mau Hálito do seu Pet
        </button>
      </div>
    </div>
  );
};
