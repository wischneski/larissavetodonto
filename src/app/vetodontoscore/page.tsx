'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ClipboardCheck, X, AlertCircle, Activity, HeartPulse, Stethoscope, ArrowLeft } from 'lucide-react'
import { WelcomeScreen } from '@/components/quiz/WelcomeScreen'
import { ResultScreen } from '@/components/quiz/ResultScreen'
import { MultiChoiceQuestion } from '@/components/quiz/MultiChoiceQuestion'
import { YesNoQuestion } from '@/components/quiz/YesNoQuestion'
import { ImageQuestion } from '@/components/quiz/ImageQuestion'

type Question = {
  id: number
  text: string
  icon: React.ReactNode
  type: 'multi-choice' | 'yes-no' | 'image'
}

const questions: Question[] = [
  { id: 1, text: 'Ao chegar perto do rostinho dele(a), você sente um mau hálito forte?', icon: <Activity className="w-6 h-6" />, type: 'multi-choice' },
  { id: 2, text: 'Os dentes estão limpos? (Selecione 1 das 4 opções)', icon: <ClipboardCheck className="w-6 h-6" />, type: 'image' },
  { id: 3, text: 'Há inflamação presente na gengiva? (Selecione 1 das 4 opções)', icon: <HeartPulse className="w-6 h-6" />, type: 'image' },
  { id: 4, text: 'Ele(a) tem deixado a ração cair da boca ao mastigar?', icon: <Activity className="w-6 h-6" />, type: 'multi-choice' },
  { id: 5, text: 'Como está a mordida e posição dos dentes? (Selecione 1 das 4 opções)', icon: <AlertCircle className="w-6 h-6" />, type: 'image' },
  { id: 6, text: 'Existe algum dente quebrado? (Selecione 1 das 4 opções)', icon: <Stethoscope className="w-6 h-6" />, type: 'image' },
  { id: 7, text: 'Consegue identificar alguns dentes de leite (Esses mais finos)?', icon: <Activity className="w-6 h-6" />, type: 'yes-no' },
]

const question1Options = [
  { label: 'NÃO', value: 0, className: 'py-3 md:py-4 rounded-xl border-2 border-brand-100 text-brand-600 font-medium hover:border-brand-500 hover:bg-brand-50 transition-all flex justify-center items-center gap-2 text-sm md:text-base' },
  { label: 'ALGUMAS VEZES', value: 1, className: 'py-3 md:py-4 rounded-xl bg-brand-50 text-brand-900 font-medium hover:bg-brand-100 transition-all border border-brand-100 flex justify-center items-center gap-2 text-sm md:text-base' },
  { label: 'FREQUENTEMENTE', value: 2, className: 'py-3 md:py-4 rounded-xl bg-brand-500 text-white font-medium hover:bg-brand-600 transition-all shadow-lg flex justify-center items-center gap-2 text-sm md:text-base' },
  { label: 'SEMPRE', value: 3, className: 'py-3 md:py-4 rounded-xl bg-brand-700 text-white font-bold hover:bg-brand-800 transition-all shadow-lg flex justify-center items-center gap-2 text-sm md:text-base' },
]

const question2Options = [
  { value: 0, image: '/images/1.webp', alt: 'Sem tártaro', label: 'Sem tártaro', iconType: 'check' as const },
  { value: 1, image: '/images/22_moderate_calculus.webp', alt: 'Tártaro presente', label: 'Tártaro presente', iconType: 'alert' as const },
  { value: 2, image: '/images/23_advanced_calculus.webp', alt: 'Tártaro cobrindo todos os dentes', label: 'Tártaro cobrindo todos os dentes', iconType: 'alert-orange' as const },
  { value: 3, image: '/images/24_severe_calculus.webp', alt: 'Grande quantidade de placa de Tártaro', label: 'Grande quantidade de placa de Tártaro', iconType: 'x' as const },
]

const question3Options = [
  { value: 0, image: '/images/31b_no_inflammation.webp', alt: 'Gengiva saudável', label: 'Gengiva rosada ou com a pigmentação natural', iconType: 'check' as const },
  { value: 1, image: '/images/32b_moderate_inflammation.webp', alt: 'Inflamação moderada', label: 'A borda da gengiva está vermelha', iconType: 'alert' as const },
  { value: 2, image: '/images/33_advanced_inflammation.webp', alt: 'Inflamação avançada', label: 'A gengiva está vermelha ao longo de toda boca', iconType: 'alert-orange' as const },
  { value: 3, image: '/images/34b_severe_inflammation.webp', alt: 'Inflamação severa', label: 'Existe sangramento ou diminuição da gengiva e a raiz do dente está aparecendo', iconType: 'x' as const },
]

