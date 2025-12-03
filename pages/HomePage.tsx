import React, { Suspense, lazy } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';

// Lazy load componentes abaixo do fold para reduzir JS inicial
const Services = lazy(() => import('../components/Services').then(m => ({ default: m.Services })));
const About = lazy(() => import('../components/About').then(m => ({ default: m.About })));
const Testimonials = lazy(() => import('../components/Testimonials').then(m => ({ default: m.Testimonials })));
const PeriodontalTest = lazy(() => import('../components/PeriodontalTest').then(m => ({ default: m.PeriodontalTest })));
const Contact = lazy(() => import('../components/Contact').then(m => ({ default: m.Contact })));
const FloatingParticles = lazy(() => import('../components/FloatingParticles').then(m => ({ default: m.FloatingParticles })));
const WhatsAppButton = lazy(() => import('../components/WhatsAppButton').then(m => ({ default: m.WhatsAppButton })));

// Fallback vazio para componentes visuais
const EmptyFallback = () => null;

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-50 text-brand-900 font-sans selection:bg-brand-500 selection:text-white relative">
      <Suspense fallback={<EmptyFallback />}>
        <FloatingParticles />
      </Suspense>
      <Header />
      
      <main className="relative">
        <Hero />
        <Suspense fallback={<EmptyFallback />}>
          <About />
          <Services />
          <Testimonials />
          <PeriodontalTest />
          <Contact />
        </Suspense>
      </main>

      <footer className="bg-brand-100 py-8 border-t border-brand-200 text-center relative z-10">
        <div className="container mx-auto px-4">
          <p className="text-brand-600 font-serif italic text-lg mb-2">Larissa VetOdonto</p>
          <p className="text-brand-400 text-sm">© 2026 Todos os direitos reservados - VCS Veterinary Care Support</p>
          <p className="text-brand-400 text-sm mt-1">Created by SOLIDUS Systems</p>
        </div>
      </footer>

      <Suspense fallback={<EmptyFallback />}>
        <WhatsAppButton />
      </Suspense>
    </div>
  );
};