const question5Options = [
  { value: 0, image: '/images/41_normal.webp', alt: 'Mordida normal', label: 'Os caninos se encaixam perfeitamente', iconType: 'check' as const },
  { value: 1, image: '/images/42_single_tooth_displaced.webp', alt: 'Dentes desalinhados', label: 'Parece que alguns dentes estão desalinhados', iconType: 'alert' as const },
  { value: 2, image: '/images/43_mandible_short.webp', alt: 'Dentes sobrepostos', label: 'Existem dentes se sobrepondo', iconType: 'alert-orange' as const },
  { value: 3, image: '/images/44_mandible_long.webp', alt: 'Prognatismo', label: 'Os dentes de baixo estão bem para frente', iconType: 'x' as const },
]

const question6Options = [
  { value: 0, image: '/images/51_intact.webp', alt: 'Dente intacto', label: 'A superfície do dente está intacta', iconType: 'check' as const },
  { value: 1, image: '/images/54_uncompl.webp', alt: 'Quebra sem pinta', label: "O dente está quebrado mas não aparece nenhuma 'pinta'", iconType: 'alert' as const },
  { value: 2, image: '/images/53_old.webp', alt: 'Quebra com pinta castanha', label: "O dente está quebrado e apresenta uma 'pinta' castanha ou preta no centro", iconType: 'alert-orange' as const },
  { value: 3, image: '/images/52a_fresh.webp', alt: 'Quebra com pinta vermelha', label: "O dente está quebrado e apresenta uma 'pinta' vermelha e pode estar sangrando", iconType: 'x' as const },
]

export default function VetOdontoScorePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)

  const handleAnswer = (value: number) => {
    if (typeof value === 'number' && value > 0) {
      setScore(s => s + value)
    }
    if (currentStep < questions.length - 1) {
      setCurrentStep(c => c + 1)
    } else {
      setShowResult(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(c => c - 1)
  }

  const renderQuestion = () => {
    const question = questions[currentStep]
    switch (question.type) {
      case 'multi-choice':
        return <MultiChoiceQuestion onAnswer={handleAnswer} onPrevious={handlePrevious} showPrevious={currentStep > 0} options={question1Options} />
      case 'image': {
        const imageOptions = question.id === 2 ? question2Options : question.id === 3 ? question3Options : question.id === 5 ? question5Options : question6Options
        return <ImageQuestion onAnswer={handleAnswer} onPrevious={handlePrevious} showPrevious={currentStep > 0} options={imageOptions} />
      }
      case 'yes-no':
        return <YesNoQuestion onAnswer={handleAnswer} onPrevious={handlePrevious} showPrevious={currentStep > 0} imageSrc={question.id === 7 ? '/images/61b_primary_upper.webp' : undefined} imageAlt={question.id === 7 ? 'Dentes de leite' : undefined} imageLabel={question.id === 7 ? 'Vejo um ou mais dentes de leite' : undefined} />
    }
  }

  return (
    <div className="min-h-screen bg-brand-900/60 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white w-full max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl rounded-3xl shadow-2xl overflow-hidden relative border border-brand-100 md:min-h-[70vh] pb-24"
      >
        <div className="w-full border-b border-brand-100">
          <div className="container mx-auto px-4 py-4 flex justify-center">
            <a href="/" className="text-2xl font-display font-bold text-brand-900 tracking-tight">
              Larissa<span className="text-brand-500 italic font-normal">.VetOdonto</span>
            </a>
          </div>
        </div>

        <button onClick={() => router.push('/')} className="absolute top-4 right-4 p-2 text-brand-300 hover:text-brand-900 transition-colors z-20">
          <X className="w-6 h-6" />
        </button>
        <button onClick={() => router.push('/')} className="absolute top-4 left-4 p-2 text-brand-300 hover:text-brand-900 transition-colors z-20 flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Voltar</span>
        </button>

        {showWelcome ? (
          <WelcomeScreen onStart={() => setShowWelcome(false)} />
        ) : !showResult ? (
          <div className="p-6 md:p-12 pt-16 md:pt-16 pb-6">
            <div className="mb-6 md:mb-8">
              <div className="flex justify-between text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">
                <span>Pergunta {currentStep + 1} de {questions.length}</span>
                <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="w-full h-1 bg-brand-100 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }} className="h-full bg-brand-500" />
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="min-h-40 md:min-h-[200px] flex flex-col justify-center text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-50 rounded-full flex items-center justify-center text-brand-500 mx-auto mb-4 md:mb-6">
                  {questions[currentStep].icon}
                </div>
                <h3 className="text-xl md:text-2xl font-display text-brand-900 leading-tight">
                  {questions[currentStep].text}
                </h3>
              </motion.div>
            </AnimatePresence>
            {renderQuestion()}
          </div>
        ) : (
          <ResultScreen score={score} />
        )}

        <div className="absolute left-0 right-0 bottom-0 border-t border-brand-100 bg-white">
          <div className="container mx-auto px-4 py-4 text-center">
            <p className="text-brand-400 text-sm">© 2026 Todos os direitos reservados - VCS Veterinary Care Support</p>
            <p className="text-brand-400 text-sm mt-1">Created by SOLIDUS Systems</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
